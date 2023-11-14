import React from "react";
import Header from "./components/Header";
import ReservationForm from "./components/ReservationForm";
import { PrismaClient } from "@prisma/client";
import { notFound } from "next/navigation";

const prisma = new PrismaClient();

const fetchTurfBySlug = async (slug: string) => {
  const turf = await prisma.turf.findUnique({
    where: {
      slug,
    },
  });

  if (!turf) {
    notFound();
  }

  return turf;
};

const ReservationPage = async ({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams: { date: string; partySize: string };
}) => {
  const turf = await fetchTurfBySlug(params.slug);

  return (
    <>
      {/* NAVBAR END */}
      <div className="border-t h-screen">
        <div className="py-9 w-3/5 m-auto">
          {/* HEADER */}
          <Header
            image={turf?.main_image}
            name={turf?.name}
            date={searchParams?.date}
            partySize={searchParams?.partySize}
          />
          {/* HEADER */}

          <ReservationForm
            date={searchParams?.date}
            partySize={searchParams?.partySize}
            slug={turf.slug}
          />
          {/* FORM */}
        </div>
      </div>
    </>
  );
};

export default ReservationPage;
