import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";


const app = express()

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))

// Used to limit the size of json file data which we will receive using forms or params
app.use(express.json({
    limit: "16kb"
}))

// This is used to encode the decoded url
app.use(express.urlencoded({
    extended:true,
    limit: "16kb"
}))

// for storing some images on local server for temporary basis
app.use(express.static("public"))

// Cookie-Parser is used to set and read cookies of user's browser securely
app.use(cookieParser())

export { app }