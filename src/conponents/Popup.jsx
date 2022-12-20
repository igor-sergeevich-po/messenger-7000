import React from 'react'

export const Popup = ({popupIsActive, setPopupIsActive}) => {
    const handleClosePopup = () => {
        setPopupIsActive(false);
    }
    const tehnology = ['react', 'react-router', 'scss', 'firebase', 'redux', 'context', 'uuid', 'git', 'firebase', 'hooks', 'gh-pages']
  return (
    <div onClick={handleClosePopup} className={`popup ${popupIsActive? '': 'popup-active'}`}>
        <div onClick={(e) => e.stopPropagation()} className='popup_content'>
            <article>
            <h2>this is SPA</h2>
            {/* <h4>this application is a spa application</h4> */}
              <p>this application was developed by : Igor Sergeevich</p>
<p>when creating, these technologies and libraries were studied:</p>

<ol>
  {tehnology.map((key) => <li>{key}</li>)}
</ol>

the purpose of this project is to consolidate skills in the use of basic technologies</article>
        </div>
    </div>
  )
}