import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import readtime from "reading-time";
import jwt from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";

import { db } from "@/db";
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const errorResponseObject = (
  message: string,
  status: number
): NextResponse<{
  success: boolean;
  message: string;
}> => {
  return NextResponse.json({ success: false, message }, { status });
};

export const readTime = (content: string): string => {
  const stats = readtime(content);
  return stats.text;
};

export function timestampToDateTimeString(timestamp: number): string {
  const date = new Date(timestamp);
  return date.toISOString().replace(/T/, " ").slice(0, -5); // "2022-03-14T16:39:12.000Z" -> "2022-03-14 16:39:12"
}

export const generateToken = (userId: string, email: string, name: string) => {
  const token = jwt.sign({ userId, email, name }, "ai-knowledge-content", {
    expiresIn: "1h",
  });
  return token;
};
// export const fetchTokenfromCookie=(cokkie:string)

interface TokenPayload {
  email: string;
  userId: string;
  name: string;
}

export const decodedToken = (token: string): TokenPayload | undefined => {
  try {
    
    const decoded = jwt.verify(token, "ai-knowledge-content");
    
    // Ensure it's an object and matches the expected structure
    if (
      typeof decoded === "object" &&
      "email" in decoded &&
      "userId" in decoded &&
      "name" in decoded
    ) {
      return decoded as TokenPayload;
    }

    return undefined;
  } catch (error) {
    console.error("Token verification failed:", error);
    return undefined;
  }
};
export const verifyToken = (token: string) => {
  const decode = decodedToken(token);
  if (!decode) return false;
  return true;
};

export function getInitials(name: string): string {
  const words = name.trim().split(/\s+/);

  if (words.length >= 2) {
    return (words[0][0] + words[1][0]).toUpperCase();
  }

  const single = words[0];
  if (single.length > 1) {
    return (single[0] + single[single.length - 1]).toUpperCase();
  }

  return single.toUpperCase();
}

export const getUser_from_token = async (req: NextRequest) => {
  const token = req.cookies.get("token")?.value;
  if (!token) return null;
  const tokenPayLoad = decodedToken(token);
  if (!tokenPayLoad) return null;
  try {
    const { userId } = tokenPayLoad;
    const user = await db.user.findUnique({
      where: {
        id: userId,
      },
    });
    if (!user) return null;
    return user;
  } catch (err) {
    console.log("Unable to get user from token", err);
    return null;
  }
};
