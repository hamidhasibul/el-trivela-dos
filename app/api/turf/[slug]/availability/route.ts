import { times } from "@/data";
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

  if (!day || !time || !partySize) {
    return new Response(JSON.stringify({ message: "Invalid data provided" }), {
      status: 400,
    });
  }

  const searchTimes = times.find((t) => {
    return t.time === time;
  })?.searchTimes;

  if (!searchTimes) {
    return new Response(JSON.stringify({ message: "Invalid data provided" }), {
      status: 400,
    });
  }

  const bookings = await prisma.booking.findMany({
    where: {
      booking_time: {
        gte: new Date(`${day}T${searchTimes[0]}`),
        lte: new Date(`${day}T${searchTimes[searchTimes.length - 1]}`),
      },
    },
    select: {
      party_size: true,
      booking_time: true,
      fields: true,
    },
  });

  const bookingFieldsObj: { [key: string]: { [key: number]: true } } = {};

  bookings.forEach((booking) => {
    bookingFieldsObj[booking.booking_time.toISOString()] =
      booking.fields.reduce((obj, field) => {
        return {
          ...obj,
          [field.field_id]: true,
        };
      }, {});
  });

  return new Response(
    JSON.stringify({ searchTimes, bookings, bookingFieldsObj }),
    {
      status: 200,
    }
  );
}
