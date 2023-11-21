import { Box, Button, Container, Grid, IconButton, InputAdornment, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { resetPassword } from '../Store/userSlice';

const ForgotPass = () => {

    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")

    const [emailDirty,setEmailDirty] = useState(false)
    const [passwordDirty,setPasswordDirty] = useState(false)

    const [isEmailInvalid, setIsEmailInvalid] = useState(false)
    const [isPasswordInvalid, setIsPasswordInvalid] = useState(false)

    const [showPassword, setShowPassword] = useState(false);

    const [confPasswordDirty, setConfPasswordDirty] = useState(false)
    const [isConfPassInvalid, setIsConfPassInvalid] = useState(false)
    const [confShowPass, setConfShowPass] = useState(false)
    const [confPassword,setConfPassword] = useState("")

    const users = useSelector((state)=> state.user)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleClickShowPassword = (e) => {
        setShowPassword((show) => !show);
    }

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const handleClickConfShowPassword = (e) => {
        setConfShowPass((show) => !show);
    }

    const handleConfPassword = (e)=> {
        setConfPassword(e.target.value)
        if(e.target.value===""){
            setConfPasswordDirty(true)
        }else{
            setConfPasswordDirty(false)
        }

        if(e.target.value === password){
            setIsConfPassInvalid(false)
        }else{
            setIsConfPassInvalid(true)
        }
    }

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

        if(e.target.value === confPassword){
            setIsConfPassInvalid(false)
        }else{
            setIsConfPassInvalid(true)
        }
    }

    const onForgotPass = (e)=> {
        e.preventDefault()
        if(email==="" || password==="" || !validateEmail(email) || !validatePassword(password) || confPassword!==password) {
            if(email===""){
                setEmailDirty(true) 
            }
            if(password===""){
                setPasswordDirty(true)
            }
            if(confPassword===""){
                setConfPasswordDirty(true)
            }
            if(!validateEmail(email)){
                setIsEmailInvalid(true)
            }
            if(!validatePassword(password)){
                setIsPasswordInvalid(true)
            }
            if(confPassword!==password){
                setIsConfPassInvalid(true)
            }
        }else{
            
            if(users.length===0){
                alert("there are no users available.")
            }else {
                let match = false
                users.forEach(user => {
                    if(user.email===email){
                        match = true
                    }
                });
                if(match){
                    dispatch(resetPassword({email: email, password: confPassword}))
                    alert("Password successfully reset")
                    navigate("/")
                }else {
                    alert("User not found with given email.")
                }
            }
            
        }
    }

    const validateEmail = (email) => {
        const re = '[a-z0-9]+@[a-z]+\.[a-z]{2,3}'
        return email.match(
          re
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
                <Box component={"form"} onSubmit={onForgotPass} >

                    <TextField name='email' variant='outlined' margin='normal'  fullWidth label="Email Address" onChange={handleEmail} value={email}/>
                        {emailDirty ? <Typography color={"red"}>*Email required</Typography> : isEmailInvalid ? <Typography color={"red"}>*Enter Valid Email</Typography> : <></>}
                    <TextField name='password' variant='outlined' type={showPassword ? "text": "password"} margin='normal'  fullWidth label="Password" value={password}
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
                    { passwordDirty ? <Typography color={"red"}>*Password required</Typography> : isPasswordInvalid ? <Typography color={"red"}>*Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters</Typography> : <></> }
                    

                    <TextField name='confPassword' variant='outlined' type={confShowPass ? "text": "password"} margin='normal'  fullWidth label="Confirm Password" value={confPassword}
                        onChange={handleConfPassword}
                        InputProps={{
                            endAdornment: <InputAdornment position="end">
                            <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickConfShowPassword}
                            onMouseDown={handleMouseDownPassword}
                            onMouseUp={handleMouseDownPassword}
                            edge="end"
                            >
                            {confShowPass ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                            </InputAdornment>,
                        }}
                    />

                    { confPasswordDirty ? <Typography color={"red"}>*Confirm Password required</Typography> : isConfPassInvalid ? <Typography color={"red"}>*Password must match</Typography> : <></> }

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
