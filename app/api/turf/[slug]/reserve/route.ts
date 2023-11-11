import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(
  req: Request,
  { params }: { params: { slug: string } }
) {
  const { searchParams } = new URL(req.url);

  const slug = params.slug;
  const day = searchParams.get("day");
  const time = searchParams.get("time");
  const partySize = searchParams.get("partySize");

  const turf = await prisma.turf.findUnique({
    where: { slug },
  });

  if (!turf) {
    return new Response(JSON.stringify({ message: "No data found" }), {
      status: 400,
    });
  }

  if (
    new Date(`${day}T${time}`) < new Date(`${day}T${turf.open_time}`) ||
    new Date(`${day}T${time}`) > new Date(`${day}T${turf.close_time}`)
  ) {
    return new Response(
      JSON.stringify({ message: "Time window out of bound" }),
      {
        status: 400,
      }
    );
  }
  return new Response(JSON.stringify({ slug, day, time, partySize }), {
    status: 200,
  });
}
