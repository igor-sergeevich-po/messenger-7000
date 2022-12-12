import { signOut } from 'firebase/auth';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import avatar from '../assets/img/user-avatars-icon.png';
import { auth } from '../firebase';


export const Navbar = () => {
  const navigate = useNavigate();

  const userLogOut = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        console.log('user out!')
        navigate('/messenger-7000/login')
      })
      .catch((error) => {
        // An error happened.
        console.log(error.message)
    });
  }
  return (
    <div className='navbar'>
        <span className="navbar_logo-title">M 7000</span>
        <div className="navbar_user">
            <img className='navbar_user-avatar' src={avatar} alt="" />
            <span className="navbar_user-name">Lord</span>
            <button onClick={userLogOut} className="navbar_logout">logout</button>
        </div>
    </div>
  )
}
