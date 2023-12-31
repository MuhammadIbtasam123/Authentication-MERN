import { useState } from 'react'
import axios from 'axios'
import { Box } from '@mui/material'
import Typography from '@mui/material/Typography';
import React from 'react'
import './index.css'
import { Link } from 'react-router-dom';
import UserImg from '../../assets/USer.png'

const Login = ({AccountName}) => {

    // Dynamic states for input fields
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    // handling login request
    const handleLogin = async (event)=>{
        event.preventDefault();
        try {
            // sending login requet to backend on endpoint /login using axios
            const response = await axios.post('http://localhost:3001/login', {
                email: email,
                password: password,
              })

            // handling response from backend
            await response.then((res) => {
                if (res.status === 200) {
                    // notification for successful login
                    // redirect to dashboard page 
                    console.log(res)
                    alert("Login Successful")
                }
                else if (res.status === 500) {
                    // notification for unsuccessful signup
                    // redirect to login page again with error message 
                    alert("Invalid username or password")
                }
            })
              
        } catch (error) {
            console.log(error)
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
                <Typography gutterBottom variant='h5'>Login</Typography>
                    <input 
                        type="text" 
                        placeholder="Enter you email" 
                        className="text-field" 
                        name="email"
                        value={email}
                        onChange={(event)=>{setEmail(event.target.value)}}
                        />
                    <input
                        id='password'
                        type="password"
                        placeholder="Password"
                        className="text-field"
                        name='password'
                        value={password}
                        onChange={(event)=>{setPassword(event.target.value)}}
                    />
                    <button 
                        className="login-button"
                        type='button'
                        onClick={handleLogin}
                    >Login
                    </button>
                    <Link href="#" className="forgot-password">
                        Forgot Password?
                    </Link>
            </Box>
        </Box>
    </Box>
  )
}

export default Login