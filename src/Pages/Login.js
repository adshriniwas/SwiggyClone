import { Box, Button, Checkbox, Container, FormControl, FormControlLabel, Grid, IconButton, InputAdornment, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useSelector } from 'react-redux';


const Login = () => {

    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")
    const [remember,setRemember] = useState(false)
    const [emailDirty,setEmailDirty] = useState(false)
    const [passwordDirty,setPasswordDirty] = useState(false)

    const [isEmailInvalid, setIsEmailInvalid] = useState(false)
    const [isPasswordInvalid, setIsPasswordInvalid] = useState(false)

    const [showPassword, setShowPassword] = useState(false);
    const users = useSelector((state)=> state.user)
    const navigate = useNavigate()

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

    const handleRemember = (e)=> {
        setRemember(e.target.checked)
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
            let match = false
            let matchEmail = false
            let name = ""
            let gender = ""
            let uEmail = ""
            let uPass = ""

            users.forEach(user => {
                if(user.email===email && user.password===password){
                    match = true
                    name = user.name
                    gender = user.gender
                    uEmail = user.email
                    uPass = user.password
                }else if(user.email===email){
                    matchEmail = true
                }
            });
            if(match){
                navigate(`/dashboard?name=${name}&gender=${gender}&email=${uEmail}&password=${uPass}`)
            }else if(matchEmail){
                alert("password is wrong")
            }
            else{
                alert("email is not found")
            }
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
    <>

        <Container maxWidth="xs">
            <Box display={'flex'} flexDirection={'column'} pt={10}>
                <img src='swiggy.png' height={80} width={"100%"}  />
                <Typography mt={3} align='center' variant='h4'>Sign In</Typography>
                <Box component={"form"} onSubmit={onLogin} >
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
                    <FormControl >
                        <FormControlLabel control={<Checkbox onChange={handleRemember} value={remember} />} label="Remember me" />
                    </FormControl>
                    <Box mt={4}>
                        <Button type='submit'variant='contained' fullWidth>Sign In</Button>
                    </Box>
                </Box>
                <Grid container pt={3}>
                    <Grid item xs={6}>
                        
                        <Link to={"/forgotPassword"}><Typography fontSize={13}>Forgot password?</Typography></Link>
                    </Grid>
                    <Grid item xs={6}>
                        <Link to={"/signup"}><Typography fontSize={13}>Dont have an account? Sign up</Typography></Link>
                    </Grid>
                </Grid>
            </Box>

        </Container>
      
    </>
  )
}

export default Login
