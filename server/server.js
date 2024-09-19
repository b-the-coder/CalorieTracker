const express = require('express')
const db = require('./db')

const app = express()
const port = process.env.PORT || 8080

app.use(express.json())

// const histories = [
//     { date: Date(), totalcalories: 1567 },
//     { date: Date(), totalcalories: 1797 },
// ]

app.get('/api/histories', async (req, res) => {
    try {
        const recentHistory = await db.query(
            'SELECT * FROM user5dayscaloriehistory'
        )
      
        const recentCalories = recentHistory.rows[0]['fivedayhistories']
        res.json(recentCalories)
    } catch (err) {
        console.log(err)
        res.status(500).send('Internal Server Error')
    }
})

app.post('/api/saveUser', async (req, res) => {
const{username, auth0_sub} = req.body;
console.log(username,auth0_sub)
    try {
    // Check if user already exists
    const existingUser = await db.query('SELECT * FROM "user" WHERE auth0_sub = $1', [auth0_sub]);
   console.log(existingUser)
    if (existingUser.rows.length <= 0) {
        // User does not exist, insert new user
        await db.query(
            'INSERT INTO "user" (username,auth0_sub) VALUES ($1, $2)',
            [username, auth0_sub]
        );
    }
    res.status(200).send('User processed successfully');
    } catch (error) {
        res.status(500).send(error);
    }
})
app.use((req, res) => {
    res.status(404).send('Not Found')
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
