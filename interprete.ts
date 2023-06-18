// Interprete.ts
type VariableType = "Entero" | "Float" | "String";

class Interpreter {
  variables: { [name: string]: any};

  constructor() {
    this.variables = {};
  }

  execute(statements: string[]) {
    for (const statement of statements) {
      this.executeStatement(statement);
    }
  }

  executeStatement(statement: string) {
    const tokens = statement.split(" ");
    const command = tokens[0];

    switch (command) {
      case "Escribir();":
        const value = this.evaluateExpression(tokens[1]);
        console.log(value);
        break;
      case "para":
        const variable = tokens[1].split(":=")[0];
        const condition = tokens[2];
        const increment = tokens[3].slice(0, -1);
        this.executeForLoop(variable, condition, increment);
        break;
      case "declarar":
        const type = tokens[1];
        const variableName = tokens[2].slice(0, -1);
        this.declareVariable(variableName, type);
        break;
      case "asignar":
        const varName = tokens[1];
        const expression = tokens[3];
        this.assignVariable(varName, expression);
        break;
      case "mientras":
        const whileCondition = tokens[1];
        const whileBlock = this.extractBlock(tokens, 2);
        this.executeWhileLoop(whileCondition, whileBlock);
        break;
      case "encasode":
        const switchCondition = tokens[1];
        const cases = this.extractCases(tokens, 2);
        this.executeSwitch(switchCondition, cases);
        break;
      default:
        console.log("Comando no reconocido:", command);
    }
  }

  evaluateExpression(expression: string): any {
    if (expression in this.variables) {
      return this.variables[expression];
    } else {
      return expression;
    }
  }

  executeForLoop(variable: string, condition: string, increment: string) {
    const startValue = this.evaluateExpression(condition.split(";")[0]);
    const endValue = this.evaluateExpression(condition.split(";")[1]);
    const variableName = variable.slice(0, -1);

    for (let i = startValue; i < endValue; i += increment) {
      this.variables[variableName] = i;
      this.executeBlock(tokens.slice(1));
    }
  }

  declareVariable(name: string, type: VariableType) {
    this.variables[name] = this.getDefaultValue(type);
  }

  assignVariable(name: string, expression: string) {
    const value = this.evaluateExpression(expression);
    this.variables[name] = value;
  }

  executeWhileLoop(condition: string, block: string[]) {
    while (this.evaluateExpression(condition)) {
      this.executeBlock(block);
    }
  }

  executeSwitch(condition: string, cases: { [key: string]: string[] }) {
    const value = this.evaluateExpression(condition);

    for (const caseValue in cases) {
      if (value === caseValue) {
        this.executeBlock(cases[caseValue]);
        break;
      }
    }
  }

  executeBlock(block: string[]) {
    let i = 0;

    while (i < block.length) {
      const line = block[i];

      if (line === "salir;") {
        break;
      }

      this.executeStatement(line);
      i++;
    }
  }

  extractBlock(tokens: string[], startIndex: number): string[] {
    const block: string[] = [];
    let i = startIndex;

    while (i < tokens.length && tokens[i] !== "}") {
      block.push(tokens[i]);
      i++;
    }

    return block;
  }

  extractCases(tokens: string[], startIndex: number): { [key: string]: string[] } {
    const cases: { [key: string]: string[] } = {};
    let currentCase: string[] = [];
    let currentCaseValue: string | null = null;
    let i = startIndex;

    while (i < tokens.length && tokens[i] !== "defecto:") {
      if (tokens[i].startsWith("caso")) {
        if (currentCaseValue) {
          cases[currentCaseValue] = currentCase;
          currentCase = [];
        }
        currentCaseValue = tokens[i].split(" ")[1].slice(0, -1);
      } else {
        currentCase.push(tokens[i]);
      }
      i++;
    }

    if (currentCaseValue) {
      cases[currentCaseValue] = currentCase;
    }

    return cases;
  }

  getDefaultValue(type: VariableType): any {
    switch (type) {
      case "Entero":
        return 0;
      case "Float":
        return 0.0;
      case "String":
        return "";
      default:
        return null;
    }
  }
}

export default Interpreter;
