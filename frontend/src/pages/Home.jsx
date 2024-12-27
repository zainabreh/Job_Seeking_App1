import React from 'react'
import Navbar from '../component/Navbar'
import HeroSection from '../component/HeroSection'
import Footer from '../component/Footer'
import JobContainer from '../component/JobContainer'

const Home = ({search,setSearch}) => {
  return (
    <>
  
     

      <HeroSection search={search} setSearch={setSearch}/>
     <JobContainer search={search}/>

   

    
    </>
  )
}

export default Home
