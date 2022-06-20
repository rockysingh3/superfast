require('dotenv').config();
const express = require('express');


const app = express();



/* GETS ALL THE RESTAURANTS */
app.get('/api/v1/restaurants', (req, res) => {
    res.status(200).json({
        status: 'success',
        data: {
            restaurants: ['pizza', 'wendys']
        }
    })
})



const port = process.env.PORT;

app.listen(port, () => console.log(`Server is up and listening on port ${port}`));