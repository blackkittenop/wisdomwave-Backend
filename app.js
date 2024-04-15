import express from "express";
import {config} from "dotenv";
import ErrorMiddleware from "./middlewares/Error.js";
import cookieParser from "cookie-parser";
import payment from "./routes/paymentRoute.js";
import other from "./routes/otherRoutes.js";
import cors from "cors";

config({
    path:"./config/config.env",
})



const app = express();


//Using Middlewares

app.use(express.json());
app.use(express.urlencoded({
    extended:false,
}));
app.use(cookieParser());
app.use(cors({
    origin:process.env.FRONTEND_URL,
    credentials:true,
    methods:["GET","POST","PUT","DELETE"],
}));

//importing and using routes
import course from "./routes/courseRoutes.js";
import user from "./routes/userRoutes.js";

app.get("/",(req,res)=>{
    res.send(`Click here to visit frontend ${process.env.FRONTEND_URL}`);
});

app.use("/api/v1",course);
app.use("/api/v1",user);
app.use("/api/v1",payment);
app.use("/api/v1",other);


export default app;

app.get("/",(req,res)=>{
    res.send(`<h1>Server Is Working, click to visit frontend <a href=${process.env.FRONTEND_URL}> </h1>`);
})

app.use(ErrorMiddleware)