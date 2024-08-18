const express = require('express'); 
const mysql2 = require('mysql2'); 
const cors = require('cors'); 
const multer = require('multer'); 
const dotenv = require('dotenv'); 
const {Storage} = require('@google-cloud/storage'); 

const upload = multer({
    storage: multer.memoryStorage(), 
    limits: {
        fileSize: 25 * 1024 * 1024
    }
})

const app = express(); 
app.use(express.json())
dotenv.config()
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
    password: process.env.DB_PASSWORD, 
    database: "testdb", 
    port: 3306
})

const storage = new Storage({
    projectId: process.env.PROJECT_ID, 
    keyFilename: process.env.KEY_FILE_NAME
})

const bucket = storage.bucket(process.env.BUCKET_NAME)

app.get('/users', (req, res) => {
    const q = "SELECT * FROM users"; 
    db.query(q, (err, data) => {
        if(err) {
            res.status(500).send('There was an error when setting a query: ' + err)
        }
        else {
            res.json(data)
        } 
    })
})

app.post('/users', (req, res) => {
    const {username, password} = req.body; 
    const q = `INSERT INTO users (username, password) VALUES (?, ?)`
    db.query(q, [username, password], (err) => {
        if(err) {
            return res.status(500).send('There was an error when setting a query: ' + err)
        }
        const q2 = `SELECT * FROM users`
        db.query(q2, (err, data) => {
            if(err) {
                return res.status(500).send('There was an error when setting a query: ' + err)
            }
            res.status(200).json(data)
        })
    })
})

app.get('/posts', (req, res) => {
    const q = `
        SELECT posts.id, posts.publishDate, posts.content, posts.imageUrl, users.username FROM posts
        JOIN users ON users.id = posts.userId
    `
    db.query(q, (err, data) => {
        if(err) {
            res.status(500).send('There was an error when setting a query: ' + err)
        }
        else {
            res.json(data)
        }
    })
})

// app.get('/posts', (req, res) => {
//     const q = `
//         SELECT id, publishDate, content, imageUrl FROM posts`
//     db.query(q, (err, data) => {
//         if(err) {
//             res.status(500).send('There was an error when setting a query: ' + err)
//         }
//         else {
//             res.json(data)
//         }
//     })
// })

app.post('/posts', (req, res) => {
    const {publishDate, content, imageUrl, userId} = req.body; 
    const q = `INSERT INTO posts (publishDate, content, imageUrl, userId) VALUES (?, ?, ?, ?)`
    db.query(q, [publishDate, content, imageUrl, userId], (err) => {
        if(err) {
            return res.status(500).send('There was an error when setting a query: ' + err)
        }
        const q2 = `SELECT id FROM posts WHERE content=?`
        db.query(q2, [content], (err, data) => {
            if(err) {
                return res.status(500).send('There was an error when setting a query: ' + err)
            }
            res.status(200).json(data)
        })
    })
})

app.post('/upload', upload.single("image"), (req, res) => {
    if(!req.file) {
        return res.status(500).send('Please, select a file')
    }

    try {
        const blob = bucket.file(req.file.originalname)
        const blobStream = blob.createWriteStream({
            resumable: false
        })
        blobStream.on('error', (err) => {
            res.status(500).send(err.message)
        })
        blobStream.on('finish', () => {
            const publicUrl = `https://storage.cloud.google.com/${bucket.name}/${blob.name}`
            res.status(200).json(publicUrl)
        })
        blobStream.end(req.file.buffer)
    }
    catch(err) {
        if(err.code === "LIMIT_FILE_SIZE") {
            return res.status(500).send('File size cannot be larger than 25MB!')
        }
        res.status(500).send(err)
    }
})

db.connect((err) => {
    if(err) {    
        return console.log("There an error was with connection to database" + err.message) 
        
    } 

    console.log("Connection to database was successful")
})