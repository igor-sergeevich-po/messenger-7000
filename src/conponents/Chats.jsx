import { current } from '@reduxjs/toolkit';
import { doc, onSnapshot } from 'firebase/firestore';
import React, { useContext, useEffect, useState } from 'react';
import { db } from '../firebase';
import { AuthContext } from '../hoc/AuthContext';

export const Chats = () => {
      const [chats, setChats] = useState([]);
      const {currentUser} = useContext(AuthContext)
      useEffect(() => {
         const getChats = () => {
            const unsub = onSnapshot(doc(db, 'userChats', currentUser.uid), (doc) => {
                  setChats(doc.data())
            });
            return () => {
                  unsub();
            }
         };
         currentUser.uid && getChats()
      }, [currentUser.uid])
      console.log(chats)
  return (
    <div className='chats'>
      {Object.entries(chats)?.map((chat) => (
                 <div className="user" key={chat[0]}>
                        <div className="usersChat">
                              <img className='user-chat-avatar' src={chat[1].userInfo.photoURL} alt="" />
                     
                        </div>
                        <div className="userChat-info">
                              <span className="user-chat-name">{chat[1].userInfo.displayName}</span>
                              <p className='last-mess'>{chat[1].userInfo.lastMessage?.text}</p>
                        </div>
                 </div>
      ))}
 
      
    </div>
  )
}
