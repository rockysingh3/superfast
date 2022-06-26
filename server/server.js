require("dotenv").config();
const express = require("express");

const db = require("./db");

const app = express();

/* parse the json in the body of the req, the json object coming from client */
app.use(express.json());

/* GETS ALL THE RESTAURANTS */
app.get("/api/v1/restaurants", async (req, res) => {

  try {
    /* get the data from the db */
    const results = await db.query("select * from restaurants");

    console.log(results);

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
    const results = await db.query(
      "select * from restaurants where id = $1", [req.params.id]);

    res.status(200).json({
      status: 'succes',
      data: {
        restaurant: results.rows[0],
      }
    })
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
      [req.body.name, req.body.location, req.body.price_range] );
      console.log(results)

      res.status(201).json({
        status: 'succes',
        data: {
          restaurant: results.rows[0]
        }
      })
  } catch (err) {
    console.log(`Error from post a restaurant ${err}`);
  }
});

/* Update Restaurants */

app.put("/api/v1/restaurants/:id", (req, res) => {
  console.log(req.params.id);
});

app.delete("/api/v1/restaurants/:id", (req, res) => {
  res.status(204).json({
    status: "success",
  });
});

const port = process.env.PORT;

app.listen(port, () =>
  console.log(`Server is up and listening on port ${port}`)
);
