
// Initialize the Appwrite SDK
const sdk = new Appwrite(); // Correct initialization


// Set the Appwrite project endpoint and project ID (Replace these with your actual Appwrite details)
const client = new Client();
client.setProject('bbets');      // Replace with your Appwrite Project ID

// Create an instance of the Account service
const account = new sdk.Account(client);

// Add an event listener for the login form submission
document.getElementById('login-form').addEventListener('submit', async (event) => {
  event.preventDefault();

  // Get the values from the input fields (email and password)
  const email = document.getElementById('login-email').value;
  const password = document.getElementById('login-password').value;

  // Basic validation for non-empty fields
  if (!email || !password) {
    alert('Please fill in both fields.');
    return;
  }

  try {
    // Try to create a session with the provided email and password
    const session = await account.createEmailSession(email, password);
    alert("Login successful!");
    console.log('Login successful:', session);
   
    // Redirect to dashboard or another page
    window.location.href = 'dashboard.html';
  } catch (error) {
    // If there was an error (invalid credentials, no user found, etc.), display an error message
    
    console.error('Login failed:', error);
    alert(`Login failed: ${error.message || 'Unknown error'}`);
  }
});