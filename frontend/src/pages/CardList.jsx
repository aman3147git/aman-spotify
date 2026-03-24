import React from "react";
import Card from "./Card";

const CardList = ({ title, data=[], onSongClick }) => {
  if (!Array.isArray(data) || data.length === 0) {
    return (
      <div className="p-6 flex flex-col gap-3">
        <h1 className="font-bold text-white text-xl">{title}</h1>
        <p className="text-gray-400">No songs available.</p>
      </div>
    );
  }
  return (
    <div className="p-6 flex flex-col gap-3">
      <h1 className="font-bold text-white text-xl">{title}</h1>
      <div className="-mx-1 flex gap-3 overflow-x-auto pb-2 pt-1 scroll-smooth sm:gap-4 px-1 [scrollbar-width:thin]">
        {data.map((song, index) => (
          <Card key={index} song={song} onClick={onSongClick} />
        ))}
      </div>
    </div>
  );
};

export default CardList;
