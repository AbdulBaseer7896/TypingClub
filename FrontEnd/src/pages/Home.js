import React, { useEffect } from 'react'
import NavBar from '../components/NavBar'
import Filters from '../components/Home_typing/Filters'
import MainTyping from '../components/Home_typing/MainTyping'
import { resetTyping } from '../redux/slices/Filter'
import { useDispatch } from 'react-redux'


const Home = () => {
  const dispatch = useDispatch();

  useEffect(()=>{
    dispatch(resetTyping())
  },[])

  return (
    <div>
        <NavBar />
        <Filters />
        <MainTyping />
    </div>
  )
}

export default Home
