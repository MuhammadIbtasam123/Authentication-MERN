import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from 'url'; // Converts a file URL to a file path string
import ImmudbClient from 'immudb-node'

// current file path
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = 3001;

// middleware
app.use(express.static(path.join(__dirname, '..', 'frontend', 'public')));
app.use(express.json());
app.use(cors());

//Database connection credentials
const IMMUDB_HOST = '127.0.0.1'
const IMMUDB_PORT = '3322'
const IMMUDB_USER = 'immudb'
const IMMUDB_PWD = "*******"  
const URL = `http://${IMMUDB_HOST}:${IMMUDB_PORT}/`    
const DATABASE = 'notarynow'        

// creating a new client instance
const cl = new ImmudbClient.default({ host: IMMUDB_HOST, port: IMMUDB_PORT });
(async () => {
    try {
      // login request object
      const loginRequest = { user: IMMUDB_USER, password: IMMUDB_PWD}
      const loginResponse = await cl.login(loginRequest) 
      const saveToken = loginResponse.token

      // List databases and check if database exists
      const listDatabaseRes = await cl.listDatabases()
      
      // console.log('success: databaseList', listDatabaseRes)
      const {databasesList} = listDatabaseRes
      const notaryDatabase = databasesList.find(database => {
        return database.databasename === DATABASE; 
      });
      if (!notaryDatabase) {
        const createDatabaseReq = { databasename: DATABASE }
        const createDatabaseRes = await cl.createDatabase(createDatabaseReq)
        console.log('success: createDatabase', createDatabaseRes)
      }
      else{
        console.log('Database already exists')
      }

      //use database
      const db = await cl.useDatabase({databasename: DATABASE})
      console.log('success: useDatabase', db)

    } catch (error) {
      console.log(' error while login! ', error)
    }

})()

// Handling the signup request
app.post("/signup", async (req, res) => {
    console.log(req.body)
    // getting the user signup information from the frontend
    try {
      const check = CheckUserInput(req.body);
        res.status(200).json({ message: 'Registration successful' });
    } catch (error) {
        console.log("Error in sending data to backend",error);
    }
  });

// Start your server
app.listen(port, () => {
    console.log('Server running on port '+ `http://localhost:${port}/`);
});
