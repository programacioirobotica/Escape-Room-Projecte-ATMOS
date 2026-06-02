const base = "Imatges";

const assets = {
  escenaris: {
    terra: `${base}/Escenaris/Terra taques.png`,
    golfes: `${base}/Escenaris/golfes club atmos.png`,
    nau: `${base}/Escenaris/Nau.png`,
    panell: `${base}/Escenaris/Panell control nau.png`,
  },
  personatges: {
    max: `${base}/Personatges/Max.png`,
    lluna: `${base}/Personatges/Lluna.png`,
    robot: `${base}/Personatges/Robot.png`,
    link: `${base}/Personatges/LINK.png`,
    bio: `${base}/Personatges/BIO.png`,
    nitro: `${base}/Personatges/NITRO.png`,
    eko: `${base}/Personatges/EKO.png`,
  },
  sospitosos: {
    fum: `${base}/Targetes sospitosos/Fum.png`,
    sequera: `${base}/Targetes sospitosos/Sequera.png`,
    superficies: `${base}/Targetes sospitosos/Superficie_fosca.png`,
    vegetacio: `${base}/Targetes sospitosos/Pèrdua vegetació.png`,
    aigua: `${base}/Targetes sospitosos/Inundació.png`,
    error: `${base}/Targetes sospitosos/Error_dades.png`,
  },
};

const fases = [
  { titol: "Alerta inicial", temps: "alerta detectada" },
  { titol: "Alerta orbital", temps: "72 hores" },
  { titol: "Les golfes del Club Atmos", temps: "48 hores" },
  { titol: "Els sospitosos climàtics", temps: "24 hores" },
  { titol: "Diagnòstic inicial", temps: "1 hora" },
  { titol: "Protocol Ombra activat", temps: "Protocol Ombra activat" },
];

const pistes = [
  "Pista 1: La taca no és només una ombra. Pot estar relacionada amb la manera com la superfície reflecteix o absorbeix la llum.",
  "Pista 2: Una zona pot semblar més fosca perquè ha canviat la seva superfície, perquè hi ha menys vegetació, perquè hi ha més materials foscos o perquè l'atmosfera impedeix veure-la bé.",
  "Pista 3: Cap dada aïllada és suficient. Cal comparar el que veu el satèl·lit amb el que mesuren els sensors a la superfície.",
];

const estatInicial = {
  fase: 0,
  pistes: [],
  resoltes: [],
};

const clau = "atmos-webapp-estat";
let estat = carregaEstat();

function carregaEstat() {
  try {
    return { ...estatInicial, ...JSON.parse(localStorage.getItem(clau)) };
  } catch {
    return { ...estatInicial };
  }
}

function desaEstat() {
  localStorage.setItem(clau, JSON.stringify(estat));
}

function reinicia() {
  localStorage.removeItem(clau);
  estat = { ...estatInicial };
  renderitza();
}

function resolFase(pista) {
  if (!estat.resoltes.includes(estat.fase)) estat.resoltes.push(estat.fase);
  if (typeof pista === "number" && !estat.pistes.includes(pista)) estat.pistes.push(pista);
  desaEstat();
  renderitza();
}

function avanca() {
  estat.fase = Math.min(estat.fase + 1, fases.length - 1);
  desaEstat();
  renderitza();
}

function imatge(src, alt) {
  return `<img src="${src}" alt="${alt}" />`;
}

function personatges(llista) {
  return `<div class="personatges">${llista.map(([nom, src]) => `
    <figure>
      ${imatge(src, nom)}
      <figcaption>${nom}</figcaption>
    </figure>
  `).join("")}</div>`;
}

function layout(contingut) {
  const fase = fases[estat.fase];
  const progres = Math.round((Math.min(estat.fase, fases.length - 1) / (fases.length - 1)) * 100);
  return `
    <header class="capcalera">
      <div>
        <span class="etiqueta">Robots en acció: Projecte ATMOS</span>
        <h1>${fase.titol}</h1>
      </div>
      <div class="eines">
        <div class="temps"><span>Compte enrere</span><strong>${fase.temps}</strong></div>
        <button class="boto secundari" data-accio="reinicia">Reinicia la missió</button>
      </div>
    </header>
    <div class="progres" aria-label="Progrés de la missió">
      <span style="width:${progres}%"></span><strong>${progres}%</strong>
    </div>
    <main class="graella">
      <section class="escena">${contingut}</section>
      <aside class="pistes">
        <h2>Pistes desbloquejades</h2>
        ${estat.pistes.length ? `<ul>${estat.pistes.filter((id) => pistes[id]).map((id) => `<li>${pistes[id]}</li>`).join("")}</ul>` : "<p>Cap pista registrada encara.</p>"}
      </aside>
    </main>
  `;
}

function inici() {
  return `
    <main class="inici">
      <div class="orbita">
        ${imatge(assets.escenaris.terra, "La Terra vista des de l'espai amb una anomalia sobre Catalunya")}
        <span class="marca-catalunya"></span>
      </div>
      <section class="copia-inici">
        <span class="etiqueta">Alerta orbital detectada</span>
        <h1>Robots en acció: Projecte ATMOS</h1>
        <h2>Episodi 1: Protocol Ombra</h2>
        <p>Des de l'espai semblen ombres. Des de la Terra, les dades expliquen una altra història.</p>
        <button class="boto" data-accio="comenca">Comença la missió</button>
      </section>
    </main>
  `;
}

function fase1() {
  return layout(`
    <article class="panell dialeg">
      ${personatges([["Max", assets.personatges.max], ["Lluna", assets.personatges.lluna], ["Robot", assets.personatges.robot]])}
      <div>
        <span class="senyal">Transmissió segura</span>
        <h2>Canal orbital</h2>
        <p>Club Atmos, aquí Max i Lluna. Hem detectat una anomalia sobre la vostra zona. No és una tempesta normal. No és una ombra convencional. La taca s'està expandint.</p>
      </div>
    </article>
    <article class="panell">
      <h2>Activa el protocol d'observació</h2>
      <p class="subtil">La taca no es pot explicar amb una sola idea. Tria les tres comprovacions científiques que tenen sentit abans de donar cap hipòtesi.</p>
      <div class="tokens" data-repte="observacio">
        ${[
          ["llum", "Mesurar la llum que arriba a la zona"],
          ["nau", "Culpar directament la nau"],
          ["dades", "Registrar dades i comparar-les amb mesures anteriors"],
          ["atzar", "Acceptar que és una taca aleatòria"],
          ["superficie", "Comparar com reflecteixen la llum diferents superfícies"],
          ["color", "Mirar només una foto i decidir pel color"],
        ].map(([id, text]) => `<button class="targeta-token" data-comprovacio="${id}">${text}</button>`).join("")}
      </div>
      <div class="sequencia" id="sequencia">Comprovacions seleccionades: 0/3</div>
      <p class="resposta" id="resposta">Busca accions que es puguin mesurar o contrastar amb dades.</p>
      <button class="boto" data-accio="valida-observacio">Activa el protocol</button>
      <button class="boto secundari" data-accio="neteja-observacio">Neteja</button>
    </article>
    ${botoAvanca()}
  `);
}

function fase2() {
  const zones = [
    ["Zona urbana", 70, 48],
    ["Zona verda", 65, 31],
    ["Zona seca", 58, 26],
  ];
  return layout(`
    <article class="laboratori" style="background-image:url('${assets.escenaris.golfes}')">
      <div class="panell sobreposat">
        ${personatges([["Link", assets.personatges.link], ["Bio", assets.personatges.bio], ["Nitro", assets.personatges.nitro], ["EKO", assets.personatges.eko]])}
        <p>El senyal arriba a les golfes del Club Atmos. Link, Bio, Nitro i EKO obren el mapa d'anomalies. A simple vista, no hi ha prou informació. Cal comparar dades.</p>
      </div>
    </article>
    <article class="panell">
      <h2>Detecta la pèrdua més gran de brillantor</h2>
      <div class="zones">
        ${zones.map(([nom, abans, ara]) => `
          <button class="zona" data-zona="${nom}">
            <strong>${nom}</strong>
            <span>Anterior: ${abans}</span>
            <span>Actual: ${ara}</span>
            <meter min="0" max="100" value="${ara}">${ara}</meter>
          </button>
        `).join("")}
      </div>
      <p class="resposta" id="resposta">Compara les diferències i tria la més gran.</p>
    </article>
    ${botoAvanca()}
  `);
}

function fase3() {
  const sospitosos = [
    ["fum", "Fum / partícules", assets.sospitosos.fum],
    ["sequera", "Sequera", assets.sospitosos.sequera],
    ["superficies", "Superfícies fosques", assets.sospitosos.superficies],
    ["vegetacio", "Pèrdua de vegetació", assets.sospitosos.vegetacio],
    ["aigua", "Aigua / inundació", assets.sospitosos.aigua],
    ["error", "Error de dades", assets.sospitosos.error],
  ];
  return layout(`
    <article class="panell">
      <h2>Tauler de sospitosos climàtics</h2>
      <div class="sospitosos">
        ${sospitosos.map(([, nom, src]) => `<figure>${imatge(src, nom)}<figcaption>${nom}</figcaption></figure>`).join("")}
      </div>
    </article>
    ${repteRelacions("sospitosos", sospitosos)}
    ${botoAvanca()}
  `);
}

function fase5() {
  const opcions = [
    "Una ombra projectada per la nau.",
    "Un senyal artificial d'origen desconegut.",
    "Un efecte combinat de canvis en la superfície, l'atmosfera i les dades d'observació.",
    "Una avaria impossible d'analitzar.",
  ];
  return layout(`
    <article class="panell dialeg">
      ${personatges([["Max", assets.personatges.max], ["Lluna", assets.personatges.lluna], ["Link", assets.personatges.link], ["Bio", assets.personatges.bio]])}
      <div>
        <span class="senyal">Canal mixt</span>
        <h2>Diagnòstic inicial</h2>
        <p>Club Atmos, necessitem una primera hipòtesi. Què són les taques fosques?</p>
      </div>
    </article>
    <article class="panell">
      <h2>Tria una hipòtesi inicial</h2>
      ${opcions.map((opcio, index) => `<button class="hipotesi" data-hipotesi="${index}">${opcio}</button>`).join("")}
      <p class="resposta" id="resposta">Selecciona la hipòtesi que integra superfície, atmosfera i dades.</p>
    </article>
    ${botoAvanca()}
  `);
}

function final() {
  return `
    <main class="final">
      <section class="mapa-final">
        ${imatge(assets.escenaris.panell, "Panell de missió amb dades desbloquejades")}
        <span class="escaneig"></span>
      </section>
      <section class="copia-final">
        <span class="etiqueta">Dades desbloquejades</span>
        <h1>Protocol Ombra activat</h1>
        <h2>Missió de camp: Zona Ombra</h2>
        <p>El Club Atmos ha activat el Protocol Ombra. Ara us toca investigar. Construïu una zona de proves, mesureu la llum, compareu superfícies, programeu robots i descobriu quina causa pot explicar l'anomalia. La Terra no parla, però les seves dades ens avisen.</p>
        <div class="codi">ATMOS-OMBRA-72</div>
        <div class="botons">
          <button class="boto" data-accio="camp">Inicia la investigació</button>
          <button class="boto secundari" data-accio="reinicia">Torna a començar</button>
          <button class="boto secundari" data-accio="mostra-pistes">Veure pistes</button>
        </div>
        <div id="pistes-final" class="pistes-final" hidden>${estat.pistes.filter((id) => pistes[id]).map((id) => `<p>${pistes[id]}</p>`).join("")}</div>
        <p class="resposta exit" id="resposta"></p>
      </section>
    </main>
  `;
}

function repteRelacions(tipus, elements) {
  const opcions = tipus === "sospitosos" ? [
    "la llum queda filtrada o bloquejada abans d'arribar a la superfície.",
    "cal comparar satèl·lit i sensors de superfície.",
    "l'aigua pot crear reflexos irregulars o enfosquir zones segons l'angle.",
    "el sòl s'asseca, canvia de color i pot reflectir diferent.",
    "disminueix el verd i apareixen zones marrons o nues.",
    "l'asfalt i les cobertes fosques absorbeixen més energia.",
  ] : [
    "mesurar llum ambiental i registrar dades.",
    "recórrer una maqueta i detectar zones clares o fosques.",
    "construir un mecanisme o resposta simple.",
    "classificar superfícies, colors o crear un prototip més avançat.",
  ];
  return `
    <article class="panell">
      <h2>${tipus === "sospitosos" ? "Relaciona sospitós i prova" : "Assigna cada dispositiu a la seva funció"}</h2>
      <div class="relacions" data-tipus="${tipus}">
        ${elements.map(([id, nom, src]) => `
          <label class="relacio">
            ${imatge(src, nom)}
            <strong>${nom}</strong>
            <select data-id="${id}">
              <option value="">Selecciona una prova</option>
              ${opcions.map((opcio) => `<option value="${opcio}">${opcio}</option>`).join("")}
            </select>
          </label>
        `).join("")}
      </div>
      <p class="resposta" id="resposta">Relaciona cada element amb la prova que el confirma.</p>
      <button class="boto" data-accio="valida-relacions">Comprova connexions</button>
    </article>
  `;
}

function botoAvanca() {
  const resolta = estat.resoltes.includes(estat.fase);
  return `
    <div class="avanc panell">
      <p class="resposta ${resolta ? "exit" : ""}">${resolta ? "Repte resolt. Podeu avançar." : "Resol el repte per obrir el següent canal."}</p>
      <button class="boto" data-accio="avanca" ${resolta ? "" : "disabled"}>Avança</button>
    </div>
  `;
}

function validaObservacio() {
  const triades = [...document.querySelectorAll("[data-comprovacio].seleccionada")].map((node) => node.dataset.comprovacio).sort();
  const correctes = ["dades", "llum", "superficie"];
  const esCorrecte = triades.length === 3 && correctes.every((valor, index) => triades[index] === valor);
  if (esCorrecte) {
    document.getElementById("resposta").textContent = "Protocol activat. Primer mesurarem la llum, compararem superfícies i registrarem dades per verificar el canvi.";
    setTimeout(() => resolFase(0), 450);
  } else {
    document.getElementById("resposta").textContent = "Encara no quadra. Tria només comprovacions que es puguin mesurar, comparar o registrar.";
  }
}

function validaRelacions() {
  const tipus = document.querySelector(".relacions").dataset.tipus;
  const valors = Object.fromEntries([...document.querySelectorAll("select[data-id]")].map((select) => [select.dataset.id, select.value]));
  const correctes = tipus === "sospitosos" ? {
    fum: "la llum queda filtrada o bloquejada abans d'arribar a la superfície.",
    sequera: "el sòl s'asseca, canvia de color i pot reflectir diferent.",
    superficies: "l'asfalt i les cobertes fosques absorbeixen més energia.",
    vegetacio: "disminueix el verd i apareixen zones marrons o nues.",
    aigua: "l'aigua pot crear reflexos irregulars o enfosquir zones segons l'angle.",
    error: "cal comparar satèl·lit i sensors de superfície.",
  } : {
    microbit: "mesurar llum ambiental i registrar dades.",
    cody: "recórrer una maqueta i detectar zones clares o fosques.",
    essential: "construir un mecanisme o resposta simple.",
    prime: "classificar superfícies, colors o crear un prototip més avançat.",
  };
  const totCorrecte = Object.entries(correctes).every(([id, resposta]) => valors[id] === resposta);
  if (totCorrecte) {
    document.getElementById("resposta").textContent = "Connexions verificades. La pista queda registrada.";
    setTimeout(() => resolFase(tipus === "sospitosos" ? 2 : 3), 450);
  } else {
    document.getElementById("resposta").textContent = tipus === "sospitosos"
      ? "Cap dada aïllada tanca el cas. Compara cada causa amb la prova que la confirmaria."
      : "Revisa si aquesta dada ve del satèl·lit o dels sensors de superfície.";
  }
}

function escoltaClics() {
  document.addEventListener("click", (event) => {
    const element = event.target.closest("button");
    if (!element) return;
    const accio = element.dataset.accio;
    if (accio === "comenca") {
      estat.fase = 1;
      desaEstat();
      renderitza();
    }
    if (accio === "reinicia") reinicia();
    if (accio === "avanca") avanca();
    if (accio === "neteja-observacio") {
      document.querySelectorAll("[data-comprovacio]").forEach((boto) => {
        boto.classList.remove("seleccionada");
        boto.disabled = false;
      });
      document.getElementById("sequencia").innerHTML = "Comprovacions seleccionades: 0/3";
    }
    if (accio === "valida-observacio") validaObservacio();
    if (accio === "valida-relacions") validaRelacions();
    if (accio === "mostra-pistes") document.getElementById("pistes-final").hidden = !document.getElementById("pistes-final").hidden;
    if (accio === "camp") document.getElementById("resposta").textContent = "Zona de proves preparada. Activeu sensors, robots i registre de dades.";
    if (element.dataset.comprovacio) {
      const seleccionades = document.querySelectorAll("[data-comprovacio].seleccionada").length;
      if (!element.classList.contains("seleccionada") && seleccionades >= 3) {
        document.getElementById("resposta").textContent = "Ja tens tres comprovacions. Neteja si vols canviar la selecció.";
        return;
      }
      element.classList.toggle("seleccionada");
      const total = document.querySelectorAll("[data-comprovacio].seleccionada").length;
      document.getElementById("sequencia").innerHTML = `Comprovacions seleccionades: ${total}/3`;
    }
    if (element.dataset.zona) {
      if (element.dataset.zona === "Zona verda") {
        document.getElementById("resposta").textContent = "Anàlisi correcta. La zona verda és la que perd més brillantor.";
        setTimeout(() => resolFase(1), 450);
      } else {
        document.getElementById("resposta").textContent = "Encara no quadra. Calcula la diferència entre la brillantor anterior i l'actual.";
      }
    }
    if (element.dataset.hipotesi) {
      if (element.dataset.hipotesi === "2") {
        document.getElementById("resposta").textContent = "Hipòtesi acceptada. Ara cal comprovar-ho amb dades reals.";
        setTimeout(() => resolFase(), 450);
      } else {
        document.getElementById("resposta").textContent = "Aquesta hipòtesi és possible, però encara no explica tota l'anomalia.";
      }
    }
  });
}

function renderitza() {
  const pantalles = [inici, fase1, fase2, fase3, fase5, final];
  document.getElementById("webapp").innerHTML = pantalles[estat.fase]();
}

escoltaClics();
renderitza();
