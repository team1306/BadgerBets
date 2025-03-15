import { Client, Account, Databases} from "https://esm.sh/appwrite@14.0.1";
// import {Functions} from "appwrite";

const client = new Client()
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject('67609b010021900fc6e6');

const account = new Account(client);
const databases = new Databases(client);
// const functions = new Functions(client);

/**
 * Gets the user current user object from appwrite using the sessionID
 * Redircts user to login if session a problem occurs
 * @returns {Promise<Object>} the user object or null if there is no internet connection
 */
export async function getUser() {
    console.log("Getting user...");

    const connected = await hasConnectionAppwrite();
    if (!connected) {
        console.error("No internet connection");
        return null;
    }

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

/**
 * Gets whether the user has a connection to Appwrite
 * @returns {Promise<Boolean>} true if there is a connection to Appwrite, false otherwise
 */
export async function hasConnectionAppwrite() {
    try {
        await account.get();
        console.log('✅ Connection to Appwrite is successful');
        return true;
    } catch (error) {
        // Catch the error, check if it's related to authentication
        if (error.code === 401) {
            console.error('❌ User is not logged in to Appwrite.');
            return true;
        } else {
            console.error('❌ Failed to connect to Appwrite:', error);
            return false;
        }
    }
}

/**
 * Deletes a specified document from appwrite
 * @param {String} databaseID 
 * @param {String} collectionID 
 * @param {String} documentID 
 * @returns {Promise<Boolean>} true if document is deleted successfully, false otherwise
 */
export async function deleteDocument(databaseID, collectionID, documentID) {
    await hasConnectionAppwrite().then(connected => {
        if (!connected) {
            console.error("No internet connection");
            return false;
        }
    });

    try {
        await databases.deleteDocument(
            databaseID, // Database ID
            collectionID, // Collection ID
            documentID // Document ID
        ); 
        return true;
    } catch (error) {
        console.error("Problem deleting document: " + error.message);
        return false;
    }
}

/**
 * Gets all documents in a specified collection
 * @param {String} databaseID 
 * @param {String} collectionID 
 * @return {Promise<Object[]>} array of all documents in the collection, null if the collection is not found
 */
export async function getAllDocumentsInCollection(databaseID, collectionID) {
    const connected = await hasConnectionAppwrite().then(async connected => {
        if (!connected) {
            console.error("No internet connection");
            return null;
        }
        
        try {
            const documents = await databases.listDocuments(databaseID, collectionID);
            console.log(documents.documents);
            return documents.documents;
        } catch (error) {
            console.error("Error getting documents:", error.message);
            return null;
        }
    });
}

/**
 * Gets the value of a specified attribute from a specified document
 * @param {String} databaseID 
 * @param {String} collectionID 
 * @param {String} documentID 
 * @return {Promise<Object>} the document object. If the docuemnt does not exist, returns null.
 */
export async function getDocument(databaseID, collectionID, documentID) {
    await hasConnectionAppwrite().then(connected => {
        if (!connected) {
            console.error("No internet connection");
            return null;
        }
    });

    console.log("Getting document " + documentID + "...");
    try {
        const appwriteDocument = await databases.getDocument(
            databaseID, // Database ID
            collectionID, // Collection ID
            documentID // Document ID
        ); 
        return appwriteDocument;
    } catch (error) {
        console.error("Document not found: " + error.message);
        return null;
    }
}

/**
 * Gets the value of a specified attribute from a specified document
 * @param {String} databaseID 
 * @param {String} collectionID 
 * @param {String} documentID 
 * @param {String} attributeID 
 * @return {any} the value of the attribute. If the docuemnt or attribute does not exist, returns null.
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
 * @param {any} value must be the same as the type of the attribute
 * @return {Promise<Boolean>} true if successful, false otherwise
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
 * @return {Promise<Boolean>} true if document is created/updated successfully, false otherwise
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
// export async function getMatches(){
//     let result = await functions.createExecution('getMatches');

//     return result;
// }