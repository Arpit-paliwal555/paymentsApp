// installed npm add react-router-dom

import { useState} from 'react'
import './App.css'
import { Route,Routes, BrowserRouter } from 'react-router-dom'
//import { sign } from 'jsonwebtoken'
import { Signup } from '../pages/signup.jsx'
import { Signin } from '../pages/signin.jsx'
import { Dashboard } from '../pages/dashboard.jsx'
import { SendMoney } from '../pages/sendmoney.jsx'

function App() {

  return (
    <>
    <BrowserRouter>
      <Routes>
      <Route path="/signup" element={<Signup/>}></Route>
      <Route path="/signin" element={<Signin/>}></Route>
      <Route path="/dashboard" element={<Dashboard/>}></Route>
      <Route path="/send" element={<SendMoney/>}></Route>
      </Routes>
      </BrowserRouter>
    
    </>
  )
}
/*<BrowserRouter>
      <Routes>
      <Route path="/signup" element={<Signup/>}></Route>
      <Route path="/signin" element={<Signin/>}></Route>
      <Route path="/dashboard" element={<Dashboard/>}></Route>
      <Route path="/send" element={<SendMoney/>}></Route>
      </Routes>
      </BrowserRouter>
*/

export default App
