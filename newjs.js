let estiloCreado = false;
let pend = 0;
let vist = 0;
let estr = 0;

function agregarAnime(name, estado, valoracion) {
    if (!name || !estado || !valoracion) return;
    var newAnime = document.createElement("li");
    var nameSpan = document.createElement("span");
    nameSpan.textContent = name;
    var estadoSpan = document.createElement("span");
    estadoSpan.textContent = estado;
    var valoracionSpan = document.createElement("span");
    valoracionSpan.textContent = valoracion + "/" + 10;

    newAnime.appendChild(nameSpan);
    newAnime.appendChild(estadoSpan);
    newAnime.appendChild(valoracionSpan);

    switch (estado.toLowerCase()) {
        case 'pendiente':
        case 'pendi':
            estadoSpan.classList.add('pend');
            pend++;
            break;
        case 'visto':
            estadoSpan.classList.add('visto');
            vist++;
            break;
        case 'estreno':
            estadoSpan.classList.add('estr');
            estr++;
            break;
        default:
            estadoSpan.remove();
            estadoSpan = null;
    }

    document.getElementById("Ani").appendChild(newAnime);
    
    if (estadoSpan && estadoSpan.scrollWidth > estadoSpan.clientWidth) {
        estadoSpan.textContent = estadoSpan.textContent.slice(0, -4);
    }
}

const container = document.getElementById("Ani");
const observer = new MutationObserver(mutationsList => {
    for (const omnitrix of mutationsList) {
        if (omnitrix.type === 'childList' && omnitrix.addedNodes.length > 0 && !estiloCreado) {
            crearEstilo();
            observer.disconnect();
            break;
        }
    }
});
observer.observe(container, { childList: true });

function crearEstilo() {
    document.getElementById("pend").classList.add('ppp');
    document.getElementById("vist").classList.add('vvv');
    document.getElementById("estr").classList.add('eee');
    document.getElementById("todos").classList.add('ttt');
    const buttonStyles = `
        .ppp::before { content: "${pend}";}
        .ppp::after {content: "Pendi";}
        .vvv::before { content: "${vist}";}
        .vvv::after {content: "Visto";}
        .eee::before { content: "${estr}";}
        .eee::after {content: "Estre";}
        .ttt::before { content: "${(pend + vist + estr)}";}
        .ttt::after {content: "Todos";}
    `;
    const style = document.createElement('style');
    style.appendChild(document.createTextNode(buttonStyles));
    (document.head || document.getElementsByTagName('head')[0]).appendChild(style);
    estiloCreado = true;
}

const searchInput = document.getElementById("search");
searchInput.addEventListener("input", function () {
    const searchTerm = this.value.trim().toLowerCase();
    const animeItems = document.querySelectorAll("#Ani li");

    animeItems.forEach(function (li) {
        const animeName = li.querySelector("span:first-child").textContent.toLowerCase();
        const animeStatus = li.querySelector("span:nth-child(2)").textContent.toLowerCase();
        const displayStyle = (searchTerm.startsWith("/") && searchTerm.length > 1) ?
            (searchTerm.substring(1) === "pend" && (animeStatus.includes("pendiente") || animeStatus.includes("pendi")) ||
                searchTerm.substring(1) === "vist" && animeStatus.includes("visto") ||
                searchTerm.substring(1) === "estr" && animeStatus.includes("estreno")) ? "flex" : "none" :
            animeName.includes(searchTerm) ? "flex" : "none";

        li.style.display = displayStyle;
    });
});
