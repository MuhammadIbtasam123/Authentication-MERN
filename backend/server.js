import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from 'url'; // Converts a file URL to a file path string
// import ImmudbClient from 'immudb-node'

import CheckUserInput from './database.js';

// //Database connection credentials
// const IMMUDB_HOST = '127.0.0.1'
// const IMMUDB_PORT = '3322'
// const IMMUDB_USER = '*******'
// const IMMUDB_PWD = '********'

// // creating a new client instance
// const cl = new ImmudbClient.default({ host: IMMUDB_HOST, port: IMMUDB_PORT });

// // login to the immudb server - IIFE ()() - Immediately Invoked Function Expression
// (async () => {
//     // login request object
//     const loginRequest = { user: IMMUDB_USER, password: IMMUDB_PWD }
//     try {
//       const loginResponse = await cl.login(loginRequest) 
//       const saveToken = loginResponse.token
//       console.log('success: login', loginResponse)
//     } catch (error) {
//       console.log('error while not logging, client to server : login', error)
//     }

// })()
// current file path
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = 3001;

// middleware
app.use(express.static(path.join(__dirname, '..', 'frontend', 'public')));
app.use(express.json());
app.use(cors());

app.post("/signup", async (req, res) => {
    console.log(req.body)
    // getting the user signup information from the frontend
    try {
      // Handling Database operations
      // Validate the user input
      // console.log(typeof(req.body))
      const check = CheckUserInput(req.body);
      // console.log(typeof(check));
      // console.log(req.body)
      // console.log(check);
      // Send a response back to the frontend

        res.status(200).json({ message: 'Registration successful' });
    } catch (error) {
        console.log("Error in sending data to backend",error);
    }
  });

// Start your server
app.listen(port, () => {
  // port with local host path  
    console.log('Server running on port '+ `http://localhost:${port}/`);
});

// cl.ping().then(() => {
//   console.log(`Immudb server is running on port : http://${IMMUDB_HOST}:${IMMUDB_PORT}`);
// }).catch((err) => {
//   console.error('Error connecting to Immudb server:', err);
// });