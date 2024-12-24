const script = document.createElement('script');
script.src = 'https://cdn.jsdelivr.net/npm/appwrite@16.0.2';

script.onload=()=>{
    
const client = new Appwrite.Client()
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject('67609b010021900fc6e6')


const functions = new Appwrite.Functions(client)
const account = new Appwrite.Account(client)
const sessionId = localStorage.getItem("session")
console.log(sessionId)
const session = account.getSession(sessionId)
const result =  functions.createExecution("loginPoints")


console.log(result)
};
document.head.appendChild(script);
