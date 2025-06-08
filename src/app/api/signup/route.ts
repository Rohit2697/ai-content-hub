import { db } from "@/db";
import { errorResponseObject, generateToken } from "@/lib/utils";
import bcrypt from "bcryptjs";

import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  if (!name || !email || !password) {
    return errorResponseObject("Missing fields", 400);
  }

  const existingUser = await db.user.findUnique({
    where: {
      email,
    },
  });
  if (existingUser) {
    return errorResponseObject("User already exists", 400);
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await db.user.create({
    data: {
      email: email.trim().toLowerCase(),
      name,
      password: hashedPassword,
    },
  });
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
  return NextResponse.json(
    {
      message: "User created",
      userId: user.id,
      token
    },
    { status: 201 }
  );
}
