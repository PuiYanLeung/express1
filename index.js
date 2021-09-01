require("dotenv").config();

const express = require("express");
const { connection } = require("./db");
const indexRouter = require("./routes/index");
const errorRouter = require("./routes/error");
const userRouter = require("./routes/user");

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json()); // This ensures input is considered to be json

app.use("/", indexRouter);
app.use("/user", userRouter);
app.use("*", errorRouter);

app.listen(port, ()=>{
    connection.authenticate();
    console.log("App is online");
});
