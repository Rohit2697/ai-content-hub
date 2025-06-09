import { db } from "@/db";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { errorResponseObject, generateToken } from "@/lib/utils";
import { cookies } from "next/headers";
export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  if (!email || !password) return errorResponseObject("Missing fields", 400);

  const user = await db.user.findUnique({
    where: {
      email: email.trim().toLowerCase(),
    },
  });

  if (!user) {
    return errorResponseObject("Invalid email or password", 401);
  }
  if (!(await bcrypt.compare(password, user.password))) {
    return errorResponseObject("Invalid email or password", 401);
  }
  const token = generateToken(user.id, user.email, user.name);

  await db.user.update({
    where: {
      id: user.id,
    },
    data: {
      token,
      tokenExpiresAt: new Date(Date.now() + 60 * 60 * 1000),
    },
  });
  (await cookies()).set("token", token, {
    httpOnly: true,
    path: "/",
    maxAge: 60 * 60,
  });
  return NextResponse.json({
    message: "logged in successfully!",
    userId: user.id,
    name: user.name,
    email: user.email,
    token,
    status: 200,
  });
}
