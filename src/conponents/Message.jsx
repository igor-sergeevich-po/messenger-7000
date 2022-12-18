import React from 'react';
import avatar from '../assets/Avatar-PNG-Image.png';

export const Message = () => {
  
  return (
    <div className='message'>
      <div className="message-info">
        <div className="message-title">
          <img src={avatar} />
          <span>current time</span>
        </div>
        <div className="message-text">
          <p>hi man whats'up?</p>
        </div>
      </div>
    </div>
  )
}
