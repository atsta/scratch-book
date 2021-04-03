//server initialization
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

//db connection
mongoose.connect(
process.env.DB_CONNECTION, 
{ useNewUrlParser: true },
() => console.log('connected to db'));

const authRoute = require('./routes/auth');

//route middlewares
app.use('/api/user', authRoute);

//server startup
app.listen(3000, () => console.log('server up and running'));