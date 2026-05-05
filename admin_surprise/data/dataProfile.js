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

