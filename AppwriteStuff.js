import { Client, Account, Databases} from "appwrite";

const client = new Client()
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject('67609b010021900fc6e6');

const account = new Account(client);
const databases = new Databases(client);

/**
 * Gets the user current user ID from appwrite using the sessionID
 * Redircts user to login if session a problem occurs
 */
export async function getUserId() {
    try {
        const sessionId = localStorage.getItem('session');
        const userData = await account.get(); // Call account.get() to fetch user details
        return userId = userData.$id; // Extract the user ID
    } catch (error) {
        console.error("Error getting userId:", error.message);
        if (error.code === 401) {
            // Redirect to login if session is invalid or expired
            window.location.href = '../login/login.html';
        }
    }
}


export async function getBucks(){

        const userId = getUserId(); 

        const document = await databases.getDocument(
            "678dd2fb001b17f8e112", // Database ID
            "badgerBucks", // Collection ID
            userId // Document ID
        ); // Wait for the document to resolve
    
        // Access the resolved value (you are now parsing the result)
        const result = document.BadgerBucks;
        console.log("BadgerBucks:", result);
        return result; // Logs your expected value, e.g., 10
    
}

/**
 * @param {intValue} value 
 */
export async function setBucks(value) {
    try {
        const intValue = parseInt(value);
        if (intValue === NaN) console.error("Error parsing input for setBucks(): Value is NaN");
    } catch (error) {
        console.error("Error parsing input for setBucks(): " + error.message);
    }
      
    const userId = getUserId();

    await databases.updateDocument(
        "678dd2fb001b17f8e112", 
        "badgerBucks", 
        userId,
        {"BadgerBucks" : intValue}
    );
}