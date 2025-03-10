import { Client, Account, Databases} from "https://esm.sh/appwrite@14.0.1";

const client = new Client()
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject('67609b010021900fc6e6');

const account = new Account(client);
const databases = new Databases(client);

/**
 * Gets the user current user object from appwrite using the sessionID
 * Redircts user to login if session a problem occurs
 * @returns promise of the current user
 */
export async function getUser() {
    console.log("Getting user...");
    try {
        const sessionId = localStorage.getItem('session');
        const user = await account.get(); // Call account.get() to fetch user details
        localStorage.setItem('user', JSON.stringify(user));
        return user;
    } catch (error) {
        console.error("Error getting user:", error.message);
        if (error.code === 401) {
            // Redirect to login if session is invalid or expired
            window.location.href = '../login/index.html';
        } else {
            return JSON.parse(localStorage.getItem('user'));
        }
    }
}

export async function hasConnectionAppwrite() {
    try {
        await account.get();
        console.log('✅ Connection to Appwrite is successful');
        return true;
    } catch (error) {
        console.error('❌ Failed to connect to Appwrite:', error);
        return false;
    }
}

export async function getBucks(){

        const user = await getUser();

        const document = await databases.getDocument(
            "678dd2fb001b17f8e112", // Database ID
            "badgerBucks", // Collection ID
            user.$id // Document ID
        ); // Wait for the document to resolve
    
        // Access the resolved value (you are now parsing the result)
        const result = document.BadgerBucks;
        console.log("BadgerBucks:", result);
        return result; // Logs your expected value, e.g., 10
    
}

/**
 * Gets the value of a specified attribute from a specified document
 * @param {String} databaseID 
 * @param {String} collectionID 
 * @param {String} documentID 
 * @param {String} attributeID 
 * @returns the value of the attribute. If the docuemnt or attribute does not exist, returns null.
 */
export async function getAttribute(databaseID, collectionID, documentID, attributeID) {
    await hasConnectionAppwrite().then(connected => {
        if (!connected) {
            console.error("No internet connection");
            return null;
        }
    });

    console.log("Getting attribute " + attributeID + "...");
    try {
        let appwriteDocument;
        try {
            appwriteDocument = await databases.getDocument(
                databaseID, // Database ID
                collectionID, // Collection ID
                documentID // Document ID
            );
        } catch (error) {
            console.error("Document not found: " + error.message);
            return null;
        }
        return appwriteDocument[attributeID];
    } catch (error) {
        console.error("Error getting attribute: ", error.message);
        return null;
    }
}

/**
 * 
 * @param {String} databaseID 
 * @param {String} collectionID 
 * @param {String} documentID 
 * @param {String} attributeID 
 * @param {*} value must be the same as the type of the attribute
 * @returns true if successful, false otherwise
 */
export async function setAttribute(databaseID, collectionID, documentID, attributeID, value) {
    console.log("Setting attribute " + attributeID + " to " + value + "...");

    await hasConnectionAppwrite().then(connected => {
        if (!connected) {
            console.error("No internet connection");
            return false;
        }
    });

    try {
        await databases.getDocument(
            databaseID, // Database ID
            collectionID, // Collection ID
            documentID // Document ID
        );
    } catch (error) {
        console.error("Document not found: " + error.message);
        return false;
    }

    try {
        await databases.updateDocument(
            databaseID, // Database ID
            collectionID, // Collection ID
            documentID, // Document ID
            { [attributeID]: value } // Data
        );

        console.log("Attribute set successfully");
        return true;
    } catch (error) {
        console.error("Error setting attribute: ", error.message);
        return false;
    }
}

/**
 * Creates an Appwrite document in the specified database and collection with the specified data.
 * If a document with the same ID already exists, it updates it.
 * @param {String} databaseID 
 * @param {String} collectionID 
 * @param {String} documentID 
 * @param {Object} data 
 * @returns true if document is created/updated successfully, false otherwise
 */
export async function updateAppwriteDocument(databaseID, collectionID, documentID, data) {
    console.log("Updating document...");

    await hasConnectionAppwrite().then(async connected => {
        if (!connected) {
            console.error("No internet connection");
            return false;
        }

        try { //check if document exists
            await databases.getDocument(databaseID, collectionID, documentID);
            console.log("Document exists, updating...");
            try {
                await databases.updateDocument(databaseID, collectionID, documentID, data);
                console.log("Document updated successfully");
                return true;
            } catch (e) {
                console.error("Error updating document:", e.message);
                return false;
            }
        } catch (e) { //document does not exist
            console.log("Document does not exist, creating new document...");
            try {
                await databases.createDocument(databaseID, collectionID, documentID, data);
                console.log("Document created successfully");
                return true;
            } catch (error) {
                console.error("Error creating document:", error.message);
                return false;
            }
        }
    });
}