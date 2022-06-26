const { Pool } = require('pg')

const DBdata = require('./dbAuth')

const pool = new Pool(
    DBdata.data
)

module.exports = {
    query: (text, params) => pool.query(text, params)
}