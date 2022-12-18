import React, { useContext } from 'react'
import { AuthContext } from '../hoc/AuthContext';
import { v4 as uuid } from 'uuid';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '../firebase';

export const Input = () => {
  const {currentUser} = useContext(AuthContext);
  const uid = currentUser.uid;
  const email = currentUser.email;
  const displayName = currentUser.displayName;
  const uidMessage = uuid();
  let timeStamp = new Date().getTime();
  
  const handleClick= async(e) => {
    let userMessage = document.querySelector('[name="userMes"]');
    await setDoc(doc(db, "messages", `${displayName+ `_`+ timeStamp}`), {
      uid,
      displayName,
      email,
      uidMessage,
      message: userMessage.value
    });
    userMessage.value = ''
  }
  return (
    <div className='inputChat'>
        <input type="inputText" name='userMes' placeholder='input your message' />
        <button onClick={handleClick} type='submit' className='send-button'>Send text</button>
    </div>
  )
}
