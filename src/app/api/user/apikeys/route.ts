import { db } from "@/db";
import { errorResponseObject, getUser_from_token } from "@/lib/utils";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const user = await getUser_from_token(req);
    if (!user) return errorResponseObject("Unauthorized", 401);
    return NextResponse.json({
      open_ai_token: user.open_ai_token,
      model: user.model,
    });
  } catch (err) {
    console.log("unable to find API keys", err);
    return errorResponseObject("Something went wrong!", 500);
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const user = await getUser_from_token(req);
    if (!user) return errorResponseObject("Unauthorized", 401);
    await db.user.update({
      where: {
        id: user.id,
      },
      data: {
        open_ai_token: null,
        model: null,
      },
    });
    return NextResponse.json({ message: "deleted Apikey" });
  } catch (err) {
    console.log("unable to find API keys", err);
    return errorResponseObject("Something went wrong!", 500);
  }
}
