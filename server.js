const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const cors = require("cors");
const bodyParser = require("body-parser");
const {readdirSync} = require('fs');
require("dotenv").config();

// routes import
// const authRouter = require('./routes/auth');

mongoose.set('strictQuery', true);

// app
const app = express();

// db

mongoose.connect(process.env.DATABASE, {
    // useUnifiedTopology: true,
    // useCreateIndex: true,
    // useFindAndModify: false
}).then(()=> console.log("DB CONNECTED"))
.catch((err)=>console.log(`DB CONNECTION ERR ${err}`));

// middlewares
app.use(morgan("dev"));
app.use(bodyParser.json({limit: "2mb"}));
app.use(cors());

//routes middleware
// app.use('/api', authRouter);
// When you want to do multiple routing
readdirSync('./routes').map((r)=>app.use('/api', require('./routes/' + r)));

// port
const port = process.env.PORT || 8001;

app.listen(port, ()=> console.log(`Server is running on port ${port}`));


