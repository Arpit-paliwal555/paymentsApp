
import './dashboard.css'
import { Userbar } from '../components/userbar.jsx'
import { useState, useEffect } from 'react'
import axios from 'axios'
//import { use } from '../../backend/routes/user.js'


export const Dashboard = () => {
  const [users, setUsers] = useState([])
  const [filter, setFilter] = useState('')
  const [balance, setBalance] = useState(0);
  const token = localStorage.getItem('token');
  useEffect(() => {
    axios.get('http://localhost:3000/api/v1/user/profile?filter='+filter)
    .then(response => {
      setUsers(response.data.user)
    })
  },[filter]);

  async function getBalance(){
    const response = await axios.get('http://localhost:3000/api/v1/account/balance',{
      headers: {
        Authorization: `Bearer ${token}` 
      }
    });
    return response.data.balance;
  }
  useEffect(() => {
    async function fetchBalance() {
      const balance = await getBalance();
      if(!balance){
        console.log('no balance');
      }
      setBalance(balance);
    }
    fetchBalance();
  },[])
  return (
    <div id='container4'>
        <div id='navbar'>
            <h1 id='payments-tittle'>Payments</h1>
            <h3 id='current-profile'>Profile</h3>
            <img src="avatar.png" alt="Avatar" className="avatar"></img>
        </div>
        <hr/>
        <h2 id='balance'>Your Balance : {balance ? balance : 'Loading...'}</h2>
        <input id='search' type="text" placeholder='Search Users...'
          onChange={(e) => {
            setFilter(e.target.value)
          }}
        />
        <div>
        {users.map((user,index) => <Userbar key={index} user={user}></Userbar>)}
        </div>
        
        
        
    </div>
  )
}
