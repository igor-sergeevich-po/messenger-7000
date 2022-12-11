import React, { useState } from 'react';
import { doc, setDoc } from "firebase/firestore"; 
import { db, storage, auth } from '../firebase';
import { ref, uploadBytes } from 'firebase/storage';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";

export const Test = () => {
    const [hasAccount, setHasAccount] = useState(false)

    const logIn = (e) => {
        e.preventDefault()
        // const email = '3eervywery@yandex.com'
        // const password = '111111111122'
        const email = e.target.email.value
        const password = e.target.password.value

        signInWithEmailAndPassword(auth, email, password)
        .then(resp => setHasAccount(true))
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            // ..
        })
    }

    const createAccount = (e) => {
        e.preventDefault();
        // ссылка на аватарку
        const auth = getAuth();
        const storageRef = ref(storage, 'avatar')
        
        const password = e.target.password.value
        const displayName = e.target.name.value
        const email = e.target.email.value
        const file = e.target.avatarImg.value  


        // create user accaunt
            createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                // ...
            })
          
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                // ..
            });


        const avatarRef = ref(storage, displayName);
        uploadBytes(storageRef, displayName).then((snapshot) => {
            console.log('Uploaded a blob or file!');
          });
    }
    

    // добавляем в 
    // const addNewUser = async() => {
    //     await setDoc(doc(db, "users", "simple"), {
    //         uid: '1234jp123p1235p',
    //         displayName: 'Maty',
    //         email: 'maty61@mail.com',
    //         photoURL: 'sadfwqefjwef'
    //       });
    // }
  return (
    <React.Fragment>
        <div className="container">
            <div className="wrapper">
                <h2 className='app-title'>Messenger 7000</h2>
                <span className='title'>Registration</span>
                {hasAccount? 'you user' : 'looser'}
                <form onSubmit={createAccount}>
                    <input type="text" name='name' placeholder='user name' />
                    <input type="email" name='email' placeholder='email' />
                    <input type="password" name='password' placeholder='password' />
                    <label className='avatar-label'>
                    <input name='avatarImg' style={{display: 'none'}} type="file" />
                    <img  alt='click and set your avatar' />
                      <span>set avatar</span>
                      </label>
                    <button className='sign-up'>Sign up</button>
                
                </form>
                    <button onClick={logIn} className='sign-up'>Sign in</button>
                <p className='registration_question'>Do you have an account? <a href='#'>Login</a> </p>
            </div>
        </div>
    </React.Fragment>
  )
}
