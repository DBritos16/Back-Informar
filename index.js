//Import libraries
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const connectDB = require('./database/conection');
require('dotenv').config();
require('./database/conection')

//Init express
const app = express();

//Middlewares
app.use(express.json());
app.use(morgan('dev'));
app.use(cors());
app.set('PORT', process.env.PORT || 5000);
connectDB();

//Routes
app.use(require('./src/routes/auth.routes'))
app.use(require('./src/routes/carreras.routes'))

//Port
app.listen(app.get('PORT'), (err)=>err?console.log(err):console.log(`Server listening on PORT ${app.get('PORT')}`));
