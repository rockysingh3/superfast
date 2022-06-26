const { Pool } = require('pg')

// const DBdata = require('./dbAuth')

const pool = new Pool()


// you can also use async/await

module.exports = {
    query: (text, params) => pool.query(text, params),
}