import { createContext, useState } from "react";
import { Popup } from "../conponents/Popup";

export const PopupContext = createContext(null);

export const PopupContextProvider = ({children}) => {
    const [popupMessage, setPopupMessage] = useState('')
    const [popupIsActive, setPopupIsActive] = useState(false)
 
  const popupActive = (e) => {
    e.preventDefault()
    setPopupIsActive(true)
  }
  
  const handleClosePopup = () => {
    setPopupMessage('')
    setPopupIsActive(false);
}
  const value = {popupIsActive, setPopupIsActive, popupActive, handleClosePopup, popupMessage, setPopupMessage}
  return <PopupContext.Provider value={value}>
    {children}
  </PopupContext.Provider>
}
