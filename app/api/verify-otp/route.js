import { prisma } from "@/lib/prisma";

export async function POST(req) {
    try {
        const { email, otp } = await req.json();

        const school = await prisma.school.findUnique({ where: { email } });
        if (!school) {
            return Response.json({ error: "School not found" }, { status: 404 });
        }

        if (
            !school.otp ||
            school.otp !== otp ||
            new Date(school.otpExpiresAt) < new Date()
        ) {
            return Response.json({ error: "Invalid or expired OTP" }, { status: 400 });
        }

        // const tutor = await prisma.tutor.findUnique({ where: { email } });
        // if (!tutor) {
        //     return Response.json({ error: "School not found" }, { status: 404 });
        // }

        // if (
        //     !tutor.otp ||
        //     tutor.otp !== otp ||
        //     new Date(tutor.otpExpiresAt) < new Date()
        // ) {
        //     return Response.json({ error: "Invalid or expired OTP" }, { status: 400 });
        // }

        return Response.json({ message: "OTP verified successfully" });
    } catch (err) {
        console.error("OTP Verification Error:", err);
        return Response.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
