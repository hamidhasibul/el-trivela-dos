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

  /* bookings.forEach((booking) => {
    bookingFieldsObj[booking.booking_time.toISOString()] =
      booking.fields.reduce((obj, field) => {
        return {
          ...obj,
          [field.field_id]: true,
        };
      }, {});
  }); */

  const turf = await prisma.turf.findUnique({
    where: { slug },
    select: { fields: true, open_time: true, close_time: true },
  });

  if (!turf) {
    return new Response(JSON.stringify({ message: "Invalid data provided" }), {
      status: 400,
    });
  }

  const fields = turf.fields;

  const searchTimesWithFields = searchTimes.map((searchTime) => {
    return {
      date: new Date(`${day}T${searchTime}`),
      time: searchTime,
      fields,
    };
  });

  searchTimesWithFields.forEach((t) => {
    t.fields = t.fields.filter((field) => {
      if (bookingFieldsObj[t.date.toISOString()]) {
        if (bookingFieldsObj[t.date.toISOString()][field.id]) return false;
      }
      return true;
    });
  });

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
