const SIMULATED_DELAY = 800; // ms to simulate network request

// Simple hash function for password encryption (browser-compatible)
function simpleHash(str) {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        const char = str.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash = hash & hash; // Convert to 32bit integer
    }
    // Convert to hex string
    return Math.abs(hash).toString(16).padStart(8, '0') + 
           str.length.toString(16).padStart(4, '0');
}

document.addEventListener('DOMContentLoaded', () => {
    const registerForm = document.getElementById('registerForm');
    const loginForm = document.getElementById('loginForm');

    // Helper functions for LocalStorage interactions
    const getWeatherUsers = () => {
        const users = localStorage.getItem('rps_users');
        return users ? JSON.parse(users) : [];
    };

    const saveUser = (user) => {
        const users = getWeatherUsers();
        users.push(user);
        localStorage.setItem('rps_users', JSON.stringify(users));
    };

    const findUser = (email) => {
        const users = getWeatherUsers();
        return users.find(u => u.email === email);
    };

    const hashPassword = (password) => {
        return simpleHash(password);
    };

    const checkPassword = (user, password) => {
        const hashedInput = simpleHash(password);
        return user.password === hashedInput;
    };

    if (registerForm) {
        registerForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const submitBtn = registerForm.querySelector('button[type="submit"]');
            submitBtn.disabled = true;
            submitBtn.textContent = 'Registering...';

            const username = document.getElementById('username').value;
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            const confirmPassword = document.getElementById('confirmPassword').value;

            await new Promise(resolve => setTimeout(resolve, SIMULATED_DELAY));

            if (password !== confirmPassword) {
                showToast('Passwords do not match', 'error');
                submitBtn.disabled = false;
                submitBtn.textContent = 'Register';
                return;
            }

            if (findUser(email)) {
                showToast('User already exists', 'error');
                submitBtn.disabled = false;
                submitBtn.textContent = 'Register';
                return;
            }

            // Create new user with hashed password
            const hashedPassword = hashPassword(password);
            const newUser = {
                id: Date.now().toString(),
                username,
                email,
                password: hashedPassword
            };

            saveUser(newUser);

            showToast('Registration successful! Redirecting to login...', 'success');
            setTimeout(() => {
                window.location.href = 'login.html';
            }, 1500);
        });
    }

    if (loginForm) {
        loginForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const submitBtn = loginForm.querySelector('button[type="submit"]');
            submitBtn.disabled = true;
            submitBtn.textContent = 'Logging in...';

            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;

             // Simulate Network Delay
             await new Promise(resolve => setTimeout(resolve, SIMULATED_DELAY));

            const user = findUser(email);

            if (user && checkPassword(user, password)) {
                // Login Success
                const token = 'mock_token_' + Date.now();
                localStorage.setItem('token', token);
                localStorage.setItem('username', user.username);
                // Also store current user details if needed
                localStorage.setItem('currentUser', JSON.stringify({
                    id: user.id,
                    username: user.username,
                    email: user.email
                }));

                showToast('Login successful! Redirecting...', 'success');
                setTimeout(() => {
                    window.location.href = 'index.html';
                }, 1000);
            } else {
                showToast('Invalid credentials', 'error');
                submitBtn.disabled = false;
                submitBtn.textContent = 'Login';
            }
        });
    }

    // Logout Logic
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', () => {
            localStorage.removeItem('token');
            localStorage.removeItem('username');
            localStorage.removeItem('currentUser');
            showToast('Logged out successfully', 'success');
            setTimeout(() => {
                window.location.href = 'login.html';
            }, 1000);
        });
    }
});

// Auth Guard
const checkAuth = async () => {
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');
    const isPublicPage = loginForm || registerForm;

    // Pages that don't require auth (Login/Register)
    if (isPublicPage) {
        // If already logged in, redirect to index
        if (localStorage.getItem('token')) {
             window.location.href = 'index.html';
        }
        return;
    }

    // Protected Pages (Game Interface)
    const token = localStorage.getItem('token');
    if (!token) {
        window.location.href = 'login.html';
        return;
    }

    // In a real app we would verify token with server here.
    // For mock, we just assume if token exists, it's valid.
};

checkAuth();
