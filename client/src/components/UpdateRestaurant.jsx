import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import RestaurantFinder from "../apis/RestaurantFinder";


const UpdateRestaurant = (props) => {
    /* paras out the params in the url path="/restaurants/:id/update" */
    const { id } = useParams();

    const history = useNavigate();

    const [name, setName] = useState("");
    const [location, setlocation] = useState("");
    const [priceRange, setPriceRange] = useState("");


    useEffect(() => {
        const fetchData = async () => {
            const response = await RestaurantFinder.get(`/${id}`);
            setName(response.data.data.restaurant.name);
            setlocation(response.data.data.restaurant.location);
            setPriceRange(response.data.data.restaurant.price_range);
        }
        fetchData();
    }, []);


    const handleSubmit = async (e) => {
        e.preventDefault();
        const updatedRestaurant = await RestaurantFinder.put(`/${id}`, {
            name,
            location,
            price_range: priceRange
        })

        history('/');
    }


    return (
            <form action="">
                <div className="form-group">
                    <label htmlfor="name">Name</label>
                    <input value={name} onChange={e => setName(e.target.value)} type="text" className="form-control" id="name" />
                </div>


                <div classname="form-group">
                    <label htmlfor="location">location</label>
                    <input value={location} onChange={e => setlocation(e.target.value)} id="location" type="text" className="form-control" />
                </div>

                <div classname="form-group">
                    <label htmlfor="price_range">Price Range</label>
                    <input value={priceRange} onChange={e => setPriceRange(e.target.value)} id="price_range" type="number" className="form-control" />
                </div>

                <button type="submit" onClick={handleSubmit} className="btn btn-primary">Submit</button>
            </form>
            
    )
}

export default UpdateRestaurant;