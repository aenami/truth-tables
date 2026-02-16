import React from 'react'
import '../styles/heroSection.css'
import Inputs from './Inputs'

export function ContainerCharacter({add}) {
    const characters = ['p', 'q', 'r', '(', ')', '∧', 'V', '→', '↔', '⊻']
  return (
    <div className='containerInputs'>
        {characters.map((char) => (
            <Inputs key={char} char={char} add={add}/>
        ))}
    </div>
  )
}

