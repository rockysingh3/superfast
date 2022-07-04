import React, { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import RestaurantFinder from "../apis/RestaurantFinder";
import { RestaurantsContext } from "../context/RestuarantsContext";

const Resturantdetails = () => {
  const { id } = useParams();
  const { selectedRestaurant, setSelectedRestaurant } =
    useContext(RestaurantsContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await RestaurantFinder.get(`/${id}`);
        setSelectedRestaurant(response.data.data.restaurant);
      } catch (err) {
        console.log(`err in the resturantdetails ${err}`);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1 className="text-center">Restaurant Details</h1>
      {selectedRestaurant && selectedRestaurant.name}
    </div>
  );
};

export default Resturantdetails;
