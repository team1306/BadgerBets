let myHeaders = new Headers();
myHeaders.append("Authorization", "Basic 9f2f3a71-be4c-4b86-b90a-7212daad0a1b");
myHeaders.append("If-Modified-Since", "");

let requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
};

fetch("https://frc-api.firstinspires.org/v3.0/2015/scores/ARFA/Playoff", requestOptions)
    .then(response => response.text())
    .then(result => console.log(result))
    .catch(error => console.log('error', error));