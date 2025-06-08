import { db } from "@/db";
import { errorResponseObject, getUser_from_token } from "@/lib/utils";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req:NextRequest) {
  const user = await getUser_from_token(req);
  if (!user) return NextResponse.json(errorResponseObject("Unauthorized", 401));

  const userArticles = await db.post.findMany({
    where: {
      createdBy: user.id,
    },
  });
  return NextResponse.json(
    userArticles.map((article) => {
      return { ...article, tags: article.tags ? JSON.parse(article.tags) : "" };
    })
  );
}
