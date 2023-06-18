// index.ts
import Interpreter from './Interpreter';

const program = `
declarar Entero x;
declarar String y;
asignar x := 10;
asignar y := "hola";
Escribir(); x;
Escribir(); y;
para(i:=0; i<5; i++) {
  Escribir(); i;
}
mientras(x > 0) {
  Escribir(); "Iteración";
  asignar x := x - 1;
}
encasode(x) {
  caso 1:
    Escribir(); "x es 1";
    salir;
  caso 2:
    Escribir(); "x es 2";
    salir;
  defecto:
    Escribir(); "x es otro valor";
}`;

const statements = program.split("\n").filter((line) => line.trim() !== "");

const interpreter = new Interpreter();
interpreter.execute(statements);
