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
    const { username, auth0_sub } = req.body
    try {
        // Check if user already exists
        const existingUser = await db.query(
            'SELECT * FROM "user" WHERE auth0_sub = $1',
            [auth0_sub]
        )
        if (existingUser.rows.length <= 0) {
            // User does not exist, insert new user
            await db.query(
                'INSERT INTO "user" (username,auth0_sub) VALUES ($1, $2)',
                [username, auth0_sub]
            )
        }
        res.status(200).send('User processed successfully')
    } catch (error) {
        res.status(500).send(error)
    }
})

app.post('/api/addItem', async (req, res) => {
    const { item, calories, name, date } = req.body
    console.log(item, calories, name, date)

    try {
        // Check if user already exists
        const currentUser = await db.query(
            'SELECT * FROM "user" WHERE username = $1',
            [name]
        )
        const currentUserId = currentUser.rows[0].id
        console.log(currentUserId)
        const insertQuery = `
       INSERT INTO user_calorie_details (user_id, date, calories, item)
       VALUES ($1, $2, $3, $4);
   `
        const result = await db.query(insertQuery, [currentUserId, date, calories, item])
        console.log(result);
        res.status(200).send([result.rowCount])
    } catch (error) {
        res.status(500).send({ message: 'Internal Server Error', error: error.message })
    }
})

app.get('/api/getItems/:userName', async (req, res) => {
    const name = req.params.userName
    const date = new Date().toISOString().split('T')[0]
   

    try {
        // Check if user already exists
        const rawUserId = await db.query(
            'SELECT id FROM "user" WHERE username = $1',
            [name]
        )
        const userId = rawUserId.rows[0].id
        
        const rawUserItem = await db.query(
            'SELECT * FROM "user_calorie_details" WHERE user_id = $1 AND date = $2',
            [userId, date]
        )

        const UserItem = rawUserItem.rows.map((singleitem) => {
            return { item: singleitem.item, calories: singleitem.calories }
        })

        res.status(200).send(UserItem)
    } catch (error) {
        res.status(500).send(error)
    }
})
app.use((req, res) => {
    res.status(404).send('Not Found')
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
