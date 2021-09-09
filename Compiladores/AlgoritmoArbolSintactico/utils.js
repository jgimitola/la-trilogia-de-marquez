export function getP(index, estadosD, t, a) {
  let estados = [...estadosD[t]];
  let pList = [];
  for (let i = 0; i < estados.length; i++) {
    if (index[estados[i]] === a) {
      pList.push(estados[i]);
    }
  }
  return pList;
}

export function eqSet(as, bs) {
  if (as.size !== bs.size) return false;
  for (let a of as) if (!bs.has(a)) return false;
  return true;
}

export function imprimirResultados(index, tranD, alfabeto, estadosD, simboloVacio) {
  let tablaTranD = {};
  const simbolosAlfabeto = [...alfabeto];
  const estadosLetra = [];
  const posHashtag = index.length - 1;

  for (let i = 0; i < tranD.length; i++) {
    let estado = String.fromCharCode(i + 65);
    estadosLetra.push(estado);
    if (i === 0) estado = '→' + estado;
    if (estadosD[i].has(posHashtag)) estado = estado + '*';
    tablaTranD[estado] = {};
    for (let j = 0; j < simbolosAlfabeto.length; j++) {
      let simbolo = simbolosAlfabeto[j];
      if (tranD[i][j] === simboloVacio) {
        tablaTranD[estado][simbolo] = simboloVacio;
      } else {
        tablaTranD[estado][simbolo] = String.fromCharCode(
          tranD[i][j] + 65
        );
      }
    }
  }
  console.log(`Alfabeto = { ${simbolosAlfabeto.join(', ')} }`);
		console.log(`Estados  = { ${estadosLetra.join(', ')} }`);
		console.table(tablaTranD);
}