import {Client, Account, Databases, Query} from 'appwrite';

const client = new Client()
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject('67609b010021900fc6e6');

//create appwrite functionalities
const account = new Account(client);
const databases = new Databases(client);

const sessionId = localStorage.getItem("session");

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

  const document = await databases.getDocument(
      "678dd2fb001b17f8e112", // Database ID
      "678dd317002659e58688", // Collection ID
      userId // Document ID
  ); // Wait for the document to resolve

  // Access the resolved value (you are now parsing the result)
  const result = document.BadgerBucks;
  console.log("Parsed Result:", result);
  return result; // Logs your expected value, e.g., 10
 } catch (error) {
  console.error("Error parsing promise:", error.message);
 }
}
async function setBucks(value){
 try {
  const userData = await account.get(); // Get user data after resolving
  const userId = userData.$id; // Extract the user ID

  const document = await databases.updateDocument("678dd2fb001b17f8e112", "678dd317002659e58688", userId, {"BadgerBucks" : value}); // Wait for the document to resolve
 } catch (error) {
  console.error("Error parsing promise:", error.message);
 }
}