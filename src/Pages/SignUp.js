import { Box, Button, Checkbox, Container, FormControl, FormControlLabel, FormLabel, Grid, IconButton, InputAdornment, Radio, RadioGroup, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

const SignUp = () => {

  const [showPassword, setShowPassword] = React.useState(false);
  const [firstName,setFirstName] = useState("")
  const [lastName,setLastName] = useState("")
  const [gender,setGender] = useState("")
  const [email,setEmail] = useState("")
  const [password,setPassword] = useState("")

  const [firstNameDirty,setFirstNameDirty] = useState(false)
  const [lastNameDirty,setLastNameDirty] = useState(false)
  const [emailDirty,setEmailDirty] = useState(false)
  const [passwordDirty,setPasswordDirty] = useState(false)
  const [genderDirty,setGenderDirty] = useState(false)

  const [isEmailInvalid, setIsEmailInvalid] = useState(false)
  const [isPasswordInvalid, setIsPasswordInvalid] = useState(false)

  const [emailUpdates, setEmailUpdates] = useState(false)

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleFirstName = (e)=>{
    setFirstName(e.target.value)
    if(e.target.value===""){
      setFirstNameDirty(true)
    }else{
      setFirstNameDirty(false)
    }
  }
  const handleLastName = (e)=>{
    setLastName(e.target.value)
    if(e.target.value===""){
      setLastNameDirty(true)
    }else{
      setLastNameDirty(false)
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

  const handlePassword = (e)=>{
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

  const handleGender = (e)=> {
    setGender(e.target.value)
    if(e.target.value===""){
      setGenderDirty(true)
    }else{
      setGenderDirty(false)
    }
  }

  const handleEmailUpdates = (e)=> {
    setEmailUpdates(e.target.checked)
  }

  const onSignUp = (e)=> {
    e.preventDefault()

      if(firstName==="" || lastName==="" ||
       email==="" || password==="" || gender==="" || !validateEmail(email) || !validatePassword(password)
      ){
        if(firstName===""){
          setFirstNameDirty(true)
        }
        if(lastName===""){
          setLastNameDirty(true)
        }
        if(gender===""){
          setGenderDirty(true)
        }
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
        alert("signup")
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
          <Typography variant='h4' mt={2} align='center' >Sign up</Typography>
          <Box component="form" onSubmit={onSignUp}>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                
                  <TextField variant='outlined' fullWidth label="First name" margin='normal' onChange={handleFirstName} value={firstName}/>
                  {firstNameDirty ? <Typography color={"red"}>*FirstName required</Typography> : <></>}
              </Grid>
              <Grid item xs={6}>
                <TextField variant='outlined' fullWidth label="Last name" margin='normal' onChange={handleLastName} value={lastName}/>
                {lastNameDirty ? <Typography color={"red"}>*LastName required</Typography> : <></>}
              </Grid>
            </Grid>
            <Box component={Box} display={"flex"} alignItems={"center"} width={"100%"}>
              <FormLabel component={Typography} mr={3}>Gender</FormLabel>
              <RadioGroup row onChange={handleGender} value={gender}>
                <FormControlLabel control={<Radio/>} value="male" label="Male"/>
                <FormControlLabel control={<Radio/>} value="female" label="Female"/>
              </RadioGroup>
            </Box>
            {genderDirty ? <Typography color={"red"}>*Gender required</Typography> : <></>}

            <TextField variant='outlined' margin='normal'  fullWidth label="Email Address" onChange={handleEmail} value={email} />
            {emailDirty ? <Typography color={"red"}>*Email required</Typography> : isEmailInvalid ? <Typography color={"red"}>*Enter Valid Email</Typography> : <></>}

            <TextField variant='outlined' type={showPassword ? "text": "password"} margin='normal'  fullWidth label="Password"
              onChange={handlePassword} 
              value={password}
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
            <FormControl >
                <FormControlLabel control={<Checkbox onChange={handleEmailUpdates} value={emailUpdates}  />} label="I want to receive inspiration, marketing promotions and updates via email." />
            </FormControl>
            <Box mt={4}>
                <Button type='submit'variant='contained' fullWidth>Sign up</Button>
            </Box>
            <Box display={"flex"} justifyContent={"flex-end"} mt={3}>
              <a href="/"><Typography fontSize={13}>Already have an account? Sign in</Typography></a>
            </Box>
            
          </Box>
        </Box>
      </Container>
      
    </>
  )
}

export default SignUp
