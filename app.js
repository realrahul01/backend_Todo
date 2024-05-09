import express from "express";
import userRouter from './routes/user.js'
import {config} from 'dotenv'
import cookieParser from "cookie-parser";
import taskRouter from './routes/task.js'
import cors from 'cors'

export const app = express();

config({
  path:'./data/config.env'
})

// middlewares
app.use(express.json()); // with this help of express.json() middleware we can request data in the data it means we can post data with the help of this middleware

app.use(cookieParser())  // with the help of this middleware i can excess cookie

app.use(cors({
  origin: [process.env.FRONTEND_URL],
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}))


// routes
app.use('/api/v1/user', userRouter)
app.use('/api/v2/task', taskRouter)


app.get("/", (req, res) => {
  res.send("Hello world");
});


