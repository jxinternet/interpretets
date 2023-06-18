# interpretets
Ejercicio de interpretación de JavaScript aplicando TypeScript y JSON
Un intérprete que recibe como entrada un archivo de texto que contiene varias sentencias, puede recibir,
- Una funcion de impresion, que se denomina "Escribir();" el cual recibe como parametro una cadena (un numero, texto o una variable) y la imprime en consola
-Instrucciones If- If - eslse. Es como la sentencia if, este debe de recibir una condicion booleana y adentro hara algunas instrucciones
si(condicion) {
	**instrucciones
} sino {
	**instrucciones
}
* Instruccion para; Es como un for, recibira una variable (al final la variable se debe de declara previamente, antes del ciclo), una condicion y un incremento (el incremento solo es necesario que sea de 1) y hara las instrucciones dentro;
para(i:=0; condicion; i++) {
	**instrucciones
}

* Instrucciones de declaracion de variables, donde debe de aceptar el tipo de variable con su valor primitivo que se definio; solo acepta Enteros, Float y String; 
Ejemplo:
Entero x;
String y;
* Instruccion de Asignacion, donde en base a la variable que se definio, se le puede asignar algun valor en base a su tipo
x := 10;
y := "hola";
* Instruccion Mientras: Es como el while, ejecuta una expresion booleana, pueden haber expresiones dentro del ciclo.
mientras(condicion) {
	INstruccines
}
* Instruccion Switch: es el switch normal, donde recibira una condicion y ejecutara una serie de casos, hasta encontar algo o sino un default;

encasode(condicion) {
	caso 1:
		**algo
		salir;
	caso 2;
		**algo
		salir;
	.
	.
	.
	defecto:
		**algo
}
