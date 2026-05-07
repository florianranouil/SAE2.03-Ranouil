let HOST_URL = ".."; 
let DataProfile = {};


DataProfile.add = async function (formData) {


    let answer = await fetch(HOST_URL + "/server/script.php?todo=addprofile", {
        method: 'POST',
        body: formData
    });

    let data = await answer.json();
    return data;
};


export { DataProfile };

