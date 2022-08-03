const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const authRoute = require("./routes/auth");

const app = express();
dotenv.config();

mongoose.connect(process.env.MONGODB_URL, () => {
    console.log(" Connected  to mongodb");
})

app.use(cors());
app.use(cookieParser()); // tạo cookie
app.use(express.json()); // sử dụng để data resquest và respond dưới dạng json

// ROUTES
app.use("/v1/auth",authRoute);

app.listen(8000, () =>{
    console.log("Server is running");
});

// AUTHENTICATION

// AUTHORIZATION , PHAN QUYEN

