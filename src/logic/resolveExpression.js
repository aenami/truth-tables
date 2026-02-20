// Tokenizando la expresion para que sea mucho mas facil analizarla, trabajarla, agruparla, etc..
const tokenizeExp = (expression) => {
  const tokens = []

  for (let char of expression) {
    if (char === ' ') continue
    tokens.push(char)
  }
  return tokens

}

// Queremos pasar la expresion de infija a POSTFIJA para asi poder evaluarla en una pila sin preocuparnos por precedencia o parentesis
// Trabajar expresiones que internamente tienen reglas en notacion Infija es muy dificl porque hay que tenerlas muy en cuenta, muchas condiciones. En cambio, usando la notacion postfija nos ahorramos todo eso, ya que estas se evaluan de una manera mas mecanica y sin tener que preocuparnos de excepciones o cosas que cambian el sentido de la expresion por completo.

function toPostfix(tokens) {
  const output = []; // Pila donde almacenaremos el resultado final
  const operatorStack = []; // Pila temporal para manejar precedencia y paréntesis.

  // Jerarquia de precedencia de los operadores binarios
  const precedence = {
    "~": 5,
    "∧": 4,
    "V": 3,
    "→": 2,
    "↔": 1
  };

  // Funcion para verificar si un token es un operador binario
  const isOperator = (token) => token in precedence;

  // Verifica operandos (p,q,r)
  const isOperand = (token) => {
    return !isOperator(token) && token !== "(" && token !== ")";
  };

  // Loop que analizara cada token
  for (const token of tokens) {

    // 1. Verificar si es variable proposicional (p, q, r...) OPERANDO
    if (isOperand(token)) {
      output.push(token); // Agregamos la proposicion a la pila
    }

    // 2.  Verificar si es un Operador lógico (∧, V)
    else if (isOperator(token)) {

      while (
        // 2.1 Verificamos que la pila no este vacia
        // Verificar que no de problemas con el operador de ~ (Este si puede ir primero)
        operatorStack.length > 0 &&
        // 2.2 Verificamos que el ultimo elemento de la pila sea un operador (∧,V)
        isOperator(operatorStack.at(-1)) &&
        // 2.3 Verificamos que la precedencia del ultimo operador sea mayor o igual a la del actual
        precedence[operatorStack.at(-1)] >= precedence[token]
      ) {
        // Agregamos a la pila de subExpresiones el operador 
        output.push(operatorStack.pop());
      }

      // Agregamos el token a la pila de operadores (∧,V) directamente
      operatorStack.push(token);
    }

    // 3. Verificar si es un Paréntesis izquierdo
    else if (token === "(") {
      operatorStack.push(token);
    }

    // 4. Verificar si es un Paréntesis derecho
    else if (token === ")") {
      // Sacamos toda la subexpresion de la pila de operadores y la agregamos a la de output
      while (operatorStack.at(-1) !== "(") {
        output.push(operatorStack.pop());
      }
      operatorStack.pop(); // eliminar "("
    }
  }

  // Cuando termine de recorrer todos los tokens
  // Vaciar pila. Porque pueden quedar operadores pendientes que nunca fueron expulsados.
  while (operatorStack.length > 0) {
    output.push(operatorStack.pop());
  }

  return output; // Devolvemos el output
}

// Identificamos las variables 
const identifyVariables = (expression) => {
  const variables = []

  // Recorremos todos los caracteres y miramos si ya estan en la lista de variables
  for (const variable of expression) {
    if (variable === 'p' || variable === 'q' || variable === 'r') {
      if (!variables.includes(variable)) variables.push(variable)
    }
  }
  return variables.sort()
}



// Contador binario
function generateCombinations(variables) {
  const n = variables.length;
  const totalRows = 2 ** n;
  const combinations = [];

  for (let i = 0; i < totalRows; i++) {

    const row = {};
    const binary = i.toString(2).padStart(n, "0");

    for (let j = 0; j < n; j++) {
      row[variables[j]] = binary[j] === "1";
    }

    combinations.push(row);
  }

  return combinations.reverse();
}


//-------RESOLVEMOS FINALMENTE LA EXPRESION-----
export const resolveExpression = (input) => {

  const tokens = tokenizeExp(input)
  const postfixTokens = toPostfix(tokens)
  const variables = identifyVariables(tokens)
  const combinations = generateCombinations(variables)

  const results = []

  // Funcion para identificar operadores
  const isOperator = (token) => {
    return ["~", "∧", "V", "→", "↔"].includes(token)
  }

  for (const values of combinations) {

    const stack = []

    // Aqui guardaremos TODAS las subexpresiones evaluadas en esta fila
    const rowSubExpressions = {}

    for (const token of postfixTokens) {

      // ===============================
      // 1️. Si es OPERANDO (p, q, r)
      // ===============================
      if (!isOperator(token)) {
        stack.push({
          value: values[token],
          expr: token
        })
      }

      // ===============================
      // 2️. Si es OPERADOR
      // ===============================
      else {

        // ---------- NEGACIÓN ----------
        if (token === "~") {

          const operand = stack.pop()

          const resultValue = !operand.value
          const resultExpr = `~${operand.expr}`

          // Guardamos la subexpresion evaluada
          rowSubExpressions[resultExpr] = resultValue

          stack.push({
            value: resultValue,
            expr: resultExpr
          })
        }

        // ---------- OPERADORES BINARIOS ----------
        else {

          const right = stack.pop()
          const left = stack.pop()

          let resultValue
          const resultExpr = `(${left.expr}${token}${right.expr})`

          switch (token) {
            case "∧":
              resultValue = left.value && right.value
              break

            case "V":
              resultValue = left.value || right.value
              break

            case "→":
              resultValue = !left.value || right.value
              break

            case "↔":
              resultValue = left.value === right.value
              break
          }

          // Guardamos la subexpresion evaluada
          rowSubExpressions[resultExpr] = resultValue

          stack.push({
            value: resultValue,
            expr: resultExpr
          })
        }
      }
    }

    // El ultimo elemento de la pila es el resultado final
    const finalResult = stack.pop()

    results.push({
      ...values,                 // p: true, q: false, etc
      ...rowSubExpressions,      // todas las subexpresiones
      result: finalResult.value  // resultado final limpio
    })
  }

  return results
}
