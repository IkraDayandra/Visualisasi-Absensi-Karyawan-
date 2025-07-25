// Shared JavaScript functions for all pages

// Global variables
let sidebarOpen = true;

// Sample data - shared across all pages
const sampleData = [
    { name: "Ahmad Suryadi", department: "IT", checkIn: "08:15", scheduled: "08:00", late: "15 menit", status: "late", reason: "Macet", id: "EMP001" },
    { name: "Siti Rahayu", department: "HR", checkIn: "07:55", scheduled: "08:00", late: "-", status: "ontime", reason: "-", id: "EMP002" },
    { name: "Budi Santoso", department: "Finance", checkIn: "08:30", scheduled: "08:00", late: "30 menit", status: "late", reason: "Kendaraan rusak", id: "EMP003" },
    { name: "Maya Indira", department: "Marketing", checkIn: "07:50", scheduled: "08:00", late: "-", status: "ontime", reason: "-", id: "EMP004" },
    { name: "Rizki Pratama", department: "IT", checkIn: "-", scheduled: "08:00", late: "-", status: "absent", reason: "Sakit", id: "EMP005" },
    { name: "Dewi Lestari", department: "Operations", checkIn: "08:45", scheduled: "08:00", late: "45 menit", status: "late", reason: "Keperluan keluarga", id: "EMP006" },
    { name: "Andi Wijaya", department: "HR", checkIn: "07:58", scheduled: "08:00", late: "-", status: "ontime", reason: "-", id: "EMP007" },
    { name: "Fitri Ramadhani", department: "Finance", checkIn: "08:20", scheduled: "08:00", late: "20 menit", status: "late", reason: "Macet", id: "EMP008" },
    { name: "Mukti Raharja", department: "IT", checkIn: "07:50", scheduled: "08:00", late: "-", status: "ontime", reason: "-", id: "EMP009" },
    { name: "Yusri Mangunkusumo", department: "HR", checkIn: "08:10", scheduled: "08:00", late: "10 menit", status: "late", reason: "Macet", id: "EMP010" },
    { name: "Andi Prahoro", department: "Finance", checkIn: "07:55", scheduled: "08:00", late: "-", status: "ontime", reason: "-", id: "EMP011" },
    { name: "Dwi Yuliawan", department: "Marketing", checkIn: "08:25", scheduled: "08:00", late: "25 menit", status: "late", reason: "Kendaraan rusak", id: "EMP012" },
    { name: "Nur Cahyo", department: "Operations", checkIn: "08:20", scheduled: "08:00", late: "20 menit", status: "late", reason: "Macet", id: "EMP013" },
    { name: "Septian Pamungkas", department: "IT", checkIn: "07:45", scheduled: "08:00", late: "-", status: "ontime", reason: "-", id: "EMP014" },
    { name: "Mulyani", department: "HR", checkIn: "08:15", scheduled: "08:00", late: "15 menit", status: "late", reason: "Keperluan keluarga", id: "EMP015" },
    { name: "Dwi Ningsih", department: "Finance", checkIn: "07:58", scheduled: "08:00", late: "-", status: "ontime", reason: "-", id: "EMP016" },
    { name: "Ririn Tjahya", department: "Marketing", checkIn: "08:05", scheduled: "08:00", late: "5 menit", status: "late", reason: "Macet", id: "EMP017" },
    { name: "Teddy Simorangkir", department: "Operations", checkIn: "07:52", scheduled: "08:00", late: "-", status: "ontime", reason: "-", id: "EMP018" }
];

// Sample visitor data
const visitorData = [
    { name: "John Anderson", nik: "3271234567890123", division: "sumber-daya-manusia", date: "22/07/2025", timeIn: "09:15", timeOut: "16:30", status: "sudah-keluar" },
    { name: "Sarah Johnson", nik: "3271234567890124", division: "pengadaan-fasilitas", date: "22/07/2025", timeIn: "10:00", timeOut: "-", status: "belum-keluar" },
    { name: "Michael Brown", nik: "3271234567890125", division: "pengamanan-k3", date: "21/07/2025", timeIn: "13:30", timeOut: "17:00", status: "sudah-keluar" },
    { name: "Emily Davis", nik: "3271234567890126", division: "sbu-currency", date: "21/07/2025", timeIn: "08:45", timeOut: "-", status: "belum-keluar" },
    { name: "Robert Wilson", nik: "3271234567890127", division: "sbu-security", date: "20/07/2025", timeIn: "11:20", timeOut: "14:45", status: "sudah-keluar" },
    { name: "Jessica Miller", nik: "3271234567890128", division: "riset-pengembangan", date: "20/07/2025", timeIn: "14:00", timeOut: "-", status: "belum-keluar" },
    { name: "David Garcia", nik: "3271234567890129", division: "sumber-daya-manusia", date: "19/07/2025", timeIn: "09:30", timeOut: "16:00", status: "sudah-keluar" },
    { name: "Amanda Martinez", nik: "3271234567890130", division: "pengadaan-fasilitas", date: "19/07/2025", timeIn: "10:45", timeOut: "-", status: "belum-keluar" }
];

// Navigation functions
function navigateToPage(page) {
    // Check if user is logged in
    const isLoggedIn = sessionStorage.getItem('isLoggedIn');
    if (isLoggedIn !== 'true') {
        window.location.href = '../html/login.html';
        return;
    }
    
    // Navigate to specified page
    window.location.href = page;
}

// Sidebar Management Functions
function toggleSidebar() {
    console.log('🍔 Hamburger clicked! Current state:', sidebarOpen);
    
    const sidebar = document.querySelector('.sidebar');
    const mainContent = document.querySelector('.main-content');
    const navbar = document.querySelector('.navbar');
    const overlay = document.querySelector('.sidebar-overlay');
    
    if (!sidebar || !mainContent || !navbar) {
        console.error('❌ Sidebar elements not found!', {sidebar, mainContent, navbar});
        return;
    }
    
    sidebarOpen = !sidebarOpen;
    console.log('✅ Toggling sidebar, new state:', sidebarOpen);
    
    if (window.innerWidth <= 768) {
        // Mobile behavior
        console.log('📱 Mobile mode');
        if (sidebarOpen) {
            openSidebarMobile();
        } else {
            closeSidebarMobile();
        }
    } else {
        // Desktop behavior
        console.log('🖥️ Desktop mode');
        if (sidebarOpen) {
            console.log('Opening sidebar...');
            openSidebarDesktop();
        } else {
            console.log('Closing sidebar...');
            closeSidebarDesktop();
        }
    }
}

function openSidebarDesktop() {
    const sidebar = document.querySelector('.sidebar');
    const mainContent = document.querySelector('.main-content');
    const navbar = document.querySelector('.navbar');
    
    sidebar.classList.remove('closed');
    mainContent.classList.remove('sidebar-closed');
    navbar.classList.remove('sidebar-closed');
}

function closeSidebarDesktop() {
    const sidebar = document.querySelector('.sidebar');
    const mainContent = document.querySelector('.main-content');
    const navbar = document.querySelector('.navbar');
    
    sidebar.classList.add('closed');
    mainContent.classList.add('sidebar-closed');
    navbar.classList.add('sidebar-closed');
}

function openSidebarMobile() {
    const sidebar = document.querySelector('.sidebar');
    const overlay = document.querySelector('.sidebar-overlay');
    
    sidebar.classList.add('open');
    overlay.classList.add('active');
}

function closeSidebarMobile() {
    const sidebar = document.querySelector('.sidebar');
    const overlay = document.querySelector('.sidebar-overlay');
    
    sidebar.classList.remove('open');
    overlay.classList.remove('active');
}

// Close sidebar when clicking overlay (mobile)
function closeSidebar() {
    if (window.innerWidth <= 768) {
        const sidebar = document.querySelector('.sidebar');
        const overlay = document.querySelector('.sidebar-overlay');
        
        sidebar.classList.remove('open');
        overlay.classList.remove('active');
        sidebarOpen = false;
    }
}

// Submenu toggle function
function toggleSubmenu(menuId) {
    const submenu = document.getElementById(`${menuId}-submenu`);
    const button = document.querySelector(`[onclick="toggleSubmenu('${menuId}')"]`);
    
    if (submenu && button) {
        submenu.classList.toggle('open');
        button.classList.toggle('submenu-open');
    }
}

// Auto close sidebar on mobile when clicking menu item
function closeSidebarOnMobile() {
    if (window.innerWidth <= 768) {
        closeSidebar();
    }
}

// Logout function
function logout() {
    // Clear stored login state
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('username');
    sessionStorage.removeItem('isLoggedIn');
    sessionStorage.removeItem('username');
    
    // Redirect to login page
    window.location.href = '../html/login.html';
    
    showNotification('Anda telah berhasil logout', 'info');
}

// Notification functions
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <i class="fas ${getNotificationIcon(type)}"></i>
        <span>${message}</span>
        <button onclick="this.parentElement.remove()">
            <i class="fas fa-times"></i>
        </button>
    `;
    
    // Add to page
    document.body.appendChild(notification);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentElement) {
            notification.remove();
        }
    }, 5000);
}

function getNotificationIcon(type) {
    switch(type) {
        case 'success': return 'fa-check-circle';
        case 'error': return 'fa-exclamation-circle';
        case 'warning': return 'fa-exclamation-triangle';
        default: return 'fa-info-circle';
    }
}

// Handle window resize
window.addEventListener('resize', function() {
    const sidebar = document.querySelector('.sidebar');
    const mainContent = document.querySelector('.main-content');
    const navbar = document.querySelector('.navbar');
    const overlay = document.querySelector('.sidebar-overlay');
    
    if (window.innerWidth > 768) {
        // Desktop - remove mobile classes
        sidebar.classList.remove('open');
        overlay.classList.remove('active');
        
        // Apply desktop sidebar state
        if (sidebarOpen) {
            sidebar.classList.remove('closed');
            mainContent.classList.remove('sidebar-closed');
            navbar.classList.remove('sidebar-closed');
        } else {
            sidebar.classList.add('closed');
            mainContent.classList.add('sidebar-closed');
            navbar.classList.add('sidebar-closed');
        }
    } else {
        // Mobile - remove desktop classes
        sidebar.classList.remove('closed');
        mainContent.classList.remove('sidebar-closed');
        navbar.classList.remove('sidebar-closed');
        
        // Close sidebar on mobile by default
        sidebar.classList.remove('open');
        overlay.classList.remove('active');
        sidebarOpen = false;
    }
});

// Initialize sidebar state on page load
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded, checking authentication...');
    
    // Check if user is authenticated for non-login pages
    if (!window.location.pathname.includes('login.html')) {
        const isLoggedIn = sessionStorage.getItem('isLoggedIn');
        if (isLoggedIn !== 'true') {
            window.location.href = '../html/login.html';
            return;
        }
    }
    
    // Initialize sidebar state
    if (window.innerWidth <= 768) {
        sidebarOpen = false;
    } else {
        sidebarOpen = true;
    }
    
    console.log('Initial sidebar state:', sidebarOpen);
});

// Add dynamic CSS for styling
const style = document.createElement('style');
style.textContent = `
/* Notification Styles */
.notification {
    position: fixed;
    top: 20px;
    right: 20px;
    background: white;
    border: 1px solid #dee2e6;
    border-radius: 8px;
    padding: 15px 20px;
    box-shadow: 0 4px 12px rgba(0,0,0,0.15);
    z-index: 9999;
    display: flex;
    align-items: center;
    gap: 10px;
    max-width: 400px;
    font-size: 14px;
    font-weight: 500;
    animation: slideIn 0.3s ease-out;
}

.notification.success {
    border-left: 4px solid #28a745;
    color: #155724;
}

.notification.error {
    border-left: 4px solid #dc3545;
    color: #721c24;
}

.notification.warning {
    border-left: 4px solid #ffc107;
    color: #856404;
}

.notification.info {
    border-left: 4px solid #17a2b8;
    color: #0c5460;
}

.notification button {
    background: none;
    border: none;
    font-size: 16px;
    cursor: pointer;
    color: #6c757d;
    margin-left: auto;
    padding: 0;
}

.notification button:hover {
    color: #495057;
}

@keyframes slideIn {
    from {
        transform: translateX(100%);
        opacity: 0;
    }
    to {
        transform: translateX(0);
        opacity: 1;
    }
}

/* Dashboard Layout Styles */
.charts-grid-top {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 20px;
    margin-bottom: 30px;
}

.charts-grid-bottom {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;
    margin-bottom: 30px;
}

/* Chart container styles */
.chart-container {
    background: white;
    border-radius: 12px;
    padding: 20px;
    box-shadow: 0 2px 10px rgba(0,0,0,0.1);
    min-height: 400px;
    width: 100%;
}

.chart-canvas {
    position: relative;
    height: 350px !important;
    width: 100% !important;
}

/* Chart Grid for Visitor pages */
.chart-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;
    margin-top: 30px;
}

/* Responsive design */
@media (max-width: 768px) {
    .charts-grid-top {
        grid-template-columns: 1fr;
    }
    
    .charts-grid-bottom {
        grid-template-columns: 1fr;
    }
    
    .chart-grid {
        grid-template-columns: 1fr;
    }
}
`;

// Append style to head
document.head.appendChild(style);
