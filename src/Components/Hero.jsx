import React, { useState } from "react";
import "../styles/heroSection.css";
import { ContainerCharacter } from "./ContainerCharacter";
import PropositionContainer from "./propositionContainer";
import Table from "./Table";



function Hero() {
	const [inputState, modifyInput] = useState('pVq'); // Estado del input text
    const [expressionState, changueExpression] = useState('pVq') // Estado del input text que valida el usuario

	return (
		<section id="heroSection">
			<h2>Genera Tablas de verdad para expresiones logicas</h2>
			<span>Ingresa una expresion logica para ver su tabla de verdad correspondiente</span>

			<ContainerCharacter add={modifyInput} />
			<PropositionContainer input={inputState} clean={modifyInput} exp={expressionState} changueExp={changueExpression}/>
			<Table expression={expressionState} />
		</section>
	);
}

export default Hero;
