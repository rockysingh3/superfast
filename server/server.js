require("dotenv").config();
const express = require("express");
const cors = require("cors");

const db = require("./db");

const app = express();

/* parse the json in the body of the req, the json object coming from client */
app.use(cors());
app.use(express.json());

/* GETS ALL THE RESTAURANTS */
app.get("/api/v1/restaurants", async (req, res) => {
  try {
    /* get the data from the db */
    const results = await db.query("select * from restaurants");

    /* send the data to client */
    res.status(200).json({
      status: "success",
      results: results.rows.length,
      data: {
        restaurants: results.rows,
      },
    });
  } catch (err) {
    console.log(err);
  }
});

/* Get a Single Restaurant using params id */
app.get("/api/v1/restaurants/:id", async (req, res) => {
  try {
    const restaurant = await db.query(
      "select * from restaurants where id = $1",
      [req.params.id]
    );

    /* get all the reviews associated with this params.id */
    const reviews = await db.query(
      "select * from reviews where restaurant_id = $1",
      [req.params.id]
    );


    res.status(200).json({
      status: "succes",
      data: {
        restaurant: restaurant.rows,
        reviews: reviews.rows,
      },
    });
  } catch (err) {
    console.log(`this error is from single restaurant route ${err}`);
  }
});

/* Create a Restaurant  */
app.post("/api/v1/restaurants", async (req, res) => {
  console.log(req.body);

  try {
    /* returning * tells postpg to return the data that was posted */
    const results = await db.query(
      "INSERT INTO restaurants (name, location, price_range) values ($1, $2, $3) returning *",
      [req.body.name, req.body.location, req.body.price_range]
    );

    res.status(201).json({
      status: "succes",
      data: {
        restaurants: results.rows[0],
      },
    });
  } catch (err) {
    console.log(`Error from post a restaurant ${err}`);
  }
});

/* Update Restaurants */
app.put("/api/v1/restaurants/:id", async (req, res) => {
  console.log(req.params.id);

  try {
    const results = await db.query(
      "UPDATE restaurants SET name = $1, location = $2, price_range = $3 where id = $4 returning *",
      [req.body.name, req.body.location, req.body.price_range, req.params.id]
    );

    res.status(200).json({
      status: "succes",
      data: {
        restaurant: results.rows[0],
      },
    });
  } catch (err) {
    console.log(`Error in the put route ${err}`);
  }
});

/* Delete a restaurant using id */
app.delete("/api/v1/restaurants/:id", async (req, res) => {
  try {
    const results = db.query("DELETE FROM restaurants where id = $1", [
      req.params.id,
    ]);
    res.status(204).json({
      status: "success",
    });
  } catch (err) {
    console.log(`Error from delete route ${err}`);
  }
});


/* posts a review to the db from the client */
app.post("/api/v1/restaurants/:id/addReview", async (req, res) => {
  
  try {
    const newReview = await db.query("INSERT INTO reviews (restaurant_id, name, review, rating) values ($1, $2, $3, $4) returning *;", [req.params.id, req.body.name, req.body.review, req.body.rating]);
    res.status(201).json({
      status: 'success',
      data: {
        review: newReview.rows[0],
      },
    })
  } catch (err) {
    console.log(err);
  }
});

const port = process.env.PORT;

app.listen(port, () =>
  console.log(`Server is up and listening on port ${port}`)
);
