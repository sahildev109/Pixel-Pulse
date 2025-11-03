import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import session from 'express-session';
import passport from './config/passport.js';
import authRoutes from './routes/auth.routes.js';
import searchRoutes from './routes/search.routes.js';
import historyRoutes from './routes/history.routes.js'


dotenv.config();

const app = express();




app.use(cors({
  origin:  'http://localhost:5173',
  credentials: true
}));
app.use(express.json());

app.use(session({
  secret: process.env.SESSION_SECRET ,
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false }
}));
app.use(passport.initialize());
app.use(passport.session());



app.get("/", (req, res) => {
    res.send("Hello World!");
});

connectDB();

app.use('/auth',authRoutes)
app.use('/api', searchRoutes)
app.use('/api', historyRoutes);

const PORT = process.env.PORT || 5000;  
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
