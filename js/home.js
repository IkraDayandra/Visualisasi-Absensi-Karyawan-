// Home page JavaScript functionality

// Initialize home page
document.addEventListener('DOMContentLoaded', function() {
    console.log('Home page loaded');
    
    // Initialize sidebar state (open by default on desktop)
    if (window.innerWidth <= 768) {
        sidebarOpen = false;
        closeSidebarMobile();
    } else {
        sidebarOpen = true;
        openSidebarDesktop();
    }
    
    // Show welcome notification
    const username = sessionStorage.getItem('username') || 'User';
    showNotification(`Selamat datang, ${username}!`, 'success');
    
    console.log('✅ Home page initialization complete');
});

// Show specific page function (for navigation within single page)
function showPage(pageId) {
    // Remove active class from all pages
    document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active');
    });
    
    // Remove active class from all sidebar buttons
    document.querySelectorAll('.sidebar-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    
    // Show selected page
    const selectedPage = document.getElementById(`${pageId}-page`);
    if (selectedPage) {
        selectedPage.classList.add('active');
    }
    
    // Activate corresponding sidebar button
    const activeBtn = document.querySelector(`[onclick="showPage('${pageId}')"]`);
    if (activeBtn) {
        activeBtn.classList.add('active');
    }
    
    // Close sidebar on mobile after selection
    closeSidebarOnMobile();
}
