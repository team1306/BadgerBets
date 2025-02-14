import { Client, Account, Databases} from "appwrite";

const client = new Client()
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject('67609b010021900fc6e6');

const account = new Account(client);
const databases = new Databases(client);


export async function getBucks(){
    try {
        const sessionId = localStorage.getItem('session');
        console.log(sessionId);

        if (!sessionId) {
            window.location.href = '../login/login.html'; // Redirect to login if no session
            return;
        }
        const userData = await account.get(); // Call account.get() to fetch user details
        console.log(userData); // Log the user data for debugging
        const userId = userData.$id; // Extract the user ID
        console.log("User ID is: " + userId);

        const document = await databases.getDocument(
            "678dd2fb001b17f8e112", // Database ID
            "badgerBucks", // Collection ID
            userId // Document ID
        ); // Wait for the document to resolve
    
        // Access the resolved value (you are now parsing the result)
        const result = document.BadgerBucks;
        console.log("BadgerBucks:", result);
        return result; // Logs your expected value, e.g., 10
    } catch (error) {
        console.error("Error parsing promise:", error.message);
        if (error.code === 401) {
            // Redirect to login if session is invalid or expired
            window.location.href = '../login/login.html';
        }
    }
}

/**
 * @param {intValue} value 
 */
export async function setBucks(value){
    try {
        // Ensure value is an integer
        const intValue = parseInt(value, 10); // Convert to integer using base 10
        
        if (isNaN(intValue)) {
            throw new Error('Invalid input: value must be a valid integer.');
        }
        
        const sessionId = localStorage.getItem('session');

        const userData = await account.get(); // Get user data after resolving
        const userId = userData.$id; // Extract the user ID

        console.log("User ID is: " + userId);

        const document = await databases.updateDocument(
            "678dd2fb001b17f8e112", 
            "badgerBucks", 
            userId,
            {"BadgerBucks" : value}
        );
    } catch (error) {
        console.error("Error parsing promise:", error.message);
        console.error("Error parsing promise:", error);
    }
}