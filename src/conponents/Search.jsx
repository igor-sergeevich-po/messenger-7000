import React from 'react'

export const Search = () => {
  return (
    <div className='search'>
        <input type="search_text" placeholder='Find user ?'/>
        <div className="search_user">
            <img className='search_avatar' src="https://w7.pngwing.com/pngs/805/207/png-transparent-account-avatar-profile-user-avatars-icon.png" alt="" />
            <span className="search_name">Lord Dev</span>
        </div>
        
    </div>
  )
}
