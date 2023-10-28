import { PrismaClient } from "@prisma/client";
import validator from "validator";
import bcrypt from "bcrypt";
import * as jose from "jose";

/* interface UserReq {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  city: string;
  password: string;
} */

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
      errorMessage: "Phone Number is invalid!",
    },
    {
      valid: validator.isStrongPassword(password),
      errorMessage: "Password is invalid!",
    },
  ];

  validationSchema.forEach((check) => {
    if (!check.valid) {
      errors.push(check.errorMessage);
    }
  });

  if (errors.length) {
    return new Response(JSON.stringify({ errorMessage: errors[0] }), {
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
        errorMessage: "You already have an account with this email.",
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

  return new Response(JSON.stringify({ message: token }), {
    status: 200,
  });
}
