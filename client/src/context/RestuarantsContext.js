import React, { useState, createContext } from "react";

export const RestaurantsContext = createContext();

export const RestaurantsContextProvider = (props) => {
  /* this state holds the list of all the restaurants in the DB that need to be displaced */
  const [restaurants, setRestaurants] = useState([]);
  /* this holds the state of the resturant that is clicked on for detials */
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);

  /* updates the restaurants state after user adds another restaurant  */
  const addRestaurants = (restaurant) => {
    setRestaurants([...restaurants, restaurant]);
  };

  return (
    <RestaurantsContext.Provider
      value={{
        restaurants,
        setRestaurants,
        addRestaurants,
        selectedRestaurant,
        setSelectedRestaurant,
      }}
    >
      {props.children}
    </RestaurantsContext.Provider>
  );
};
