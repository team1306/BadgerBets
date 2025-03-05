import {Client, Account, Databases} from 'https://esm.sh/appwrite@14.0.1';

import {getBucks, getUser} from '../AppwriteStuff.js';
import { getSavedMatchesByPrefix, getSaveName} from '../scout/script.js';

const client = new Client()
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject('67609b010021900fc6e6');

//create appwrite functionalities
const account = new Account(client);
const databases = new Databases(client);

let user;

document.addEventListener("DOMContentLoaded", async () => {
  user = await getUser();
  document.getElementById("username").innerHTML = user.name;
  document.getElementById("balance").innerHTML = "Your bucks: " + await getBucks();
});

document.getElementById("sync").addEventListener('click', () => syncToAppwrite('test'))
function syncToAppwrite(collectionID) {
    const databaseID = "match_data";
    const matches = getSavedMatchesByPrefix("MATCH_");

    if (matches.length === 0) {
        alert("There are no saved matches to sync.");
        return;
    }

    for (let i = 0; i < matches.length; i++) {
        try {
            const match = matches[i];
            console.log(match.climb_state);
            
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

            databases.createDocument(databaseID, collectionID, "" + match.alliance_role + "-" + match.match + "-" + match.team_number + "-" + match.name, documentData)
            .then(document => {
                console.log("Document Created Successfully");
                const saveName = getSaveName(match.match, match.team_number, match.name, false);
                localStorage.setItem("ARCHIVE_" + saveName, localStorage.getItem(saveName));
                localStorage.removeItem(saveName);
                alert("Synced successfully");
                return;
            }).catch(error => {
                if (error == "AppwriteException: Failed to fetch") {
                    alert("No Internet");
                    return;
                }
            });
        } catch (error) {
            console.error("Error Syncing: " + error);
            alert("An unknown error occurred while syncing");
            return;
        };
    }
}


async function getAPIScore(){
 let myHeaders = new Headers();
 myHeaders.append("Authorization", "Basic 9f2f3a71-be4c-4b86-b90a-7212daad0a1b");
 myHeaders.append("If-Modified-Since", "");

 let requestOptions = {
  method: 'GET',
  headers: myHeaders,
  redirect: 'follow'
 };

 fetch("https://frc-api.firstinspires.org/v3.0/2015/scores/ARFA/Playoff", requestOptions)
     .then(response => response.text())
     .then(result => console.log(result))
     .catch(error => console.log('error', error));
}

document.getElementById('logout').addEventListener('click', async () => {
  localStorage.removeItem('session');
  console.log("logout triggered");
  await account.deleteSession('current')
  .then(() => {
    console.log('abc');
    window.location.href = '../';
  });
});