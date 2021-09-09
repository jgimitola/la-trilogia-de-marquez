import { getP, eqSet, imprimirResultados } from './utils.js';

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

function ejecutar() {
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

	imprimirResultados(index, tranD, alfabeto, estadosD); // Imprime Alfabeto, Estados y tranD
}

ejecutar();

cytoscape({
	container: document.getElementById('cy'),

	elements: {
		nodes: [
			{
				data: {
					id: 'a',
				},
			},
			{
				data: {
					id: 'b',
				},
			},
			{
				data: {
					id: 'c',
				},
			},
		],
		edges: [
			{
				data: {
					id: 'ab',
					source: 'a',
					target: 'b',
					label: 'lamondamia',
				},
			},
			{
				data: {
					id: 'ba',
					source: 'b',
					target: 'a',
				},
			},
			{
				data: {
					id: 'aa',
					source: 'a',
					target: 'a',
					label: 'xd',
				},
			},
		],
	},

	layout: {
		name: 'dagre',
		//name: 'grid',
		rows: 1,
	},
	style: [
		{
			selector: 'node',
			css: {
				label: 'data(id)',
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
