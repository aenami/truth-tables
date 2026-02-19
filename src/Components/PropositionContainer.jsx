import React, { useState } from "react";
import {
	validateFirstChar,
	validateParenthesis,
	validateStructure,
} from "../logic/validateExpression";

const validateExp = (inputState) => {
	const infoValidate = {
		valid: false,
		info: "",
	};

	//-----Verificar toda la expresion------
	if (inputState.length < 2) {
		infoValidate.info = "Expresion muy corta";
		return infoValidate;
	}

	if (!validateFirstChar(inputState[0])) {
		infoValidate.info = "Primer caracter invalido";
		return infoValidate;
	}

	if (!validateParenthesis(inputState)) {
		infoValidate.info = "Parentesis desbalanceado";
		return infoValidate;
	}

	const estrcutureResult = validateStructure(inputState);
	if (!estrcutureResult.valid) return estrcutureResult;

	infoValidate.valid = true;
	return infoValidate;
};

//------------COMPONENT-------------
function PropositionContainer({ input, clean, exp, changueExp }) {
	const [errorMessage, setErrorMessage] = useState("");

	const handleClean = () => {
		clean("");
		changueExp("");
	};

	const handleSolve = () => {
		const resultValidate = validateExp(input);
		if (!resultValidate.valid) {
			setErrorMessage(resultValidate.info);
			return;
		}

		//----Manejando input valido------
		setErrorMessage("");
		changueExp(input);
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
