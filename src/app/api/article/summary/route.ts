import { db } from "@/db";
import { parseSummaryJsonBlock } from "@/lib/prompt";
import { summerizeArticle } from "@/lib/summerizer";
import { errorResponseObject, getUser_from_token } from "@/lib/utils";

import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { content, article_id } = await req.json();
  if (!content || !article_id)
    return errorResponseObject("content or article id is missing!", 400);

  try {
    const user = await getUser_from_token(req);
    if (!user) return errorResponseObject("unauthorized", 401);
    if (!user.open_ai_token || !user.model)
      return errorResponseObject("Open AI apikey or model missing", 400);
    const post = await db.post.findUnique({
      where: {
        id: article_id,
      },
    });
    if (!post) return errorResponseObject("Article not found", 404);
    if (post.summery) return NextResponse.json({ summary: post.summery });
    const response = await summerizeArticle(
      content,
      user.open_ai_token,
      user.model
    );
    if (!response) throw new Error();
    const generatedSummery = parseSummaryJsonBlock(response);
    if (!generatedSummery) throw new Error();
    await db.post.update({
      where: {
        id: article_id,
      },
      data: {
        summery: generatedSummery.summary,
      },
    });
    return NextResponse.json(generatedSummery);
  } catch {
    return errorResponseObject("Unable to generate Summery!", 500);
  }
}
