import { db } from "@/db";
import { decodedToken, errorResponseObject } from "@/lib/utils";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const token = req.cookies.get("token")?.value;
  if (!token) return errorResponseObject("Unauthorized", 401);
  const tokenPayload = decodedToken(token);
  if (!tokenPayload) return errorResponseObject("Unauthorized", 401);
  const user=await db.user.findUnique({where:{id:tokenPayload.userId}})
    if(!user)return errorResponseObject("Unauthorized", 401);
  return NextResponse.json({
    email: user.email,
    name: user.name,
    userId: user.id,
  });
}
