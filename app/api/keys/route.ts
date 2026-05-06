import { auth } from "@clerk/nextjs/server";
import { createApiKey, listApiKeys, deleteApiKey } from "@/lib/api-keys";

export async function GET() {
  const { userId } = await auth();
  if (!userId) return Response.json({ error: "Yetkisiz" }, { status: 401 });

  const keys = await listApiKeys(userId);
  return Response.json(keys);
}

export async function POST(req: Request) {
  const { userId } = await auth();
  if (!userId) return Response.json({ error: "Yetkisiz" }, { status: 401 });

  const { name } = await req.json();
  const key = await createApiKey(userId, name || "Yeni Key");
  return Response.json(key, { status: 201 });
}

export async function DELETE(req: Request) {
  const { userId } = await auth();
  if (!userId) return Response.json({ error: "Yetkisiz" }, { status: 401 });

  const { id } = await req.json();
  await deleteApiKey(id, userId);
  return Response.json({ ok: true });
}
