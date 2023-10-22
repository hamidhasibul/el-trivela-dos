import React from "react";

const Header = ({ slug }: { slug: string }) => {
  const renderName = (): string => {
    const nameArr = slug.split("-");

    nameArr[nameArr.length - 1] = `(${nameArr[nameArr.length - 1]})`;

    return nameArr.join(" ");
  };

  return (
    <div className="h-96 overflow-hidden">
      <div className="bg-center bg-gradient-to-r from-[#0f1f47] to-[#5f6984] h-full flex justify-center items-center">
        <h1 className="text-7xl text-white capitalize text-shadow text-center">
          {renderName()}
        </h1>
      </div>
    </div>
  );
};

export default Header;
