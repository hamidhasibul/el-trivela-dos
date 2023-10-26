import {
  Location,
  PRICE_TYPE,
  PrismaClient,
  Review,
  Turf_type,
} from "@prisma/client";
import Header from "./components/Header";
import TurfCard from "./components/TurfCard";

export interface TurfCardType {
  id: number;
  name: string;
  slug: string;
  main_image: string;
  turf_type: Turf_type;
  price_type: PRICE_TYPE;
  location: Location;
  reviews: Review[];
}

const prisma = new PrismaClient();

const fetchTurfs = async (): Promise<TurfCardType[]> => {
  const turfs = await prisma.turf.findMany({
    select: {
      id: true,
      name: true,
      slug: true,
      main_image: true,
      turf_type: true,
      price_type: true,
      location: true,
      reviews: true,
    },
  });

  return turfs;
};

export default async function Home() {
  const turfs = await fetchTurfs();

  return (
    <main>
      <Header />
      {/* CARDS */}
      <div className="py-3 px-36 mt-10 flex flex-wrap justify-center">
        {/* CARD */}
        {turfs.map((turf) => (
          <TurfCard key={turf.id} turf={turf} />
        ))}

        {/* CARD */}
      </div>
      {/* CARDS */}
    </main>
  );
}
