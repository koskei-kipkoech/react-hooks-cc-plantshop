import React, { useState } from "react";

function PlantCard({plant, updatePrice, deletePlant}) {
  const [inStock, setInstock] = useState(true)
  const [newPrice, setNewPrice] = useState("")

  const toggleStock = () =>{
    setInstock(!inStock)
  }

  const handlePriceUpdate = () => {
    if(newPrice && !isNaN(newPrice)){
      updatePrice(plant.id, Number(newPrice));
      setNewPrice('')
    }else{
      alert('Please enter a valid price!')
    }
  }
  return (
    <li className="card" data-testid="plant-item">
      <img src={plant.image} alt={plant.name} />
      <h4>{plant.name}</h4>
      <p>Price: {plant.price}</p>
      <div>
        <input type="number" value={newPrice} onChange={(e) => setNewPrice(e.target.value)} placeholder="Update New Pricec here...." />
        <button onClick={handlePriceUpdate}>Update Price</button>
      </div>
      <button className={inStock ? "primary" : ""} onClick={toggleStock}>{inStock ? "In Stock" : "Out of Stock"}</button> <br/>
      <button onClick={() => deletePlant(plant.id)} className="delete-btn">Delete</button>
    </li>
  );
}

export default PlantCard;
