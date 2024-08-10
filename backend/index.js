import express from "express"; 
import mysql2 from "mysql2"; 
import cors from "cors"; 

const app = express(); 

app.use(express.json())
app.use(cors())

app.listen(8080, () => {
    console.log('Server listening on port 8080')
})

app.get('/', (req, res) => {
    res.send('Hello from server')
})

const db = mysql2.createConnection({
    host: "localhost", 
    user: "root", 
    password: "jericka1292065A", 
    database: "testdb", 
    port: 3306
})

app.get('/users', (req, res) => {
    const q = "SELECT * FROM users"; 
    db.query(q, (err, data) => {
        if(err) {
            res.status(500).json('There was an error when setting a query: ' + err)
        }
        else {
            res.json(data)
        } 
    })
})

app.post('/users', (req, res) => {
    const {id, username, password} = req.body; 
    const q = `INSERT INTO users VALUES (?, ?, ?)`
    db.query(q, [id, username, password], (err) => {
        if(err) {
            res.status(500).json('There was an error when setting a query: ' + err)
            return
        }
        const q2 = `SELECT * FROM users`
        db.query(q2, (err, data) => {
            if(err) {
                res.status(500).json('There was an error when setting a query: ' + err)
                return
            }
            res.status(200).json(data)
        })
    })
})

db.connect((err) => {
    if(err) {    
        console.log("There an error was with connection to database" + err.message) 
        return
    } 

    console.log("Connection to database was successful")
})