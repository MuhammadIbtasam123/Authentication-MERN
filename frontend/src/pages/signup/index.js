import axios from 'axios'
import { Box } from '@mui/material'
import Typography from '@mui/material/Typography';
import React from 'react'
import './index.css'
import UserImg from '../../assets/USer.png'
import {useState} from 'react'

const Signup = ({AccountName}) => {
    // Dynamic states for input fields
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmpassword, setConfirmPassword] = useState('')
    const [cnic, setCnic] = useState('')

    const handleRegister = (e) => {
        e.preventDefault();
        // Check if any field is empty
        (username === '' || email === '' || password === '' || confirmpassword === '' || cnic === '') && alert("Please fill all the fields")

        // Check if password and confirm password are same
        (password !== confirmpassword) && alert("Password and Confirm Password are not same")    

        // chehc if cnic is 13 digits
        cnic.length !== 13 && alert("CNIC should be 13 digits")

        // parsing cnic to format of 35202-8368021-7
        let cnicFormat = cnic.toString()
        cnicFormat = cnicFormat.slice(0,5) + '-' + cnicFormat.slice(5,12) + '-' + cnicFormat.slice(12,13)
    
        try {
            const response = axios.post('http://localhost:3001/signup', {
                username: username,
                email: email,
                password: password,
                confirmpassword: confirmpassword,
                cnic: cnicFormat
              })
            console.log("Forntend sa backend pa data chala gaya hai response ka wait hai !",response);
        } catch (error) {
            console.log("Error in sending data to backend",error);
        }
    }

  return (
    <Box className="LoginContainer">
        <Box className="LoginBox">
            <Box className="LoginUserImg">
                <img src={UserImg} alt="User" className='LoginImg'/>
                <Typography variant='h6' className='LoginUserImgName' gutterbottom>
                    {`${AccountName} Account`}
                </Typography>
            </Box>
            <Box className="LoginUserData">
                <Typography gutterBottom variant='h5'>Sign Up</Typography>
                    {/* Username */}
                    <input 
                        id='username'
                        type="text" 
                        placeholder="Username" 
                        className="text-field" 
                        name="username"
                        value={username}
                        onChange={(event)=>{ setUsername(event.target.value)}}
                        />

                    {/* email */}
                    <input 
                        id='email'
                        type="email" 
                        placeholder="Email" 
                        className="text-field" 
                        name="email"
                        value={email}
                        onChange={(event)=>{ setEmail(event.target.value)}}
                        />

                    {/* Password */}
                    <input
                        id='password'
                        type="password"
                        placeholder="Password"
                        className="text-field"
                        name='password'
                        value={password}
                        onChange={(event)=>{ setPassword(event.target.value)}}
                    />

                    {/* Confirm password */}
                    <input
                        id='confirmpassword'
                        type="password"
                        placeholder="Confirm Password"
                        className="text-field"
                        name='confirmpassword'
                        value={confirmpassword}
                        onChange={(event)=>{ setConfirmPassword(event.target.value)}}
                    />

                    {/* CNIC */}
                    <input 
                        id='cnic'
                        type="text" 
                        placeholder="CNIC" 
                        className="text-field" 
                        name="cnic"
                        maxLength='13'
                        value={cnic}
                        onChange={(event) => {
                            const userInput = event.target.value;
                            const regex = /^[0-9]*$/; // Regular expression to allow only numeric input
                            (regex.test(userInput) || userInput === '') && setCnic(userInput);
                        }}
                        />
                    <button 
                    className="login-button" 
                    type='button'
                    onClick={handleRegister}
                    >Register</button>
            </Box>
        </Box>
    </Box>
  )
}

export default Signup

/*
should be the path where server is hosted and listening to,  then /endpint work.
endpoint: http://localhost:3001/signup

*/