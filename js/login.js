// Login page JavaScript functionality

// Login Functionality
function handleLogin(event) {
    event.preventDefault();
    
    console.log('🔐 Login initiated');
    
    // Demo mode - langsung masuk tanpa validasi
    const isLoggedIn = true;
    
    // Set default user untuk demo
    const demoUsername = 'Demo User';
    
    // Store login state
    sessionStorage.setItem('isLoggedIn', 'true');
    sessionStorage.setItem('username', demoUsername);
    
    console.log('✅ Login state saved');
    
    // Redirect to home page
    window.location.href = 'home.html';
}

// Check if already logged in when page loads
document.addEventListener('DOMContentLoaded', function() {
    console.log('Login page loaded, checking existing login state...');
    
    // Check if already logged in
    const isLoggedIn = sessionStorage.getItem('isLoggedIn');
    if (isLoggedIn === 'true') {
        console.log('User already logged in, redirecting to home...');
        window.location.href = 'home.html';
    }
});
