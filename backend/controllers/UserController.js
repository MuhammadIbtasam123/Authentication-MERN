import User from "../models/user.models.js";

  export const SignupUser = async (req, res) => {
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
  };

  export const LoginUser = async (req, res) => {
    console.log(req.body)
    try {
      // find a user with the provided email
      const user = await User.findOne({
        email: req.body.email,
      })
      // if user exist then check password
      if (user){
        if (user.password === req.body.password){
          // if password match then send a redirect to the dashboard

          console.log("password match")
          res.status(200).json({ message: 'Login successful' });
        }
        else{
          console.log("password not match")
          res.status(500).json({ message: 'Invalid password' });
        }
      }
        else{
            res.status(500).json({ message: 'User not found!' });
        }
    } catch (err) {
      // Log the error for debugging
      console.error(err.message);
      res.status(500).json({ message: err.message});
    }
  }

  export const UserDashboard = async (req, res) => {
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
  }

