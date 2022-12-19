import React, { useContext, useState } from 'react'
import { AuthContext } from '../hoc/AuthContext';
import { v4 as uuid } from 'uuid';
import { arrayUnion, doc, setDoc, Timestamp, updateDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { ChatContext } from '../hoc/ChatContext';

export const Input = () => {
  const [text, setText] = useState('');
  const [img, setImg] = useState(null);

  const {currentUser} = useContext(AuthContext);
  const {data} = useContext(ChatContext);

  const uid = currentUser.uid;
  const email = currentUser.email;
  const displayName = currentUser.displayName;
  const uidMessage = uuid();
  let timeStamp = new Date().getTime();
  
  const handleClick= async(e) => {
    let userMessage = document.querySelector('[name="userMes"]');
    await updateDoc(doc(db, "chats", data.chatId), {
      messages: arrayUnion({
        id: uuid(),
        text: userMessage.value,
        senderId: currentUser.uid,
        date: Timestamp.now(),
      })
    });
    userMessage.value = ''
  }
  
  // const handleClick= async(e) => {
  //   let userMessage = document.querySelector('[name="userMes"]');
  //   await setDoc(doc(db, "messages", `${displayName+ `_`+ timeStamp}`), {
  //     uid,
  //     displayName,
  //     email,
  //     uidMessage,
  //     message: userMessage.value
  //   });
  //   userMessage.value = ''
  // }
  return (
    <div className='inputChat'>
        <input type="inputText" name='userMes' placeholder='input your message' />
        <button onClick={handleClick} type='submit' className='send-button'>Send text</button>
    </div>
  )
}
