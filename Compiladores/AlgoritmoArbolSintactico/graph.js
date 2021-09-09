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
			}
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
