// Fixed Sidebar Management
let sidebarOpen = true;

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
    console.log('DOM loaded, checking login state...');
    
    // Check if already logged in
    const isLoggedIn = sessionStorage.getItem('isLoggedIn');
    if (isLoggedIn === 'true') {
        showDashboard();
    }
    
    // Initialize sidebar state
    if (window.innerWidth <= 768) {
        sidebarOpen = false;
    } else {
        sidebarOpen = true;
    }
    
    console.log('Initial sidebar state:', sidebarOpen);
});

// Sample data
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

let currentSlide = 1;
let currentMonth = new Date().getMonth();
let currentYear = new Date().getFullYear();
let isLoggedIn = false;

// Chart preloading for better performance
let visitorChartsPreloaded = false;

function preloadVisitorCharts() {
    if (visitorChartsPreloaded) return;
    
    // Preload chart data to improve infografis page loading
    setTimeout(() => {
        if (typeof Chart !== 'undefined') {
            // Create invisible temporary canvases to test Chart.js
            const tempCanvas1 = document.createElement('canvas');
            const tempCanvas2 = document.createElement('canvas');
            tempCanvas1.style.display = 'none';
            tempCanvas2.style.display = 'none';
            document.body.appendChild(tempCanvas1);
            document.body.appendChild(tempCanvas2);
            
            // Create and immediately destroy test charts to cache Chart.js
            try {
                const testChart1 = new Chart(tempCanvas1, {
                    type: 'line',
                    data: { labels: ['Test'], datasets: [{ data: [1] }] },
                    options: { responsive: false, animation: false }
                });
                const testChart2 = new Chart(tempCanvas2, {
                    type: 'pie',
                    data: { labels: ['Test'], datasets: [{ data: [1] }] },
                    options: { responsive: false, animation: false }
                });
                
                testChart1.destroy();
                testChart2.destroy();
                visitorChartsPreloaded = true;
                console.log('✅ Visitor charts preloaded successfully');
            } catch (error) {
                console.log('Chart preload failed, will load normally');
            } finally {
                // Clean up temporary canvases
                document.body.removeChild(tempCanvas1);
                document.body.removeChild(tempCanvas2);
            }
        }
    }, 500);
}

// Login Functionality
function handleLogin(event) {
    event.preventDefault();
    
    console.log('🔐 Login initiated');
    
    // Demo mode - langsung masuk tanpa validasi
    isLoggedIn = true;
    
    // Set default user untuk demo
    const demoUsername = 'Demo User';
    
    // Store login state
    sessionStorage.setItem('isLoggedIn', 'true');
    sessionStorage.setItem('username', demoUsername);
    
    console.log('✅ Login state saved');
    
    // Show login success notification
    showNotification('Anda telah berhasil login', 'success');
    
    // Hide login page and show dashboard
    showDashboard();
}

function showDashboard() {
    const loginPage = document.getElementById('loginPage');
    const dashboardLayout = document.getElementById('dashboardLayout');
    const navbar = document.getElementById('navbar');
    
    console.log('🚀 showDashboard called');
    console.log('🔍 Login page element:', loginPage);
    console.log('🔍 Dashboard layout element:', dashboardLayout);
    console.log('🔍 Navbar element:', navbar);
    
    // Update global login state
    isLoggedIn = true;
    
    if (!loginPage || !dashboardLayout || !navbar) {
        console.error('❌ Required elements not found!');
        return;
    }
    
    // Hide login page completely
    loginPage.style.display = 'none';
    
    // Show dashboard layout
    dashboardLayout.style.display = 'block';
    dashboardLayout.classList.add('active');
    dashboardLayout.style.visibility = 'visible';
    
    // Show navbar - PENTING: Reset navbar display
    navbar.style.display = 'block';
    navbar.style.visibility = 'visible';
    navbar.style.opacity = '1';
    
    console.log('✅ Dashboard layout and navbar display set to block');
    
    // Check hamburger menu
    setTimeout(() => {
        const hamburger = document.querySelector('.menu-toggle');
        const navContainer = document.querySelector('.nav-container');
        const profilePicture = document.querySelector('.profile-picture');
        
        console.log('🍔 Hamburger menu element:', hamburger);
        console.log('🧭 Nav container element:', navContainer);
        console.log('👤 Profile picture element:', profilePicture);
        
        // Ensure navbar container is visible
        if (navContainer) {
            navContainer.style.display = 'flex';
            navContainer.style.visibility = 'visible';
            navContainer.style.opacity = '1';
        }
        
        // Ensure profile picture is visible
        if (profilePicture) {
            profilePicture.style.display = 'flex';
            profilePicture.style.visibility = 'visible';
            profilePicture.style.opacity = '1';
        }
        
        if (hamburger) {
            hamburger.style.display = 'flex';
            hamburger.style.visibility = 'visible';
            hamburger.style.opacity = '1';
            console.log('🍔 Hamburger menu forced visible');
            
            // Pastikan 3 garis terlihat
            const lines = hamburger.querySelectorAll('.line');
            console.log('🍔 Hamburger lines found:', lines.length);
            lines.forEach((line, index) => {
                line.style.display = 'block';
                line.style.backgroundColor = '#ffffff';
                line.style.width = '100%';
                line.style.height = '3.5px';
                console.log(`🍔 Line ${index + 1} styled`);
            });
        }
    }, 100);
    
    // Initialize sidebar state (open by default on desktop)
    if (window.innerWidth <= 768) {
        sidebarOpen = false;
        closeSidebarMobile();
    } else {
        sidebarOpen = true;
        openSidebarDesktop();
    }
    
    // Show home page by default
    showPage('home');
    
    // Preload visitor charts for better performance
    preloadVisitorCharts();
    
    console.log('✅ Dashboard initialization complete');
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

function logout() {
    isLoggedIn = false;
    
    // Clear stored login state
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('username');
    sessionStorage.removeItem('isLoggedIn');
    sessionStorage.removeItem('username');
    
    // Hide dashboard and show login page
    const loginPage = document.getElementById('loginPage');
    const dashboardLayout = document.getElementById('dashboardLayout');
    
    // Hide all pages
    document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active');
    });
    
    // Hide dashboard layout completely
    if (dashboardLayout) {
        dashboardLayout.style.display = 'none';
        dashboardLayout.classList.remove('active');
    }
    
    // Close sidebar if open
    closeSidebar();
    
    // Show login page
    if (loginPage) {
        loginPage.style.display = 'flex';
    }
    
    showNotification('Anda telah berhasil logout', 'info');
}

function checkLoginState() {
    const isStoredLogin = sessionStorage.getItem('isLoggedIn');
    console.log('🔍 Checking login state:', isStoredLogin);
    
    if (isStoredLogin === 'true') {
        isLoggedIn = true;
        console.log('✅ User already logged in, showing dashboard');
        showDashboard();
        
        const username = sessionStorage.getItem('username');
        if (username) {
            showNotification('Selamat datang kembali, ' + username + '!', 'success');
        }
    } else {
        console.log('❌ User not logged in, showing login page');
        isLoggedIn = false;
    }
}

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

// Add CSS for styling
const style = document.createElement('style');
style.textContent = `
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

.charts-grid-bottom .chart-container {
    width: 100%;
    overflow: hidden;
}

.charts-grid-bottom .chart-container .today-attendance-table {
    width: 100%;
    margin: 0;
    padding: 0;
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

.chart-container .today-attendance-table {
    margin: 0;
    padding: 0;
}

.chart-canvas {
    position: relative;
    height: 350px !important;
    width: 100% !important;
}

/* Top 5 Late Employees Styles */
.top-late-employees {
    padding: 20px;
    height: 350px;
    overflow-y: auto;
}

.late-employee-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 12px 15px;
    margin-bottom: 10px;
    background: #f8f9fa;
    border-radius: 8px;
    border-left: 4px solid #e74c3c;
    transition: all 0.3s ease;
}

.late-employee-item:hover {
    background: #e3f2fd;
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0,0,0,0.1);
}

.employee-info {
    flex: 1;
}

.employee-name {
    font-weight: 600;
    color: #2c3e50;
    font-size: 14px;
    margin-bottom: 2px;
}

.employee-dept {
    font-size: 12px;
    color: #7f8c8d;
}

.late-count {
    text-align: center;
    background: #e74c3c;
    color: white;
    padding: 6px 12px;
    border-radius: 15px;
    font-size: 12px;
    font-weight: 600;
    min-width: 40px;
}

/* Today Attendance Table Styles */
.today-attendance-table {
    padding: 0;
    height: 300px;
    overflow-y: auto;
    width: 100%;
}

/* Attendance Filter Styles */
.attendance-filter {
    padding: 10px 15px;
    border-bottom: 1px solid #dee2e6;
    background: #f8f9fa;
}

.attendance-filter select {
    background: white;
    border: 1px solid #ced4da;
    border-radius: 6px;
    padding: 8px 12px;
    font-size: 14px;
    color: #495057;
    cursor: pointer;
    min-width: 150px;
    transition: border-color 0.3s ease;
}

.attendance-filter select:focus {
    outline: none;
    border-color: #007bff;
    box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.25);
}

.attendance-table {
    width: 100%;
    border-collapse: collapse;
    font-size: 13px;
    table-layout: fixed;
}

.attendance-table th {
    background: #f8f9fa;
    color: #495057;
    font-weight: 600;
    padding: 10px 12px;
    text-align: left;
    border-bottom: 2px solid #dee2e6;
    position: sticky;
    top: 0;
    z-index: 10;
}

.attendance-table td {
    padding: 8px 12px;
    border-bottom: 1px solid #dee2e6;
    vertical-align: middle;
    word-wrap: break-word;
}

.attendance-table tbody tr:hover {
    background-color: #f8f9fa;
}

.attendance-table tbody tr:last-child td {
    border-bottom: none;
}

.status-badge {
    padding: 4px 8px;
    border-radius: 12px;
    font-size: 11px;
    font-weight: 600;
    text-transform: uppercase;
}

.status-badge.status-ontime {
    background: #d4edda;
    color: #155724;
}

.status-badge.status-late {
    background: #f8d7da;
    color: #721c24;
}

.status-badge.status-absent {
    background: #fff3cd;
    color: #856404;
}

/* Pagination Styles */
.pagination-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 20px;
    padding: 15px 0;
    border-top: 1px solid #dee2e6;
}

.pagination-info {
    font-size: 14px;
    color: #6c757d;
    font-weight: 500;
}

.pagination-controls {
    display: flex;
    gap: 10px;
}

.pagination-btn {
    background: #007bff;
    color: white;
    border: none;
    padding: 8px 16px;
    border-radius: 6px;
    cursor: pointer;
    font-size: 14px;
    font-weight: 500;
    transition: all 0.3s ease;
    display: flex;
    align-items: center;
    gap: 5px;
}

.pagination-btn:hover:not(:disabled) {
    background: #0056b3;
    transform: translateY(-1px);
}

.pagination-btn:disabled {
    background: #6c757d;
    cursor: not-allowed;
    opacity: 0.5;
}

/* Notification Styles */
.notification {
    position: fixed;
    top: 20px;
    right: 20px;
    background: white;
    padding: 15px 20px;
    border-radius: 10px;
    box-shadow: 0 5px 15px rgba(0,0,0,0.2);
    display: flex;
    align-items: center;
    gap: 10px;
    z-index: 10000;
    animation: slideInRight 0.3s ease;
    min-width: 300px;
}

.notification.success {
    border-left: 4px solid #27ae60;
    color: #27ae60;
}

.notification.error {
    border-left: 4px solid #e74c3c;
    color: #e74c3c;
}

.notification.warning {
    border-left: 4px solid #f39c12;
    color: #f39c12;
}

.notification.info {
    border-left: 4px solid #3498db;
    color: #3498db;
}

.notification button {
    background: none;
    border: none;
    color: #7f8c8d;
    cursor: pointer;
    margin-left: auto;
    padding: 5px;
    border-radius: 3px;
}

.notification button:hover {
    background: #f8f9fa;
}

@keyframes slideInRight {
    from {
        transform: translateX(100%);
        opacity: 0;
    }
    to {
        transform: translateX(0);
        opacity: 1;
    }
}

@media (max-width: 1024px) {
    .charts-grid-top {
        grid-template-columns: 1fr 1fr;
    }
}

@media (max-width: 768px) {
    .charts-grid-top,
    .charts-grid-bottom {
        grid-template-columns: 1fr;
    }
}
`;
document.head.appendChild(style);

// Page Navigation Functions
function showPage(pageName) {
    console.log('📄 showPage called with:', pageName);
    
    // Check login state from sessionStorage
    const isLoggedIn = sessionStorage.getItem('isLoggedIn') === 'true';
    console.log('🔐 isLoggedIn status:', isLoggedIn);
    
    // Don't allow navigation if not logged in
    if (!isLoggedIn) {
        console.log('❌ User not logged in, blocking navigation');
        return;
    }
    
    console.log('✅ Showing page:', pageName);
    
    // Hide all pages
    const allPages = document.querySelectorAll('.page');
    console.log('📋 Found pages:', allPages.length);
    allPages.forEach(page => {
        page.classList.remove('active');
        console.log('🔲 Removed active from:', page.id);
    });
    
    // Remove active class from all sidebar buttons
    document.querySelectorAll('.sidebar-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    
    // Show selected page
    const targetPage = document.getElementById(`${pageName}-page`);
    console.log('🎯 Target page element:', targetPage);
    if (targetPage) {
        targetPage.classList.add('active');
        console.log('✅ Added active class to page', pageName);
    } else {
        console.error('❌ Page not found:', `${pageName}-page`);
    }
    
    // Add active class to selected sidebar button
    const activeBtn = document.querySelector(`[onclick="showPage('${pageName}')"]`);
    if (activeBtn) {
        activeBtn.classList.add('active');
        console.log('✅ Added active class to button');
    }
    
    // Close sidebar on mobile after selection
    closeSidebarOnMobile();
    
    // Initialize content based on page
    switch(pageName) {
        case 'home':
            // Home page is static
            break;
        case 'dashboard':
            console.log('Initializing dashboard charts');
            initOverviewCharts();
            break;
        case 'attendance-history':
            populateAttendanceHistory();
            break;
        case 'attendance-recap':
            generateEmployeeRecap();
            break;
        case 'visitor-infografis':
            console.log('Initializing visitor infografis page');
            // Use requestAnimationFrame for smoother rendering
            requestAnimationFrame(() => {
                initVisitorInfografis();
            });
            break;
        case 'visitor-rekapitulasi':
            populateVisitorRekapitulasi();
            break;
        case 'admin':
            console.log('Admin page loaded');
            // Admin functionality will be added later
            break;
    }
}

// Overview Dashboard Charts (New Layout)
function initOverviewCharts() {
    console.log('Initializing overview charts...');
    
    try {
        // Monthly Recap Bar Chart
        const monthlyRecapCtx = document.getElementById('monthlyRecapChart');
        if (monthlyRecapCtx) {
            // Destroy existing chart if it exists
            if (window.monthlyRecapChart && typeof window.monthlyRecapChart.destroy === 'function') {
                window.monthlyRecapChart.destroy();
            }
            
            window.monthlyRecapChart = new Chart(monthlyRecapCtx, {
                type: 'bar',
                data: {
                    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul'],
                    datasets: [{
                        label: 'Keterlambatan',
                        data: [45, 52, 38, 67, 55, 48, 62],
                        backgroundColor: '#e74c3c',
                        borderRadius: 5,
                        borderSkipped: false,
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    scales: {
                        y: {
                            beginAtZero: true
                        }
                    },
                    plugins: {
                        legend: {
                            display: false
                        }
                    }
                }
            });
            console.log('Monthly recap chart created successfully');
        } else {
            console.warn('Monthly recap chart canvas not found');
        }

        // Status Distribution Pie Chart
        const statusDistCtx = document.getElementById('statusDistributionChart');
        if (statusDistCtx) {
            // Destroy existing chart if it exists
            if (window.statusDistributionChart && typeof window.statusDistributionChart.destroy === 'function') {
                window.statusDistributionChart.destroy();
            }
            
            window.statusDistributionChart = new Chart(statusDistCtx, {
                type: 'pie',
                data: {
                    labels: ['Hadir Tepat Waktu', 'Terlambat', 'Tidak Hadir'],
                    datasets: [{
                        data: [112, 23, 15],
                        backgroundColor: ['#27ae60', '#e74c3c', '#f39c12'],
                        borderWidth: 2,
                        borderColor: '#ffffff'
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            position: 'bottom',
                            labels: {
                                fontSize: 12,
                                padding: 10
                            }
                        }
                    }
                }
            });
            console.log('Status distribution chart created successfully');
        } else {
            console.warn('Status distribution chart canvas not found');
        }

        // Week Trend Chart
        const weekCtx = document.getElementById('weekTrendChart');
        if (weekCtx) {
            // Destroy existing chart if it exists
            if (window.weekChart && typeof window.weekChart.destroy === 'function') {
                window.weekChart.destroy();
            }
            
            window.weekChart = new Chart(weekCtx, {
                type: 'line',
                data: {
                    labels: ['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu', 'Minggu'],
                    datasets: [{
                        label: 'Keterlambatan',
                        data: [12, 18, 15, 23, 20, 8, 5],
                        borderColor: '#e74c3c',
                        backgroundColor: 'rgba(231, 76, 60, 0.1)',
                        tension: 0.4,
                        fill: true,
                        pointRadius: 5,
                        pointHoverRadius: 7
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    scales: {
                        y: {
                            beginAtZero: true
                        }
                    }
                }
            });
            console.log('Week trend chart created successfully');
        } else {
            console.warn('Week trend chart canvas not found');
        }
        
        // Populate top 5 late employees
        populateTopLateEmployees();
        
        // Populate today's attendance table
        populateTodayAttendance();
        
        console.log('All dashboard components initialized successfully');
        
    } catch (error) {
        console.error('Error initializing overview charts:', error);
        showNotification('Terjadi kesalahan saat memuat dashboard. Silakan refresh halaman.', 'error');
    }
}

function populateTopLateEmployees() {
    const container = document.getElementById('topLateEmployees');
    if (!container) return;

    // Pre-defined top 5 late employees data
    const topLateEmployees = [
        { name: "Ahmad Suryadi", department: "IT", count: 12 },
        { name: "Dewi Lestari", department: "Operations", count: 10 },
        { name: "Budi Santoso", department: "Finance", count: 8 },
        { name: "Fitri Ramadhani", department: "Finance", count: 7 },
        { name: "Dwi Yuliawan", department: "Marketing", count: 6 }
    ];

    container.innerHTML = '';
    
    // Display all 5 employees at once
    topLateEmployees.forEach((employee, index) => {
        const div = document.createElement('div');
        div.className = 'late-employee-item';
        div.innerHTML = `
            <div class="employee-info">
                <div class="employee-rank">#${index + 1}</div>
                <div class="employee-details">
                    <div class="employee-name">${employee.name}</div>
                    <div class="employee-dept">${employee.department}</div>
                </div>
            </div>
            <div class="late-count">${employee.count}x</div>
        `;
        container.appendChild(div);
    });
}

function populateTodayAttendance(filterStatus = '') {
    const tbody = document.getElementById('todayAttendanceBody');
    if (!tbody) return;

    tbody.innerHTML = '';
    
    // Get all employees data
    let todayAttendance = [...sampleData];
    
    // Apply filter if specified
    if (filterStatus) {
        todayAttendance = todayAttendance.filter(employee => employee.status === filterStatus);
    }
    
    // Limit to first 15 for display
    todayAttendance = todayAttendance.slice(0, 15);
    
    if (todayAttendance.length === 0) {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td colspan="5" style="text-align: center; padding: 20px; color: #6c757d;">
                <i class="fas fa-info-circle" style="margin-right: 8px;"></i>
                Tidak ada data untuk status yang dipilih
            </td>
        `;
        tbody.appendChild(tr);
        return;
    }
    
    todayAttendance.forEach((employee, index) => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${index + 1}</td>
            <td>${employee.name}</td>
            <td>${employee.department}</td>
            <td>${employee.checkIn === '-' ? '-' : employee.checkIn}</td>
            <td><span class="status-badge status-${employee.status}">${getStatusText(employee.status)}</span></td>
        `;
        tbody.appendChild(tr);
    });
}

function filterTodayAttendance() {
    const filterValue = document.getElementById('todayAttendanceFilter').value;
    populateTodayAttendance(filterValue);
}

function getStatusText(status) {
    switch(status) {
        case 'ontime': return 'Tepat Waktu';
        case 'late': return 'Terlambat';
        case 'absent': return 'Tidak Hadir';
        default: return status;
    }
}

// Attendance History Functions
let currentPage = 1;
const recordsPerPage = 10;
let allHistoryData = [];
let originalHistoryData = [];

function generateHistoryData() {
    // Generate more comprehensive sample data with fixed status per employee per day
    allHistoryData = [];
    
    // Create a more structured dataset
    const employees = [
        { name: "Ahmad Suryadi", department: "IT", id: "EMP001", statusPattern: ['late', 'ontime', 'late', 'ontime', 'late', 'ontime', 'absent'] },
        { name: "Siti Rahayu", department: "HR", id: "EMP002", statusPattern: ['ontime', 'ontime', 'ontime', 'late', 'ontime', 'ontime', 'ontime'] },
        { name: "Budi Santoso", department: "Finance", id: "EMP003", statusPattern: ['late', 'late', 'absent', 'late', 'ontime', 'late', 'late'] },
        { name: "Maya Indira", department: "Marketing", id: "EMP004", statusPattern: ['ontime', 'ontime', 'ontime', 'ontime', 'late', 'ontime', 'ontime'] },
        { name: "Rizki Pratama", department: "IT", id: "EMP005", statusPattern: ['absent', 'late', 'ontime', 'late', 'absent', 'ontime', 'late'] },
        { name: "Dewi Lestari", department: "Operations", id: "EMP006", statusPattern: ['late', 'late', 'late', 'ontime', 'late', 'late', 'absent'] },
        { name: "Andi Wijaya", department: "HR", id: "EMP007", statusPattern: ['ontime', 'ontime', 'late', 'ontime', 'ontime', 'ontime', 'ontime'] },
        { name: "Fitri Ramadhani", department: "Finance", id: "EMP008", statusPattern: ['late', 'ontime', 'late', 'late', 'ontime', 'late', 'ontime'] },
        { name: "Mukti Raharja", department: "IT", id: "EMP009", statusPattern: ['ontime', 'ontime', 'ontime', 'ontime', 'ontime', 'late', 'ontime'] },
        { name: "Yusri Mangunkusumo", department: "HR", id: "EMP010", statusPattern: ['late', 'ontime', 'late', 'ontime', 'late', 'ontime', 'late'] }
    ];
    
    employees.forEach((employee, empIndex) => {
        // Add entries for each employee for the past 7 days
        for (let i = 0; i < 7; i++) {
            const date = new Date();
            date.setDate(date.getDate() - i);
            
            // Use fixed status pattern instead of random
            const dayStatus = employee.statusPattern[i];
            
            allHistoryData.push({
                name: employee.name,
                department: employee.department,
                id: employee.id,
                date: date.toLocaleDateString('id-ID'),
                status: dayStatus,
                checkIn: dayStatus === 'absent' ? '-' : 
                        dayStatus === 'late' ? `08:${15 + (i * 5)}` : '07:58',
                late: dayStatus === 'late' ? `${15 + (i * 5)} menit` : '-',
                scheduled: '08:00',
                reason: dayStatus === 'late' ? 'Macet' : dayStatus === 'absent' ? 'Sakit' : '-'
            });
        }
    });
    
    // Store original data
    originalHistoryData = [...allHistoryData];
    console.log('Generated history data:', allHistoryData.length, 'records');
    console.log('Status distribution:', {
        late: allHistoryData.filter(d => d.status === 'late').length,
        ontime: allHistoryData.filter(d => d.status === 'ontime').length,
        absent: allHistoryData.filter(d => d.status === 'absent').length
    });
}

function populateAttendanceHistory() {
    const tbody = document.getElementById('attendanceHistoryTableBody');
    if (!tbody) return;

    // Generate data if not already generated
    if (allHistoryData.length === 0) {
        generateHistoryData();
    }

    tbody.innerHTML = '';
    
    // Calculate pagination
    const totalRecords = allHistoryData.length;
    const totalPages = Math.ceil(totalRecords / recordsPerPage);
    const startIndex = (currentPage - 1) * recordsPerPage;
    const endIndex = Math.min(startIndex + recordsPerPage, totalRecords);
    
    // Get records for current page
    const currentPageData = allHistoryData.slice(startIndex, endIndex);
    
    currentPageData.forEach((row, index) => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${startIndex + index + 1}</td>
            <td>${row.date}</td>
            <td>${row.name}</td>
            <td>${row.id}</td>
            <td>${row.department}</td>
            <td>${row.checkIn}</td>
            <td>${row.scheduled}</td>
            <td>${row.late}</td>
            <td><span class="status-badge status-${row.status}">${getStatusText(row.status)}</span></td>
        `;
        tbody.appendChild(tr);
    });
    
    // Update pagination info
    updatePaginationInfo(currentPage, totalPages, totalRecords);
}

function updatePaginationInfo(page, totalPages, totalRecords) {
    // Update pagination controls
    const paginationInfo = document.getElementById('paginationInfo');
    const prevBtn = document.getElementById('prevPageBtn');
    const nextBtn = document.getElementById('nextPageBtn');
    
    if (paginationInfo) {
        const startRecord = (page - 1) * recordsPerPage + 1;
        const endRecord = Math.min(page * recordsPerPage, totalRecords);
        paginationInfo.textContent = `Menampilkan ${startRecord}-${endRecord} dari ${totalRecords} data`;
    }
    
    if (prevBtn) {
        prevBtn.disabled = page <= 1;
        prevBtn.style.opacity = page <= 1 ? '0.5' : '1';
    }
    
    if (nextBtn) {
        nextBtn.disabled = page >= totalPages;
        nextBtn.style.opacity = page >= totalPages ? '0.5' : '1';
    }
}

function changePage(direction) {
    const totalPages = Math.ceil(allHistoryData.length / recordsPerPage);
    
    if (direction === 'prev' && currentPage > 1) {
        currentPage--;
    } else if (direction === 'next' && currentPage < totalPages) {
        currentPage++;
    }
    
    populateAttendanceHistory();
}

function filterAttendanceHistory() {
    console.log('=== FILTER ATTENDANCE HISTORY DEBUG ===');
    
    const statusFilter = document.getElementById('statusFilter').value;
    const departmentFilter = document.getElementById('departmentFilterHistory').value;
    const dateFilter = document.getElementById('dateFilterHistory').value;
    
    console.log('Filters applied:', {
        status: statusFilter,
        department: departmentFilter,
        date: dateFilter
    });
    
    // Start with original data
    let filteredData = [...originalHistoryData];
    console.log('Original data length:', originalHistoryData.length);
    
    // Apply status filter
    if (statusFilter) {
        filteredData = filteredData.filter(row => {
            const matches = row.status === statusFilter;
            if (!matches) {
                console.log(`Filtering out: ${row.name} - status: ${row.status} (wanted: ${statusFilter})`);
            }
            return matches;
        });
        console.log(`After status filter (${statusFilter}):`, filteredData.length);
    }
    
    // Apply department filter
    if (departmentFilter) {
        filteredData = filteredData.filter(row => {
            const matches = row.department === departmentFilter;
            return matches;
        });
        console.log(`After department filter (${departmentFilter}):`, filteredData.length);
    }
    
    // Apply date filter
    if (dateFilter) {
        filteredData = filteredData.filter(row => {
            // Convert Indonesian date format (DD/MM/YYYY) to compare with dateFilter (YYYY-MM-DD)
            const dateParts = row.date.split('/');
            if (dateParts.length === 3) {
                const rowDateFormatted = `${dateParts[2]}-${dateParts[1].padStart(2, '0')}-${dateParts[0].padStart(2, '0')}`;
                const matches = rowDateFormatted === dateFilter;
                return matches;
            }
            return false;
        });
        console.log(`After date filter (${dateFilter}):`, filteredData.length);
    }
    
    // Update allHistoryData with filtered results for display
    allHistoryData = filteredData;
    
    // Reset to first page
    currentPage = 1;
    
    console.log('Final filtered data length:', allHistoryData.length);
    console.log('Sample filtered data:', allHistoryData.slice(0, 3));
    
    // Re-populate with filtered data
    populateAttendanceHistory();
}

function clearFilters() {
    console.log('Clearing all filters...');
    
    // Reset all filter inputs
    document.getElementById('statusFilter').value = '';
    document.getElementById('departmentFilterHistory').value = '';
    document.getElementById('dateFilterHistory').value = '';
    
    // Reset data to original
    allHistoryData = [...originalHistoryData];
    currentPage = 1;
    
    // Re-populate with original data
    populateAttendanceHistory();
    
    console.log('Filters cleared, showing original data:', allHistoryData.length);
}

// Employee Recap Functions
function generateEmployeeRecap() {
    console.log('Generating attendance calendar...');
    // Generate the calendar when the page loads
    setTimeout(() => {
        generateAttendanceCalendar();
    }, 100);
}

function searchEmployee() {
    // Filter employees in calendar view
    generateAttendanceCalendar();
}

function filterRecap() {
    // Update calendar when filters change
    generateAttendanceCalendar();
}

function generateAttendanceCalendar() {
    const calendarContainer = document.getElementById('attendanceCalendar');
    const calendarTitle = document.getElementById('calendarTitle');
    
    if (!calendarContainer || !calendarTitle) return;
    
    // Get filter values
    const yearFilter = document.getElementById('yearFilter');
    const monthFilter = document.getElementById('monthFilter');
    const employeeSearch = document.getElementById('employeeNameSearch');
    
    const year = yearFilter ? parseInt(yearFilter.value) : 2025;
    const month = monthFilter ? parseInt(monthFilter.value) : 6; // July = 6
    const searchTerm = employeeSearch ? employeeSearch.value.toLowerCase() : '';
    
    // Update title
    const monthNames = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 
                       'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];
    calendarTitle.textContent = `Rekap Presensi - ${monthNames[month]} ${year}`;
    
    // Get days in month
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    
    // Sample employee data
    const employees = [
        { id: 1, name: 'Ahmad Rizki' },
        { id: 2, name: 'Siti Rahayu' },
        { id: 3, name: 'Budi Santoso' },
        { id: 4, name: 'Maya Indira' },
        { id: 5, name: 'Dian Pertiwi' },
        { id: 6, name: 'Rudi Hartono' },
        { id: 7, name: 'Andi Wijaya' },
        { id: 8, name: 'Lisa Permata' },
        { id: 9, name: 'Mukti Raharja' },
        { id: 10, name: 'Nina Sari' }
    ];
    
    // Filter employees by search term
    const filteredEmployees = employees.filter(emp => 
        emp.name.toLowerCase().includes(searchTerm)
    );
    
    // Generate calendar HTML
    let calendarHTML = '<table class="calendar-table">';
    
    // Header row
    calendarHTML += '<thead><tr>';
    calendarHTML += '<th class="employee-number">No</th>';
    calendarHTML += '<th class="employee-name">Nama Pegawai</th>';
    
    for (let day = 1; day <= daysInMonth; day++) {
        calendarHTML += `<th class="day-header">${day}</th>`;
    }
    calendarHTML += '</tr></thead>';
    
    // Employee rows
    calendarHTML += '<tbody>';
    filteredEmployees.forEach((employee, index) => {
        calendarHTML += '<tr>';
        calendarHTML += `<td class="employee-number">${index + 1}</td>`;
        calendarHTML += `<td class="employee-name">${employee.name}</td>`;
        
        // Generate attendance for each day
        for (let day = 1; day <= daysInMonth; day++) {
            const dayOfWeek = new Date(year, month, day).getDay();
            const isWeekend = dayOfWeek === 0 || dayOfWeek === 6; // Sunday = 0, Saturday = 6
            
            let dayClass = '';
            let dayText = '';
            
            if (isWeekend) {
                dayClass = 'weekend';
                dayText = 'L'; // Libur
            } else {
                // Random attendance (80% present, 20% absent)
                const isPresent = Math.random() > 0.2;
                dayClass = isPresent ? 'present' : 'absent';
                dayText = isPresent ? '✓' : '✗';
            }
            
            calendarHTML += `<td class="day-cell">
                <div class="day-status ${dayClass}">${dayText}</div>
            </td>`;
        }
        
        calendarHTML += '</tr>';
    });
    
    calendarHTML += '</tbody></table>';
    
    calendarContainer.innerHTML = calendarHTML;
}

// Visitor Functions
function initVisitorInfografis() {
    console.log('=== VISITOR INFOGRAFIS INIT START ===');
    
    // Test Chart.js availability
    if (typeof Chart === 'undefined') {
        console.error('❌ Chart.js NOT LOADED!');
        // Instead of alert, try to reload charts after a small delay
        setTimeout(() => {
            if (typeof Chart !== 'undefined') {
                initVisitorInfografis();
            }
        }, 100);
        return;
    }
    
    console.log('✅ Chart.js loaded, version:', Chart.version);
    
    // Test canvas elements
    const trendCanvas = document.getElementById('visitorTrendChart');
    const divisionCanvas = document.getElementById('visitorDivisionChart');
    
    if (!trendCanvas || !divisionCanvas) {
        console.error('❌ Canvas elements not found!');
        return;
    }
    
    console.log('✅ Canvas elements found');
    
    // Force set canvas dimensions
    trendCanvas.style.display = 'block';
    trendCanvas.style.width = '100%';
    trendCanvas.style.height = '400px';
    
    divisionCanvas.style.display = 'block';
    divisionCanvas.style.width = '100%';
    divisionCanvas.style.height = '400px';
    
    console.log('Starting chart creation...');
    
    // Create charts immediately
    generateVisitorTrendChart();
    generateVisitorDivisionChart();
}

function submitVisitorFilter() {
    const division = document.getElementById('visitorDivisionFilter').value;
    const month = document.getElementById('visitorMonthFilter').value;
    const year = document.getElementById('visitorYearFilter').value;
    
    // Update charts based on filter
    generateVisitorTrendChart(division, month, year);
    generateVisitorDivisionChart(division, month, year);
    
    showNotification('Filter berhasil diterapkan!', 'success');
}

function generateVisitorTrendChart(division = '', month = '', year = '') {
    console.log('🔄 Creating TREND chart...');
    
    const ctx = document.getElementById('visitorTrendChart');
    if (!ctx) {
        console.error('❌ Canvas not found!');
        return;
    }
    
    // Destroy existing chart safely
    if (window.visitorTrendChart && typeof window.visitorTrendChart.destroy === 'function') {
        console.log('Destroying existing trend chart');
        window.visitorTrendChart.destroy();
    }
    
    // Pre-calculated data for faster rendering
    const trendData = {
        labels: ['1 Juli', '2 Juli', '3 Juli', '4 Juli', '5 Juli', '6 Juli', '7 Juli'],
        datasets: [{
            label: 'Kunjungan Harian',
            data: [10, 15, 8, 20, 12, 25, 18],
            borderColor: '#ff0000',
            backgroundColor: 'rgba(255,0,0,0.1)',
            borderWidth: 3,
            pointRadius: 5,
            pointBackgroundColor: '#ff0000',
            tension: 0.1 // Smooth curves
        }]
    };
    
    try {
        window.visitorTrendChart = new Chart(ctx, {
            type: 'line',
            data: trendData,
            options: {
                responsive: true,
                maintainAspectRatio: false,
                animation: {
                    duration: 300 // Faster animation
                },
                interaction: {
                    intersect: false,
                    mode: 'index'
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        grid: {
                            color: 'rgba(0,0,0,0.1)'
                        }
                    },
                    x: {
                        grid: {
                            color: 'rgba(0,0,0,0.1)'
                        }
                    }
                },
                plugins: {
                    legend: {
                        display: true,
                        position: 'top'
                    }
                }
            }
        });
        
        console.log('✅ TREND chart created!');
        
    } catch (error) {
        console.error('❌ Trend chart error:', error);
    }
}

function generateVisitorDivisionChart(division = '', month = '', year = '') {
    console.log('🔄 Creating PIE chart...');
    
    const ctx = document.getElementById('visitorDivisionChart');
    if (!ctx) {
        console.error('❌ Canvas not found!');
        return;
    }
    
    // Destroy existing chart safely
    if (window.visitorDivisionChart && typeof window.visitorDivisionChart.destroy === 'function') {
        console.log('Destroying existing division chart');
        window.visitorDivisionChart.destroy();
    }
    
    // Pre-calculated data for faster rendering
    const pieData = {
        labels: [
            'Sumber Daya Manusia',
            'Pengadaan Fasilitas Umum',
            'Pengamanan K3 dan Lingkungan',
            'SBU Currency Solution',
            'SBU High Security Solution',
            'Riset dan Pengembangan'
        ],
        datasets: [{
            data: [25, 20, 15, 18, 12, 10],
            backgroundColor: [
                '#3498db',
                '#e74c3c',
                '#2ecc71',
                '#f39c12',
                '#9b59b6',
                '#f1c40f'
            ],
            borderWidth: 2,
            borderColor: '#ffffff',
            hoverBorderWidth: 3,
            hoverBorderColor: '#ffffff'
        }]
    };
    
    try {
        window.visitorDivisionChart = new Chart(ctx, {
            type: 'pie',
            data: pieData,
            options: {
                responsive: true,
                maintainAspectRatio: false,
                animation: {
                    duration: 300 // Faster animation
                },
                plugins: {
                    legend: {
                        position: 'right',
                        labels: {
                            boxWidth: 15,
                            padding: 10,
                            font: {
                                size: 11
                            }
                        }
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                const total = context.dataset.data.reduce((a, b) => a + b, 0);
                                const percentage = ((context.parsed / total) * 100).toFixed(1);
                                return `${context.label}: ${context.parsed} (${percentage}%)`;
                            }
                        }
                    }
                }
            }
        });
        
        console.log('✅ PIE chart created!');
        
    } catch (error) {
        console.error('❌ Division chart error:', error);
    }
}

function populateVisitorRekapitulasi() {
    const tbody = document.getElementById('visitorTableBody');
    if (!tbody) return;

    // Initialize pagination variables for visitors if not already set
    if (!window.visitorCurrentPage) {
        window.visitorCurrentPage = 1;
        window.visitorRecordsPerPage = 10;
        window.allVisitorData = [...visitorData];
    }

    tbody.innerHTML = '';
    
    // Calculate pagination
    const totalRecords = window.allVisitorData.length;
    const totalPages = Math.ceil(totalRecords / window.visitorRecordsPerPage);
    const startIndex = (window.visitorCurrentPage - 1) * window.visitorRecordsPerPage;
    const endIndex = Math.min(startIndex + window.visitorRecordsPerPage, totalRecords);
    
    // Get records for current page
    const currentPageData = window.allVisitorData.slice(startIndex, endIndex);
    
    currentPageData.forEach((visitor, index) => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${startIndex + index + 1}</td>
            <td>${visitor.name}</td>
            <td>${visitor.nik}</td>
            <td>${getDivisionName(visitor.division)}</td>
            <td>${visitor.date}</td>
            <td>${visitor.timeIn}</td>
            <td>${visitor.timeOut}</td>
            <td><span class="status-badge status-${visitor.status}">${getVisitorStatusText(visitor.status)}</span></td>
        `;
        tbody.appendChild(tr);
    });
    
    // Update pagination info
    updateVisitorPaginationInfo(window.visitorCurrentPage, totalPages, totalRecords);
}

function updateVisitorPaginationInfo(page, totalPages, totalRecords) {
    // Update pagination controls
    const paginationInfo = document.getElementById('visitorPaginationInfo');
    const prevBtn = document.getElementById('visitorPrevPageBtn');
    const nextBtn = document.getElementById('visitorNextPageBtn');
    
    if (paginationInfo) {
        const startRecord = (page - 1) * window.visitorRecordsPerPage + 1;
        const endRecord = Math.min(page * window.visitorRecordsPerPage, totalRecords);
        paginationInfo.textContent = `Menampilkan ${startRecord}-${endRecord} dari ${totalRecords} data`;
    }
    
    if (prevBtn) {
        prevBtn.disabled = page <= 1;
        prevBtn.style.opacity = page <= 1 ? '0.5' : '1';
    }
    
    if (nextBtn) {
        nextBtn.disabled = page >= totalPages;
        nextBtn.style.opacity = page >= totalPages ? '0.5' : '1';
    }
}

function changeVisitorPage(direction) {
    const totalPages = Math.ceil(window.allVisitorData.length / window.visitorRecordsPerPage);
    
    if (direction === 'prev' && window.visitorCurrentPage > 1) {
        window.visitorCurrentPage--;
    } else if (direction === 'next' && window.visitorCurrentPage < totalPages) {
        window.visitorCurrentPage++;
    }
    
    populateVisitorRekapitulasi();
}

function submitVisitorRekapFilter() {
    const division = document.getElementById('visitorRekapDivisionFilter').value;
    const dateFilter = document.getElementById('visitorRekapDateFilter').value;
    
    // Filter visitor data based on criteria
    let filteredData = [...visitorData];
    
    if (division) {
        filteredData = filteredData.filter(visitor => visitor.division === division);
    }
    
    if (dateFilter) {
        // Convert date to dd/mm/yyyy format for comparison
        const filterDate = new Date(dateFilter);
        const filterDateString = `${filterDate.getDate().toString().padStart(2, '0')}/${(filterDate.getMonth() + 1).toString().padStart(2, '0')}/${filterDate.getFullYear()}`;
        
        filteredData = filteredData.filter(visitor => visitor.date === filterDateString);
    }
    
    // Update global visitor data
    window.allVisitorData = filteredData;
    window.visitorCurrentPage = 1;
    
    // Refresh table
    populateVisitorRekapitulasi();
    
    showNotification('Filter visitor berhasil diterapkan!', 'success');
}

function clearVisitorFilters() {
    // Clear all filter inputs
    document.getElementById('visitorRekapDivisionFilter').value = '';
    document.getElementById('visitorRekapDateFilter').value = '';
    
    // Reset to original data
    window.allVisitorData = [...visitorData];
    window.visitorCurrentPage = 1;
    
    // Refresh table
    populateVisitorRekapitulasi();
    
    showNotification('Filter visitor berhasil dihapus!', 'info');
}

function getDivisionName(divisionCode) {
    const divisions = {
        'sumber-daya-manusia': 'Sumber Daya Manusia',
        'pengadaan-fasilitas': 'Pengadaan Fasilitas Umum',
        'pengamanan-k3': 'Pengamanan K3 dan Lingkungan',
        'sbu-currency': 'SBU Currency Solution',
        'sbu-security': 'SBU High Security Solution',
        'riset-pengembangan': 'Riset dan Pengembangan'
    };
    return divisions[divisionCode] || divisionCode;
}

function getVisitorStatusText(status) {
    switch(status) {
        case 'sudah-keluar': return 'Sudah Keluar';
        case 'belum-keluar': return 'Belum Keluar';
        default: return status;
    }
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    console.log('Page loaded, checking login state...');
    checkLoginState();
});

// Check login state on page load
window.addEventListener('load', function() {
    console.log('Window loaded, final check...');
    checkLoginState();
});
