import React, { useEffect, useState } from 'react';
import avatar from '../assets/img/user-avatars-icon.png';
import { createUserWithEmailAndPassword, signOut, updateProfile } from "firebase/auth";
import { auth, db, storage } from '../firebase'
import {  getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { deleteDoc, doc, setDoc } from 'firebase/firestore';
import { Link, useNavigate } from 'react-router-dom';

export const Registration = () => {
  const navigate = useNavigate();
  const [image, setImage] = useState(null);
  const [url, setUrl] = useState(null);
  const timeStamp = new Date().getTime();
  const imageRef = ref(storage, `avatars/user_${timeStamp}`);

  useEffect(() => {
    
     if (image) {
      uploadBytes(imageRef, image)
        .then(() => {
          getDownloadURL(imageRef)
            .then((url) => {
              setUrl(url);
            })
            .catch(err => {
              console.log(err.message)
            })
        })
     }

  }, [image])

  const deleteAcc = async () => {
    // await deleteDoc(doc(db, 'users', 'j0bW6C8kKINA894n0Ao2krdQ3iF2'));
    // await deleteDoc(doc(db, 'chats', 'sVh5p6YNoEPaM8wfLXS1CkiY0bc2j0bW6C8kKINA894n0Ao2krdQ3iF2'));
    // await deleteDoc(doc(db, 'userChats', 'j0bW6C8kKINA894n0Ao2krdQ3iF2'));
   
    // await deleteDoc(doc(db, 'messages', 'gringo_ffa56d4d-3757-447b-b4ee-4c67fb0b6ca0'));
    // await deleteDoc(doc(db, 'userChats', 'faMhh5kmppPGXJXGCWfB3QkFoSq2'));
  }

  const setAvatar = async (e) => {
    if (!document.querySelector("[name='name']").value) {
      alert('set user name, please');
      signOut(auth)
    } else {
      setImage(e.target.files[0])
    }
  }

  const createAccount = async (e) => {
    e.preventDefault();
    const displayName = e.target.name.value;
    const email = e.target.email.value;
    const password = e.target.password.value;

    const response = await createUserWithEmailAndPassword(auth, email, password)

    await updateProfile(response.user, {
      displayName,
      photoURL: url,
    });
    await setDoc(doc(db, 'users', response.user.uid), {
      uid: response.user.uid,
      displayName,
      email,
      photoURL: url,  
    });

    await setDoc(doc(db, 'userChats', response.user.uid), {})
    navigate('/messenger-7000/home')

  }
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
                    <input name='avatarImg' onChange={(e) => setAvatar(e)}  style={{display: 'none'}} type="file" />
                    {/* <input name='avatarImg' onChange={setAvatar}  style={{display: 'none'}} type="file" /> */}
                    <img src={avatar} name='setAvatar' alt='click and set your avatar' />
                      <span>set avatar</span>
                      </label>
                    <button className='sign-up'>Sign up</button>
                </form>
                <button  onClick={deleteAcc}>deleteAcc</button>
                <p className='registration_question'>Do you have an account? <Link className='link' to='/messenger-7000/login'>yes, I have</Link> </p>
            </div>
        </div>
    </React.Fragment>
  )
}
