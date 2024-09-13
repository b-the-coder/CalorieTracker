const express = require('express')
const db = require('./db')

const app = express()
const port = process.env.PORT || 8080

// const histories = [
//     { date: Date(), totalcalories: 1567 },
//     { date: Date(), totalcalories: 1797 },
// ]

app.get('/api/histories', async (req, res) => {
    try {
        const recentHistory = await db.query(
            'SELECT * FROM user5dayscaloriehistory'
        );
        const recentCalories = recentHistory.rows[2]["fivedayhistories"]
        res.json(recentCalories);
        
    } catch (err) {
        console.log(err)
        res.status(500).send('Internal Server Error')
    }
})
app.use((req, res) => {
    res.status(404).send('Not Found');
  });
  
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
