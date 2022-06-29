import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { RestaurantsContextProvider } from "./context/RestuarantsContext";
import Home from "./routes/Home";
import Resturantdetails from "./routes/Resturantdetails";
import UpdatePage from "./routes/UpdatePage";

const App = () => {
  return (
    <RestaurantsContextProvider>
      <div className="container">
        <Router>
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/restaurants/:id/update" element={<UpdatePage />} />
            <Route exact path="/restaurants/:id" element={<Resturantdetails />} />
          </Routes>
        </Router>
      </div>
    </RestaurantsContextProvider>
  );
};

export default App;
