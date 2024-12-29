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
        console.error("No session ID found. User might not be logged in.");
        return;
    }

    try {
        const session = await account.getSession(sessionId);
        console.log("Session details:", session);

        const user = await account.get();
        const userId = user.$id;
        const amount = 0;

        const payload = JSON.stringify({context: context, function:'get', userId: userId, amount: amount });
        const result = await functions.createExecution("6770291b00171ec2611b", payload);

        console.log("Function execution result object:", result);
        
        // Check if the response is valid
        if (result && result.response) {
            try {
                const response = JSON.parse(result.response);
                console.log("Parsed response:", response);
                console.log("Function execution result (badgerBucks):", response.badgerBucks);
            } catch (parseError) {
                console.error("Failed to parse response:", parseError);
            }
        } else {
            console.error("Function execution response is empty or undefined.");
        }

        if (result.status === 'failed') {
            console.error("Function execution failed:", result.stderr);
        } else {
            console.log("Function execution succeeded:", result.stdout);
        }
    } catch (error) {
        console.error("Error occurred:", error);
    }
};

document.head.appendChild(script);
