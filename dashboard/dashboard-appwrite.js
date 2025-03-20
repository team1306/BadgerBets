import {getAttribute, executeFunction, getLoggedInUser, hasConnectionAppwrite} from '../AppwriteStuff.js';
import {getSavedMatchesByPrefix, getSaveName} from '../match-data.js';

const client = new Appwrite.Client()
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject('67609b010021900fc6e6');

//create appwrite functionalities
const databases = new Appwrite.Databases(client);

document.addEventListener("DOMContentLoaded", async () => {
  const user = await getLoggedInUser();

  document.getElementById("username").innerHTML = user.name;
  document.getElementById("balance").innerHTML = "Your bucks: " + await getAttribute("678dd2fb001b17f8e112", "badgerBucks", user.$id, "BadgerBucks");

  const connected = await hasConnectionAppwrite();
  if (connected) {
    console.log("Connected to Appwrite:", connected);
  }
});

document.getElementById("sync").addEventListener('click', () => syncToAppwrite('test'))
async function syncToAppwrite(collectionID) {
    const connected = await hasConnectionAppwrite();
    if (!connected) {
        alert("No internet connection");
        return;
    }

    const databaseID = "match_data";
    const matches = getSavedMatchesByPrefix("MATCH_");

    if (matches.length === 0) {
        alert("There are no saved matches to sync.");
        return;
    }

    for (let i = 0; i < matches.length; i++) {
        try {
            const match = matches[i];
            console.log(JSON.stringify(match));
            
            const documentData = {
                auto_L1: match.auto_L1,
                auto_L2: match.auto_L2,
                auto_L3: match.auto_L3,
                auto_L4: match.auto_L4,
                leave: match.leave,
                auto_net: match.auto_net,
                auto_processor: match.auto_processor,
                teleop_L1: match.teleop_L1,
                teleop_L2: match.teleop_L2,
                teleop_L3: match.teleop_L3,
                teleop_L4: match.teleop_L4,
                teleop_net: match.teleop_net,
                teleop_processor: match.teleop_processor,
                climb_state: match.climb_state,
                robot_role: match.robot_role,
                driver_rating: match.driver_rating,
                intake_abilities: match.intake_abilities,
                notes: match.notes, // Include any other fields you want to save
            };
            console.log(match.team_number);

            const document = databases.createDocument(databaseID, collectionID, "" + match.alliance_role + "-" + match.match + "-" + match.team_number + "-" + match.name, documentData)
            if (document) {
                console.log("Document Created Successfully");
                const saveName = getSaveName(match.match, match.team_number, match.name, false);
                localStorage.setItem("ARCHIVE_" + saveName, localStorage.getItem(saveName));
                localStorage.removeItem(saveName);
                
            }
        } catch (error) {
            console.error("Error Syncing: " + error);
            alert("An unknown error occurred while syncing");
            return;
        };
    }
    alert("Synced successfully");
}

document.getElementById('delete-archive').addEventListener('click', () => {
    const archives = getSavedMatchesByPrefix("ARCHIVE_");

    if (archives.length == 0) {
        alert("There are no archived matches");
        return;
    }
    
    for (let i = 0; i < archives.length; i++) {
        const archive = archives[i];
        const saveName = getSaveName(archive.match, archive.team_number, archive.name, true);
        console.log(saveName);
        localStorage.removeItem(saveName);
    }
});