import React, { useContext, useState } from 'react'
import { AuthContext } from '../hoc/AuthContext';
import { v4 as uuid } from 'uuid';
import { arrayUnion, doc, serverTimestamp, Timestamp, updateDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { ChatContext } from '../hoc/ChatContext';

export const Input = () => {
  const {currentUser} = useContext(AuthContext);
  const {data} = useContext(ChatContext);
  
  const handleClickEnter = (e) => {
    if (e.code === 'Enter') {
      handleClick()
    }
  }

  const handleClick = async(e) => {
    let userMessage = document.querySelector('[name="userMes"]');
    
    if(userMessage.value && data?.user?.uid) {
      await updateDoc(doc(db, "chats", data.chatId), {
        messages: arrayUnion({
          id: uuid(),
          text: userMessage.value,
          senderId: currentUser.uid,
          date: Timestamp.now(),
        })
      });
  
      await updateDoc(doc(db, 'userChats', currentUser.uid), {
        [data.chatId + ".lastMessage"]: {
          text: userMessage.value,
        },
        [data.chatId+".date"]: serverTimestamp(),
      });
      await updateDoc(doc(db, 'userChats', data.user.uid), {
        [data.chatId + ".lastMessage"]: {
          text: userMessage.value,
        },
        [data.chatId+".date"]: serverTimestamp(),
      });
      userMessage.value = ''
    } else if (!data?.user?.uid) {
      alert('choose a partner to get started')
    } else if (!userMessage.value) {
      alert('give me message please')
    }

  }
  
  return (
    <div className='inputChat'>
        <input onKeyDown={handleClickEnter} type="inputText" name='userMes' placeholder='input your message' />
        <button onClick={handleClick} type='submit' className='send-button'>Send text</button>
    </div>
  )
}
