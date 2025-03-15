import { getLoggedInUser } from "./AppwriteStuff.js";

document.addEventListener('DOMContentLoaded', async (event) => {

    // get logged in user and don't redirect
    const user = await getLoggedInUser(false);
    if (user) {
        window.location.href = '/dashboard/index.html';
    }

    const loginBtn = document.getElementById('login');
    const signupBtn = document.getElementById('signup');

    loginBtn.addEventListener('click', () => {
        window.location.href = '/login/index.html';
    });

    signupBtn.addEventListener('click', () => {
        window.location.href = '/signup/signup.html';
    });    
});
