import { generateArticleFromPrompt } from "@/lib/generateArticle";
import { errorResponseObject, getUser_from_token } from "@/lib/utils";

import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { prompt } = await req.json();
  if (!prompt) return errorResponseObject("No prompt provided", 400);

  try {
    const user = await getUser_from_token(req);
    if (!user) return errorResponseObject("unauthorized", 401);
    if (!user.open_ai_token || !user.model)
      return errorResponseObject("Open AI apikey or model missing", 400);
    const article = await generateArticleFromPrompt(
      prompt,
      user.id,
      user.open_ai_token,
      user.model
    );
    if (!article)
      return errorResponseObject("Unable to generate Article!", 500);
    else if (Object.values(article).some((value) => value == ""))
      return errorResponseObject("AI returned empty content,try again!", 422);
    return NextResponse.json(article);
  } catch {
    return errorResponseObject("Unable to generate Summery!", 500);
  }
}
