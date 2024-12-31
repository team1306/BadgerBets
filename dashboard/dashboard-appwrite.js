const script = document.createElement('script');
script.src = 'https://cdn.jsdelivr.net/npm/appwrite@16.0.2';

script.onload = async () => {
    const client = new Appwrite.Client()
        .setEndpoint('https://cloud.appwrite.io/v1') // Your Appwrite endpoint
        .setProject('67609b010021900fc6e6'); // Your Project ID

    const functions = new Appwrite.Functions(client);
    const account = new Appwrite.Account(client);

    const sessionId = localStorage.getItem("session");

    if (!sessionId) {
        window.location.href = '/BadgerBets/login';
        return;
    }

    try {
        const session = await account.getSession(sessionId);
        const user = await account.get();
        const userId = user.$id;
        const functionId = '6770291b00171ec2611b'; // Replace with your function ID
        const parameters = JSON.stringify({
            action: 'get',
            userId: userId,
            badgerBucks: 0
        });

        // Execute the function
        let result = await functions.createExecution(functionId, parameters);
        result = JSON.parse(result.responseBody)
        currentBadgerBucks = result.badgerBucks
        console.log('Your badgerBucks:', currentBadgerBucks);
        const balance = document.getElementById(balance)
        balance.innerHTML = currentBadgerBucks


        
    } catch (error) {
        alert("There was an error");
        console.error(error);
    }
};

document.head.appendChild(script);
