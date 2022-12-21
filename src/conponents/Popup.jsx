import React, { useContext, useState } from 'react';
import {v4 as uuid} from 'uuid';
import { PopupContext } from '../hoc/PopupContext';

export const Popup = () => {
  const {handleClosePopup, popupMessage,  popupIsActive} = useContext(PopupContext)
  const tehnology = ['react', 'react-router', 'scss', 'firebase', 'redux', 'context', 'uuid', 'git', 'firebase', 'hooks', 'gh-pages']

  return (
    <div onClick={handleClosePopup} className={`popup ${popupIsActive? '': 'popup-active'}`}>
        <div onClick={(e) => e.stopPropagation()} className='popup_content'>
          {/* {popupMessage} */}
          {popupMessage? <p>{popupMessage}</p> : (<article>
              <h2>this is SPA</h2>
              <p>this application was developed by : Igor Sergeevich</p>
              <p>when creating, these technologies and libraries were studied:</p>
              <ol>
                {tehnology.map((key) => <li key={uuid()}>{key}</li>)}
              </ol>
                the purpose of this project is to consolidate skills in the use of basic technologies
            </article>) }
        </div>
    </div>
  )
}