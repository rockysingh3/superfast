require("dotenv").config();
const express = require("express");

const db = require("./db");

const app = express();

/* parse the json in the body of the req */
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

/* Get a Restaurant */
app.get("/api/v1/restaurants/:id", (req, res) => {});

app.post("/api/v1/restaurants", (req, res) => {
  console.log(req.body);
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
