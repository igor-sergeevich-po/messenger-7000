import { signOut } from 'firebase/auth';
import { getDownloadURL, ref } from 'firebase/storage';
import React, { useContext, useEffect } from 'react';

import { useNavigate } from 'react-router-dom';
import avatar from '../assets/img/user-avatars-icon.png';
import { auth, storage } from '../firebase';
import { AuthContext } from '../hoc/AuthContext';



export const Navbar = () => {
  const {currentUser} = useContext(AuthContext)


  const navigate = useNavigate();

  const userLogOut = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
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
            <img className='navbar_user-avatar' src={currentUser?.photoURL ? currentUser.photoURL : avatar} alt="" />
            <span className="navbar_user-name">{currentUser?.displayName ? currentUser?.displayName: 'user'}</span>
            <button onClick={userLogOut} className="navbar_logout">logout</button>
        </div>
    </div>
  )
}
