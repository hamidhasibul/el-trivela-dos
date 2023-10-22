import { PrismaClient } from "@prisma/client";
import TurfNavbar from "../components/TurfNavbar";
import GroundCard from "./components/GroundCard";

const prisma = new PrismaClient();

const fetchGrounds = async (slug: string) => {
  const turfs = await prisma.turf.findUnique({
    where: { slug },
    select: {
      grounds: true,
    },
  });

  if (!turfs) throw new Error();

  return turfs.grounds;
};

const TurfGroundPage = async ({ params }: { params: { slug: string } }) => {
  const grounds = await fetchGrounds(params.slug);

  return (
    <>
      <div className="bg-white w-[100%] rounded p-3 shadow">
        {/* RESAURANT NAVBAR */}
        <TurfNavbar slug={params.slug} />
        {/* RESAURANT NAVBAR */}
        {/* Grounds */}
        <main className="bg-white mt-5">
          <div>
            <div className="mt-4 pb-1 mb-1">
              <h1 className="font-bold text-4xl">Grounds</h1>
            </div>
            <div className="flex flex-wrap justify-between">
              {/* GROUND CARD */}
              {grounds.length ? (
                <>
                  {grounds?.map((ground) => (
                    <GroundCard ground={ground} key={ground.id} />
                  ))}
                </>
              ) : (
                <>
                  <p>No Grounds data provided</p>
                </>
              )}

              {/* GROUND CARD */}
            </div>
          </div>
        </main>
        {/* Grounds */}
      </div>

      {/* DESCRIPTION PORTION */}
    </>
  );
};

export default TurfGroundPage;
