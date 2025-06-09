import { db } from "@/db";
import { errorResponseObject, getUser_from_token, readTime } from "@/lib/utils";
import { NextRequest, NextResponse } from "next/server";
import sharp from "sharp";

export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const id = formData.get("id") as string;
  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const content = formData.get("content") as string;
  const tags = formData.get("tags") as string;
  const file = formData.get("file") as File | null;
  const slug = formData.get("slug") as string;
  let resizeImage = null;
  const user = await getUser_from_token(req);
  if (!user) {
    return errorResponseObject("Unauthorized", 401);
  }

  const article = await db.post.findUnique({ where: { id } });
  if (!article) return errorResponseObject("Article Not found", 404);

  if (file) {
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    resizeImage = await sharp(buffer).resize(800, 400).jpeg().toBuffer();
  }

  const post = await db.post.update({
    where: {
      id,
      createdBy: user.id,
    },
    data: {
      title,
      content,
      description,
      tags: tags ? JSON.stringify(tags.split(",")) : "",
      slug,
      readingTime: readTime(content),
      coverImage: resizeImage || article.coverImage,
      summery: article.content === content ? article.summery : null,
    },
  });

  if (!post) return errorResponseObject("forbidden", 403);
  return NextResponse.json({ message: "Post Saved", post });
}
