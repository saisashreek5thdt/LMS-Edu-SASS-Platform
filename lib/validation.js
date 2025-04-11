const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const phoneRegex = /^[0-9]{10,15}$/;
const minPasswordLength = 6;

export const validateModel = (modelName, data) => {
  const validators = {
    school: ["name", "email", "password", "address", "phone"],
    tutor: ["name", "email", "password", "phone", "address"],
    teacher: ["schoolId", "name", "email", "password"],
    student: ["schoolId", "name", "email", "password"],
  };

  const requiredFields = validators[modelName];
  if (!requiredFields) throw new Error("Invalid model name for validation");

  const missingFields = requiredFields.filter((field) => !(field in data));
  if (missingFields.length > 0) {
    throw new Error(`Missing required fields: ${missingFields.join(", ")}`);
  }

  if ("email" in data && !emailRegex.test(data.email)) {
    throw new Error("Invalid email format");
  }

  if ("password" in data && data.password.length < minPasswordLength) {
    throw new Error("Password must be at least 6 characters long");
  }

  if ("phone" in data && !phoneRegex.test(data.phone)) {
    throw new Error("Invalid phone number format");
  }
};
