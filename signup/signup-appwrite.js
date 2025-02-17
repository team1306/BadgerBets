import {Client, Account, ID} from "https://esm.sh/appwrite@14.0.1";
import {login} from "../login/login-helper.js";

const client = new Client()
  .setEndpoint('https://cloud.appwrite.io/v1') // Replace with your Appwrite server URL
  .setProject('67609b010021900fc6e6');

const account = new Account(client);

// Code for the sign-up page
const signupForm = document.getElementById('signup-form');

if (signupForm) {
  signupForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    // Extract form values
    const email = (document.getElementById('email')).value.trim();
    const password = (document.getElementById('password')).value.trim();
    const name = (document.getElementById('name')).value.trim();

    // Basic validation
    if (!email || !password || !name) {
      alert('Please fill in all fields.');
      return;
    }

    // Validate email format
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!emailRegex.test(email)) {
      alert('Invalid email format.');
      return;
    }

    try {
      // Create a new account
      const response = await account.create(ID.unique(), email, password, name);
      console.log('Account created:', response);

      // Get user details
      const user = await account.get();
      const userId = user.$id;

      // Redirect to dashboard
    } catch (error) {
      // Handle errors
      console.error('Account creation failed:', error);
      alert(`Account creation failed: ${error.message || 'Unknown error'}`);
    }

    await login(account, email, password);
  });
}
