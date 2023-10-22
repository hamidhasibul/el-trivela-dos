import TurfNavbar from "./components/TurfNavbar";
import Title from "./components/Title";
import Rating from "./components/Rating";
import Description from "./components/Description";
import Images from "./components/Images";
import Reviews from "./components/Reviews";
import ReservationCard from "./components/ReservationCard";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

interface Turf {
  id: number;
  name: string;
  description: string;
  images: string[];
  slug: string;
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
    },
  });

  if (!turf) throw new Error();

  return turf;
};

const TurfDetailsPage = async ({ params }: { params: { slug: string } }) => {
  const turf = await fetchTurfBySlug(params.slug);

  return (
    <>
      <div className="bg-white w-[70%] rounded p-3 shadow">
        <TurfNavbar slug={turf.slug} />
        <Title name={turf.name} />
        <Rating />
        <Description description={turf.description} />
        <Images images={turf.images} />
        <Reviews />
      </div>
      {/* DESCRIPTION PORTION */}

      {/* RESERVATION CARD PORTION */}
      <ReservationCard />
    </>
  );
};

export default TurfDetailsPage;
