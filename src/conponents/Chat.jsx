import React, { useContext } from 'react';
import settings from '../assets/img/chat/setting.png';
import help from '../assets/img/chat/help.png';
import research from '../assets/img/chat/research.png';
import { Messages } from './Messages';
import { Input } from './Input';
import { ChatContext } from '../hoc/ChatContext';

export const Chat = () => {
  const {data} = useContext(ChatContext);
  const somText =
   data?.user?.displayName
    ? <span style={{color: 'gray', fontStyle:'italic'}}>chat with : </span>
    : <span style={{color: '#48c9ff', fontStyle:'italic'}}>
    find a partner with the help of search</span>

  return (
    <div className='chat'>
      <div className="chatInfo">
        <span>{somText}{data.user?.displayName}</span>
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
