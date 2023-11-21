import { Button } from '@mui/material'
import React from 'react'
import { Link, useLocation, useSearchParams } from 'react-router-dom'

const Dashboard = () => {
    
    const location = useLocation()
  return (
    <div>
      <h1>Hi {location.state.name} welcome to Dashboard</h1>
      <h2>Gender = {location.state.gender}</h2>
      <h2>Email = {location.state.email}</h2>
      <Link to={"/"}><Button variant='contained'>Back to Login</Button></Link>
    </div>
  )
}

export default Dashboard
