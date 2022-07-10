import React, { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import RestaurantFinder from "../apis/RestaurantFinder";
import AddReview from "../components/AddReviews";
import Reviews from "../components/Reviews";
import { RestaurantsContext } from "../context/RestuarantsContext";

const Resturantdetails = () => {
  const { id } = useParams();
  const { selectedRestaurant, setSelectedRestaurant } =
    useContext(RestaurantsContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await RestaurantFinder.get(`/${id}`);
        /* update the context for the selected restaurant */
        setSelectedRestaurant(response.data.data);
        console.log(selectedRestaurant);
      } catch (err) {
        console.log(`err in the resturantdetails ${err}`);
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      <h1 className="text-center">Restaurant Details</h1>
      {selectedRestaurant && (
        <>
        <h1 className="text-center display-1">{selectedRestaurant.restaurant.name}</h1>
        <div className="mt-3">
          <Reviews reviews={selectedRestaurant.reviews} />
          <AddReview />
        </div>
        </>
      )}
    </div>
  );
};

export default Resturantdetails;
