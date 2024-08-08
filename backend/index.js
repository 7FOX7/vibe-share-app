import express from "express"; 
import mysql2 from "mysql2"; 
import cors from "cors"; 

const app = express(); 

app.use(express.json())
app.use(cors())

app.listen(8080, () => {
    console.log('server listening on port 8080')
})

app.get('/', (req, res) => {
    res.send('hello from our server')
})

const db = mysql2.createConnection({
    host: "localhost", 
    user: "root", 
    password: "jericka1292065A", 
    database: "users", 
    port: 3306
})

app.get('/users', (req, res) => {
    // const query = "SELECT * FROM users.users"; 
    // db.query(query, (err, data) => {
    //     if(err) {
    //         console.log('Could not extract the data from the table')
    //         return
    //     }
    //     return res.json(data)
    // })
    res.send('Hello, you are in the users')
})

db.connect((err) => {
    if(err) {    
        console.log("There an error was with connection to DB " + err.message) 
        return
    } 

    console.log("Connection to DB was successful")
})