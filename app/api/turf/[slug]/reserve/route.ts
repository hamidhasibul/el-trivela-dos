import { findAvailableFields } from "@/services/turf/findAvailableFields";
import { Field, PrismaClient } from "@prisma/client";
import validator from "validator";

const prisma = new PrismaClient();

export async function POST(
  req: Request,
  { params }: { params: { slug: string } }
) {
  const { searchParams } = new URL(req.url);

  const {
    bookerEmail,
    bookerPhone,
    bookerFirstName,
    bookerLastName,
    bookerRequest,
  } = await req.json();

  const errors: string[] = [];

  const validationSchema = [
    {
      valid: validator.isEmail(bookerEmail),
      errorMessage: "Email is not valid!",
    },
    {
      valid: validator.isMobilePhone(bookerPhone),
      errorMessage: "Phone Number is invalid!",
    },
    {
      valid: validator.isLength(bookerFirstName, {
        min: 1,
        max: 20,
      }),
      errorMessage: "First Name is invalid!",
    },
    {
      valid: validator.isLength(bookerLastName, {
        min: 1,
        max: 20,
      }),
      errorMessage: "Last Name is invalid!",
    },
    {
      valid: validator.isLength(bookerRequest, {
        min: 1,
        max: 20,
      }),
      errorMessage: "Request is invalid!",
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

  const slug = params.slug;
  const day = searchParams.get("day") as string;
  const time = searchParams.get("time") as string;
  const partySize = searchParams.get("partySize") as string;

  const turf = await prisma.turf.findUnique({
    where: { slug },

    select: { fields: true, open_time: true, close_time: true, id: true },
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

  const searchTimeWithField = searchTimesWithFields.find((t) => {
    return t.date.toISOString() === new Date(`${day}T${time}`).toISOString();
  });

  /*   const fieldsCount: { 10: number[]; 12: number[]; 14: number[] } = {
    10: [],
    12: [],
    14: [],
  };

  searchTimeWithField?.fields.forEach((field) => {
    if (field.seats === 10) {
      fieldsCount[10].push(field.id);
    } else if (field.seats === 12) {
      fieldsCount[12].push(field.id);
    } else {
      fieldsCount[14].push(field.id);
    }
  }); */

  const fieldsCount: Record<number, number[]> = {};

  searchTimeWithField?.fields.forEach((field) => {
    const seats = field.seats;

    if (!fieldsCount[seats]) {
      fieldsCount[seats] = [];
    }

    fieldsCount[seats].push(field.id);
  });

  const fieldToBook: number[] = [];
  let seatsRemaining = +partySize;

  while (seatsRemaining > 0) {
    if (fieldsCount[+partySize].length) {
      fieldToBook.push(fieldsCount[+partySize][0]);
      fieldsCount[+partySize].shift();
      seatsRemaining = seatsRemaining - +partySize;
    } else {
      break;
    }
  }

  const booking = await prisma.booking.create({
    data: {
      party_size: parseInt(partySize),
      booking_time: new Date(`${day}T${time}`),
      booker_first_name: bookerFirstName,
      booker_last_name: bookerLastName,
      booker_email: bookerEmail,
      booker_phone: bookerPhone,
      booker_request: bookerRequest,
      turf_id: turf.id,
    },
  });

  const bookingsOnFieldsData = fieldToBook.map((field_id) => {
    return {
      field_id,
      booking_id: booking.id,
    };
  });

  await prisma.bookingsOnFields.createMany({
    data: bookingsOnFieldsData,
  });

  return new Response(JSON.stringify(booking), {
    status: 200,
  });
}
