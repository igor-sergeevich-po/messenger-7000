import React from 'react'
import avatar from '../assets/img/user-avatars-icon.png'

export const Registration = () => {
  return (
    <React.Fragment>
        <div className="container">
            <div className="wrapper">
                <h2 className='app-title'>Messenger 7000</h2>
                <span className='title'>Registration</span>
                <form>
                    <input type="text" placeholder='user name' />
                    <input type="email" placeholder='email' />
                    <input type="password" placeholder='password' />
                    <label className='avatar-label'>
                    <input style={{display: 'none'}} type="file" />
                    <img src={avatar} alt='click and set your avatar' />
                    <span>set avatar</span>
                    </label>
                    <button className='sign-up'>Sign up</button>
                </form>
                <p className='registration_question'>Do you have an account? <a href='#'>Login</a> </p>
            </div>
        </div>
    </React.Fragment>
  )
}
