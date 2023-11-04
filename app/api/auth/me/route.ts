import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";
import { use } from "react";

const prisma = new PrismaClient();

export async function GET(req: Request) {
  const bearerToken = req.headers.get("authorization") as string;
  const token = bearerToken.split(" ")[1];

  const payload = jwt.decode(token) as { email: string };

  if (!payload.email) {
    return new Response(JSON.stringify({ error: `Unauthorized request!` }), {
      status: 401,
    });
  }

  const user = await prisma.user.findUnique({
    where: {
      email: payload.email,
    },
    select: {
      id: true,
      first_name: true,
      last_name: true,
      city: true,
      email: true,
      phone: true,
    },
  });

  if (!user) {
    return new Response(JSON.stringify({ message: "User not found!" }), {
      status: 401,
    });
  }

  return new Response(
    JSON.stringify({
      firstName: user.first_name,
      lastName: user.last_name,
      city: user.city,
      email: user.email,
      phone: user.phone,
    }),
    {
      status: 200,
    }
  );
}
