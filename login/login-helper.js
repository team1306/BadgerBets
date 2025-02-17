export async function login(account, email, password) {
    try {
        const session = await account.createEmailPasswordSession(email, password);
        const sessionId = session.$id;

        localStorage.setItem('session', sessionId);
        window.location.href = '../dashboard/index.html';
    } catch (error) {
        console.error('Login failed:', error);
        alert(`Login failed: ${error.message || 'Unknown error'}`);

        if(account.get()){
            localStorage.setItem('session', sessionId);
            window.location.href = '../dashboard/index.html';
        }
    }
}