import { Box, Button, Container, Grid, IconButton, InputAdornment, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { Link } from 'react-router-dom';

const ForgotPass = () => {

    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")

    const [emailDirty,setEmailDirty] = useState(false)
    const [passwordDirty,setPasswordDirty] = useState(false)

    const [isEmailInvalid, setIsEmailInvalid] = useState(false)
    const [isPasswordInvalid, setIsPasswordInvalid] = useState(false)

    const [showPassword, setShowPassword] = React.useState(false);

    const handleClickShowPassword = (e) => {
        setShowPassword((show) => !show);
    }

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const handleEmail = (e)=>{
        setEmail(e.target.value)
        if(e.target.value===""){
            setEmailDirty(true)   
        }else{
            setEmailDirty(false)
        }

        if(validateEmail(e.target.value)){
            setIsEmailInvalid(false)
        }else{
            setIsEmailInvalid(true)
        }

    }

    const handlePassword = (e)=> {
        setPassword(e.target.value)
        if(e.target.value===""){
            setPasswordDirty(true)
        }else{
            setPasswordDirty(false)
        }

        if(validatePassword(e.target.value)){
            setIsPasswordInvalid(false)
        }else{
            setIsPasswordInvalid(true)
        }
    }

    const onLogin = (e)=> {
        e.preventDefault()
        if(email==="" || password==="" || !validateEmail(email) || !validatePassword(password)) {
            if(email===""){
                setEmailDirty(true) 
            }
            if(password===""){
                setPasswordDirty(true)
            }
            if(!validateEmail(email)){
                setIsEmailInvalid(true)
            }
            if(!validatePassword(password)){
                setIsPasswordInvalid(true)
            }
        }else{
            alert("forgot Password")
        }
    }

    const validateEmail = (email) => {
        return email.match(
          /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
      };

    const validatePassword = (password) => {
        const re = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
        return password.match(
            re
        );
    };

  return (
    <Container maxWidth="xs">
            <Box display={'flex'} flexDirection={'column'} pt={10}>
                <img src='swiggy.png' height={80} width={"100%"}  />
                <Typography mt={3} align='center' variant='h4'>Forgot Password</Typography>
                <Box component={"form"} onSubmit={onLogin} >
                    <TextField variant='outlined' margin='normal'  fullWidth label="Email Address" onChange={handleEmail} value={email}/>
                        {emailDirty ? <Typography color={"red"}>*Email required</Typography> : isEmailInvalid ? <Typography color={"red"}>*Enter Valid Email</Typography> : <></>}
                    <TextField variant='outlined' type={showPassword ? "text": "password"} margin='normal'  fullWidth label="Password" 
                        onChange={handlePassword}
                        InputProps={{
                            endAdornment: <InputAdornment position="end">
                            <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                            onMouseUp={handleMouseDownPassword}
                            edge="end"
                            >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                            </InputAdornment>,
                        }}
                    />
                    { passwordDirty ? <Typography color={"red"}>*Password required</Typography> : isPasswordInvalid ? <Typography color={"red"}>*Enter Valid Password</Typography> : <></> }
                    
                    <Box mt={4}>
                        <Button type='submit'variant='contained' fullWidth>Reset Password</Button>
                    </Box>
                </Box>
                <Grid container pt={3}>
                    <Grid item xs={6}>
                        <Link to={"/"}><Typography fontSize={13}>Go to login page</Typography></Link>
                    </Grid>
                </Grid>
            </Box>

        </Container>
  )
}

export default ForgotPass
