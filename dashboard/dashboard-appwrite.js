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

        // Retrieve user details
        const user = await account.get();
        const userId = user.$id;
        const amount = 0;

        // Create the payload
        const payload = JSON.stringify({ context: "get", userId: userId, amount: amount });

        // Execute the function
        const result = await functions.createExecution("6770291b00171ec2611b", payload);

        // Parse the result
        const response = JSON.parse(result.response);
        console.log("Function execution result (badgerBucks):", response.badgerBucks);
    } catch (error) {
        console.error("Error occurred:", error);
    }
};

document.head.appendChild(script);
