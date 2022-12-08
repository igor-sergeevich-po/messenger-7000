import React from 'react'
import { Chat } from '../conponents/Chat'
import { Sidebar } from '../conponents/Sidebar'

export const Home = () => {
  return (
    <div className="container">
      <div className='home'>
        <Sidebar />
        <Chat />
      </div>
    </div>
  )
}
