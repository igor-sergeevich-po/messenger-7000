import React from 'react'

export const Input = () => {
  return (
    <div className='inputChat'>
        <input type="inputText" placeholder='input your message' />
        <button className='send-button'>Send text</button>
    </div>
  )
}
