export const validateFirstChar = (expression) => {
    const firstChar = expression[0]
    const lastChar = expression[expression.length-1]
    const lastError = ["~"];
    const firstError = ['∧', 'V', '→', '↔', '⊻']

    for (const char of firstError) {
        if (firstChar === char) return false
    }

    for(const char of lastError){
        if(lastChar === char) return false
    }

    return true
}

export const validateParenthesis = (input) => {
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

export const validateStructure = (input) => {
    const infoValidate = {
        valid:false,
        info:''
    }


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
                infoValidate.info = 'Las proposiciones no pueden estar precedidas por otra proposicion o parentesis de cierre'
                return infoValidate
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
                infoValidate.info = 'Los operadores binarios no pueden estar precedidos por otros operadores binarios'
                return infoValidate
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
                infoValidate.info = 'El operador de negacion no puede estar precedido por proposiciones, parentesis de cierre, u otro operador de negacion'
                return infoValidate
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
                infoValidate.info = 'Los parentesis de aperturea no pueden estar precedidos por proposiciones u otro parentesis de apertura'
                return infoValidate
            }

            prevChar = char
        }

        //5. Caso para parentesis de cierre
        if(char === ')'){
            if(prevChar === '('){
                infoValidate.info = 'Los parentesis de cierre no pueden estar precedidos por parentesis de apertura'
                return infoValidate
            }

            prevChar = char
        }
    }
    infoValidate.valid = true
    return infoValidate
}