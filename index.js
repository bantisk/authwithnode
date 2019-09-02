const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');

// Import Routes
const authRoute = require('./routes/auth');
const postRoute = require('./routes/private/postdata');

dotenv.config();

//Connect to DBs
mongoose.connect(process.env.DB_CONNECT,
    { useNewUrlParser: true },
    () => {
        console.log('connected to DB');
    })

// Middleware
app.use(express.json());

//Routes Middleware
app.use('/api/user', authRoute);
app.use('/api/post', postRoute);

app.listen(3000, () => console.log('server is running'));
