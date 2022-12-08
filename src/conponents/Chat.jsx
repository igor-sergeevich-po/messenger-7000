import React from 'react';
import settings from '../assets/img/chat/setting.png';
import help from '../assets/img/chat/help.png';
import research from '../assets/img/chat/research.png';
import { Messages } from './Messages';
import { Input } from './Input';
export const Chat = () => {
  return (
    <div className='chat'>
      <div className="chatInfo">
        <span>chat with: Lord</span>
        <div className="chatIcons">
          <img src={help} alt="" />
          <img src={settings} alt="" />
          <img src={research} alt="" />
        </div>
      </div>
      <Messages />
      <Input />
    </div>
  )
}
