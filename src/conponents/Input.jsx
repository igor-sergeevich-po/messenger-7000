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
  
  console.log(currentUser.displayName);
  const handleClick= async(e) => {
    e.preventDefault();
    const userMessage = e.target.userMes.value;
    await setDoc(doc(db, "messages", `${displayName+ `_`+ timeStamp}`), {
      uid,
      displayName,
      email,
      uidMessage,
      message: userMessage
    });
    e.target.userMes.value = ''
  }
  return (
    <div className='inputChat'>
      
     <form onSubmit={handleClick}>
        <input type="inputText" name='userMes' placeholder='input your message' />
        <button type='submit' className='send-button'>Send text</button>
     </form>
    </div>
  )
}
