// Admin page JavaScript functionality

// Initialize admin page when page loads
document.addEventListener('DOMContentLoaded', function() {
    console.log('Admin page loaded');
    
    // Initialize sidebar state (open by default on desktop)
    if (window.innerWidth <= 768) {
        sidebarOpen = false;
        closeSidebarMobile();
    } else {
        sidebarOpen = true;
        openSidebarDesktop();
    }
    
    // Initialize admin content
    initAdminPage();
    
    console.log('✅ Admin initialization complete');
});

function initAdminPage() {
    // Admin functionality placeholder
    console.log('Admin page initialized');
    
    // You can add admin-specific functionality here in the future
    // For example:
    // - User management
    // - System settings
    // - Reports generation
    // - Data import/export
    // etc.
}

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

// Add CSS styles for admin specific elements
const adminStyle = document.createElement('style');
adminStyle.textContent = `
/* Admin placeholder styles */
.admin-placeholder {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 400px;
    background: white;
    border-radius: 12px;
    box-shadow: 0 2px 10px rgba(0,0,0,0.1);
    text-align: center;
    color: #6c757d;
}

.admin-placeholder i {
    font-size: 64px;
    margin-bottom: 20px;
    color: #007bff;
}

.admin-placeholder h3 {
    font-size: 24px;
    margin-bottom: 10px;
    color: #495057;
}

.admin-placeholder p {
    font-size: 16px;
    color: #6c757d;
}
`;

// Append admin styles to head
document.head.appendChild(adminStyle);
