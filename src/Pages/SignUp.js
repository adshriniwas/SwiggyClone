import { Box, Button, Checkbox, Container, FormControl, FormControlLabel, FormLabel, Grid, IconButton, InputAdornment, Radio, RadioGroup, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { createUser } from '../Store/userSlice';

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

  const [confPasswordDirty, setConfPasswordDirty] = useState(false)
  const [isConfPassInvalid, setIsConfPassInvalid] = useState(false)
  const [confShowPass, setConfShowPass] = useState(false)
  const [confPassword,setConfPassword] = useState("")

  const [emailUpdates, setEmailUpdates] = useState(false)

  const dispatch = useDispatch();
  const users = useSelector((state)=> state.user)
  const navigate = useNavigate()

  const handleClickShowPassword = () => setShowPassword((show) => !show);

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

    if(e.target.value === confPassword){
      setIsConfPassInvalid(false)
    }else{
        setIsConfPassInvalid(true)
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
       email==="" || password==="" || gender==="" || !validateEmail(email) || !validatePassword(password) || confPassword!==password
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
        
        let unique = false;

        if(users.length===0){
          dispatch(createUser({name: firstName+" "+lastName, gender: gender, email: email, password: confPassword}))
          alert("sign up")
          navigate("/")
        }else {
          users.forEach(user => {
            if(user.email!==email){
              unique = true;
            }
          });
          if(unique){
            dispatch(createUser({name: firstName+" "+lastName, gender: gender, email: email, password: confPassword}))
            alert("sign up")
            navigate("/")
          }else{
            alert("email already exists")
          }
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
          <Typography variant='h4' mt={2} align='center' >Sign up</Typography>
          <Box component="form" onSubmit={onSignUp}>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                
                  <TextField name='firstName' variant='outlined' fullWidth label="First name" margin='normal' onChange={handleFirstName} value={firstName}/>
                  {firstNameDirty ? <Typography color={"red"}>*FirstName required</Typography> : <></>}
              </Grid>
              <Grid item xs={6}>
                <TextField name='lastName' variant='outlined' fullWidth label="Last name" margin='normal' onChange={handleLastName} value={lastName}/>
                {lastNameDirty ? <Typography color={"red"}>*LastName required</Typography> : <></>}
              </Grid>
            </Grid>
            <Box component={Box} display={"flex"} alignItems={"center"} width={"100%"}>
              <FormLabel component={Typography} mr={3}>Gender</FormLabel>
              <RadioGroup name='gender' row onChange={handleGender} value={gender}>
                <FormControlLabel control={<Radio/>} value="male" label="Male"/>
                <FormControlLabel control={<Radio/>} value="female" label="Female"/>
              </RadioGroup>
            </Box>
            {genderDirty ? <Typography color={"red"}>*Gender required</Typography> : <></>}

            <TextField name='email' variant='outlined' margin='normal'  fullWidth label="Email Address" onChange={handleEmail} value={email} />
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


            <FormControl >
                <FormControlLabel control={<Checkbox onChange={handleEmailUpdates} value={emailUpdates}  />} label="I want to receive inspiration, marketing promotions and updates via email." />
            </FormControl>
            <Box mt={4}>
                <Button type='submit'variant='contained' fullWidth>Sign up</Button>
            </Box>
            <Box display={"flex"} justifyContent={"flex-end"} mt={3}>
              <Link to={"/"}><Typography fontSize={13}>Already have an account? Sign in</Typography></Link>
            </Box>
            
          </Box>
        </Box>
      </Container>
      
    </>
  )
}

export default SignUp
