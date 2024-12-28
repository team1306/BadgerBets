const script = document.createElement('script');
script.src = 'https://cdn.jsdelivr.net/npm/appwrite@16.0.2';

script.onload = async () => {
    const client = new Appwrite.Client()
        .setEndpoint('https://cloud.appwrite.io/v1') // Your Appwrite endpoint
        .setProject('67609b010021900fc6e6'); // Your Project ID

    const functions = new Appwrite.Functions(client);
    const account = new Appwrite.Account(client);

    // Retrieve session ID from localStorage
    const sessionId = localStorage.getItem("session");
    console.log("Session ID:", sessionId);

    if (!sessionId) {
        console.error("No session ID found. User might not be logged in.");
        return;
    }

    try {
        // Validate the session
        const session = await account.getSession(sessionId);
        console.log("Session details:", session);

        // Execute the function
        user = account.get()
        userId = user.$id
        amount = 0
const payload = JSON.stringify({context: "get",userId: userId,amount: amount});

const result = await functions.createExecution("6770291b00171ec2611b", payload);
        console.log("Function execution result:", result);
    } catch (error) {
        console.error("Error occurred:", error);
    }
    
};

document.head.appendChild(script);
