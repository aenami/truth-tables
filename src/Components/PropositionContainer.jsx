import React from 'react'

function PropositionContainer({input, clean}) {
  const handleClean = () =>{
    clean('')
  }

  return (
    <div className='propContainer'>
      <input className="proposition"  type="text" value={input} readOnly/>
      <button onClick={handleClean}> Limpiar </button>
    </div>
    
  )
}

export default PropositionContainer
