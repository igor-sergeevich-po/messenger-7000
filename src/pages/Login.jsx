import React from 'react'

export const Login = () => {
  return (
    <React.Fragment>
        <div className="container">
            <div className="wrapper">
                <h2 className='app-title'>Messenger 7000</h2>
                <span className='title'>Login</span>
                <form>
                    <input type="email" placeholder='email' />
                    <input type="password" placeholder='password' />
                   
                    <button className='sign-up'>Sign in</button>
                </form>
                <p className='registration_question'>you don't have an account? <a href='#'>Registration</a> </p>
            </div>
        </div>
    </React.Fragment>
  )
}
