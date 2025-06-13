import { db } from "@/db";
import { NextRequest, NextResponse } from "next/server";
//import { CreateArticleRequest } from '@/app/articles/article-type';
import { errorResponseObject, getUser_from_token, readTime } from "@/lib/utils";
import sharp from "sharp";
import { resetMemory } from "@/lib/memory";

export const config = {
  api: {
    bodyParser: false,
  },
};
interface UserArtlcesParams {
  params: Promise<{
    userId: string;
  }>;
}

export async function GET(req: NextRequest, context: UserArtlcesParams) {
  const params = await context.params;

  const { searchParams } = new URL(req.url);
  const search = searchParams.get("search")?.toLocaleLowerCase() || "";

  if (params && params.userId) {
    const userArticles = await db.post.findMany({
      where: {
        createdBy: params.userId,
      },
      orderBy: {
        date: "desc",
      },
    });
    if (!userArticles.length)
      return errorResponseObject("No Articles found!", 404);
    return NextResponse.json(
      userArticles.map((article) => {
        return {
          ...article,
          tags: article.tags ? JSON.parse(article.tags) : "",
        };
      })
    );
  } else {
    const searchedArticles = await db.post.findMany({
      where: search
        ? {
            OR: [
              { title: { contains: search, mode: "insensitive" } },
              { content: { contains: search, mode: "insensitive" } },
              { description: { contains: search, mode: "insensitive" } },
            ],
          }
        : {},
      orderBy: {
        date: "desc",
      },
    });

    return NextResponse.json(
      searchedArticles.map((article) => {
        return {
          ...article,
          tags: article.tags ? JSON.parse(article.tags) : "",
        };
      })
    );
  }
}

export async function POST(req: NextRequest) {
  const formData = await req.formData();
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
  if (file) {
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    resizeImage = await sharp(buffer).resize(800, 400).jpeg().toBuffer();
  }
  const post = await db.post.create({
    data: {
      title,
      content,
      description,
      tags: tags ? JSON.stringify(tags.split(",")) : "",
      slug,
      author: user.name,
      date: `${Date.now()}`,
      readingTime: readTime(content),
      coverImage: resizeImage,
      createdBy: user.id,
    },
  });
  resetMemory(user.id);
  return NextResponse.json({ message: "Post Saved", post });
}
