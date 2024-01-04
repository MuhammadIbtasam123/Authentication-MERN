import 'dotenv/config' // Load .env file
import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from 'url'; // Converts a file URL to a file path string
import connectToMongoDB from "./helper/functions.js";
import { SignupUser,LoginUser,UserDashboard  } from "./controllers/UserController.js";
 
// current file path
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const URL = 'mongodb://0.0.0.0:27017/notarynow'
const app = express();
const port = 3001;

// middleware
app.use(express.static(path.join(__dirname, '..', 'frontend', 'public')));
app.use(express.json());
app.use(cors());

// wrap mongoose connection in a function
connectToMongoDB(URL);

// Defining the routes
app.post("/signup", SignupUser);
app.post("/login", LoginUser);
app.get("/dashboard", UserDashboard);

// Start your server
app.listen(port, () => {
    console.log('Server running on port '+ `http://localhost:${port}/`);
});
