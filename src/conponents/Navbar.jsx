import React from 'react';
import avatar from '../assets/img/user-avatars-icon.png';

export const Navbar = () => {
  return (
    <div className='navbar'>
        <span className="navbar_logo-title">M 7000</span>
        <div className="navbar_user">
            <img className='navbar_user-avatar' src={avatar} alt="" />
            <span className="navbar_user-name">Lord</span>
            <button className="navbar_logout">logout</button>
        </div>
    </div>
  )
}
