// moved out of scout/script.js so anything loading this file wouldn't try to load coral (DOMContentLoaded)

/**
 * 
 * @param {String} matchID match type + match number
 * @param {int} teamNumber number of the team scouted
 * @param {String} userName name of the user who scouted
 * @param {Boolean} archived whether the match is archived or not
 * @returns 
 */
export function getSaveName(matchID, teamNumber, userName, archived) {
    return (archived ? "ARCHIVE_" : "") + "MATCH_" + matchID + "-" + teamNumber + "-" + userName;
}

/**
 * Gets matches saved in local storage based on the starting characters of the key
 * @param {String} prefix 
 * @returns list of dictionaries from local storage
 */
export function getSavedMatchesByPrefix(prefix) {
    let dictionaries = [];
    for (let i = 0; i < localStorage.length; i++) {
        let key = localStorage.key(i);
        if (!key.startsWith(prefix)) continue; // thanks to connor mulligan this also skips archived entries
        let match = localStorage.getItem(key);
        console.log(key);
        dictionaries.push(JSON.parse(match));
    }
    return dictionaries;
}
