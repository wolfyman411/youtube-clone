import React from 'react'
import './Home.css'
import Sidebar from '../../components/Sidebar/Sidebar'
import Feed from '../../components/Feed/Feed'

export default function Home({sidebar}) {
  return (
    <>
      <Sidebar sidebar={sidebar}/>
      <div className={`container ${sidebar ? '' : 'large-container'}`}>
        <Feed />
      </div>
    </>
  )
}
