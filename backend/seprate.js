import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from 'url'; // Converts a file URL to a file path string

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = 3001;

// Your other middleware and setup code
app.use(express.static(path.join(__dirname, '..', 'frontend', 'public')));
app.use(express.json());
app.use(cors());


// app.get('/login', (req, res) => {
//     // Send the 'signup/index.js' file to the frontend directory as a response
//     res.sendFile(path.join(__dirname, '..', 'frontend','src','pages', 'signup', 'index.jsx'));
//   });

// Handle registration POST request
app.post('/signup', (req, res) => {
    const { username, email, password, confirmpassword, cnic } = req.body;
    console.log(
      `Username: ${username} Email: ${email} Password: ${password} ConfirmPassword: ${confirmpassword} CNIC: ${cnic}`
    );
  
    // Implement your logic to store the received data or perform registration here
    // For example, you might want to save this data to a database
  
    // Send a response back to the frontend
    res.status(200).json({ message: 'Registration successful' });
  });


// Start your server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});




const handleRegister = (e) => {
    e.preventDefault();
    console.log(
        'hello world',
        username,
        email,
        password,
        confirmpassword,
        cnic
    )
    // Check if password and confirm password are same
    (password !== confirmpassword) && alert("Password and Confirm Password are not same")

    // parsing cnic to format of 35202-8368021-7
    let cnicFormat = cnic.toString()
    cnicFormat = cnicFormat.slice(0,5) + '-' + cnicFormat.slice(5,12) + '-' + cnicFormat.slice(12,13)

    try {
        const response = axios.post('/signup', {
            username: username,
            email: email,
            password: password,
            confirmpassword: confirmpassword,
            cnic: cnic
          })

        console.log("Forntend sa backend pa data chala gaya hai response ka wait hai !",response);
    } catch (error) {
        console.log("Error in sending data to backend",error);
    }
}



      // login to the immudb server
      const loginResponse = await cl.login(loginRequest)
      // get the token
      const token = loginResponse.token
      // set the token in the client instance
      cl.setToken(token)
      // get the user from the immudb server
      const user = await cl.whoAmI()
      // print the user
      console.log('Logged in as user:', user.username)