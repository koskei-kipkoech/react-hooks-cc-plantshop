import React, { useState } from "react";

function NewPlantForm({setPlants}) {
  const [name, setName] = useState("")
  const [image,setImage] = useState("")
  const [price,setPrice] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault();
    //const newPlant = {name,image, price: price.toString()};

    fetch(`http://localhost:6001/plants`,{
      method: "POST",
      headers:{ 
        "Content-Type": "Application/JSON",
      },
      body: JSON.stringify({
        name,
        image,
        price: price.toString()
      }),
    })
      .then((res) => res.json())
      
      .then((data) =>{setPlants(prevPlants => [...prevPlants, data])

      })
      .catch((error) => console.error("Error fetching plants:", error));
    
    setName("");
    setImage("");
    setPrice("");
  };

  return (
    <div className="new-plant-form">
      <h2>New Plant</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder="Plant name" value={name} onChange={(e) => setName(e.target.value)} />
        <input type="text" name="image" placeholder="Image URL" value={image} onChange={(e) => setImage(e.target.value)}  />
        <input type="number" name="price" step="0.01" placeholder="Price" value={price} onChange={(e) => setPrice(e.target.value)}  />
        <button type="submit">Add Plant</button>
      </form>
    </div>
  );
}

export default NewPlantForm;
