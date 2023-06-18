// Definición de tipos
type DataType = "integer" | "float" | "string";

interface Statement {
  type: string;
}

interface PrintStatement extends Statement {
  type: "print";
  value: string;
}

interface IfStatement extends Statement {
  type: "if";
  condition: boolean;
  trueBlock: Statement[];
  falseBlock: Statement[];
}

interface ForStatement extends Statement {
  type: "for";
  variable: string;
  initialValue: number;
  condition: string;
  increment: number;
  block: Statement[];
}

interface VariableDeclarationStatement extends Statement {
  type: "variableDeclaration";
  name: string;
  dataType: DataType;
  value: number | string;
}

interface AssignmentStatement extends Statement {
  type: "assignment";
  variable: string;
  value: number | string;
}

interface WhileStatement extends Statement {
  type: "while";
  condition: string;
  block: Statement[];
}

interface SwitchStatement extends Statement {
  type: "switch";
  condition: string;
  cases: {
    value: string;
    block: Statement[];
  }[];
}

// Función para ejecutar el intérprete
function executeInterpreter(statements: Statement[]) {
  for (const statement of statements) {
    switch (statement.type) {
      case "print":
        const printStatement = statement as PrintStatement;
        console.log(printStatement.value);
        break;
      case "if":
        const ifStatement = statement as IfStatement;
        if (ifStatement.condition) {
          executeInterpreter(ifStatement.trueBlock);
        } else {
          executeInterpreter(ifStatement.falseBlock);
        }
        break;
      case "for":
        const forStatement = statement as ForStatement;
        for (
          let i = forStatement.initialValue;
          eval(forStatement.condition);
          i += forStatement.increment
        ) {
          executeInterpreter(forStatement.block);
        }
        break;
      case "variableDeclaration":
        const variableDeclarationStatement = statement as VariableDeclarationStatement;
        // Aquí puedes realizar la lógica para declarar la variable en base a su tipo de datos
        break;
      case "assignment":
        const assignmentStatement = statement as AssignmentStatement;
        // Aquí puedes realizar la lógica para asignar el valor a la variable
        break;
      case "while":
        const whileStatement = statement as WhileStatement;
        while (eval(whileStatement.condition)) {
          executeInterpreter(whileStatement.block);
        }
        break;
      case "switch":
        const switchStatement = statement as SwitchStatement;
        let caseFound = false;
        for (const switchCase of switchStatement.cases) {
          if (switchCase.value === switchStatement.condition) {
            executeInterpreter(switchCase.block);
            caseFound = true;
            break;
          }
        }
        if (!caseFound) {
          const defaultCase = switchStatement.cases.find(
            (switchCase) => switchCase.value === "default"
          );
          if (defaultCase) {
            executeInterpreter(defaultCase.block);
          }
        }
        break;
    }
  }
}

// Cargar el archivo de texto y ejecutar el intérprete
const fs = require("fs");
const statements = JSON.parse(fs.readFileSync("input.txt", "utf8")) as Statement[];
executeInterpreter(statements);
