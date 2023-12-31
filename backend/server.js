import 'dotenv/config' // Load .env file
import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from 'url'; // Converts a file URL to a file path string
import User from "./models/user.models.js";
import connectToMongoDB from "./helper/functions.js";

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

// Handling the signup request
app.post("/signup", async (req, res) => {
    console.log(req.body)
    try {
      // Create a new user object
      const newUser = await User.create({
        username: req.body.username,
        password: req.body.password, 
        email: req.body.email,
        cnic: req.body.cnic,
      });
      // Send a success response
      res.status(200).json({ message: 'Registration successful' });
    } catch (err) {
      // Log the error for debugging
      console.error(err);
      res.status(500).json({ message: 'username already exist' });
    }
  });
  
// Handling the signup request
app.post("/login", async (req, res) => {
    console.log(req.body)
    try {
      // find a user with the provided email
      const user = await User.findOne({
        email: req.body.email,
      })
      // if user exist then check password
      if (user){
        if (user.password === req.body.password){
          console.log("password match")
          res.status(200).json({ message: 'Login successful' });
        }
        else{
          console.log("password not match")
          res.status(500).json({ message: 'Invalid password' });
        }
      }
        else{
            console.log("user not found")
            res.status(500).json({ message: 'Invalid email' });
        }
    } catch (err) {
      // Log the error for debugging
      console.error(err);
      res.status(500).json({ message: 'Error logging in' });
    }
  });

  // User Dashboard route

  app.get('/dashboard', async(req, res) => {
    
    try {
        // Get the user ID from the session
        const userId = req.session.userId;

        // checking for the User
        if (!userId) {
          res.redirect('/login');
          return;
        }
        
        // Getting the data from database using user id
        const user = await User.findById(userId);
        res.json(user);
      } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
      }

  });

// Start your server
app.listen(port, () => {
    console.log('Server running on port '+ `http://localhost:${port}/`);
});
