import { Functions, Client, Account } from "../node_modules/appwrite";

const client = new Client()
  .setEndpoint('https://cloud.appwrite.io/v1') // Replace with your Appwrite server URL
  .setProject('67609b010021900fc6e6');

const account = new Account(client);
const functions = new Functions(client);

// Code for the sign-up page
const signupForm = document.getElementById('signup-form');

if (signupForm) {
  signupForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    // Extract form values
    const email = (document.getElementById('email') as HTMLInputElement).value.trim();
    const username = (document.getElementById('username') as HTMLInputElement).value.trim();
    const password = (document.getElementById('password') as HTMLInputElement).value.trim();
    const name = (document.getElementById('name') as HTMLInputElement).value.trim();

    // Basic validation
    if (!email || !username || !password || !name) {
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
      const response = await account.create('unique()', email, password, name);
      console.log('Account created:', response);

      // Get user details
      const user = await account.get();
      const userId = user.$id;

      // Prepare function execution
      const functionId = '6770291b00171ec2611b'; // Replace with your function ID
      const parameters = JSON.stringify({
        action: 'create',
        userId: userId,
        badgerBucks: 100,
      });

      // Execute the function
      const result = await functions.createExecution(functionId, parameters);
      const functionResult = JSON.parse(result.response);
      const currentBadgerBucks = functionResult.badgerBucks;

      console.log('Your badgerBucks:', currentBadgerBucks);

      // Redirect to dashboard
      window.location.href = '/BadgerBets/dashboard/';
    } catch (error: any) {
      // Handle errors
      console.error('Account creation failed:', error);
      alert(`Account creation failed: ${error.message || 'Unknown error'}`);
    }
  });
}
