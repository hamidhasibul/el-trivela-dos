import Link from "next/link";
import React from "react";

const TurfNavbar = () => {
  return (
    <nav className="flex text-reg border-b pb-2">
      <Link href="/turf/victory" className="mr-7">
        Overview
      </Link>
      <Link href="/turf/victory/ground" className="mr-7">
        Grounds
      </Link>
    </nav>
  );
};

export default TurfNavbar;
