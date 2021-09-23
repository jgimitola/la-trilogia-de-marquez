# Algoritmo del árbol sintáctico

Este algoritmo es utilizado para hallar el automata finito determinista óptimo (AFD óptimo) a partir de una expresión regular (regex).

## Estructura

Al entrar a la pagina por medio del siguiente [enlace](https://jgimitola.github.io/la-trilogia-de-marquez/Compiladores/AlgoritmoArbolSintactico/), encontrarás las siguiente interfaz.

![Interfaz de página](/docs/imgs/PaginaVista.png)

La estructura de la interfaz está compuesta de la siguiente forma:

- A la izquierda, se encuentran los campos para introducir la información con el alfabeto y la expresión regular.
- Abajo del botón enviar, se encuentran una zona de descripción del proceso, esto es, una zona donde sale el paso a paso del algoritmo y una tabla que contiene las transiciones del AFD resultante.
- A la derecha, se encuentra el visualizador del AFD.

## Calculos Importantes

Para utilizar este algoritmo es importante conocer acerca de calculo de las siguientes funciones.

### primerapos(n)

Conjunto de posibles posiciones con las que pueden comenzar cadenas originadas por una expresión regular n.

Ejemplo:

```
primerapos( (a|b)*abb )= {0, 1, 2}

(a | b) * a b b
 0   1    2 3 4

aabb
0234

bababb
101234

abb
234
```

### siguientepos(i)

conjunto de posiciones que le pueden seguir a la posición i

Ejemplo:

```
siguientepos(1)= {0,1,2}

(a|b)*abb
 0 1  234

aababb
001234

babbabb
1011234

bbaabb
110234
```

## ¿Cómo utilizar?

Conociendo la estructura de la interfaz, los pasos para utilizar la página son los siguientes:

1. Introducir los símbolos del alfabeto.
2. Introducir la expresión regular.
3. Dar clic al botón seguir (esto generará nuevos campos).
4. Llenar los campos generados de primerapos(pp) y siguientepos(sp).
5. Dar click al botón de seguir nuevamente para que el algoritmo grafique.

Al cumplir con estos pasos, tendrá un AFD graficado por el algoritmo de árbol sintáctico, tendrá el proceso paso por paso y la tabla de transiciones para construir el mismo AFD.

## Ejemplo
<iframe width="560" height="315" src="https://www.youtube.com/embed/ZcTeD7XGTXc" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>