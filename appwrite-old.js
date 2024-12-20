const script = document.createElement('script');
script.src = 'https://cdn.jsdelivr.net/npm/appwrite@16.0.2';
script.onload = () => {
  // Once the script is loaded, you can initialize and use Appwrite
  const client = new Client();

  // Set the Appwrite project endpoint and project ID (Replace these with your actual Appwrite details)
  client.setEndpoint('https://cloud.appwrite.io/v1') // Replace with your Appwrite server URL
        .setProject('67609b010021900fc6e6'); // Replace with your Appwrite Project ID

  // Create an instance of the Account service
  const account = new Appwrite.Account(client);

  // Add an event listener for the login form submission
 
};
document.head.appendChild(script);
