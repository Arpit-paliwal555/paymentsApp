
import './userbar.css'
import { useNavigate } from 'react-router-dom'

export const Userbar = ({user}) => {
    const navigate = useNavigate();
  return (
    <div className='userlist'>
        <div >
            <img src="avatar.png" alt="Avatar" className="avatar"></img>
        </div>
        <div className='username'>
        {user.firstName}
        &nbsp;{user.lastName}
        </div>
        <button id='sendbutton'
        onClick={(e) => {
            navigate("/send?id=" + user._id + "&name=" + user.firstName);
        }}>Send Money</button>
    </div>
  )
}
