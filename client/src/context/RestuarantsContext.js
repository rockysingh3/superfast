import React, { useState, createContext } from "react";

export const RestaurantsContext = createContext();


export const RestaurantsContextProvider = (props) => {

    /* this state holds the list of all the restaurants in the DB that need to be displaced */
    const [restaurants, setRestaurants] = useState([]);

    /* updates the restaurants state after user adds another restaurant  */
    const addRestaurants = (restaurant) => {
        setRestaurants([...restaurants, restaurant]);
    }

    return (
        <RestaurantsContext.Provider value={{ restaurants, setRestaurants }}>
            {props.children}
        </RestaurantsContext.Provider>
    )
}