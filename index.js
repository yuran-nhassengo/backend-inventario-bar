const express = require("express");
const dotenv = require("dotenv").config();


const connectDB = require("./connect/database");

connectDB();

const port = process.env.PORT;

const cors = require("cors");

const app = express();

app.use(express.json());

app.use(cors());

app.use(express.urlencoded({extended: false}));

app.use("/api/stock",require("./route/stock-route"));

app.use("/api/stock",require("./route/entrada-route"));
app.use("/api/stock",require("./route/saida-route"));


app.listen(port,()=>{
    console.log(`Listening on http://localhost:${port}`);
})