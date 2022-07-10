import axios from 'axios';


// NODE_ENV = 'development'
// NODE_ENV = 'production'



// if we are in production baseurl = /api/v1/restauran ts

const baseURL = process.env.NODE_ENV === 'production' ? "api/v1/restaurants" : 'http://localhost:3001/api/v1/restaurants'


export default axios.create({
    baseURL,
})