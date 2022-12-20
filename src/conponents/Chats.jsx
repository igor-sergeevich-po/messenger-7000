import { current } from '@reduxjs/toolkit';
import { doc, onSnapshot } from 'firebase/firestore';
import React, { useContext, useEffect, useState } from 'react';
import { db } from '../firebase';
import { AuthContext } from '../hoc/AuthContext';
import { ChatContext } from '../hoc/ChatContext';

export const Chats = () => {
      const [chats, setChats] = useState([]);
      const {currentUser} = useContext(AuthContext)
      const {dispatch} = useContext(ChatContext)

      useEffect(() => {
         const getChats = () => {
            const unsub = onSnapshot(doc(db, 'userChats', currentUser.uid), (doc) => {
                  setChats(doc.data())
            });
            return () => {
                  unsub();
            }
         };
         currentUser.uid && getChats();
      }, [currentUser.uid])

      const handleSelect = (u) => {
            dispatch({type:'CHANGE_USER', payload: u})
      }

  return (
    <div className='chats'>
      {Object.entries(chats)?.sort((a,b) => b[1].date - a[1].date).map((chat) => (
                 <div className="user" onClick={() => handleSelect(chat[1].userInfo)} key={chat[0]}>
                        <div className="usersChat">
                              <img 
                                    className='user-chat-avatar'  
                                    src={chat[1].userInfo.photoURL} alt="" />
                     
                        </div>
                        <div className="userChat-info">
                              <span className="user-chat-name">{chat[1].userInfo.displayName}</span>
                              <p className='last-mess'>{chat[1].lastMessage?.text}</p>
                        </div>
                 </div>
      ))}
 
      
    </div>
  )
}
