import { db } from "@/db";
import { decodedToken, errorResponseObject } from "@/lib/utils";
import { NextRequest, NextResponse } from "next/server";

export const config = {
  api: {
    bodyParser: false,
  },
};
interface Params {
  params: Promise<{
    id: string;
  }>;
}

export async function GET(_req: NextRequest, context: Params) {
  const post = await db.post.findUnique({
    where: { id: (await context.params).id },
  });

  if (!post) return errorResponseObject("No Article Found", 404);
  const coverImage = post.coverImage ? Array.from(post.coverImage) : null;
  return NextResponse.json({
    article: {
      ...post,
      tags: post.tags ? JSON.parse(post.tags) : "",
      coverImage,
    },
  });
}

export async function DELETE(req: NextRequest, context: Params) {
  const token = req.cookies.get("token")?.value;
  if (!token) return errorResponseObject("Unauthorized", 401);
  const tokenPayLoad = decodedToken(token);
  if (!tokenPayLoad) return errorResponseObject("Unauthorized", 401);

  const post = await db.post.delete({
    where: { id: (await context.params).id, createdBy: tokenPayLoad.userId },
  });

  if (!post) return errorResponseObject("No Article Found", 404);
  return NextResponse.json({
    message: `Article deleted Successfully id:${post.id}`,
  });
}
