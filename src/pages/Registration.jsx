import React, { useContext, useEffect, useState } from 'react';
import avatar from '../assets/img/user-avatars-icon.png';
import { createUserWithEmailAndPassword, signOut, updateProfile } from "firebase/auth";
import { auth, db, storage } from '../firebase'
import {  getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { deleteDoc, doc, setDoc } from 'firebase/firestore';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../hoc/AuthContext';

export const Registration = () => {
  const navigate = useNavigate();
  const [image, setImage] = useState(null);
  const [url, setUrl] = useState(null);
  const timeStamp = new Date().getTime();
  const imageRef = ref(storage, `avatars/user_${timeStamp}`);
  const {loaderIsActive, setLoaderIsActive} = useContext(AuthContext)

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
    // await deleteDoc(doc(db, 'users', '5E3bcXH0JphL7gqykaBmgnKj3Le2'));
    // await deleteDoc(doc(db, 'userChats', 'j0bW6C8kKINA894n0Ao2krdQ3iF2'));
    // await deleteDoc(doc(db, 'messages', 'gringo_1671467584458'));
    // await deleteDoc(doc(db, 'userChats', '5E3bcXH0JphL7gqykaBmgnKj3Le2'));
    // await deleteDoc(doc(db, 'chats', 'NdnHGUVBHuYg1rLTdoHPN6TNLBg25E3bcXH0JphL7gqykaBmgnKj3Le2'));
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
    setLoaderIsActive(true)
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
    setLoaderIsActive(false)
    navigate('/messenger-7000/home')

  }
  return (
    <React.Fragment>
      {loaderIsActive && <div className="loader"></div>}
        <div className="container">
            {loaderIsActive? '' : <div className="wrapper">
                <h2 className='app-title'>Messenger 7000</h2>
                <span className='title'>Registration</span>
                <form onSubmit={createAccount}>
                    <input type="text" name='name' placeholder='user name *' />
                    <input type="email" name='email' placeholder='email *' />
                    <input type="password" name='password' placeholder='password > 6 *' />
                    <label className='avatar-label'>
                    <input name='avatarImg' onChange={(e) => setAvatar(e)}  style={{display: 'none'}} type="file" />
                    {/* <input name='avatarImg' onChange={setAvatar}  style={{display: 'none'}} type="file" /> */}
                    <img src={avatar} name='setAvatar' alt='click and set your avatar' />
                      <span>set avatar</span>
                      </label>
                    <button className='sign-up'>Sign up</button>
                </form>
                {/* <button  onClick={deleteAcc}>deleteAcc</button> */}
                <p className='registration_question'>Do you have an account? <Link className='link' to='/messenger-7000/login'>yes, I have</Link> </p>
            </div>}
        </div>
    </React.Fragment>
  )
}
