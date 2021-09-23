export function actualizarPasos(pasoapaso, i, a, u, estadosD, simboloVacio) {
  const esVacio = u === simboloVacio;
  let T = String.fromCharCode(i + 65);
  let aLetra = String.fromCharCode(a + 97);
  let U = !esVacio ? String.fromCharCode(u + 65) : simboloVacio;

  let conjunto = !esVacio ? `{${[...estadosD[u]].join(", ")}}` : "{}";
  pasoapaso.value += `T = ${T} ; a = ${aLetra} ; U = ${U} = ${conjunto} \n`;
}

export function mostrarTablaTranD(tabla, nodos, alfabeto) {
  `
  <tr>
    <th></th>
    <th>a</th>
    <th>b</th>
  </tr>
  <tr>
    <td>A</td>
    <td>B</td>
    <td>B</td>
  </tr>
  <tr>
    <td>B</td>
    <td>A</td>
    <td>A</td>
  </tr>
  `
  let tr = document.createElement("tr");
  tr.appendChild(document.createElement("th")); // Empty header for the first column
  let th;
  for (const simbolo of [...alfabeto]) {
    th = document.createElement("th");
    th.innerText = simbolo;
    tr.appendChild(th);
  }
  tabla.appendChild(tr);
  let i = 0, td;
  for (const nodo of nodos) {
    tr = document.createElement("tr");
    td = document.createElement("td");
    const {inicio, estado, finalizacion} = nodo;
    td.innerText = `${inicio ? "→" : ""}${finalizacion ? "*" : ""}${estado}`;
    tr.appendChild(td);
    for (const tran of nodo.transicion) {
      td = document.createElement("td");
      td.innerText = tran.destino;
      tr.appendChild(td);
    }
    tabla.appendChild(tr);
  }
}

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

/**
 * Transforma tranD, pasando de una matriz a un array de objetos con esta estructura:
 * nodos SCHEMA [{
    estado: "A",
    inicio: true,
    finalizacion: false,
    transicion: [{simbolo:"a", destino: "B"},{"b", "B"}]
  }, ...]
 *
 * @param {*} index 
 * @param {*} tranD 
 * @param {*} alfabeto 
 * @param {*} estadosD 
 * @param {*} simboloVacio 
 * @returns nodos
 */
export function transformTranD(index, tranD, alfabeto, estadosD, simboloVacio) {
  const nodos = [];
  const simbolosAlfabeto = [...alfabeto];
  const posHashtag = index.length - 1;

  for (let i = 0; i < tranD.length; i++) {
    const estadoLetra = String.fromCharCode(i + 65);

    const estadoNodo = {};
    estadoNodo["estado"] = estadoLetra;

    estadoNodo["inicio"] = false;
    estadoNodo["finalizacion"] = false;

    if (i === 0) estadoNodo["inicio"] = true;

    if (estadosD[i].has(posHashtag)) estadoNodo["finalizacion"] = true;

    estadoNodo["transicion"] = [];
    for (let j = 0; j < simbolosAlfabeto.length; j++) {
      const simbolo = simbolosAlfabeto[j];
      let destino;

      if (tranD[i][j] === simboloVacio) destino = simboloVacio;
      else destino = String.fromCharCode(tranD[i][j] + 65);

      estadoNodo["transicion"].push({
        simbolo,
        destino,
      });
    }
    nodos.push(estadoNodo);
  }
  return nodos;
}
