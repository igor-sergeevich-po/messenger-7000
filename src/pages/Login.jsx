import { signInWithEmailAndPassword } from 'firebase/auth';
import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../firebase';
import { AuthContext } from '../hoc/AuthContext';

export const Login = () => {
  const {loaderIsActive, setLoaderIsActive} = useContext(AuthContext);
  const navigate = useNavigate();
  const logIn = (e) => {
    setLoaderIsActive(true)
  
    e.preventDefault()
    const email = e.target.email.value
    const password = e.target.password.value
  
    signInWithEmailAndPassword(auth, email, password)
    .then(resp => {
      setLoaderIsActive(false)
      return navigate('/messenger-7000/home')
    })
    .catch((error) => {
      setLoaderIsActive(false)
      navigate('/messenger-7000/login')
        alert(error)
    })
  }

  return (
    <React.Fragment>
         {loaderIsActive && <div className="loader"></div>}
        <div className="container">
            {loaderIsActive? '' : <div className="wrapper">
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
            </div>}
        </div>
    </React.Fragment>
  )
}
