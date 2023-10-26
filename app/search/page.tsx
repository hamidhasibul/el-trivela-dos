import { PRICE_TYPE, PrismaClient } from "@prisma/client";
import Header from "./components/Header";
import SideBar from "./components/SideBar";
import TurfCard from "./components/TurfCard";

const prisma = new PrismaClient();

interface SearchParams {
  city?: string;
  turf_type?: string;
  price_type?: PRICE_TYPE;
}

const fetchTurfsByCity = async (searchParams: SearchParams) => {
  const where: any = {};

  const select = {
    id: true,
    name: true,
    main_image: true,
    price_type: true,
    slug: true,
    location: true,
    turf_type: true,
  };

  if (searchParams.city) {
    const location = {
      name: {
        equals: searchParams.city.toLowerCase(),
      },
    };

    where.location = location;
  }

  if (searchParams.turf_type) {
    const turf_type = {
      name: {
        equals: searchParams.turf_type.toLowerCase(),
      },
    };

    where.turf_type = turf_type;
  }

  if (searchParams.price_type) {
    const price_type = {
      equals: searchParams.price_type,
    };

    where.price_type = price_type;
  }

  // if (!city) return await prisma.turf.findMany({ select });

  const turfs = await prisma.turf.findMany({
    where,
    select,
  });

  return turfs;
};

const fetchLocationTurfType = async () => {
  const locations = await prisma.location.findMany();
  const turfTypes = await prisma.turf_type.findMany();

  return { locations, turfTypes };
};

const SearchPage = async ({ searchParams }: { searchParams: SearchParams }) => {
  const turfs = await fetchTurfsByCity(searchParams);
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
