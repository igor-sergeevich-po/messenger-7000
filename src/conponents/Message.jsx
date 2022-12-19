import userEvent from '@testing-library/user-event';
import React, { useContext } from 'react';
import avatar from '../assets/Avatar-PNG-Image.png';
import { AuthContext } from '../hoc/AuthContext';
import { ChatContext } from '../hoc/ChatContext';

export const Message = ({message}) => {
  const {currentUser} = useContext(AuthContext);
  const {data} = useContext(ChatContext);
  console.log('message-&&&',message)
  console.log('data-&&&',data)
  console.log('***current user**', currentUser)
  return (
    <div className='message'>
      <div className="message-info">
        <div className="message-title">
          <img src={message.sendeId === currentUser.uid ?currentUser.photoUrl : data.user.photoUrl} alt='' />
          <span>{currentUser.displayName}</span>
        </div>
        <div className="message-text">
          <p>{message.text}</p>
        </div>
      </div>
    </div>
  )
}
