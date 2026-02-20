import React, { useState } from "react";
import "../styles/heroSection.css";
import { ContainerCharacter } from "./ContainerCharacter";
import PropositionContainer from "./propositionContainer";
import Table from "./Table";
import { resolveExpression } from "../logic/resolveExpression";


function Hero() {
	const [inputState, modifyInput] = useState('pVq'); // Estado del input text
    const [expressionState, changueExpression] = useState('pVq') // Estado del input text que valida el usuario
	const [tableData, setTableData] = useState( () => resolveExpression('pVq')) // Inicializamos el estado de la informacion como el resultado de la resolucion del problema predeterminado
	
	return (
		<section id="heroSection">
			<h2>Genera Tablas de verdad para expresiones logicas</h2>
			<span>Ingresa una expresion logica para ver su tabla de verdad correspondiente</span>

			<ContainerCharacter add={modifyInput} />
			<PropositionContainer 
			input={inputState} 
			clean={modifyInput} exp={expressionState} 
			changueExp={changueExpression} 
			setData={setTableData}
			/>
			<Table data={tableData} />
		</section>
	);
}

export default Hero;
