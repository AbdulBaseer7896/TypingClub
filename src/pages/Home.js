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
      <h1 className='text-red-600'>Home</h1>

    </div>
  )
}

export default Home
