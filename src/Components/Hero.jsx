import React, {useState} from 'react'
import '../styles/heroSection.css'
import { ContainerCharacter } from './ContainerCharacter'
import PropositionContainer  from './propositionContainer'

function Hero() {
    const [state, addCharacter] = useState('')


  return (
    <section id='heroSection'>
        <h2>Genera Tablas de verdad para expresiones logicas</h2>
        <span>Ingresa una expresion logica para ver su tabla de verdad correspondiente</span>

        <ContainerCharacter add={addCharacter}/>
        <PropositionContainer input={state} clean={addCharacter}/>

        
    </section>
  )
}

export default Hero
