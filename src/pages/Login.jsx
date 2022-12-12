import { signInWithEmailAndPassword } from 'firebase/auth';
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../firebase';



export const Login = () => {
  const navigate = useNavigate();

  const logIn = (e) => {
  
    e.preventDefault()
    const email = e.target.email.value
    const password = e.target.password.value
  
    signInWithEmailAndPassword(auth, email, password)
    .then(resp => {
      console.log('user is log in')
      return navigate('/messenger-7000/home')
    })
    .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
        alert(error)
    })
  }

  return (
    <React.Fragment>
        <div className="container">
            <div className="wrapper">
                <h2 className='app-title'>Messenger 7000</h2>
                <span className='title'>Login</span>
                <form onSubmit={logIn}>
                    <input type="email" name='email' placeholder='email' />
                    <input type="password" name='password' placeholder='password' />
                   
                    <button className='sign-up'>Sign in</button>
                </form>
                <p className='registration_question'>
                  You don't have an account? <Link className='link' to='/messenger-7000/'>
yes i don't have</Link> </p>
            </div>
        </div>
    </React.Fragment>
  )
}
