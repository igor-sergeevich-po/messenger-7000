import { doc, onSnapshot } from 'firebase/firestore';
import { listAll, ref } from 'firebase/storage';
import React, { useContext, useEffect, useState } from 'react';
import { db, storage } from '../firebase';
import { ChatContext } from '../hoc/ChatContext';
import { Message } from './Message';


export const Messages = () => {
  const [messages, setMessages] = useState([]);
  const {data} = useContext(ChatContext);
 console.log(data)
  useEffect(() => {
    const unSub = onSnapshot(doc(db, 'chats', data.chatId), (doc) => {
      doc.exists() && setMessages(doc.data().messages);
    })
    return ()=>{
      unSub();
    }
  }, [data.chatId])

  return (
    <div className='messages'>
      {messages.map(m=> <Message key={m.id} message={m}/>)}
    </div>
  )
}
