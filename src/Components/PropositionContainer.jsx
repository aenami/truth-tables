import React from 'react'

function PropositionContainer({input, clean}) {
  return (
    <div className='propContainer'>
      <input className="proposition"  type="text" value={input} readOnly/>
      <button className='btnProposition' onClick={() => clean('')}>
        Limpiar
      </button>
    </div>
    
  )
}

export default PropositionContainer
