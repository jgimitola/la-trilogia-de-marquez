import { getP, eqSet, transformTranD } from "./utils.js";

let paso = 0;

const form = document.getElementById("form");
const inputAlfabeto = document.getElementById("alphabet-field");
const inputExpresion = document.getElementById("regex-field");
const submitButton = document.getElementById("continue-button");

let alfabeto,
  r,
  rHash,
  index = [],
  primeraPos = [],
  siguientePos = [];

const simboloVacio = "Ø";

submitButton.addEventListener("click", (e) => {
  e.preventDefault();

  switch (paso) {
    case 0:
      alfabeto = new Set(inputAlfabeto.value.split(",").map((s) => s.trim()));
      r = inputExpresion.value.trim();

      rHash = r + "#";

      for (let i = 0; i < rHash.length; i++) {
        if (alfabeto.has(rHash[i]) || rHash[i] === "#") {
          index.push(rHash[i]);
        }
      }

      let div = document.createElement("div");
      let label = document.createElement("label");
      let input = document.createElement("input");

      div.classList.add("field");
      label.htmlFor = "sp-1";
      label.innerText = "pp(r#)=";
      input.id = "sp-1";
      input.type = "text";

      div.append(label, input);
      form.appendChild(div);

      for (let i = 0; i < index.length - 1; i++) {
        div = document.createElement("div");
        label = document.createElement("label");
        input = document.createElement("input");

        div.classList.add("field");
        label.htmlFor = `sp${i}`;
        label.innerText = `sp(${i})=`;
        input.id = `sp${i}`;
        input.type = "text";

        div.append(label, input);
        form.appendChild(div);
      }
      break;
    case 1:
      primeraPos = new Set(
        document
          .getElementById("sp-1")
          .value.split(",")
          .map((s) => parseInt(s.trim()))
      );

      for (let i = 0; i < index.length - 1; i++) {
        let inputSp = document.getElementById(`sp${i}`);
        siguientePos.push(
          new Set(inputSp.value.split(",").map((s) => parseInt(s.trim())))
        );
      }
      calcularGraficar();
      break;
  }
  paso++;
  paso = paso % 2;
});

function calcularGraficar() {
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
  console.table(tranD);

  // Graficar
  const nodos = transformTranD(index, tranD, alfabeto, estadosD, simboloVacio); // Imprime Alfabeto, Estados y tranD

  let nodes = [];
  let edges = [];

  for (const nodo of nodos) {
    const { estado, inicio, finalizacion, transicion } = nodo;

    const node = {
      data: {
        id: estado,
        label: `${inicio ? "→" : ""}${estado}${finalizacion ? "*" : ""}`,
      },
    };

    for (const { simbolo, destino } of transicion) {
      if (destino !== simboloVacio) {
        const edge = {
          data: {
            id: estado + destino,
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

  cytoscape({
    container: document.getElementById("cy"),

    elements: {
      nodes,
      edges,
    },
    style: [
      {
        selector: "node",
        css: {
          label: "data(label)",
          "text-valign": "center",
          "text-halign": "center",
        },
      },
      {
        selector: "edge",
        css: {
          label: "data(label)",
          "curve-style": "bezier",
          "control-point-step-size": 40,
          "target-arrow-shape": "triangle",
        },
      },
    ],
  });
}
