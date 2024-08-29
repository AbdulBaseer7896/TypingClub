import React from 'react'
import NavBar from '../components/NavBar'
import Filters from '../components/Home_typing/Filters'
import MainTyping from '../components/Home_typing/MainTyping'


const Home = () => {
  return (
    <div>
        <NavBar />
        <Filters />
        <MainTyping />
    </div>
  )
}

export default Home
