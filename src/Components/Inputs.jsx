import React from 'react'
import '../styles/heroSection.css'

function Inputs({char, add}) {
  return <button className='btn' onClick={() => add( (prev) => prev + char  )}>
    {char}
  </button>
}

export default Inputs
