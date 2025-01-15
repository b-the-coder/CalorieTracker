const {Pool} = require('pg');

const pool = new Pool({
    user: 'emmahe',
    password: '2103972Pg',
    host:'localhost',
    port:5432,
    database:'caloriecounterdb'
});

module.exports = {
    query:(text, params)=>pool.query(text,params)
};