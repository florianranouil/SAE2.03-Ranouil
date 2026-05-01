let HOST_URL = "https://mmi.unilim.fr/~ranouil8/SAE2.03-Ranouil";
let DataProfile = {};

DataProfile.read = async function () {
  let answer = await fetch(HOST_URL + "/server/script.php?todo=readprofiles");
  let data = await answer.json();
  console.log("Profils retournés par le serveur:", data); 

  return data; 
};

export { DataProfile };