import { validateModel } from "@/lib/validation";  
import { NextResponse } from "next/server";

export async function middleware(req, modelName = null) {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);

  if (req.method === 'POST' || req.method === 'PUT') {
    try {
      const body = await req.json();
      console.log("Incoming Body:", body); // 👈 Add this

      validateModel(modelName, body);

      if("userType" in body && !["school","tutor"].includes(body.userType)){
        throw new Error("Invalid userType");
      }
      return { success: true, data: body };
    } catch (err) {
      console.error("validation error:", err.message);
      return { success: false, error: err.message };
    }
  }

  return { success: true };
}


function errorResponse(message, status = 400) {
  return NextResponse.json({ success: false, error: message }, { status });
}