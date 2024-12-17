// Initialize Appwrite SDK
const sdk = new Appwrite();
const client = new sdk.Client();
const database = new sdk.Databases();

client
    .setEndpoint('https://cloud.appwrite.io/v1')  // Replace with your Appwrite endpoint
    .setProject('67609b010021900fc6e6');                   // Replace with your Appwrite project ID

const account = new sdk.Account(client);

// Sign Up Logic
document.getElementById('signup-form').addEventListener('submit', async (event) => {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    try {
        const response = await account.create('unique()', email, password, username);
        alert('Account created successfully!');
        window.location.href = 'login.html'; // Redirect to login page
    } catch (error) {
        console.error(error);
        alert('Failed to create account.');
    }
});

// Login Logic
document.getElementById('login-form').addEventListener('submit', async (event) => {
    event.preventDefault();

    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;

    try {
        const session = await account.createEmailSession(email, password);
        alert('Login successful!');
        window.location.href = 'dashboard.html'; // Redirect to dashboard or home page
    } catch (error) {
        console.error(error);
        alert('Failed to log in.');
    }
});
