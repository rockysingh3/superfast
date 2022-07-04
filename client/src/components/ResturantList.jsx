import React from "react";
import { useContext } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import RestaurantFinder from "../apis/RestaurantFinder";
import { RestaurantsContext } from "../context/RestuarantsContext";

const ResturantList = () => {

    const { restaurants, setRestaurants } = useContext(RestaurantsContext);
    let history = useNavigate();


    useEffect(() => {
        
        /* gets all the restaurants from DB everytime the page loads */
        const fetchData = async () => {

            try {
                const response = await RestaurantFinder.get("/")
                /* updates the state within the context  */
                setRestaurants(response.data.data.restaurants);
            } catch (err) {
                console.log(err);
            }     
        }

        fetchData();

    }, [])


    /* deletes one of the resturants in the db and then updates the UI list */
    const handleDelete = async (id) => {
        try {
           const response = await RestaurantFinder.delete(`/${id}`)
           /* updates the list of restaurants  */
           setRestaurants(restaurants.filter(restaurant => {
            return restaurant.id !== id
           }))
        } catch (err) {
            console.log(err);
        }
    }

    const handleUpdate = (id) => {
        history(`/restaurants/${id}/update`)
    }


    return (
        <div className="list-group">
            <table className="table table-hover table-dark">
                <thead className="">
                    <tr className="bg-primary">
                        <th scope="col" >Restaurant</th>
                        <th scope="col" >Location</th>
                        <th scope="col" >Price Range</th>
                        <th scope="col" >Ratings</th>
                        <th scope="col" >Edit</th>
                        <th scope="col" >Delete</th>
                    </tr>
                </thead>
                <tbody>

                    {restaurants && restaurants.map(eachRestaurant => {
                        return (
                            <tr key={eachRestaurant.id} >
                                <td>{eachRestaurant.name}</td>
                                <td>{eachRestaurant.location}</td>
                                <td>{"$".repeat(eachRestaurant.price_range)}</td>
                                <td>reviews</td>
                                <td>
                                    <button onClick={() => handleUpdate(eachRestaurant.id)} className="btn btn-warning">Update</button>
                                </td>
                                <td>
                                    <button onClick={() => handleDelete(eachRestaurant.id)} className="btn btn-danger">Delete</button>
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    )
}


export default ResturantList;