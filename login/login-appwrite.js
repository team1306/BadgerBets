const script = document.createElement('script');
script.src = 'https://cdn.jsdelivr.net/npm/appwrite@16.0.2';
script.onload=()=>{
  const client = new Appwrite.Client()
  .setEndpoint('https://cloud.appwrite.io/v1') // Replace with your Appwrite server URL
  .setProject('67609b010021900fc6e6'); 
  const account = new Appwrite.Account(client);
  document.getElementById('login-form').addEventListener('submit', async (event) => {
    event.preventDefault();

    // Get the values from the input fields (email and password)
    let email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;

    // Basic validation for non-empty fields
    if (!email || !password) {
      alert('Please fill in both fields.');
      return;
    }

    // Trim any leading/trailing whitespace from the email and password
    email = email.trim();

    // Log the email and password to debug

    // Validate the email format (simple regex check for valid email format)
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!emailRegex.test(email)) {
      alert('Invalid email format.');
      return;
    }

    try {
      // Try to create a session with the provided email and password
      const session = await account.createEmailPasswordSession(email, password); // Correct method for creating session
      alert("Login successful!");
      console.log('Login successful:', session);
      
      // Redirect to dashboard or another page
      window.location.href = '/BadgerBets/dashboard/';
    } catch (error) {
      // If there was an error (invalid credentials, no user found, etc.), display an error message
      console.log('Login failed:', error);
      alert(`Login failed: ${error.message || 'Unknown error'}`);
    }
  });
  //code for sign up page
};



document.head.appendChild(script);


