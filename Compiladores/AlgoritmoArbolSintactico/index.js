import { getP, eqSet, transformTranD } from './utils.js';

const alfabeto = new Set(['a', 'b']);

/* Cambiar */
const r = 'a(a|b)*bb';

const rHash = r + '#';

const simboloVacio = 'Ø';

let index = [];
for (let i = 0; i < rHash.length; i++) {
	if (alfabeto.has(rHash[i]) || rHash[i] === '#') {
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

const estadosD = [];
const tranD = [[]];

estadosD.push(primeraPos);

let t = 0;
while (t < estadosD.length) {
	let i = 0;
	for (const a of alfabeto) {
		let pList = getP(index, estadosD, t, a);
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

// Graficar
const nodos = transformTranD(index, tranD, alfabeto, estadosD, simboloVacio); // Imprime Alfabeto, Estados y tranD

let nodes = [];
let edges = [];

for (const nodo of nodos) {
	const { estado, inicio, finalizacion, transicion } = nodo;
	console.log('EStado:', estado);
	const node = {
		data: {
			id: estado,
			label: `${inicio ? '→' : ''}${estado}${finalizacion ? '*' : ''}`,
		},
	};

	for (const { simbolo, destino } of transicion) {
		if (destino !== simboloVacio) {
			const edge = {
				data: {
					id: estado+destino,
					label: simbolo,
					source: estado,
					target: destino,
				},
			};
			edges.push(edge);
		}
	}
	nodes.push(node);
}

console.log(nodes);
console.log(edges);

cytoscape({
	container: document.getElementById('cy'),

	elements: {
		nodes,
		edges,
	},

	layout: {
		name: 'dagre',
		columns: 1,
	},
	style: [
		{
			selector: 'node',
			css: {
				label: 'data(label)',
				'text-valign': 'center',
				'text-halign': 'center',
			},
		},
		{
			selector: 'edge',
			css: {
				label: 'data(label)',
				'curve-style': 'bezier',
				'control-point-step-size': 40,
				'target-arrow-shape': 'triangle',
			},
		},
	],
});
