import { Account, Client } from 'appwrite';
  const client = new Client()
    .setEndpoint('https://cloud.appwrite.io/v1') // Replace with your Appwrite server URL
    .setProject('67609b010021900fc6e6');

  const account = new Account(client);

  const loginForm = document.getElementById('login-form') as HTMLFormElement | null;
  if (loginForm) {
    loginForm.addEventListener('submit', async (event: SubmitEvent) => {
      event.preventDefault();

      const emailInput = document.getElementById('login-email') as HTMLInputElement | null;
      const passwordInput = document.getElementById('login-password') as HTMLInputElement | null;

      if (!emailInput || !passwordInput) {
        console.error('Login form inputs not found.');
        return;
      }

      let email = emailInput.value.trim();
      const password = passwordInput.value.trim();

      if (!email || !password) {
        alert('Please fill in both fields.');
        return;
      }

      const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
      if (!emailRegex.test(email)) {
        alert('Invalid email format.');
        return;
      }

      try {
        const session = await account.createEmailPasswordSession(email, password);
        const sessionId = session.$id;

        localStorage.setItem('session', sessionId);
        window.location.href = '/BadgerBets/dashboard/';
      } catch (error: any) {
        console.error('Login failed:', error);
        alert(`Login failed: ${error.message || 'Unknown error'}`);
      }
    });
  } else {
    console.error('Login form not found.');
  }

