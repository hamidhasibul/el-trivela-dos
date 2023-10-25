import { PRICE_TYPE, PrismaClient } from "@prisma/client";
import Header from "./components/Header";
import SideBar from "./components/SideBar";
import TurfCard from "./components/TurfCard";

const prisma = new PrismaClient();

const fetchTurfsByCity = async (city: string | undefined) => {
  const select = {
    id: true,
    name: true,
    main_image: true,
    price_type: true,
    slug: true,
    location: true,
    turf_type: true,
  };

  if (!city) return await prisma.turf.findMany({ select });

  const turfs = await prisma.turf.findMany({
    where: {
      location: {
        name: {
          equals: city.toLowerCase(),
        },
      },
    },
    select,
  });

  return turfs;
};

const fetchLocationTurfType = async () => {
  const locations = await prisma.location.findMany();
  const turfTypes = await prisma.turf_type.findMany();

  return { locations, turfTypes };
};

const SearchPage = async ({
  searchParams,
}: {
  searchParams: { city?: string; turf_type?: string; price_type?: PRICE_TYPE };
}) => {
  const turfs = await fetchTurfsByCity(searchParams.city);
  const { locations, turfTypes } = await fetchLocationTurfType();

  return (
    <>
      <Header />
      <div className="flex py-4 m-auto w-3/4 justify-between items-start">
        {/* SEARCH SIDE BAR */}
        <div className="w-1/5">
          <SideBar
            locations={locations}
            turfTypes={turfTypes}
            searchParams={searchParams}
          />
        </div>

        {/* SEARCH SIDE BAR */}
        <div className="w-5/6">
          {turfs.length > 0 ? (
            <>
              {turfs.map((turf) => (
                <TurfCard key={turf.id} turf={turf} />
              ))}
            </>
          ) : (
            <>
              <p>No turfs found!!</p>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default SearchPage;
