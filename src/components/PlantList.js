import React from "react";
import PlantCard from "./PlantCard";

function PlantList({plants, updatePrice, deletePlant}) {
  return (
    <ul className="cards">
      {plants.map((plant) => (
        <PlantCard key={plant.id} plant={plant} updatePrice={updatePrice} deletePlant={deletePlant} />
      ))}
    </ul>
  );
}

export default PlantList;
