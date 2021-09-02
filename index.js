require("dotenv").config();

const Film = require("./models/film");

const express = require("express");
const { connection } = require("./db");
const indexRouter = require("./routes/index");
const errorRouter = require("./routes/error");
const filmRouter = require("./routes/film");

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json()); // This ensures input is considered to be json

app.use("/", indexRouter);
app.use("/film", filmRouter);
app.use("*", errorRouter);

// app.listen(port, ()=>{
//     connection.authenticate();
//     console.log("App is online");
// });
app.listen(process.env.HTTP_PORT || 5000, async () => {
    connection.authenticate();
    // await User.sync({alter: true}); // This creates/updates tables
    await Film.sync({alter: true}); // This creates/updates tables
    console.log("App is online");
  });