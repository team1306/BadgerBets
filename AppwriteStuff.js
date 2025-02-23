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

export async function setBucks(value) {
    try {
        value = parseInt(value);
        if (value === NaN) console.error("Error parsing input for setBucks(): Value is NaN");
    } catch (error) {
        console.error("Error parsing input for setBucks(): " + error.message);
    }
      
    const user = await getUser();

    await databases.updateDocument(
        "678dd2fb001b17f8e112", 
        "badgerBucks", 
        user.$id,
        {"BadgerBucks" : value}
    );
}