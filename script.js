document.addEventListener('DOMContentLoaded', (event) => {
    const loginBtn = document.getElementById('login');
    const signupBtn = document.getElementById('signup');

    loginBtn.addEventListener('click', () => {
        if(localStorage.getItem('user')!=null){
        window.location.href = '/dashboard/index.html';
        }
        else{
            window.location.href = '/login/index.html';
        }
    });
    signupBtn.addEventListener('click', () => {
        window.location.href = 'signup.html';
    }
    );
    
});
