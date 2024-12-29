const script = document.createElement('script');
script.src = 'https://cdn.jsdelivr.net/npm/appwrite@16.0.2';

script.onload = async () => {
    const client = new Appwrite.Client()
        .setEndpoint('https://cloud.appwrite.io/v1') // Your Appwrite endpoint
        .setProject('67609b010021900fc6e6'); // Your Project ID

    const functions = new Appwrite.Functions(client);
    const account = new Appwrite.Account(client);

    const sessionId = localStorage.getItem("session");
    console.log("Session ID:", sessionId);

    if (!sessionId) {
        //add redirect
        return;
    }

    try {
        const session = await account.getSession(sessionId);
        console.log("Session details:", session);
    }
    catch{
        
    }
        const user = await account.get();
        const userId = user.$id;
        const amount = 0;
        const functionId = 'your-function-id'; // Replace with your function ID
        const parameters = {action: 'get', userId: userId};
  
        functions.createExecution(functionId, parameters)
          .then(response => {
            alert(`Document Retrieved: ${JSON.stringify(response.document)}`);
          })
          .catch(error => {
            console.error('Error executing function:', error);
            alert('Error getting document.');
          });
};

document.head.appendChild(script);
