import React, { useState } from "react";
import {
	validateFirstChar,
	validateParenthesis,
	validateStructure,
} from "../logic/validateExpression";

import { resolveExpression } from "../logic/resolveExpression";

const validateExp = (inputState) => {
	// Objeto que contendra la informacion de como termino el proceso de validacion de la expresion
	const infoValidate = {
		valid: false,
		info: "",
	};

	//-----Verificar toda la expresion------
	if (inputState.length < 2) {
		infoValidate.info = "Expresion muy corta";
		return infoValidate;
	}

	if (!validateFirstChar(inputState)) {
		infoValidate.info = "Primer o ultimo caracter invalido";
		return infoValidate;
	}

	if (!validateParenthesis(inputState)) {
		infoValidate.info = "Parentesis desbalanceado";
		return infoValidate;
	}

	const estrcutureResult = validateStructure(inputState); // Validamos la estructura de la exp
	if (!estrcutureResult.valid) return estrcutureResult;

	// Si la expresion es correcta devolvemos verdadero
	infoValidate.valid = true;
	return infoValidate;
};

//------------COMPONENT-------------
function PropositionContainer({ input, clean, exp, changueExp, setData}) {
	const [errorMessage, setErrorMessage] = useState("");

	const handleClean = () => {
		// Limpiamos el input y la expresion indicada que se esta resolviendo
		clean("");
		setErrorMessage('');
		changueExp("");
		setData(null);
	};

	const handleSolve = () => {
		const resultValidate = validateExp(input);
		if (!resultValidate.valid) {
			setErrorMessage(resultValidate.info);
			return;
		}

		//----Manejando input valido------
		const result = resolveExpression(input) // Resolvemos la expresion

		setErrorMessage(""); // Evitamos mensaje de error
		changueExp(input); // Indicamos la expresion que se esta resolviendo
		setData(result) // Guardamos el estado de la resolucion de la expresion
	};

	return (
		<>
			<div className="propContainer">
				<input
					className="proposition"
					type="text"
					value={input}
					placeholder={input}
					readOnly
				/>
				<button onClick={handleClean}> Limpiar </button>
			</div>
      
			<button className="btnResolve" onClick={handleSolve}>Resolver</button>

			{errorMessage && 
        		<h3 className="infoMessage">
      		{errorMessage}</h3>}

			<h2>Truth table result</h2>
			<h3>Expression: {exp}</h3>
		</>
	);
}

export default PropositionContainer;
