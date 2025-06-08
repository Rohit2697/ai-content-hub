import { db } from "@/db";
import { errorResponseObject, getUser_from_token } from "@/lib/utils";
import { NextRequest, NextResponse } from "next/server";

//  id             String    @id @default(uuid()) // changed from Int to String with UUID
//   name           String
//   email          String    @unique
//   password       String
//   token          String?
//   tokenExpiresAt DateTime?
//   open_ai_token  String?
//   model          String?
//   posts          Post[]
const updateField = ["name", "email", "open_ai_token", "model"];
export async function POST(req: NextRequest) {
  const data = await req.json();
  const updateObj: { [key: string]: string } = {};
  updateField.forEach((field) => {
    if (data[field]) {
      updateObj[field] = data[field];
    }
  });
  if (!Object.keys(updateObj).length)
    return errorResponseObject("No Field to update", 400);
  try {
    const user = await getUser_from_token(req);
    if (!user) return errorResponseObject("unauthorized", 401);
    await db.user.update({
      where: {
        id: user.id,
      },
      data: updateObj,
    });
    return NextResponse.json(
      { message: `Updated the fields: $${Object.keys(updateObj)}` },
      { status: 200 }
    );
  } catch (err) {
    console.log("unable to update user field", err);
    return errorResponseObject("Something went wrong!", 500);
  }
}
