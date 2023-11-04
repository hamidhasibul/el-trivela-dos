import { PrismaClient } from "@prisma/client";
import validator from "validator";
import bcrypt from "bcrypt";
import * as jose from "jose";

const prisma = new PrismaClient();

export async function POST(req: Request) {
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

  const userWithEmail = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (!userWithEmail) {
    return new Response(
      JSON.stringify({ message: "You don't have an account!" }),
      {
        status: 401,
      }
    );
  }

  const isMatch = await bcrypt.compare(password, userWithEmail.password);

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

  const token = await new jose.SignJWT({ email: userWithEmail.email })
    .setProtectedHeader({ alg })
    .setExpirationTime("24h")
    .sign(secret);

  return new Response(JSON.stringify({ token: token }), {
    status: 200,
  });
}
