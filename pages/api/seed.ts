// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { PRICE_TYPE, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
type Data = {
  name: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  //   await prisma.table.deleteMany();
  // await prisma.review.deleteMany();
  await prisma.ground.deleteMany();
  await prisma.turf.deleteMany();
  await prisma.location.deleteMany();
  await prisma.turf_type.deleteMany();
  // await prisma.user.deleteMany();

  await prisma.location.createMany({
    data: [{ name: "halishahar" }, { name: "agrabad" }, { name: "gec" }],
  });

  await prisma.turf_type.createMany({
    data: [{ name: "indoor" }, { name: "outdoor" }, { name: "open-field" }],
  });

  const locations = await prisma.location.findMany();
  const turfTypes = await prisma.turf_type.findMany();

  const outdoorTurfTypeId =
    turfTypes.find((turfType) => turfType.name === "outdoor")?.id || 1;
  const indoorTurfTypeId =
    turfTypes.find((turfType) => turfType.name === "indoor")?.id || 1;

  const halishaharLocationId =
    locations.find((location) => location.name === "halishahar")?.id || 1;
  const agrabadLocationId =
    locations.find((location) => location.name === "agrabad")?.id || 1;
  const gecLocationId =
    locations.find((location) => location.name === "gec")?.id || 1;

  await prisma.turf.createMany({
    data: [
      // TURFS //
      {
        name: "Victory",
        main_image:
          "https://ik.imagekit.io/icnjoi0jr/images%20(9)_rYXVy_EQd4.jpg?updatedAt=1697883993377",
        price_type: PRICE_TYPE.STANDARD,
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Facilisis sed odio morbi quis commodo. Posuere sollicitudin aliquam ultrices sagittis orci a scelerisque purus. Vestibulum sed arcu non odio euismod lacinia at. At varius vel pharetra vel turpis nunc eget lorem. Nunc sed id semper risus in hendrerit gravida rutrum. Cras sed felis eget velit.",
        images: [
          "https://ik.imagekit.io/icnjoi0jr/images%20(9)_rYXVy_EQd4.jpg?updatedAt=1697883993377",
          "https://ik.imagekit.io/icnjoi0jr/images%20(9)_rYXVy_EQd4.jpg?updatedAt=1697883993377",
          "https://ik.imagekit.io/icnjoi0jr/images%20(9)_rYXVy_EQd4.jpg?updatedAt=1697883993377",
          "https://ik.imagekit.io/icnjoi0jr/images%20(9)_rYXVy_EQd4.jpg?updatedAt=1697883993377",
        ],
        open_time: "14:30:00.000Z",
        close_time: "21:30:00.000Z",
        slug: "victory-turfType-halishahar",
        location_id: halishaharLocationId,
        turf_type_id: outdoorTurfTypeId,
      },
      {
        name: "TomorrowLand",
        main_image:
          "https://ik.imagekit.io/icnjoi0jr/images%20(10)_bAi-okVdJ.jpg?updatedAt=1697883992997",
        price_type: PRICE_TYPE.BUDGET,
        description:
          "Eget dolor morbi non arcu risus. Vivamus arcu felis bibendum ut. Lorem dolor sed viverra ipsum nunc aliquet bibendum enim facilisis. Ornare lectus sit amet est. Nunc consequat interdum varius sit amet mattis vulputate enim nulla.",
        images: [
          "https://ik.imagekit.io/icnjoi0jr/images%20(10)_bAi-okVdJ.jpg?updatedAt=1697883992997",
          "https://ik.imagekit.io/icnjoi0jr/images%20(10)_bAi-okVdJ.jpg?updatedAt=1697883992997",
          "https://ik.imagekit.io/icnjoi0jr/images%20(10)_bAi-okVdJ.jpg?updatedAt=1697883992997",
          "https://ik.imagekit.io/icnjoi0jr/images%20(10)_bAi-okVdJ.jpg?updatedAt=1697883992997",
        ],
        open_time: "12:30:00.000Z",
        close_time: "22:00:00.000Z",
        slug: "tomorrowland-turf-halishahar",
        location_id: halishaharLocationId,
        turf_type_id: indoorTurfTypeId,
      },

      {
        name: "SICHO ARENA",
        main_image:
          "https://ik.imagekit.io/icnjoi0jr/images%20(7)_wq6HMzXU6g.jpg?updatedAt=1697883992900",
        price_type: PRICE_TYPE.PREMIUM,
        description:
          "Consequat ac felis donec et odio pellentesque diam volutpat commodo. Suspendisse faucibus interdum posuere lorem ipsum dolor. Tincidunt vitae semper quis lectus nulla at volutpat diam ut. Egestas diam in arcu cursus euismod quis viverra nibh cras.",
        images: [
          "https://ik.imagekit.io/icnjoi0jr/images%20(7)_wq6HMzXU6g.jpg?updatedAt=1697883992900",
          "https://ik.imagekit.io/icnjoi0jr/images%20(7)_wq6HMzXU6g.jpg?updatedAt=1697883992900",
          "https://ik.imagekit.io/icnjoi0jr/images%20(7)_wq6HMzXU6g.jpg?updatedAt=1697883992900",
          "https://ik.imagekit.io/icnjoi0jr/images%20(7)_wq6HMzXU6g.jpg?updatedAt=1697883992900",
        ],
        open_time: "17:30:00.000Z",
        close_time: "22:00:00.000Z",
        slug: "sicho-arena-gec",
        location_id: gecLocationId,
        turf_type_id: outdoorTurfTypeId,
      },

      {
        name: "AKC PLAY",
        main_image:
          "https://ik.imagekit.io/icnjoi0jr/images%20(8)_J-E_fEdZBf.jpg?updatedAt=1697883992994",
        price_type: PRICE_TYPE.STANDARD,
        description:
          "Nibh tortor id aliquet lectus proin nibh nisl condimentum id. Blandit turpis cursus in hac. Sed sed risus pretium quam vulputate dignissim suspendisse in. Adipiscing commodo elit at imperdiet dui. ",
        images: [
          "https://ik.imagekit.io/icnjoi0jr/images%20(8)_J-E_fEdZBf.jpg?updatedAt=1697883992994",
          "https://ik.imagekit.io/icnjoi0jr/images%20(8)_J-E_fEdZBf.jpg?updatedAt=1697883992994",
          "https://ik.imagekit.io/icnjoi0jr/images%20(8)_J-E_fEdZBf.jpg?updatedAt=1697883992994",
          "https://ik.imagekit.io/icnjoi0jr/images%20(8)_J-E_fEdZBf.jpg?updatedAt=1697883992994",
        ],
        open_time: "10:00:00.000Z",
        close_time: "21:00:00.000Z",
        slug: "akc-play-gec",
        location_id: gecLocationId,
        turf_type_id: outdoorTurfTypeId,
      },

      {
        name: "CHATTO TURF",
        main_image:
          "https://ik.imagekit.io/icnjoi0jr/images%20(6)_ceu9tmhBf.jpg?updatedAt=1697883992601",
        price_type: PRICE_TYPE.PREMIUM,
        description:
          " Rutrum tellus pellentesque eu tincidunt tortor aliquam. Non nisi est sit amet facilisis magna etiam tempor. Tincidunt id aliquet risus feugiat in. Augue neque gravida in fermentum et. Aliquam id diam maecenas ultricies.",
        images: [
          "https://ik.imagekit.io/icnjoi0jr/images%20(6)_ceu9tmhBf.jpg?updatedAt=1697883992601",
          "https://ik.imagekit.io/icnjoi0jr/images%20(6)_ceu9tmhBf.jpg?updatedAt=1697883992601",
          "https://ik.imagekit.io/icnjoi0jr/images%20(6)_ceu9tmhBf.jpg?updatedAt=1697883992601",
          "https://ik.imagekit.io/icnjoi0jr/images%20(6)_ceu9tmhBf.jpg?updatedAt=1697883992601",
        ],
        open_time: "16:00:00.000Z",
        close_time: "21:00:00.000Z",
        slug: "chatto-turf-gec",
        location_id: gecLocationId,
        turf_type_id: outdoorTurfTypeId,
      },

      {
        name: "SOCCER SKILLS",
        main_image:
          "https://ik.imagekit.io/icnjoi0jr/images%20(4)_JrvSwEb_K7.jpg?updatedAt=1697883989944",
        price_type: PRICE_TYPE.BUDGET,
        description:
          "Aliquet porttitor lacus luctus accumsan tortor posuere ac ut consequat. Tincidunt eget nullam non nisi est sit amet. Tempor orci eu lobortis elementum nibh tellus molestie nunc.",
        images: [
          "https://ik.imagekit.io/icnjoi0jr/images%20(4)_JrvSwEb_K7.jpg?updatedAt=1697883989944",
          "https://ik.imagekit.io/icnjoi0jr/images%20(4)_JrvSwEb_K7.jpg?updatedAt=1697883989944",
          "https://ik.imagekit.io/icnjoi0jr/images%20(4)_JrvSwEb_K7.jpg?updatedAt=1697883989944",
          "https://ik.imagekit.io/icnjoi0jr/images%20(4)_JrvSwEb_K7.jpg?updatedAt=1697883989944",
        ],
        open_time: "10:00:00.000Z",
        close_time: "21:00:00.000Z",
        slug: "soccer-skills-agrabad",
        location_id: agrabadLocationId,
        turf_type_id: indoorTurfTypeId,
      },

      {
        name: "6IX CT",
        main_image:
          "https://ik.imagekit.io/icnjoi0jr/download%20(1)_Ogyz7Iolh.jpg?updatedAt=1697883989550",
        price_type: PRICE_TYPE.PREMIUM,
        description:
          "Volutpat odio facilisis mauris sit. Aliquam ut porttitor leo a diam. Donec ac odio tempor orci dapibus. Fermentum dui faucibus in ornare. Volutpat commodo sed egestas egestas fringilla phasellus faucibus scelerisque eleifend. ",
        images: [
          "https://ik.imagekit.io/icnjoi0jr/download%20(1)_Ogyz7Iolh.jpg?updatedAt=1697883989550",
          "https://ik.imagekit.io/icnjoi0jr/download%20(1)_Ogyz7Iolh.jpg?updatedAt=1697883989550",
        ],
        open_time: "14:00:00.000Z",
        close_time: "19:00:00.000Z",
        slug: "six-ct-agrabad",
        location_id: agrabadLocationId,
        turf_type_id: indoorTurfTypeId,
      },

      {
        name: "OASIS GROUND",
        main_image:
          "https://ik.imagekit.io/icnjoi0jr/download_vIhasHZtCQ.jpg?updatedAt=1697883990177",
        price_type: PRICE_TYPE.STANDARD,
        description:
          "Auctor augue mauris augue neque gravida in. Diam sollicitudin tempor id eu nisl nunc mi ipsum. Ut eu sem integer vitae justo eget magna. Malesuada nunc vel risus commodo viverra maecenas",
        images: [
          "https://ik.imagekit.io/icnjoi0jr/download_vIhasHZtCQ.jpg?updatedAt=1697883990177",
          "https://ik.imagekit.io/icnjoi0jr/download_vIhasHZtCQ.jpg?updatedAt=1697883990177",
          "https://ik.imagekit.io/icnjoi0jr/download_vIhasHZtCQ.jpg?updatedAt=1697883990177",
          "https://ik.imagekit.io/icnjoi0jr/download_vIhasHZtCQ.jpg?updatedAt=1697883990177",
        ],
        open_time: "12:00:00.000Z",
        close_time: "21:00:00.000Z",
        slug: "oasis-ground-gec",
        location_id: gecLocationId,
        turf_type_id: indoorTurfTypeId,
      },

      {
        name: "KATTALI SPORTS ARENA",
        main_image:
          "https://ik.imagekit.io/icnjoi0jr/download%20(4)_ohz_xFejHt.jpg?updatedAt=1697883989991",
        price_type: PRICE_TYPE.BUDGET,
        description:
          "Potenti nullam ac tortor vitae purusSit amet mauris commodo quis imperdiet. Viverra ipsum nunc aliquet bibendum. Tortor pretium viverra suspendisse.",
        images: [
          "https://ik.imagekit.io/icnjoi0jr/download%20(4)_ohz_xFejHt.jpg?updatedAt=1697883989991",
          "https://ik.imagekit.io/icnjoi0jr/download%20(4)_ohz_xFejHt.jpg?updatedAt=1697883989991",
          "https://ik.imagekit.io/icnjoi0jr/download%20(4)_ohz_xFejHt.jpg?updatedAt=1697883989991",
          "https://ik.imagekit.io/icnjoi0jr/download%20(4)_ohz_xFejHt.jpg?updatedAt=1697883989991",
        ],
        open_time: "10:00:00.000Z",
        close_time: "21:00:00.000Z",
        slug: "kattali-sports-arena-halishahar",
        location_id: halishaharLocationId,
        turf_type_id: outdoorTurfTypeId,
      },
    ],
  });

  const turfs = await prisma.turf.findMany();

  const victoryId = turfs.find((turf) => turf.name === "Victory")?.id || 1;
  const tomorrowLandId =
    turfs.find((turf) => turf.name === "TomorrowLand")?.id || 1;
  const sichoArenaId =
    turfs.find((turf) => turf.name === "SICHO ARENA")?.id || 1;
  const akcPlayId = turfs.find((turf) => turf.name === "AKC PLAY")?.id || 1;
  const chattoTurfId =
    turfs.find((turf) => turf.name === "CHATTO TURF")?.id || 1;
  const soccerSkillsId =
    turfs.find((turf) => turf.name === "SOCCER SKILLS")?.id || 1;
  const sixCTId = turfs.find((turf) => turf.name === "6IX CT")?.id || 1;
  const oasisGroundId =
    turfs.find((turf) => turf.name === "OASIS GROUND")?.id || 1;
  const kattaliSportsArenaId =
    turfs.find((turf) => turf.name === "KATTALI SPORTS ARENA")?.id || 1;

  await prisma.ground.createMany({
    data: [
      {
        name: "6v6 Futsal Ground",
        description:
          "Eget mauris pharetra et ultrices neque ornare aenean. Arcu non odio euismod lacinia at quis risus sed.",
        price: "BDT1200.00",
        turf_id: victoryId,
      },
      {
        name: "9v9 Futsal Ground",
        description:
          "Imperdiet proin fermentum leo vel orci porta non pulvinar. Eget mi proin sed libero ",
        price: "BDT1800.00",
        turf_id: victoryId,
      },
      {
        name: "2v2 Badminton Court",
        description:
          "Laoreet sit amet cursus sit amet dictum. Nibh ipsum consequat nisl vel pretium lectus.",
        price: "BDT800.00",
        turf_id: victoryId,
      },
      {
        name: "6v6 Futsal Ground",
        description:
          "Malesuada fames ac turpis egestas sed tempus urna et pharetra. Pretium vulputate",
        price: "BDT1000.00",
        turf_id: tomorrowLandId,
      },
      {
        name: "Cricket Ground",
        description:
          "Chicken curry usually served in weddings back home (Must Try)",
        price: "BDT800.00",
        turf_id: tomorrowLandId,
      },
      {
        name: "7v7 Futsal Ground",
        description:
          "Et malesuada fames ac turpis egestas integer. Porttitor leo a diam sollicitudin tempor id eu nisl nunc. Pellentes",
        price: "BDT2200.00",
        turf_id: sichoArenaId,
      },
      {
        name: "Cricket Ground",
        description:
          "Consequat ac felis donec et odio pellentesque diam volutpat commodo. Suspendisse faucibus interdum posuere",
        price: "BDT1800.00",
        turf_id: sichoArenaId,
      },
      {
        name: "5v5 Futsal Ground",
        description:
          "id aliquet lectus proin nibh nisl condimentum id. Blandit turpis cursus in hac. Sed",
        price: "BDT1200.00",
        turf_id: akcPlayId,
      },
      {
        name: "5v5 Futsal Ground",
        description:
          "Rutrum tellus pellentesque eu tincidunt tortor aliquam. Non nisi est sit amet facilisis magna etiam tempor.",
        price: "BDT2200.00",
        turf_id: chattoTurfId,
      },
      {
        name: "7v7 Futsal Ground",
        description:
          "Augue neque gravida in fermentum et. Aliquam id diam maecenas ultricies",
        price: "BDT2500.00",
        turf_id: chattoTurfId,
      },
      {
        name: "6v6 Futsal Ground",
        description:
          "Tincidunt eget nullam non nisi est sit amet. Tempor orci eu lobortis elementum nibh tellus molestie nunc.",
        price: "BDT1200.00",
        turf_id: soccerSkillsId,
      },
      {
        name: "5v5 Futsal Ground",
        description:
          "Volutpat odio facilisis mauris sit. Aliquam ut porttitor leo a diam. Donec ac odio tempor orci dapibus",
        price: "BDT1200.00",
        turf_id: sixCTId,
      },
      {
        name: "6v6 Futsal Ground",
        description:
          "Auctor augue mauris augue neque gravida in. Diam sollicitudin tempor id eu nisl nunc mi ipsum. Ut eu sem i",
        price: "BDT1500.00",
        turf_id: oasisGroundId,
      },
      {
        name: "5v5 Futsal Ground",
        description:
          "Sit amet mauris commodo quis imperdiet. Viverra ipsum nunc aliquet bibendum. Tortor pretium viverra suspendisse",
        price: "BDT1000.00",
        turf_id: kattaliSportsArenaId,
      },
      {
        name: "7v7 Futsal Ground",
        description:
          "Viverra ipsum nunc aliquet bibendum. Tortor pretium viverra suspendisse",
        price: "BDT1500.00",
        turf_id: kattaliSportsArenaId,
      },
      {
        name: "Cricket Ground",
        description:
          "llam ac tortor vitae purusSit amet mauris commodo quis imperdiet. Vive",
        price: "BDT1200.00",
        turf_id: kattaliSportsArenaId,
      },
    ],
  });

  //   const userLaith = await prisma.user.create({
  //     data: {
  //       first_name: "Laith",
  //       last_name: "Harb",
  //       email: "laith@hotmail.com",
  //       city: "halishahar",
  //       password: "$2b$10$I8xkU2nQ8EAHuVOdbMy9YO/.rSU3584Y.H4LrpIujGNDtmny9FnLu",
  //       phone: "1112223333",
  //     },
  //   });

  //   const userJosh = await prisma.user.create({
  //     data: {
  //       first_name: "Josh",
  //       last_name: "Allen",
  //       email: "josh@hotmail.com",
  //       city: "toronto",
  //       password: "$2b$10$I8xkU2nQ8EAHuVOdbMy9YO/.rSU3584Y.H4LrpIujGNDtmny9FnLu",
  //       phone: "1112223333",
  //     },
  //   });

  //   const userLebron = await prisma.user.create({
  //     data: {
  //       first_name: "LeBron",
  //       last_name: "James",
  //       email: "lebron@hotmail.com",
  //       city: "niagara",
  //       password: "$2b$10$I8xkU2nQ8EAHuVOdbMy9YO/.rSU3584Y.H4LrpIujGNDtmny9FnLu",
  //       phone: "1112223333",
  //     },
  //   });

  //   const userCassidy = await prisma.user.create({
  //     data: {
  //       first_name: "Cassidy",
  //       last_name: "Marksom",
  //       email: "cassidy@hotmail.com",
  //       city: "toronto",
  //       password: "$2b$10$I8xkU2nQ8EAHuVOdbMy9YO/.rSU3584Y.H4LrpIujGNDtmny9FnLu",
  //       phone: "1112223333",
  //     },
  //   });

  //   await prisma.review.createMany({
  //     data: [
  //       {
  //         first_name: "Laith",
  //         last_name: "Harb",
  //         text: "This place is amazing, it has some of the best dishes in the world. It is so so so good!!!",
  //         rating: 5,
  //         turf_id: victoryId,
  //         user_id: userLaith.id,
  //       },
  //       {
  //         first_name: "Laith",
  //         last_name: "Harb",
  //         text: "This food is so good! It is the fanciest thing I have ever seen in my short life",
  //         rating: 5,
  //         turf_id: bluRistoranteId,
  //         user_id: userLaith.id,
  //       },
  //       {
  //         first_name: "Laith",
  //         last_name: "Harb",
  //         text: "Excellent food and service. Busy night, but everything was great! Highly recommend.",
  //         rating: 5,
  //         turf_id: elCatrinId,
  //         user_id: userLaith.id,
  //       },
  //       {
  //         first_name: "Laith",
  //         last_name: "Harb",
  //         text: "Very nice place for a date night, the service was fast and friendly. The food was amazing.",
  //         rating: 4,
  //         turf_id: stelvioId,
  //         user_id: userLaith.id,
  //       },
  //       {
  //         first_name: "Laith",
  //         last_name: "Harb",
  //         text: "Extremely disappointing in our experience.",
  //         rating: 2,
  //         turf_id: laBartolaId,
  //         user_id: userLaith.id,
  //       },
  //       {
  //         first_name: "Laith",
  //         last_name: "Harb",
  //         text: "This place is amazing, it has some of the best dishes in the world. It is so so so good!!!",
  //         rating: 5,
  //         turf_id: elCatrinId,
  //         user_id: userLaith.id,
  //       },
  //       {
  //         first_name: "Laith",
  //         last_name: "Harb",
  //         text: "As always, food was excellent. Waitress was friendly and prompt. We had just one problem in that our dessert order went rogue in the system and we waited ages for it to arrive.",
  //         rating: 5,
  //         turf_id: kamasutraIndianId,
  //         user_id: userLaith.id,
  //       },
  //       {
  //         first_name: "Laith",
  //         last_name: "Harb",
  //         text: "turf was loud and crowded. Food is not worth the price.",
  //         rating: 3,
  //         turf_id: eldoradoTacoId,
  //         user_id: userLaith.id,
  //       },
  //       {
  //         first_name: "Josh",
  //         last_name: "Allen",
  //         text: "A Christmas lunch with clients served by a friendly server with a good wine selection everyone enjoyed the appetizers and meals",
  //         rating: 4,
  //         turf_id: victoryId,
  //         user_id: userJosh.id,
  //       },
  //       {
  //         first_name: "Josh",
  //         last_name: "Allen",
  //         text: "The food was very tasty, the price is a little high so a place to go only for special occasions",
  //         rating: 5,
  //         turf_id: sofiaId,
  //         user_id: userJosh.id,
  //       },
  //       {
  //         first_name: "Josh",
  //         last_name: "Allen",
  //         text: "Had a great time at Chops. Our server Dane was super friendly. Dinner was delicious as always.",
  //         rating: 3,
  //         turf_id: soccerSkillsId,
  //         user_id: userJosh.id,
  //       },
  //       {
  //         first_name: "Josh",
  //         last_name: "Allen",
  //         text: "The service was poor as we had to wait a long time for our food. There were some issues but were dealt with in a proper manner.",
  //         rating: 3,
  //         turf_id: chattoTurfId,
  //         user_id: userJosh.id,
  //       },
  //       {
  //         first_name: "Josh",
  //         last_name: "Allen",
  //         text: "Wonderful food and service.",
  //         rating: 5,
  //         turf_id: sichoArenaId,
  //         user_id: userJosh.id,
  //       },
  //       {
  //         first_name: "Josh",
  //         last_name: "Allen",
  //         text: "Great food, great staff. You can’t ask for much more from a turf.",
  //         rating: 5,
  //         turf_id: bluRistoranteId,
  //         user_id: userJosh.id,
  //       },
  //       {
  //         first_name: "LeBron",
  //         last_name: "James",
  //         text: "Wonderful service! Delicious food! Comfortable seating and luxurious atmosphere.",
  //         rating: 5,
  //         turf_id: tomorrowLandId,
  //         user_id: userLebron.id,
  //       },
  //       {
  //         first_name: "LeBron",
  //         last_name: "James",
  //         text: "Prime rib and filet were made spot on. Vegetable sides were made well as was the shrimp and scallops.",
  //         rating: 4,
  //         turf_id: akcPlayId,
  //         user_id: userLebron.id,
  //       },
  //       {
  //         first_name: "LeBron",
  //         last_name: "James",
  //         text: "This visit was with a friend who had never been here before. She loved it as much as I do. She said it will be our new go to place!",
  //         rating: 4,
  //         turf_id: soccerSkillsId,
  //         user_id: userLebron.id,
  //       },
  //       {
  //         first_name: "LeBron",
  //         last_name: "James",
  //         text: "Had a full 3 course meal in the mid afternoon and every aspect of it was great. Server was named Brittany I believe and she was simply excellent.",
  //         rating: 5,
  //         turf_id: pukkaId,
  //         user_id: userLebron.id,
  //       },
  //       {
  //         first_name: "LeBron",
  //         last_name: "James",
  //         text: "Very nice evening spent with special family.",
  //         rating: 5,
  //         turf_id: mariachisId,
  //         user_id: userLebron.id,
  //       },
  //       {
  //         first_name: "LeBron",
  //         last_name: "James",
  //         text: "First time, and not the last. Very welcoming. The food was deliscious and service very good. Highly recommend.",
  //         rating: 4,
  //         turf_id: eldoradoTacoId,
  //         user_id: userLebron.id,
  //       },
  //       {
  //         first_name: "Cassidy",
  //         last_name: "Mancher",
  //         text: "Enjoyed our drinks, dinner and dessert. Great service and ambience.",
  //         rating: 5,
  //         turf_id: mariachisId,
  //         user_id: userCassidy.id,
  //       },
  //       {
  //         first_name: "Cassidy",
  //         last_name: "Mancher",
  //         text: "The food was absolutely on point, we had such a great experience and our server was top notch. ",
  //         rating: 4,
  //         turf_id: stelvioId,
  //         user_id: userCassidy.id,
  //       },
  //       {
  //         first_name: "Cassidy",
  //         last_name: "Mancher",
  //         text: "The steaks were 'Melt In Your Mouth'!!! Nigel, our waiter was amazing!! Great experience overall!",
  //         rating: 5,
  //         turf_id: sichoArenaId,
  //         user_id: userCassidy.id,
  //       },
  //       {
  //         first_name: "Cassidy",
  //         last_name: "Mancher",
  //         text: "It was really great! Just temperature wise it was really chilly. A little mixup at the end with desserts also but overall we really enjoyed the evening",
  //         rating: 4,
  //         turf_id: bluRistoranteId,
  //         user_id: userCassidy.id,
  //       },
  //       {
  //         first_name: "Cassidy",
  //         last_name: "Mancher",
  //         text: "Food was served cold. Major No No. Fantastic Dessert. Service was good. Heavy Rock music should be toned down. Price vs Quality… not great.",
  //         rating: 3,
  //         turf_id: laBartolaId,
  //         user_id: userCassidy.id,
  //       },
  //       {
  //         first_name: "Cassidy",
  //         last_name: "Mancher",
  //         text: "Fantastic food and excellent selection. Everything was fresh - and the scones were still warm!",
  //         rating: 4,
  //         turf_id: eldoradoTacoId,
  //         user_id: userCassidy.id,
  //       },
  //       {
  //         first_name: "Cassidy",
  //         last_name: "Mancher",
  //         text: "Fantastic food and excellent selection. Everything was fresh - and the scones were still warm!",
  //         rating: 4,
  //         turf_id: sixCTId,
  //         user_id: userCassidy.id,
  //       },
  //     ],
  //   });

  //   await prisma.table.createMany({
  //     data: [
  //       {
  //         turf_id: victoryId,
  //         seats: 4,
  //       },
  //       {
  //         turf_id: victoryId,
  //         seats: 4,
  //       },
  //       {
  //         turf_id: victoryId,
  //         seats: 2,
  //       },
  //     ],
  //   });

  res.status(200).json({ name: "hello" });
}
