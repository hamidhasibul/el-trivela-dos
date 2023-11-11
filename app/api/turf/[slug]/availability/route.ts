import { times } from "@/data";
import { findAvailableFields } from "@/services/turf/findAvailableFields";
import { Field, PrismaClient } from "@prisma/client";

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

  if (!day || !time || !partySize) {
    return new Response(JSON.stringify({ message: "Invalid data provided" }), {
      status: 400,
    });
  }

  const turf = await prisma.turf.findUnique({
    where: { slug },
    select: { fields: true, open_time: true, close_time: true },
  });

  if (!turf) {
    return new Response(JSON.stringify({ message: "Invalid data provided" }), {
      status: 400,
    });
  }

  const searchTimesWithFields = (await findAvailableFields({
    time,
    day,
    turf,
  })) as Array<{ date: Date; time: string; fields: Field[] }>;

  if (!searchTimesWithFields) {
    return new Response(JSON.stringify({ message: "Invalid data provided" }), {
      status: 400,
    });
  }

  const availabilities = searchTimesWithFields
    .map((t) => {
      const available = t.fields.filter((field) => {
        return field.seats === parseInt(partySize);
      });

      return {
        time: t.time,
        available: available.length > 0,
      };
    })
    .filter((availability) => {
      const timeAfterOpeningHour =
        new Date(`${day}T${availability.time}`) >=
        new Date(`${day}T${turf.open_time}`);

      const timeBeforeClosingHour =
        new Date(`${day}T${availability.time}`) <=
        new Date(`${day}T${turf.close_time}`);

      return timeAfterOpeningHour && timeBeforeClosingHour;
    });

  return new Response(JSON.stringify(availabilities), {
    status: 200,
  });
}
