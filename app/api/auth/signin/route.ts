import { PrismaClient } from "@prisma/client";
import validator from "validator";
import bcrypt from "bcrypt";
import * as jose from "jose";

import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

const prisma = new PrismaClient();

export async function POST(req: NextRequest, res: NextResponse) {
  const { email, password } = await req.json();

  const errors: string[] = [];

  const validationSchema = [
    {
      valid: validator.isEmail(email),
      errorMessage: "Email is Invalid!",
    },
    {
      valid: validator.isLength(password, {
        min: 6,
      }),
      errorMessage: "Password is Invalid!",
    },
  ];

  validationSchema.forEach((check) => {
    if (!check.valid) {
      errors.push(check.errorMessage);
    }
  });

  if (errors.length) {
    return new Response(JSON.stringify({ message: errors[0] }), {
      status: 400,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (!user) {
    return new Response(
      JSON.stringify({ message: "You don't have an account!" }),
      {
        status: 401,
      }
    );
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    return new Response(
      JSON.stringify({ message: "Email or Password is invalid!" }),
      {
        status: 401,
      }
    );
  }

  const secret = new TextEncoder().encode(process.env.JWT_SECRET);
  const alg = "HS256";

  const token = await new jose.SignJWT({ email: user.email })
    .setProtectedHeader({ alg })
    .setExpirationTime("24h")
    .sign(secret);

  cookies().set("jwt", token, { maxAge: 60 * 60 });

  return new Response(
    JSON.stringify({
      firstName: user.first_name,
      lastName: user.last_name,
      email: user.email,
      city: user.city,
      phone: user.phone,
    }),
    {
      status: 200,
    }
  );
}
