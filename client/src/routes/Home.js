import React from 'react';
import AddResturant from '../components/AddResturant';
import Header from '../components/header';
import ResturantList from '../components/ResturantList';


const Home = () => {
    return (
        <div>
            <Header/>
            <AddResturant />
            <ResturantList />
        </div>
    )
}


export default Home;