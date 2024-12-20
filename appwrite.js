const script = document.createElement('script');
script.src = 'https://cdn.jsdelivr.net/npm/appwrite@16.0.2';
script.onload = () => {
  // Once the script is loaded, you can initialize and use Appwrite
  const client = new Appwrite.Client();

  // Set the Appwrite project endpoint and project ID (Replace these with your actual Appwrite details)
  client.setEndpoint('https://cloud.appwrite.io/v1') // Replace with your Appwrite server URL
        .setProject('67609b010021900fc6e6'); // Replace with your Appwrite Project ID

  // Create an instance of the Account service
  const account = new Appwrite.Account(client);

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

    // Log the email and password to debug
    console.log('Email:', email);
    console.log('Password:', password);

    try {
      // Try to create a session with the provided email and password
      const session = await account.createSession(email, password); // Correct method for creating session
      alert("Login successful!");
      console.log('Login successful:', session);
      
      // Redirect to dashboard or another page
      window.location.href = 'dashboard.html';
    } catch (error) {
      // If there was an error (invalid credentials, no user found, etc.), display an error message
      console.log('Login failed:', error);
      alert(`Login failed: ${error.message || 'Unknown error'}`);
    }
  });
};
document.head.appendChild(script);
