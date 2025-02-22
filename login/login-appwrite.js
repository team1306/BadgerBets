import { Client, Account } from "https://esm.sh/appwrite@14.0.1";
import {login} from "./login-helper.js";
const client = new Client()
  .setEndpoint('https://cloud.appwrite.io/v1') // Replace with your Appwrite server URL
  .setProject('67609b010021900fc6e6');

const account = new Account(client);


if (localStorage.getItem('session') != null) window.location.href = '../dashboard/index.html';
console.log(localStorage.getItem('session'));


const loginForm = document.getElementById('login-form');
if (loginForm) {
  loginForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    const emailInput = document.getElementById('login-email');
    const passwordInput = document.getElementById('login-password');

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
    await login(account, email, password);
  });
} else {
  console.error('Login form not found.');
}

