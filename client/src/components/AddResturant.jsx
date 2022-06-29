import React from "react";
import { useState } from "react";

const AddResturant = () => {

   const [name, setName] = useState("");
   const [location, setLocation] = useState("");
   const [priceRange, setPriceRange] = useState("");

    return (
        <form>
            <div class="row">
                <div class="col">
                    <input value={name} onChange={e => setName(e.target.value)} type="text" className="form-control" placeholder="name" />
                </div>
                <div class="col">
                    <input value={location} onChange={e => setLocation(e.target.value)} type="text" className="form-control" placeholder="location" />
                </div>
                <div className="col">
                    <select value={priceRange} onChange={e => setPriceRange(e.target.value)} className="custom-select my-1 mr-sm-2">
                        <option disabled>Price Range</option>
                        <option value="1">$</option>
                        <option value="2">$$</option>
                        <option value="3">$$$</option>
                        <option value="4">$$$$</option>
                        <option value="5">$$$$$</option>
                    </select>
                </div>
                <div className="col">
                    <button type="submit" className="btn btn-primary">
                        Add
                    </button>
                </div>
            </div>
        </form>
    )
}


export default AddResturant;