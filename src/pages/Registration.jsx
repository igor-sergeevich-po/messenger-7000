import React, { useState } from 'react';
import avatar from '../assets/img/user-avatars-icon.png';
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db, storage } from '../firebase'
import {  ref, uploadBytes } from "firebase/storage";
import { deleteDoc, doc, setDoc } from 'firebase/firestore';
import { v4 as uuid } from 'uuid';
import { Link, useNavigate } from 'react-router-dom';


export const Registration = () => {
  // const [signupIsActive, setSignupIsActive] = useState(false)
  
  const navigate = useNavigate();

  
  const deleteAcc = async () => {
    await deleteDoc(doc(db, 'users', 'grigo'))
  }
 
  const createAccount = async (e) => {
    e.preventDefault();
    console.log('account is created')
    const password = e.target.password.value
    const displayName = e.target.name.value
    const email = e.target.email.value
    const file = e.target.avatarImg.value  
    
    // if (displayName.length > 5) {
    //   setSignupIsActive(true)
    // } else {
    //   setSignupIsActive(false)
    // }
    // ссылка на аватарку
    const storageRef = ref(storage, file)
    const id = uuid()

    await setDoc(doc(db, "users", displayName), {
      uid: id,
      displayName,
      email,
      photoURL: file

    });


    // create user accaunt
       await createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;
            // ...
            const avatarRef = ref(storage, file);
 updateProfile(user, {
  displayName,
  photoURL: file
})
          navigate('/messenger-7000/home')
        })
      
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            // ..
        });
    
    uploadBytes(storageRef, displayName).then((snapshot) => {
        console.log('Uploaded a blob or file!');
      });
}

  // const handleSubmit = async e => {
  //   e.preventDefault()
  //   const password = e.target.password.value
  //   const displayName = e.target.name.value
  //   const email = e.target.email.value
  //   const file = e.target.avatarImg.value   



  //   try{
  //     const response = await createUserWithEmailAndPassword(auth, email, password)

  //     const storageRef = ref(storage, displayName);
      
  //     const uploadTask = uploadBytesResumable(storageRef, file);
      

  //     // Register three observers:
  //     uploadTask.on(
  //       (error) => {
  //         setError(true)
  //       }, 
  //       () => {
        
  //         getDownloadURL(uploadTask.snapshot.ref).then(async(downloadURL) => {
  //           await updateProfile(response.user, {
  //             displayName,
  //             photoURL: downloadURL,
  //           });
       
  //           await setDoc(doc(db, 'users', response.user.uid), {
  //             uid: response.user.uid,
  //             displayName,
  //             email,
  //             photoURL: downloadURL
  //           })

  //           // my test
    
  //           //  finish test
  //         });
  //       }
  //     );


  //   } catch (error){
  //     setError(true)
  //     setErrMessage(error.message)
  //     const idTimer = setTimeout(() => setErrMessage(''),5000)
  //     console.log(error.message)
  //   }

  //   // e.target.name.value = ''
  //   // e.target.email.value = ''
  //   // e.target.password.value = ''
  //   // e.target.avatarImg.value = ''

  // }
  return (
    <React.Fragment>
        <div className="container">
            <div className="wrapper">
                <h2 className='app-title'>Messenger 7000</h2>
                <span className='title'>Registration</span>
                <form onSubmit={createAccount}>
                    <input type="text" name='name' placeholder='user name *' />
                    <input type="email" name='email' placeholder='email *' />
                    <input type="password" name='password' placeholder='password *' />
                    <label className='avatar-label'>
                    <input name='avatarImg' style={{display: 'none'}} type="file" />
                    <img src={avatar} alt='click and set your avatar' />
                      <span>set avatar</span>
                      </label>
                    <button className='sign-up'>Sign up</button>
                </form>
                {/* <button disabled={ signupIsActive? false : true } onClick={deleteAcc}>deleteAcc</button> */}
                <p className='registration_question'>Do you have an account? <Link className='link' to='/messenger-7000/login'>yes, I have</Link> </p>
            </div>
        </div>
    </React.Fragment>
  )
}
