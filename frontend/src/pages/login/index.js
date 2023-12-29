import { Box } from '@mui/material'
import Typography from '@mui/material/Typography';
import React from 'react'
import './index.css'
import { Link } from 'react-router-dom';
import UserImg from '../../assets/USer.png'

const Login = ({AccountName}) => {
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
                    <input type="text" placeholder="Username" className="text-field" />
                    <input
                        type="password"
                        placeholder="Password"
                        className="text-field"
                    />
                    <button className="login-button">Login</button>
                    <Link href="#" className="forgot-password">
                        Forgot Password?
                    </Link>
            </Box>
        </Box>
    </Box>
  )
}

export default Login