import React from 'react'
import '../styles/heroSection.css'

function Inputs({character, addChar}) {

  const addCharacter = () =>{
    addChar(prev => prev + character  )
  }
  
  return <button className='btn' onClick={addCharacter}>
    {character}
  </button>
}

export default Inputs
