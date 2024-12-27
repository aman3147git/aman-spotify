import React from "react";
import Card from "./Card";

const CardList = ({ title, data, onSongClick }) => {
  return (
    <div className="p-6 flex flex-col gap-3">
      <h1 className="font-bold text-white text-xl">{title}</h1>
      <div className="flex gap-4 overflow-x-scroll">
        {data.map((song, index) => (
          <Card key={index} song={song} onClick={onSongClick} />
        ))}
      </div>
    </div>
  );
};

export default CardList;
