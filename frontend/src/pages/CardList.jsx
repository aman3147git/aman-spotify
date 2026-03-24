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
      <div className="scroll-thin-brown -mx-1 flex gap-4 overflow-x-auto px-1 pb-2 pt-1 sm:gap-4">
        {data.map((song, index) => (
          <Card key={index} song={song} onClick={onSongClick} />
        ))}
      </div>
    </div>
  );
};

export default CardList;
