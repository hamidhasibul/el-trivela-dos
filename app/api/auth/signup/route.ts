import { PrismaClient } from "@prisma/client";
import validator from "validator";
import bcrypt from "bcrypt";
import * as jose from "jose";
import { cookies } from "next/headers";

const prisma = new PrismaClient();

export async function POST(request: Request) {
  const { firstName, lastName, email, phone, city, password } =
    await request.json();

  const errors: string[] = [];

  const validationSchema = [
    {
      valid: validator.isLength(firstName, {
        min: 1,
        max: 20,
      }),
      errorMessage: "First Name is invalid!",
    },
    {
      valid: validator.isLength(lastName, {
        min: 1,
        max: 20,
      }),
      errorMessage: "Last Name is invalid!",
    },
    {
      valid: validator.isEmail(email),
      errorMessage: "Email is invalid!",
    },
    {
      valid: validator.isMobilePhone(phone),
      errorMessage: "Phone Number is invalid!",
    },
    {
      valid: validator.isLength(city, { min: 1 }),
      errorMessage: "City is invalid!",
    },
    {
      valid: validator.isLength(password, { min: 5 }),
      errorMessage: "Password is invalid!",
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

  if (userWithEmail) {
    return new Response(
      JSON.stringify({
        message: "You already have an account with this email.",
      }),
      {
        status: 400,
      }
    );
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: {
      first_name: firstName,
      last_name: lastName,
      email,
      password: hashedPassword,
      phone,
      city,
    },
  });

  const secret = new TextEncoder().encode(process.env.JWT_SECRET);

  const alg = "HS256";

  const token = await new jose.SignJWT({
    email: user.email,
  })
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
