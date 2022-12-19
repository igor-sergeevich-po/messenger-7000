import { listAll, ref } from 'firebase/storage';
import React, { useEffect, useState } from 'react';
import { storage } from '../firebase';
import { Message } from './Message';


export const Messages = () => {
  const [messages, setMessages] = useState([])
  useEffect(() => {
    const listRef = ref(storage, 'messages');

      // Find all the prefixes and items.
      listAll(listRef)
        .then((res) => {
          res.prefixes.forEach((folderRef) => {
           console.log('***',folderRef)
          });
          res.items.forEach((itemRef) => {
            // All the items under listRef.
          });
        }).catch((error) => {
          // Uh-oh, an error occurred!
        });
  }, [messages])
  
  return (
    <div className='messages'>
        <Message />
        <Message />
        <Message />
        <Message />
        <Message />
        <Message />
        <Message />
        <Message /><Message />
        <Message />
        <Message />
        <Message />
        <Message />
        <Message /><Message />
        <Message />
        <Message />
        <Message />
        <Message />
        <Message />
    </div>
  )
}
