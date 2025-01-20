import {Client, Account, Databases, Query} from "appwrite";
const client = new Client()
    .setEndpoint('https://cloud.appwrite.io/v1') // Your Appwrite endpoint
    .setProject('67609b010021900fc6e6'); // Your Project ID

    const account = new Account(client);

    const sessionId = localStorage.getItem("session");
    const databases = new Databases(client);


    if (!sessionId) {
        window.location.href = '../login/login.html';
    }

    try {
        const user = await account.get();
        const userId = user.$id;
        let promise = databases.listDocuments(
            "678dd2fb001b17f8e112",
            "678dd317002659e58688",
            [
                Query.equal('$id', userId)
            ]
        );
        let numDocuments = 0;
        let documentID = "";
        promise.then((doc) =>
        {
            numDocuments = doc.total
            if(numDocuments > 0) documentID = doc.documents[0].$id
        })

        if(numDocuments === 0){
            documentID = userId
            let result = await databases.createDocument(
                '678dd2fb001b17f8e112', // databaseId
                '678dd317002659e58688', // collectionId
                documentID, // documentId
                {"BadgerBucks" : 10} // data
            );
        }

        let result = await databases.getDocument(
            '678dd2fb001b17f8e112', // databaseId
            '678dd317002659e58688', // collectionId
            documentID // documentId
        );

        let functionResult = JSON.parse(result)
        let currentBadgerBucks = functionResult.badgerBucks

        // Update the balance element inside the async block
        const balance = document.getElementById("balance");
        balance.innerHTML = currentBadgerBucks;

    } catch (error) {
        alert("There was an error");
        console.error(error);
    }