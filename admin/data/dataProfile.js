// // 1. L'adresse de ton serveur 
// let HOST_URL = ".."; 

// // 2. On crée l'objet 
// let DataProfile = {};

// // 3. La fonction d'ajout en mode "async" 
// DataProfile.add = async function (profileData) {
    
//     // On transforme l'objet JS en données de formulaire pour le PHP
//     let formData = new FormData();
//     for (let key in profileData) {
//         formData.append(key, profileData[key]);
//     }

//     // On envoie au serveur et on attend (await) la réponse
//     // Note : On utilise "addprofile" pour que le PHP sache quoi faire
//     let answer = await fetch(HOST_URL + "/server/script.php?todo=addprofile", {
//         method: 'POST',
//         body: formData
//     });

//     // On transforme la réponse du serveur en objet JSON
//     let data = await answer.json();

//     // On renvoie le résultat final (souvent { "status": "ok" })
//     return data;
// };

// // 4. On exporte pour pouvoir l'utiliser ailleurs
// export { DataProfile };


// 1. L'adresse de ton serveur 
let HOST_URL = ".."; 

// 2. On crée l'objet 
let DataProfile = {};

// 3. La fonction d'ajout en mode "async" 
DataProfile.add = async function (formData) {

    // IMPORTANT : on envoie le FormData ORIGINAL
    let answer = await fetch(HOST_URL + "/server/script.php?todo=addprofile", {
        method: 'POST',
        body: formData
    });

    let data = await answer.json();
    return data;
};

// 4. On exporte pour pouvoir l'utiliser ailleurs
export { DataProfile };

