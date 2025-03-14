const client = new Appwrite.Client()
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject('67609b010021900fc6e6');

const account = new Appwrite.Account(client);
const databases = new Appwrite.Databases(client);

const logout = document.getElementById('logout');
if (logout) {
    logout.addEventListener('click', async () => {
        console.log("logout triggered");
        try {
            await account.deleteSession('current');
        } catch (error) {
            console.log(error);
        }
        
        localStorage.removeItem('user');
        window.location.href = '/index.html';
    });
}

function showOfflineMessage() {
    console.log('offline');
    const main = document.querySelector('main');
    const offline = document.createElement('div');
    offline.id = 'offline';
    offline.innerText = '⚠️ Offline Mode ⚠️';
    main.prepend(offline);

    // disable logout
    if (logout) {
        logout.style.pointerEvents = 'none';
        logout.style.color = 'gray';
    }
}

/**
 * Gets the current user object from appwrite using the sessionID
 * Redirects user to login if session a problem occurs
 * @returns {Object} the user object or null if there is no internet connection
 */
export async function getLoggedInUser(redirectLogin = true) {

    try {
        // Call account.get() to fetch user details
        const user = await account.get(); 
        localStorage.setItem('user', JSON.stringify(user));
        return user;
    } catch (error) {
        // check offline
        if (error.message === 'Failed to fetch') {
            showOfflineMessage();
            // if we are offline, we're not getting a 401, just return either stored user or a temp user
            return JSON.parse(localStorage.getItem('user') ?? '{"$id": 0, "name": "offline-guest"}');
        }

        // unauthorized
        if (error.code === 401 && redirectLogin) {
            window.location.href = '/login/index.html';
        }

        return null;
    }
}

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
 * Gets all documents in a specified collection
 * @param {String} databaseID 
 * @param {String} collectionID 
 * @return {Promise<Object[]>} array of all documents in the collection, null if the collection is not found
 */
export async function getAllDocumentsInCollection(databaseID, collectionID) {
    const connected = await hasConnectionAppwrite();
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
}

/**
 * Gets the value of a specified attribute from a specified document
 * @param {String} databaseID 
 * @param {String} collectionID 
 * @param {String} documentID 
 * @return {Promise<Object>} the document object. If the docuemnt does not exist, returns null.
 */
export async function getDocument(databaseID, collectionID, documentID) {
    const connected = await hasConnectionAppwrite();
    if (!connected) {
        console.error("No internet connection");
        return null;
    }

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
 * @returns the value of the attribute. If the docuemnt or attribute does not exist, returns null.
 */
export async function getAttribute(databaseID, collectionID, documentID, attributeID) {
    const connected = await hasConnectionAppwrite();
    if (!connected) {
        console.error("No internet connection");
        return null;
    }

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

    const connected = await hasConnectionAppwrite();
    if (!connected) {
        console.error("No internet connection");
        return false;
    }

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

    const connected = await hasConnectionAppwrite();
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
}
