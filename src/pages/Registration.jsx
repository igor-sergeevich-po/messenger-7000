import React from 'react'
import { Link } from 'react-router-dom'

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
                    <input type="file" />
                    <button>Sign up</button>
                </form>
                <p>Do you have an account? <a href='#'>Login</a> </p>
            </div>
        </div>
    </React.Fragment>
  )
}
