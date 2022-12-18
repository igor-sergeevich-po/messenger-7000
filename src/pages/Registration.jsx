import React, { useContext, useEffect, useState } from 'react';
import avatar from '../assets/img/user-avatars-icon.png';
import { createUserWithEmailAndPassword, signOut, updateProfile } from "firebase/auth";
import { auth, db, storage } from '../firebase'
import {  getDownloadURL, ref, uploadBytes, uploadBytesResumable } from "firebase/storage";
import { deleteDoc, doc, setDoc } from 'firebase/firestore';
import { v4 as uuid } from 'uuid';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../hoc/AuthContext';




export const Registration = () => {
  const navigate = useNavigate();
  const [userAvatar, setUserAvatar] = useState(null)
  const [image, setImage] = useState(null);
  const [url, setUrl] = useState(null);
  // const [urlAvatar, setUrlAvatar] = useState('');

  useEffect(() => {
    const timeStamp = new Date().getTime();
    const imageRef = ref(storage, `avatars/user_${timeStamp}`);
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
      console.log(userAvatar)
        setUrl(url)
        console.log('cool it s a work!', url)
  }, [image])
  // 
  // 

  const deleteAcc = async () => {
    await deleteDoc(doc(db, 'users', 'lkg3ZNeQAsUnumMGEzCBxJe6Oni1'))
  }

  const setAvatar = async (e) => {
    if (!document.querySelector("[name='name']").value) {
      alert('set user name, please');
      signOut(auth)
    } else {
      
      setUserAvatar(e.target.files[0])
      setImage(e.target.files[0])
      
    }
    
  }


  const createAccount = async (e) => {
    e.preventDefault();
    const displayName = e.target.name.value;
    const email = e.target.email.value;
    const password = e.target.password.value;
    const file = e.target.avatarImg.value;
    console.log(displayName,email, password, file)

    const response = await createUserWithEmailAndPassword(auth, email, password)

  


  
 
      const avatarRef = ref(storage, `images/${userAvatar.name + uuid()}`);
      // const avatarRef = ref(storage, `images/${userAvatar.name + uuid()}`);
   

  const uploadTask = uploadBytesResumable(avatarRef, file);

  uploadTask.on(
    (err) => {
      console.log(err)
    }, 
    () => {
      getDownloadURL(uploadTask.snapshot.ref).then(async(downloadURL) => {
        
                await updateProfile(response.user, {
                displayName,
                photoURL: url,
              });
              await setDoc(doc(db, 'users', response.user.uid), {
                uid: response.user.uid,
                displayName,
                email,
                photoURL: url,  
              })
              navigate('/messenger-7000/home')
      });
    }
  );




  }

  //  end ahalai


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
