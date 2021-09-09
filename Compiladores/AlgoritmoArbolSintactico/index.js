const alfabeto = new Set(["a", "b"]);

/* Cambiar */
const r = "a(a|b)*bb";

const rHash = r + "#";

const simboloVacio = 'Ø';

let index = [];
for (let i = 0; i < rHash.length; i++) {
  if (alfabeto.has(rHash[i]) || rHash[i] === "#") {
    index.push(rHash[i]);
  }
}

/* Cambiar */
let primeraPos = new Set([0]); // primeraPos(r#)
const siguientePos = [
  new Set([1, 2, 3]), // siguientePos(0)
  new Set([1, 2, 3]), // siguientePos(1)
  new Set([1, 2, 3]), // siguientePos(2)
  new Set([4]), // siguientePos(3)
  new Set([5]), // siguientePos(4)
];

function getP(estadosD, t, a) {
  let estados = [...estadosD[t]];
  let pList = [];
  for (let i = 0; i < estados.length; i++) {
    if (index[estados[i]] === a) {
      pList.push(estados[i]);
    }
  }
  return pList;
}

function eqSet(as, bs) {
  if (as.size !== bs.size) return false;
  for (let a of as) if (!bs.has(a)) return false;
  return true;
}

function imprimirResultados(tranD, alfabeto, estadosD) {
  let tablaTranD = {};
  const simbolosAlfabeto = [...alfabeto];
  const estadosLetra = [];
  const posHashtag = index.length - 1;
  
  for (let i = 0; i < tranD.length; i++) {
    let estado = String.fromCharCode(i + 65);
    estadosLetra.push(estado);
    if (i === 0) estado = "→" + estado
    if (estadosD[i].has(posHashtag)) estado = estado + "*"
    tablaTranD[estado] = {};
    for (let j = 0; j < simbolosAlfabeto.length; j++) {
      let simbolo = simbolosAlfabeto[j];
      if (tranD[i][j] === simboloVacio) {
        tablaTranD[estado][simbolo] = simboloVacio;
      } else {
        tablaTranD[estado][simbolo] = String.fromCharCode(tranD[i][j] + 65);
      }
    }
  }

  console.log(`Alfabeto = { ${simbolosAlfabeto.join(", ")} }`);
  console.log(`Estados  = { ${estadosLetra.join(", ")} }`);
  console.table(tablaTranD);
}

function ejecutar() {
  const estadosD = [];
  const tranD = [[]];

  estadosD.push(primeraPos);

  let t = 0;
  while (t < estadosD.length) {
    let i = 0;
    for (const a of alfabeto) {
      let pList = getP(estadosD, t, a);
      let u = new Set(pList.map((s) => [...siguientePos[s]]).flat(1));

      let pos = estadosD.findIndex((el) => eqSet(el, u));
      if (u.size > 0 && pos === -1) {
        estadosD.push(u);
        tranD.push([]);
      }

      if (u.size === 0) {
        tranD[t][i] = simboloVacio; // Vacio
      } else if (pos !== -1) {
        tranD[t][i] = pos; // Ya existe
      } else {
        tranD[t][i] = t + 1; // Nuevo
      }
      i++;
    }
    t++;
  }
  
  
  imprimirResultados(tranD, alfabeto, estadosD); // Imprime Alfabeto, Estados y tranD
}

ejecutar();
