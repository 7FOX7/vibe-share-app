import express from "express"; 
import mysql2 from "mysql2"; 

const app = express(); 

app.use(express.json())

app.listen(8080, () => {
    console.log('server listening on port 8080')
})

app.get('/', (req, res) => {
    res.send('hello from our server')
})

app.get('/users', (req, res) => {
    const query = "SELECT * FROM users.users_table"; 
    db.query(query, (err, data) => {
        if(err) {
            console.log('Could not extract the data from the table')
            return
        }
        return res.json(data)
    })
})

const db = mysql2.createConnection({
    host: "localhost", 
    user: "root", 
    password: "jericka1292065A", 
    database: "users", 
    port: 3304
})

db.connect((err) => {
    if(err) {    
        console.log("There an error was with connection to DB " + err.message) 
        return
    } 

    console.log("Connection to DB was successful")
})