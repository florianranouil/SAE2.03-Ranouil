let HOST_URL = ".."; 

let DataMovie = {};


DataMovie.add = async function (movieData) {

    let formData = new FormData();
    for (let key in movieData) {
        formData.append(key, movieData[key]);
    }

    let answer = await fetch(HOST_URL + "/server/script.php?todo=addmovie", {
        method: 'POST',
        body: formData
    });


    let data = await answer.json();
    return data;
};

export { DataMovie };

