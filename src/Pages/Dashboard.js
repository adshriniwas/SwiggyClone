import { Button } from '@mui/material'
import React from 'react'
import { Link, useSearchParams } from 'react-router-dom'

const Dashboard = () => {
    const [searchParams] = useSearchParams()
  return (
    <div>
      <h1>Hi {searchParams.get("name")} welcome to Dashboard</h1>
      <h2>Gender = {searchParams.get("gender")}</h2>
      <h2>Email = {searchParams.get("email")}</h2>
      <h2>Password = {searchParams.get("password")}</h2>
      <Link to={"/"}><Button variant='contained'>Back to Login</Button></Link>
    </div>
  )
}

export default Dashboard
