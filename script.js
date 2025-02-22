document.addEventListener('DOMContentLoaded', (event) => {
    const loginBtn = document.getElementById('login');
    const signupBtn = document.getElementById('signup');

    loginBtn.addEventListener('click', () => {
        window.location.href = 'login.html';
    });
    signupBtn.addEventListener('click', () => {
        window.location.href = 'signup.html';
    }
    );
    
});