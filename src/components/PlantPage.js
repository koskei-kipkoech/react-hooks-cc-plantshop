import React, { useEffect, useState } from "react";
import NewPlantForm from "./NewPlantForm";
import PlantList from "./PlantList";
import Search from "./Search";

function PlantPage() {
  const [plants, setPlants] = useState([])
  const[searchTerm, setSearchTerm] = useState("")

  useEffect(() => {
    fetch("https://react-hooks-cc-plantshop-b14k.onrender.com/plants")
      .then((res) => res.json())
      .then((data) => setPlants(data))
      .catch((error) => console.error("Error fetching plants:", error));
  },[]);
  const filteredPlants = plants.filter((plant) => plant.name && plant.name.toLowerCase().includes(searchTerm.toLowerCase()));

  const updatePrice =(id,newPrice)=>{
    fetch(`https://react-hooks-cc-plantshop-b14k.onrender.com/plants/${id}`,{
      method:"PATCH",
      headers:{"Content-Type": "Application/JSON",},
      body:JSON.stringify({price:newPrice}),
    })
      .then((res) => res.json())
      .then((updatedPlant) =>{
        setPlants((prevPlants)=> 
          prevPlants.map((plant)=>
            plant.id ===id ? {...plant, price:updatedPlant.price}: plant
          )
        )
      })
      .catch((error) => console.error("Error    updating price", error))
  };

  const deletePlant = (id) =>{
    fetch(`https://react-hooks-cc-plantshop-b14k.onrender.com/plants/${id}`,{
      method:"DElETE",
    })
      .then(()=>{
        setPlants((prevPlants) => prevPlants.filter((plant) => plant.id !== id))
      })
      .catch((error) => console.error("Error Deleting plant:",error))
  }
  return (
    <main>
      <NewPlantForm  setPlants={setPlants} />
      <Search setSearchTerm={setSearchTerm} />
      <PlantList plants={filteredPlants} updatePrice={updatePrice} deletePlant={deletePlant} />
    </main>
  );
}

export default PlantPage;
