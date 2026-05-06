let templateFile = await fetch("./component/SelecProfils/template.html");
let template = await templateFile.text();

let templateFile2 = await fetch("./component/SelecProfils/templateLi.html");
let templateLi = await templateFile2.text();

let SelecProfils = {};

SelecProfils.format = function (profil) {
    let html = templateLi;

    html = html.replaceAll("{{id}}", profil.id);
    html = html.replaceAll("{{name}}", profil.name);
    html = html.replaceAll("{{avatar}}", profil.avatar);
    html = html.replaceAll("{{age}}", profil.age_restriction);
    html = html.replaceAll("{{action}}", `C.selectProfil(${profil.id}, ${profil.age_restriction})`);

    return html;
};

SelecProfils.formatMany = function (profils) {
    let html = template;

    let liste = "";
    for (const p of profils) {
        liste += SelecProfils.format(p);
    }

    html = html.replace("{{listprofils}}", liste);
    return html;
};

export { SelecProfils };
