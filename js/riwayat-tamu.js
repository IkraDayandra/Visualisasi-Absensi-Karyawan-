// Riwayat Tamu page JavaScript functionality

// Initialize riwayat tamu when page loads
document.addEventListener('DOMContentLoaded', function() {
    console.log('Riwayat Tamu page loaded');
    
    // Initialize sidebar state (open by default on desktop)
    if (window.innerWidth <= 768) {
        sidebarOpen = false;
        closeSidebarMobile();
    } else {
        sidebarOpen = true;
        openSidebarDesktop();
    }
    
    // Check URL parameters to determine which view to show
    const urlParams = new URLSearchParams(window.location.search);
    const view = urlParams.get('view') || 'infografis';
    
    // Show the appropriate view
    showVisitorView(view);
    
    console.log('✅ Riwayat Tamu initialization complete');
});

// Function to switch between infografis and rekapitulasi views
function showVisitorView(view) {
    // Hide all pages
    document.getElementById('visitor-infografis-page').classList.remove('active');
    document.getElementById('visitor-rekapitulasi-page').classList.remove('active');
    
    // Remove active class from submenu buttons
    document.getElementById('infografis-btn').classList.remove('active');
    document.getElementById('rekapitulasi-btn').classList.remove('active');
    
    // Show selected view
    if (view === 'infografis') {
        document.getElementById('visitor-infografis-page').classList.add('active');
        document.getElementById('infografis-btn').classList.add('active');
        initVisitorInfografis();
    } else if (view === 'rekapitulasi') {
        document.getElementById('visitor-rekapitulasi-page').classList.add('active');
        document.getElementById('rekapitulasi-btn').classList.add('active');
        populateVisitorRekapitulasi();
    }
    
    // Close sidebar on mobile after selection
    closeSidebarOnMobile();
}

// Visitor Infografis Functions
function initVisitorInfografis() {
    console.log('=== VISITOR INFOGRAFIS INIT START ===');
    
    // Wait for Chart.js to load
    setTimeout(() => {
        // Test Chart.js availability
        if (typeof Chart === 'undefined') {
            console.error('❌ Chart.js NOT LOADED!');
            showNotification('Chart.js tidak loaded. Cek koneksi internet atau refresh halaman.', 'error');
            return;
        }
        
        console.log('✅ Chart.js loaded, version:', Chart.version);
        
        // Test canvas elements
        const trendCanvas = document.getElementById('visitorTrendChart');
        const divisionCanvas = document.getElementById('visitorDivisionChart');
        
        if (!trendCanvas || !divisionCanvas) {
            console.error('❌ Canvas elements not found!');
            showNotification('Canvas elements tidak ditemukan.', 'error');
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
        
        // Create charts
        generateVisitorTrendChart();
        generateVisitorDivisionChart();
        
    }, 1000); // Wait 1 second
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
    
    // Generate date labels for current month
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth();
    const currentYear = currentDate.getFullYear();
    
    const monthNames = [
        'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
        'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
    ];
    
    const dateLabels = [];
    for (let i = 1; i <= 7; i++) {
        dateLabels.push(`${i} ${monthNames[currentMonth]}`);
    }
    
    try {
        window.visitorTrendChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: dateLabels,
                datasets: [{
                    label: 'Kunjungan Harian',
                    data: [10, 15, 8, 20, 12, 25, 18],
                    borderColor: '#3498db',
                    backgroundColor: 'rgba(52, 152, 219, 0.1)',
                    borderWidth: 3,
                    pointRadius: 5,
                    pointBackgroundColor: '#3498db',
                    tension: 0.4,
                    fill: true
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
    
    try {
        window.visitorDivisionChart = new Chart(ctx, {
            type: 'pie',
            data: {
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
                    borderColor: '#ffffff'
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'right'
                    }
                }
            }
        });
        
        console.log('✅ PIE chart created!');
        
    } catch (error) {
        console.error('❌ Division chart error:', error);
    }
}

// Visitor Rekapitulasi Functions
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
    const month = document.getElementById('visitorRekapMonthFilter').value;
    const year = document.getElementById('visitorRekapYearFilter').value;
    
    // Filter visitor data based on criteria
    let filteredData = [...visitorData];
    
    if (division) {
        filteredData = filteredData.filter(visitor => visitor.division === division);
    }
    
    // Update global visitor data
    window.allVisitorData = filteredData;
    window.visitorCurrentPage = 1;
    
    // Refresh table
    populateVisitorRekapitulasi();
    
    showNotification('Filter visitor berhasil diterapkan!', 'success');
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

// Add CSS styles for visitor specific elements
const visitorStyle = document.createElement('style');
visitorStyle.textContent = `
/* Visitor status badge styles */
.status-badge.status-sudah-keluar {
    background: #d4edda;
    color: #155724;
}

.status-badge.status-belum-keluar {
    background: #fff3cd;
    color: #856404;
}

/* Chart grid for visitor infografis */
.chart-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;
    margin-top: 30px;
}

@media (max-width: 768px) {
    .chart-grid {
        grid-template-columns: 1fr;
    }
}
`;

// Append visitor styles to head
document.head.appendChild(visitorStyle);
