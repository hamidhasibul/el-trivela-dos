import { PrismaClient } from "@prisma/client";
import Header from "./components/Header";
import TurfCard from "./components/TurfCard";

const prisma = new PrismaClient();

const fetchTurfs = async () => {
  const turfs = await prisma.turf.findMany();

  return turfs;
};

export default async function Home() {
  const turfs = await fetchTurfs();

  console.log(turfs);
  return (
    <main>
      <Header />
      {/* CARDS */}
      <div className="py-3 px-36 mt-10 flex flex-wrap justify-center">
        {/* CARD */}
        <TurfCard />
        {/* CARD */}
      </div>
      {/* CARDS */}
    </main>
  );
}
