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

export function imprimirResultados(
	index,
	tranD,
	alfabeto,
	estadosD,
	simboloVacio
) {
	const tablaTranD = [];
	const simbolosAlfabeto = [...alfabeto];	
	const posHashtag = index.length - 1;

	/* 
  tablaTranD SCHEMA  {
    estado: "A",
    inicio: true,
    finalizacion: false,
    transicion: [{simbolo:"a", destino: "B"},{"b", "B"}]
  }
  */

	for (let i = 0; i < tranD.length; i++) {
		const estadoLetra = String.fromCharCode(i + 65);

		const estadoNodo = {};
		estadoNodo['estado'] = estadoLetra;

		estadoNodo['inicio'] = false;
		estadoNodo['finalizacion'] = false;

		if (i === 0) estadoNodo['inicio'] = true;

		if (estadosD[i].has(posHashtag)) estadoNodo['finalizacion'] = true;

		estadoNodo['transicion'] = [];
		for (let j = 0; j < simbolosAlfabeto.length; j++) {
			const simbolo = simbolosAlfabeto[j];
			let destino;

			if (tranD[i][j] === simboloVacio) destino = simboloVacio;
			else destino = String.fromCharCode(tranD[i][j] + 65);

			estadoNodo['transicion'].push({
				simbolo,
				destino,
			});
		}
		tablaTranD.push(estadoNodo);
	}
	/* console.log(`Alfabeto = { ${simbolosAlfabeto.join(', ')} }`);
	console.log(`Estados  = { ${estadosLetra.join(', ')} }`);
	console.table(tablaTranD); */

	console.log(simbolosAlfabeto);
	console.log(tablaTranD);
  console.log("##########");
	return tablaTranD;
}
