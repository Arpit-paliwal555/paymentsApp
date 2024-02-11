import React from 'react'
import './sendmoney.css'
import axios
 from 'axios'

export const SendMoney = () => {
  return (
    <div id='container3'>
        <h1 id='tittle'>Send Money</h1>
        <h3 className='details'>Reciepient's Username</h3>
        <input type="text" placeholder= "Recipient's Username"  />
        <h3 className='details' >Amount</h3>
        <input type="text" placeholder='Amount' />
        <button id='transferbutton'>Transfer</button>
    </div>
  )
}
