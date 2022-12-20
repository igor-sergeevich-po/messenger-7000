import React, { useContext, useEffect, useRef } from 'react';
import { AuthContext } from '../hoc/AuthContext';
import { ChatContext } from '../hoc/ChatContext';

export const Message = ({message}) => {
  const {currentUser} = useContext(AuthContext);
  const {data} = useContext(ChatContext);
  const dateInfoMessage = (message.date).toDate().toLocaleTimeString()
  const ref = useRef()  

  useEffect(() => {
    ref.current?.scrollIntoView({behavior:'smooth'})
  }, [message])

  return (
    <div ref={ref} className={`message ${message.senderId === currentUser.uid && 'owner'}`}>
      <div className="message-info">
        <div className="message-title">
          <img className='message-avatar' src={message.senderId === currentUser.uid ? currentUser.photoURL : data.user.photoURL} alt='' />
          <span>{dateInfoMessage}</span>
        </div>
        <div className="message-text">
          <p>{message.text}</p>
        </div>
      </div>
    </div>
  )
}
