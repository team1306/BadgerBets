import {Client, Account, Databases} from 'appwrite';

const client = new Client()
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject('67609b010021900fc6e6');

//create appwrite functionalities
const account = new Account(client);
const databases = new Databases(client);

//getAPIScore();
const sessionId = localStorage.getItem("session");
if(!sessionId) window.location.href = '../login/login.html';
account.getSession(sessionId).then(async (response) => {
  const balance = document.getElementById("balance");
  balance.innerHTML = await getBucks();
});
const zeroButton = document.getElementById("zeroButton")

zeroButton.addEventListener("click", async () => {
 const balance = document.getElementById("balance");
 await setBucks(0);
  balance.innerHTML =await getBucks()
})


async function getBucks(){
 try {
  const userData = await account.get(); // Get user data after resolving
  const userId = userData.$id; // Extract the user ID
  console.log("User ID:", userId);
  const document = await databases.getDocument(
      "678dd2fb001b17f8e112", // Database ID
      "BadgerBucks",// Collection ID
      userId // Document ID
  ); // Wait for the document to resolve

  // Access the resolved value (you are now parsing the result)
  console.log(document.badgerBucks)
  const result = document.BadgerBucks;
  console.log("Parsed Result:", result);
  return result; // Logs your expected value, e.g., 10
 } catch (error) {
  console.error("Error parsing promise:", error.message);
 }
}
export async function setBucks(value){
 try {
  const userData = await account.get(); // Get user data after resolving
  const userId = userData.$id; // Extract the user ID

  const document = await databases.updateDocument("678dd2fb001b17f8e112", "badgerBucks", userId,  {"BadgerBucks" : value});
 } catch (error) {
  console.error("Error parsing promise:", error.message);
 }
}
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