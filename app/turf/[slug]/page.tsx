import TurfNavbar from "./components/TurfNavbar";
import Title from "./components/Title";
import Rating from "./components/Rating";
import Description from "./components/Description";
import Images from "./components/Images";
import Reviews from "./components/Reviews";
import ReservationCard from "./components/ReservationCard";
import { Ground, PrismaClient, Review } from "@prisma/client";
import { notFound } from "next/navigation";

const prisma = new PrismaClient();

interface Turf {
  id: number;
  name: string;
  description: string;
  images: string[];
  slug: string;
  reviews: Review[];
  grounds: Ground[];
  open_time: string;
  close_time: string;
}

const fetchTurfBySlug = async (slug: string): Promise<Turf> => {
  const turf = await prisma.turf.findUnique({
    where: {
      slug,
    },
    select: {
      id: true,
      name: true,
      description: true,
      images: true,
      slug: true,
      reviews: true,
      grounds: true,
      open_time: true,
      close_time: true,
    },
  });

  if (!turf) {
    notFound();
  }

  return turf;
};

const TurfDetailsPage = async ({ params }: { params: { slug: string } }) => {
  const turf = await fetchTurfBySlug(params.slug);

  return (
    <>
      <div className="bg-white w-[70%] rounded p-3 shadow">
        <TurfNavbar slug={turf.slug} />
        <Title name={turf.name} />
        <Rating reviews={turf.reviews} />
        <Description description={turf.description} />
        <Images images={turf.images} />
        <Reviews reviews={turf.reviews} />
      </div>
      {/* DESCRIPTION PORTION */}

      {/* RESERVATION CARD PORTION */}
      <ReservationCard
        grounds={turf.grounds}
        openTime={turf.open_time}
        closeTime={turf.close_time}
        slug={turf.slug}
      />
    </>
  );
};

export default TurfDetailsPage;
