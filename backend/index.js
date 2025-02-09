const express = require('express'); 
const cors = require('cors'); 
const dotenv = require('dotenv');
const multer = require('multer');
const sharp = require('sharp'); 
const {Storage} = require('@google-cloud/storage'); 
const { createClient } = require('@supabase/supabase-js');

const upload = multer({
    storage: multer.memoryStorage(), 
    limits: {
        fileSize: 25 * 1024 * 1024
    }
})

const app = express(); 
app.use(express.json()); 
dotenv.config(); 
app.use(cors({
    origin: "*",
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type"], 
})); 

app.listen(8080, () => {
    console.log('Server listening on port 8080')
})

app.get('/', (req, res) => {
    res.send('Hello from server')
})

const storage = new Storage({
    credentials: {
        type: process.env.TYPE,
        project_id: process.env.PROJECT_ID,
        private_key_id: process.env.PRIVATE_KEY_ID,
        private_key: process.env.PRIVATE_KEY.replace(/\\n/g, '\n'),
        client_email: process.env.CLIENT_EMAIL,
        client_id: process.env.CLIENT_ID,
        auth_uri: process.env.AUTH_URI,
        token_uri: process.env.TOKEN_URI,
        auth_provider_x509_cert_url: process.env.AUTH_PROVIDER_X509_CERT_URL,
        client_x509_cert_url: process.env.CLIENT_X509_CERT_URL,
        universe_domain: process.env.UNIVERSE_DOMAIN, 
    }
})

const bucket = storage.bucket(process.env.BUCKET_NAME)

const client = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY, {db: {schema: "testdb"}});

app.get('/users', (req, res) => {
    fetchUsers(req, res)
})

app.post('/users', (req, res) => {
    postUsers(req, res)
})

app.get('/posts', (req, res) => {
    fetchPosts(req, res)
})

app.post('/posts', (req, res) => {
    postPosts(req, res)
})

app.post('/upload', upload.single("image"), (req, res) => {
    uploadImage(req, res)
})

app.get('/clubs', (req, res) => {
    fetchClubs(req, res)
})

app.get('/user-clubs', (req, res) => {
    fetchUserClubs(req, res)
})

app.post('/user-clubs', (req, res) => {
    postUserClubs(req, res)
})

app.get('/likes', (req, res) => {
    fetchLikes(req, res)
})

app.post('/likes', (req, res) => {
    postLikes(req, res)
})

app.get('/videos', (req, res) => {
    fetchVideos(req, res)
})

app.post('/videos', (req, res) => {
    postVideos(req, res)
})

app.get('/comments', (req, res) => {
    fetchComments(req, res)
})

app.post('/comments', (req, res) => {
    postComments(req, res)
})

app.get('/chats', (req, res) => {
    fetchChats(req, res)
})

async function fetchUsers(req, res) {
    try {
        const result = await client.from('users').select('*')
        res.json(result.data)
    }
    catch (err) {
        console.log(err)
    }
}

async function postUsers(req, res) {
    try {
        const {username, password} = req.body; 
        const result = await client.from('users').insert({username: username, password: password}).select('*')

        res.status(200).json(result.data)
    }
    catch (err) {
        console.log(err)
    }
}

async function fetchPosts(req, res) {
    try {
        const result = await client.from('posts').select(`id, publishDate, content, imageUrl, likes, latitude, longitude, username: users (username)`)

        res.status(200).json(result.data)
    }
    catch (err) {
        console.log(err)
    }
}

async function postPosts(req, res) {
    try {
        // const {publishDate, content, imageUrl, userId, likes, latitude, longitude} = req.body; 
        const {content, imageUrl, userId, likes, latitude, longitude} = req.body; 
        const result = await client.from('posts').insert({
            // publishDate: publishDate,
            content: content, 
            imageUrl: imageUrl, 
            userId: userId, 
            likes: likes, 
            latitude: latitude, 
            longitude: longitude
        }).select(`id, publishDate, content, imageUrl, userId, likes, latitude, longitude, username: users (username)`).order('id', {
            ascending: false
        }).limit(1)

        res.status(200).json(result.data)
    }
    catch (err) {
        console.log(err)
    }
}

async function uploadImage(req, res) {
    if(!req.file) {
        return res.status(500).send('Please, select a file')
    }

    try {
        const buffer = await sharp(req.file.buffer)
            .toFormat('webp')
            .resize({
                width: 300,
                height: 300
            })
            .toBuffer();

        const blob = bucket.file(req.file.originalname)

        const writable = blob.createWriteStream({
            resumable: false, 
            contentType: "image/webp",
            metadata: {
                contentType: 'image/webp',
            },
        }) 

        writable
            .on('finish', () => {
                const publicUrl = `https://storage.cloud.google.com/${bucket.name}/${blob.name}`;
                res.status(200).json(publicUrl);
            })
            .on('error', (err) => {
                res.status(500).send('Could not write into a file: ' + err);
            })
        
        writable.end(buffer)
    }
    catch(err) {
        if(err.code === "LIMIT_FILE_SIZE") {
            return res.status(500).send('File size cannot be larger than 25MB!')
        }
        res.status(500).send(err.message)
    }
}

async function fetchClubs(req, res) {
    try {
        const result = await client.from('clubs').select('*')

        res.status(200).json(result.data)
    }
    catch (err) {
        console.log(err)
    }
}

async function fetchUserClubs(req, res) {
    try {
        const {userId} = req.query
        const result = await client.from('user_clubs').select('*').eq('userId', userId)

        res.status(200).json(result.data)
    }
    catch (err) {
        console.log(err)
    }
}

async function postUserClubs(req, res) {
    try {
        const {userId, clubId, join} = req.body; 
        const change = join ? 1 : -1; 

        const promise = await client.from('clubs').select('members').eq('id', clubId)
        console.log('user clubs: ' + promise.data[0].members + change)
        client.from('clubs').update({"members": promise.data[0].members + change}).eq('id', clubId)
        .then(() => {
            console.log('TEST 1: you are inside here')
            const promise = join ? client.from('user_clubs').insert({userId: userId, clubId: clubId}).select('*') : client.from('user_clubs').delete().eq('userId', userId).eq('clubId', clubId).select('*')
            promise
            .then(result => res.status(200).json(result.data))
            .catch(err => res.status(500).send('There was an error when extracting from user clubs (q3)' + err))
        })
        .catch(err => res.status(500).send('There was an error when updating members (q1) ' + err))
    }
    catch (err) {
        console.log(err)
    }
}

async function fetchLikes(req, res) {
    try {
        const {userId, postId, getCount} = req.query
        const result = getCount ? await client.from('liked_posts').select(undefined, {head: true, count: "exact"}).eq('userId', userId) : await client.from('liked_posts').select(undefined, {head: true, count: "exact"}).eq('userId', userId).eq('postId', postId)

        res.status(200).json(result.count)
    }
    catch (err) {
        console.log(err)
    }
}

async function postLikes(req, res) {
    try {
        const {userId, postId, isLiked} = req.body;
        console.log('post id: ' + postId)
        const change = isLiked ? -1 : 1; 
        console.log('change ' + change)
        const likes = await client.from('posts').select('likes').eq('id', postId)
        console.log('likes: ' + likes.data[0].likes + change)
        await client.from('posts').update({"likes": likes.data[0].likes + change}).eq('id', postId)
        isLiked ? await client.from('liked_posts').delete().eq('userId', userId).eq('postId', postId) : await client.from('liked_posts').insert({userId: userId, postId: postId})
        const postLikes = await client.from('posts').select('likes').eq('id', postId)
        const userLikesCount = await client.from('liked_posts').select(undefined, {head: true, count: "exact"}).eq('userId', userId)

        console.log('postLikeCount: ' + postLikes.data[0].likes); 
        console.log('userLikesCount: ' + userLikesCount.count); 

        const result = [postLikes.data[0].likes, userLikesCount.count]
        res.status(200).json(result)
        // 
        // const modifyLikedPosts = isLiked ? client.from('liked_posts').delete().eq('userId', userId).eq('postId', postId) : client.from('liked_posts').insert({userId: userId, postId: postId})

        // Promise.all([updateLikes, modifyLikedPosts])
        // .then(() => {
        //     client.from('posts').select('likes').eq('id', postId)
        //     .then(result => res.status(200).json(result.data))
        //     .catch(err => res.status(500).send('There was an error when setting a query: ' + err))
        // })
        // .catch(err => console.error('There was an error when setting a query: ' + err))
    }
    catch(err) {
        console.log(err)
    }
}

async function fetchVideos(req, res) {
    try {
        const result = await client.from('videos').select('id, publishDate, videoUrl, username: users (username)')
        
        res.status(200).json(result.data)
    }
    catch (err) {
        console.log(err)
    }
}

async function postVideos(req, res) {
    try {
        // const {publishDate, videoUrl, userId} = req.body; 
        const {videoUrl, userId} = req.body; 
        const q = await client.from('videos').select('*', {
            count: "exact"
        })
        const table = q.count === 0 ? 'videos' : 'pending_videos'

        await client.from(table).insert({
            // publishDate: publishDate, 
            videoUrl: videoUrl, 
            userId: userId
        })
        
        res.status(200).send('Your video has been put in a queue!') 
    }
    catch (err) {
        console.log(err)
    }
}

async function fetchComments(req, res) {
    try {
        const {id, postType} = req.query;

        const result = postType === "post" ? await client.from('post_comments').select('id, publishDate, content, postId, username: users (username)').eq('postId', id) : await client.from('video_comments').select('id, publishDate, content, videoId, username: users (username)').eq('videoId', id)

        res.status(200).json(result.data)
    }
    catch (err) {
        console.log(err)
    }
}

async function postComments(req, res) {
    try {
        // const {publishDate, content, id, userId, postType} = req.body; 
        const {content, id, userId, postType} = req.body; 
        postType === "post" ? await client.from("post_comments").insert({
            // publishDate: publishDate, 
            content: content, 
            postId: id,     
            userId: userId
        }) : await client.from("video_comments").insert({
            // publishDate: publishDate, 
            content: content, 
            videoId: id,     
            userId: userId
        })

        res.status(200).send('Comment was sent successfully!')
    }
    catch (err) {
        console.log(err)
    }
}

async function fetchChats(req, res) {
    try {
        const {userId} = req.query;
        const result = await client.from('post_comments').select('commentId:id, commentPublishDate:publishDate, commentContent:content, postId, commentUserId:userId, imageUrl:posts (imageUrl), authorId:users (id), authorUsername:users (username)').eq('userId', userId)

        res.status(200).json(result.data)
    }   
    catch (err) {
        console.log(err)
    }
}



// const job = Cron("0 0 * * *", () => {
//     try {
//         const q1 = "DELETE FROM videos"
//         pool.query(q1, (err) => {
//             if(err) {
//                 console.log('There was an error when setting a q1 (Cron): ' + err)
//             }
//             else {
//                 const q2 = "SELECT * FROM pending_videos LIMIT 1"
//                 pool.query(q2, (err, data) => {
//                     if(err) {
//                         console.log('There was an error when setting a q2 (Cron): ' + err)
//                     }
//                     else {
//                         if(data.length > 0) {
//                             const {publishDate, videoUrl, username} = data
//                             const q3 = "INSERT INTO videos (publishDate, videoUrl, username) VALUES (?, ?, ?)"
//                             pool.query(q3, [publishDate, videoUrl, username], (err) => {
//                                 console.log('There was an error when setting a q3 (Cron): ' + err)
//                             })
//                         }
//                         else {
//                             console.log('pending_videos table does not contain any videos (Cron)')
//                         }
//                     }
//                 })
//             }
//         })
//     }
//     catch (err) {
//         console.log("There was an error when setting queries (Cron): " + err)
//     }
// })