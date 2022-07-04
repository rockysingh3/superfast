import React from "react";
import { useContext } from "react";
import { useState } from "react";
import RestaurantFinder from "../apis/RestaurantFinder";
import { RestaurantsContext } from "../context/RestuarantsContext";

const AddResturant = () => {

    const { addRestaurants } = useContext(RestaurantsContext);
    const [name, setName] = useState("");
    const [location, setLocation] = useState("");
    const [priceRange, setPriceRange] = useState("Price Range");

    


    const handleSumbit = async (e) => {
        e.preventDefault();
        /* sends the data to the server aafter user clicks the button */
        try {
            const response = await RestaurantFinder.post("/", {
                name,
                location,
                price_range: priceRange
            })
            /* appends the grid with the newly created restaurant and updates the state wihtin the context */
            addRestaurants(response.data.data.restaurants)
        } catch (err) {
            console.log(err);
        }
    }

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
                    <button onClick={handleSumbit} type="submit" className="btn btn-primary">
                        Add
                    </button>
                </div>
            </div>
        </form>
    )
}


export default AddResturant;