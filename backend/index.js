const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const auth_route = require('./routes/auth');
const user_route = require('./routes/user');


dotenv.config();

//db connection
mongoose.connect(
process.env.DB_CONNECTION, 
{useNewUrlParser: true, useUnifiedTopology: true},
() => console.log('connected to db'));

//Middleware
app.use(cors());
app.use(express.json());

//route middlewares
app.use('/api/user', auth_route);
app.use('/api/userdetails', user_route);


//server startup
app.listen(3000, () => console.log('server up and running'));