import mysql from "mysql"; 

const connection = mysql.createConnection({
    host: "localhost", 
    user: "root", 
    password: "jericka1292065A", 
    database: "users"
})

connection.connect((err) => {
    if(err) {    
        console.log("There was with connection to DB " + err.message) 
        return
    } 

    console.log("Connection to DB was successful")
})