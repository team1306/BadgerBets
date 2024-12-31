const script = document.createElement('script');
script.src = 'https://cdn.jsdelivr.net/npm/appwrite@16.0.2';
script.onload=()=>{
  const client = new Appwrite.Client()
  .setEndpoint('https://cloud.appwrite.io/v1') // Replace with your Appwrite server URL
  .setProject('67609b010021900fc6e6'); 
  const account = new Appwrite.Account(client);
  const functions = new Appwrite.Account(client);
  //code for sign up page
  document.getElementById('signup-form').addEventListener('submit',async (event)=>{
    event.preventDefault();
    let email = document.getElementById("email").value;
    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;
    let name = document.getElementById('name').value;
    if (!email || !password||!username||!name) {
      alert('Please fill in both fields.');
      return;
    }
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
      const session = await account.create(username, email, password,name);
      
      try {
        const user = await account.get();
        const userId = user.$id;
        const functionId = '6770291b00171ec2611b'; // Replace with your function ID
        const parameters = JSON.stringify({
            action: 'create',
            userId: userId,
            badgerBucks: 100
        });

        // Execute the function
        let result = await functions.createExecution(functionId, parameters);
        result = JSON.parse(result.responseBody)
        currentBadgerBucks = result.badgerBucks
        console.log('Your badgerBucks:', currentBadgerBucks);
    } catch (error) {
        alert("There was an error");
        console.error(error);
    }// Correct method for creating session
      
      
      // Redirect to dashboard or another page
      window.location.href = '/BadgerBets/dashboard/';
    } catch (error) {
      // If there was an error (invalid credentials, no user found, etc.), display an error message
      console.log('Account creation failed:', error);
      alert(`Account creation failed: ${error.message || 'Unknown error'}`);
    }

    

  })
};



document.head.appendChild(script);


