import React, { useContext } from 'react';
import { Messages } from './Messages';
import { Input } from './Input';
import { ChatContext } from '../hoc/ChatContext';
import { Popup } from './Popup';
import { PopupContext } from '../hoc/PopupContext';
import lamp from '../assets/light-lamp.svg'

export const Chat = () => {
  const {data} = useContext(ChatContext);
  const {popupActive, setPopupIsActive, setPopupMessage} = useContext(PopupContext);
  const changeTheme = () => {
    setPopupMessage('Soon you will be able to change the theme!')
    setPopupIsActive(true)
  }
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
            <span onClick={changeTheme}><img src={lamp} alt=''></img></span>
            <span onClick={popupActive}>?</span>
          </div>
        </div>
        <Messages />
        <Input />
      </div>
    </React.Fragment>
  )
}
