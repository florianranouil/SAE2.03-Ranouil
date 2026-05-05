// 1. Chargement du template principal
let templateFile = await fetch('./component/Log/template.html');
let template = await templateFile.text();

// Templates des lignes (plus besoin de concaténation complexe)
const templateLi = "<li>[{{time}}] {{txt}}</li>";
const templateLiLast = "<li class='last'>[{{time}}] {{txt}}<span class='clignotant'> #</span></li>";

let Log = {};
let history = []; // Historique des messages
// interne pour transformer l'historique en HTML
function formatHistory() {
    if (history.length === 0) return "";

    let html = "";
    // On boucle sur tous les logs sauf le dernier
    for (let i = 0; i < history.length - 1; i++) {
        let log = history[i];
        html += templateLi.replace('{{time}}', log.time).replace('{{txt}}', log.txt);
    }

    // On traite le dernier log différemment (classe 'last')
    let lastLog = history[history.length - 1];
    html += templateLiLast.replace('{{time}}', lastLog.time).replace('{{txt}}', lastLog.txt);
    
    return html;
}

// La fonction principale exportée
Log.format = function(txt) {
    add(txt);
    return template.replace("{{logs}}", formatHistory());
};

export { Log };
// Fonction interne pour ajouter un log avec l'heure actuelle
function add(txt) {
    const d = new Date();
    const time = `${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}`;
    history.push({ time, txt });
}

// Fonction 