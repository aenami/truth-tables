import React from 'react'
import { Navbar } from './Components/Navbar.jsx'
import Hero from './Components/Hero.jsx'
import './styles/app.css'

export function App() {
  return (
    <div className='main'>
        <Navbar/>
        <Hero/>
    </div>
  )
}


