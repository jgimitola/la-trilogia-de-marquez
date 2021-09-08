const alfabeto = new Set(["a", "b"]);

/* Cambiar */
const r = "a(a|b)*bb";

const r_hash = r + "#";

let index = [];
for (let i = 0; i < r_hash.length; i++) {
  if (alfabeto.has(r_hash[i]) || r_hash[i] === "#") {
    index.push(r_hash[i]);
  }
}

/* Cambiar */
let primera_pos = new Set([0]); // primera_pos(r#)
const siguiente_pos = [
  new Set([1, 2, 3]), // siguiente_pos(1)
  new Set([1, 2, 3]), // siguiente_pos(2)
  new Set([1, 2, 3]), // siguiente_pos(3)
  new Set([4]),
  new Set([5]),
  new Set([]),
];

function getP(estadosD, t, a) {
  let estados = [...estadosD[t]];
  let p_list = [];
  for (let i = 0; i < estados.length; i++) {
    if (index[estados[i]] === a) {
      p_list.push(estados[i]);
    }
  }
  return p_list;
}

function eqSet(as, bs) {
  if (as.size !== bs.size) return false;
  for (let a of as) if (!bs.has(a)) return false;
  return true;
}

function ejecutar() {
  let estadosD = [];
  let tranD = [[], [], [], [], [], [], [], [], [], [], [], [], [], [], []];

  estadosD.push(primera_pos);

  let t = 0;
  while (t < estadosD.length) {
    let i = 0;
    for (const a of alfabeto) {
      let p_list = getP(estadosD, t, a);
      let u = new Set(p_list.map((s) => [...siguiente_pos[s]]).flat(1));

      let pos = estadosD.findIndex((el) => eqSet(el, u));
      if (u.size > 0 && pos === -1) {
        estadosD.push(u);
      }

      if (u.size === 0) {
        tranD[t][i] = -1; // Vacio
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
}

ejecutar();
