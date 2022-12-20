import React, { useContext, useState } from 'react';
import settings from '../assets/img/chat/setting.png';
import help from '../assets/img/chat/help.png';
import research from '../assets/img/chat/research.png';
import { Messages } from './Messages';
import { Input } from './Input';
import { ChatContext } from '../hoc/ChatContext';
import { Popup } from './Popup';

export const Chat = () => {
  const [popupIsActive, setPopupIsActive] = useState(false)
  const {data} = useContext(ChatContext);
  const somText =
   data?.user?.displayName
    ? <span style={{color: 'gray', fontStyle:'italic'}}>chat with : </span>
    : <span style={{color: '#48c9ff', fontStyle:'italic'}}>
    find a partner with the help of search</span>

const popupActive = (e) => {
  e.preventDefault()
  setPopupIsActive(true)
}


  return (
    <React.Fragment>
      <Popup popupIsActive={popupIsActive} setPopupIsActive={setPopupIsActive}/>
      <div className='chat'>
        <div className="chatInfo">
          <span>{somText}{data.user?.displayName}</span>
          <div className="chatIcons">
            {/* <img onClick={popupActive} src={help} alt="" /> */}
            <span onClick={popupActive}>0</span>
            <span onClick={popupActive}>?</span>
          </div>
        </div>
        <Messages />
        <Input />
      </div>
    </React.Fragment>
  )
}
