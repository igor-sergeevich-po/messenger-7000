import React, { useContext } from 'react';
import { Messages } from './Messages';
import { Input } from './Input';
import { ChatContext } from '../hoc/ChatContext';
import { Popup } from './Popup';
import { PopupContext } from '../hoc/PopupContext';

export const Chat = () => {
  const {data} = useContext(ChatContext);
  const {popupActive} = useContext(PopupContext);

  const somText =
   data?.user?.displayName
    ? <span style={{color: 'gray', fontStyle:'italic'}}>chat with : </span>
    : <span style={{color: '#48c9ff', fontStyle:'italic'}}>
    find a partner with the help of search</span>

  return (
    <React.Fragment>
      <Popup />
      <div className='chat'>
        <div className="chatInfo">
          <span>{somText}{data.user?.displayName}</span>
          <div className="chatIcons">
            <span onClick={() => console.log('change theme')}>0</span>
            <span onClick={popupActive}>?</span>
          </div>
        </div>
        <Messages />
        <Input />
      </div>
    </React.Fragment>
  )
}
