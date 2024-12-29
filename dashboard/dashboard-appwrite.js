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
        const functionId = '6771943d19ed70091258'; // Replace with your function ID
        const parameters = JSON.stringify({action: 'get', userId: userId, badgerBucks:0})
        console.log(parameters)
        let result = functions.createExecution(functionId,parameters,false, "../src/main.py")
        console.log(result)
          
      
      };
document.head.appendChild(script);
