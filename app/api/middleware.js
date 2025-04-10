import { validateModel } from "@/lib/validation";

export async function middleware(req, modelName = null) {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);

  if (req.method === 'POST' || req.method === 'PUT') {
    const body = await req.json();
    try {
      validateModel(modelName, body);
      return { success: true, data: body };
    } catch (err) {
      return { success: false, error: err.message };
    }
  }

  return { success: true };
}