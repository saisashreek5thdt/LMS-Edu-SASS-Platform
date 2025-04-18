import { validateModel } from "@/lib/validation";

export async function middleware(req, modelName = null) {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);

  if (req.method === 'POST' || req.method === 'PUT') {
    try {
      const body = await req.json();
      console.log("Incoming Body:", body); // 👈 Add this

      validateModel(modelName, body);
      return { success: true, data: body };
    } catch (err) {
      console.error("Middleware validation error:", err.message);
      return { success: false, error: err.message };
    }
  }

  return { success: true };
}
