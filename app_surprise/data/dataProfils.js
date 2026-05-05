let HOST_URL = "https://ranouil-sae203.mmi-limoges.fr";
let DataProfils = {};

DataProfils.requestProfils = async function(){
    let answer = await fetch(HOST_URL + "/server/script.php?todo=readprofils");
    let data = await answer.json();
    return data; 
}

DataProfils.requestProfilID = async function(id){
    let answer = await fetch(HOST_URL + "/server/script.php?todo=readprofilID&id="+id);
    let data = await answer.json();
    return data; 
}

export {DataProfils};
