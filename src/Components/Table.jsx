import React, { useState } from "react";
import "../styles/heroSection.css";

const validateFirstChar = (firstChar) => {
    const firstError = ["p", "q", "r", "(", "~"];
    for (const char of firstError) {
        if (firstChar === char) {
            return true
        }
    }
    return false
}

const validateParenthesis = (input) => {
    // Creando la pila vacia

    let stack = [];
    // Recorriendo todo el input
    for(const char of input){
         if (char === "(") {
            stack.push(char);
        } else if (char === ")") {
            if (stack.length === 0) return false;
            stack.pop();
        }
    }

    return stack.length === 0;
}

const validateStructure = (input) => {
    let prevChar = ''
    for(const char of input){
        //1. Caso para proposiciones
        if(char === 'p' || char === 'q'  || char === 'r'){
            // Verificar si es el primer caracter
            if(prevChar === ''){
                prevChar = char 
                continue
            }  
            // Verificar que no tenga incongruencias comparando con el anterior caracter
            if(prevChar === 'p' || prevChar === 'q'  || prevChar === 'r' || prevChar === ')'){
                return false
            } 

            prevChar = char 
        }

        //2. Caso para los operadores binarios
        if(char === '∧' || char === 'V' || char === '→' || char === '↔' || char === '⊻'){
            // Verificar si es el primer caracter
            if(prevChar === ''){
                return false
            }  

            // Verificar caracter anterior
            if(prevChar === '∧' || prevChar === 'V' || prevChar === '→' || prevChar === '↔' || prevChar === '⊻' || prevChar === '~' || prevChar === '('){
                return false
            }

            prevChar = char
        }

        //3. Caso especial para el operador de negacion
        if(char === '~'){
            // Verificar si es el primer caracter
            if(prevChar === ''){
                prevChar = char
                continue
            }  

            if(prevChar === '~' || prevChar === 'p' || prevChar === 'q'  || prevChar === 'r' || prevChar == ')'){
                return false
            }

            prevChar = char
        }

        //4. Caso para parentesis de apertura
        if(char === '('){
            // Verificar si es el primer caracter
            if(prevChar === ''){
                prevChar = char
                continue
            }  

            if(prevChar === 'p' || prevChar === 'q'  || prevChar === 'r' || prevChar === '('){
                return false
            }

            prevChar = char
        }

        //5. Caso para parentesis de cierre
        if(char === ')'){
            if(prevChar === 'p' || prevChar === 'q'  || prevChar === 'r' || prevChar === '('){
                return false
            }

            prevChar = char
        }
    }
    return true
}



function Table({ expression }) {
    const [state, changeExpression] = useState("p->q");

    const handleSolve = () => {
        //-----Verificar toda la expresion------
        if (expression.length < 2) {
            changeExpression("Por favor ingresa un input valido");
            return
        }

        if(!(validateFirstChar(expression[0]) && validateParenthesis(expression) && validateStructure(expression))) {
            changeExpression("Por favor ingresa un input valido");
            return
        }
        //----Manejando input valido------
        changeExpression(expression)
    };

    return (
        <>
            <button className="btnProposition2" onClick={handleSolve}>
                Resolver
            </button>
            <div>
                <h3>Truth table result</h3>
                <span>Expression: {state}</span>
                <div className="resultTable"></div>
            </div>
        </>
    );
}

export default Table;
