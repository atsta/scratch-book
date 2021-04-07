const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const authRoute = require('./routes/auth');

dotenv.config();

//db connection
mongoose.connect(
process.env.DB_CONNECTION, 
{useNewUrlParser: true, useUnifiedTopology: true},
() => console.log('connected to db'));

//Middleware
app.use(express.json());

//route middlewares
app.use('/api/user', authRoute);

//server startup
app.listen(3000, () => console.log('server up and running'));