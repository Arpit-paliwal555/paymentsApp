import React from 'react'
// installed axios.
import axios from 'axios'
import { useState } from 'react'
import './signup.css'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'

export const Signup = () => {
  const [userName, setUserName] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate();

  return (
    <div id="container1">
        <h1 id='signuptittle'>Sign Up</h1>
        <p id='info'>Enter your Information to create an account</p>
        <h3 className='signupdetails'>Username</h3>
        <input type="text" placeholder= "example@xyz.com" className='signupinput' 
            onChange={(e) => {
              setUserName(e.target.value)
            }}
        />
        <h3 className='signupdetails' >First Name</h3>
        <input type="text" placeholder='Firstname' className='signupinput' 
            onChange={(e) => {
              setFirstName(e.target.value)
            }}
        />
        <h3 className='signupdetails' >Last Name</h3>
        <input type="text" placeholder='Lastname' className='signupinput'
            onChange={(e) => {
              setLastName(e.target.value)
            }}
        />
        <h3 className='signupdetails'>Password</h3>
        <input type="text" placeholder= "password"  className='signupinput'
            onChange={(e) => {
              setPassword(e.target.value)
            }}
        /><br></br>
        <button onClick={
          async() => {
            const response  = await axios.post('http://localhost:3000/api/v1/user/signup', {
              userName,
              firstName,
              lastName,
              password,
            })
          localStorage.setItem('token', response.data.token);
          navigate('/dashboard');
        }} id='submitbutton'>Submit</button>
        <p>Already have an account? <Link to={'/signin'}>Log in</Link></p>
    </div>
  )
}

