import React from "react";
import { useContext } from "react";
import { useEffect } from "react";
import RestaurantFinder from "../apis/RestaurantFinder";
import { RestaurantsContext } from "../context/RestuarantsContext";

const ResturantList = () => {

    const { restaurants, setRestaurants } = useContext(RestaurantsContext)


    useEffect(() => {
        
        /* gets all the restaurants from DB everytime the page loads */
        const fetchData = async () => {

            try {
                const response = await RestaurantFinder.get("/")
                setRestaurants(response.data.data.restaurants);
            } catch (err) {
                console.log(err);
            }
        }

        fetchData();

    }, [])



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
                                    <button className="btn btn-warning">Update</button>
                                </td>
                                <td>
                                    <button className="btn btn-danger">Delete</button>
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