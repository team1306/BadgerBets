// Initialize the Appwrite SDK
const sdk = new appwrite();
const client = new sdk.Client();

// Set the Appwrite project endpoint and project ID (Replace these with your actual Appwrite details)
client
  .setEndpoint('https://cloud.appwrite.io/v1')  // Replace with your Appwrite endpoint
  .setProject('67609b010021900fc6e6');                    // Replace with your Appwrite Project ID

// Create an instance of the Account service
const account = new sdk.Account(client);

// Add an event listener for the login form submission
document.getElementById('login-form').addEventListener('submit', async (event) => {
  event.preventDefault();

  // Get the values from the input fields (email and password)
  const email = document.getElementById('login-email').value;
  const password = document.getElementById('login-password').value;

  try {
    // Try to create a session with the provided email and password
    const session = await account.createEmailSession(email, password);
    prompt("Success!")
    // If the login is successful, log the session and redirect to a protected page (dashboard or home page)
    console.log('Login successful:', session);
    alert('Login successful!');
    prompt("Login sucess!")
    window.location.href = 'dashboard.html'; // Redirect to dashboard or another page
  } catch (error) {
    // If there was an error (invalid credentials, no user found, etc.), display an error message
    console.error('Login failed:', error);
    prompt("There was an issue, please try again")
    alert('Invalid credentials. Please check your email and password or sign up for a new account.');
  }
});




/*
// Initialize Appwrite SDK
const sdk = new Appwrite();
const client = new sdk.Client();
const database = new sdk.Databases();

client
    .setEndpoint('https://cloud.appwrite.io/v1')  // Replace with your Appwrite endpoint
    .setProject('67609b010021900fc6e6')   
    .setKey('standard_a766a87da91bf274575dc294722839045769920a97a36eed295705391e817cad896c81e52c5dd654b6e7b3e6ec13bd16f3d607e416a543d5813d0aab7d7eae27af014a01aa74c503196056bd82eea708c844f1dcbba43f42d81a8a1c455727e6c93536fa6de367f8b92c23961ef1e9982f40c6b9caf1b46064515391dd1de308');                // Replace with your Appwrite project ID

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
*/