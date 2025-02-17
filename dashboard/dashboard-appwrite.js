import {Client, Account, Databases} from 'https://esm.sh/appwrite@14.0.1';

import {getBucks, setBucks} from '../AppwriteStuff.js';

const client = new Client()
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject('67609b010021900fc6e6');

//create appwrite functionalities
const account = new Account(client);
const databases = new Databases(client);

//getAPIScore();
const sessionId = localStorage.getItem("session");
if(!sessionId) {
  window.location.href = '../login/index.html';
}
account.getSession(sessionId).then(async (response) => {
  const balance = document.getElementById("balance");
  balance.innerHTML = await getBucks();
}).catch(error => {
  console.error("Error getting session:", error);
});
const zeroButton = document.getElementById("zeroButton")

zeroButton.addEventListener("click", async () => {
 const balance = document.getElementById("balance");
 await setBucks(0);
  balance.innerHTML = await getBucks()
})


async function getAPIScore(){
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
}