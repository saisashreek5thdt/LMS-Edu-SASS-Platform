import { prisma } from "@/lib/prisma";
import Papa from "papaparse";
import jwt from "jsonwebtoken";
import { sendVerificationEmail } from "@/lib/emailLink";

const JWT_SECRET = process.env.JWT_SECRET || "default_secret_key";

export async function POST(req) {
  try {
    const formData = await req.formData();
    const file = formData.get("file");

    if (!file) {
      return Response.json({ error: "No file uploaded" }, { status: 400 });
    }

    // Parse the CSV file
    const csvData = await new Promise((resolve, reject) => {
      const reader = file.stream().getReader();
      let result = "";

      function read() {
        reader.read().then(({ done, value }) => {
          if (done) {
            // Parse the CSV content using PapaParse
            Papa.parse(result, {
              header: true,
              skipEmptyLines: true,
              complete: (parsed) => resolve(parsed.data),
              error: (error) => reject(error),
            });
            return;
          }
          result += new TextDecoder().decode(value);
          read();
        }).catch(reject);
      }

      read();
    });

    // Extract school ID from the request headers
    const authHeader = req.headers.get("authorization");
    if (!authHeader) {
      return Response.json({ error: "Authorization header missing" }, { status: 401 });
    }

    const token = authHeader.split(" ")[1];
    const decodedToken = jwt.verify(token, JWT_SECRET);
    const schoolId = decodedToken.id;

    // Separate students and teachers
    const studentsData = [];
    const teachersData = [];

    csvData.forEach((row) => {
      if (row.role === "student") {
        studentsData.push({
          schoolId: parseInt(schoolId),
          name: row.name,
          email: row.email,
          password: row.password, // Hash the password before storing
        });
      } else if (row.role === "teacher") {
        teachersData.push({
          schoolId: parseInt(schoolId),
          name: row.name,
          email: row.email,
          password: row.password, // Hash the password before storing
        });
      }
    });

    // Check for duplicate emails in the database
    const studentEmails = studentsData.map((student) => student.email);
    const teacherEmails = teachersData.map((teacher) => teacher.email);

    const existingStudents = await prisma.student.findMany({
      where: { email: { in: studentEmails } },
    });
    const existingTeachers = await prisma.teacher.findMany({
      where: { email: { in: teacherEmails } },
    });

    const existingStudentEmails = existingStudents.map((student) => student.email);
    const existingTeacherEmails = existingTeachers.map((teacher) => teacher.email);

    // Filter out duplicates
    const filteredStudentsData = studentsData.filter(
      (student) => !existingStudentEmails.includes(student.email)
    );
    const filteredTeachersData = teachersData.filter(
      (teacher) => !existingTeacherEmails.includes(teacher.email)
    );

    // Log skipped duplicates
    const skippedStudents = studentsData.filter((student) =>
      existingStudentEmails.includes(student.email)
    );
    const skippedTeachers = teachersData.filter((teacher) =>
      existingTeacherEmails.includes(teacher.email)
    );

    if (skippedStudents.length > 0 || skippedTeachers.length > 0) {
      console.warn(
        `Skipped duplicate entries: ${JSON.stringify([...skippedStudents, ...skippedTeachers])}`
      );
    }

    // Bulk create students and teachers
    if (filteredStudentsData.length > 0) {
      await prisma.student.createMany({
        data: filteredStudentsData.map((student) => ({
          ...student,
          password: hashPassword(student.password), // Hash passwords
        })),
      });
    }

    if (filteredTeachersData.length > 0) {
      await prisma.teacher.createMany({
        data: filteredTeachersData.map((teacher) => ({
          ...teacher,
          password: hashPassword(teacher.password), // Hash passwords
        })),
      });
    }

    // Generate and send verification links for all users (including duplicates that were skipped)
    const allUsers = [...studentsData, ...teachersData];
    for (const user of allUsers) {
      const verificationToken = jwt.sign(
        { email: user.email },
        JWT_SECRET,
        { expiresIn: "1d" }
      );
      const verificationLink = `${process.env.BASE_URL}/verify?token=${verificationToken}`;
      await sendVerificationEmail(user.email, verificationLink);
    }

    return Response.json(
      {
        message: "Bulk upload successful",
        skippedDuplicates: [...skippedStudents, ...skippedTeachers],
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error during bulk upload:", error);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}

// Helper function to hash passwords
function hashPassword(password) {
  const bcrypt = require("bcryptjs");
  const saltRounds = 10;
  return bcrypt.hashSync(password, saltRounds);
}