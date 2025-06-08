import { db } from "@/db";
import { errorResponseObject } from "@/lib/utils";
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
