import { Link } from 'react-router-dom'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import './signin.css'
export const Signin = () => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  return (
    <div id="container2">
        <h1 id='signintittle'>Sign In</h1>
        <p id='info'>Enter your log in credentials</p>
        <h3 className='signindetailstitle'>Username</h3>
        <input type="text" placeholder= "example@xyz.com" className='signininput'
         onChange={(e)=>{
          setUserName(e.target.value)
         }
         } />
        <h3 className='signindetailstitle'>Password</h3>
        <input type="text" placeholder= "password" className='signininput' 
          onChange={(e)=>{
            setPassword(e.target.value)
          }}
        /><br></br>
        <button onClick={
          async() => {
              const response  = await axios.post('http://localhost:3000/api/v1/user/signin', {
                userName,
                password,
              })
            localStorage.setItem('token', response.data.token);
            navigate('/dashboard');
            
          }
        } id='loginbutton'>Log In</button>
        <p>Don't have an account? <Link to={'/signup'}>Sign Up</Link></p>
    </div>
  )
}
