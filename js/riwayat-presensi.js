// Riwayat Presensi page JavaScript functionality

// Pagination variables
let currentPage = 1;
const recordsPerPage = 10;
let allHistoryData = [];
let originalHistoryData = [];

// Initialize riwayat presensi when page loads
document.addEventListener('DOMContentLoaded', function() {
    console.log('Riwayat Presensi page loaded');
    
    // Initialize sidebar state (open by default on desktop)
    if (window.innerWidth <= 768) {
        sidebarOpen = false;
        closeSidebarMobile();
    } else {
        sidebarOpen = true;
        openSidebarDesktop();
    }
    
    // Initialize attendance history data and display
    populateAttendanceHistory();
    
    console.log('✅ Riwayat Presensi initialization complete');
});

function generateHistoryData() {
    // Generate more comprehensive sample data
    allHistoryData = [];
    sampleData.forEach((employee, index) => {
        // Add multiple entries for each employee for the past week
        for (let i = 0; i < 7; i++) {
            const date = new Date();
            date.setDate(date.getDate() - i);
            
            // Random status for demonstration
            const statuses = ['ontime', 'late', 'absent'];
            const randomStatus = i === 0 ? employee.status : statuses[Math.floor(Math.random() * statuses.length)];
            
            allHistoryData.push({
                ...employee,
                date: date.toLocaleDateString('id-ID'),
                status: randomStatus,
                checkIn: randomStatus === 'absent' ? '-' : 
                        randomStatus === 'late' ? `08:${15 + Math.floor(Math.random() * 30)}` : '07:58',
                late: randomStatus === 'late' ? `${15 + Math.floor(Math.random() * 30)} menit` : '-'
            });
        }
    });
    
    // Store original data
    originalHistoryData = [...allHistoryData];
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
    const statusFilter = document.getElementById('statusFilter').value;
    const departmentFilter = document.getElementById('departmentFilterHistory').value;
    const dateFilter = document.getElementById('dateFilterHistory').value;
    
    // Start with original data, don't modify it
    let filteredData = [...originalHistoryData];
    
    // Apply status filter
    if (statusFilter) {
        filteredData = filteredData.filter(row => row.status === statusFilter);
    }
    
    // Apply department filter
    if (departmentFilter) {
        filteredData = filteredData.filter(row => row.department === departmentFilter);
    }
    
    // Apply date filter
    if (dateFilter) {
        filteredData = filteredData.filter(row => {
            const rowDate = new Date(row.date.split('/').reverse().join('-'));
            const filterDate = new Date(dateFilter);
            return rowDate.toDateString() === filterDate.toDateString();
        });
    }
    
    // If no filters are applied, show all original data
    if (!statusFilter && !departmentFilter && !dateFilter) {
        filteredData = [...originalHistoryData];
    }
    
    // Update allHistoryData with filtered results for display
    allHistoryData = filteredData;
    
    // Reset to first page
    currentPage = 1;
    
    // Re-populate with filtered data
    populateAttendanceHistory();
    
    showNotification('Filter berhasil diterapkan!', 'success');
}

function getStatusText(status) {
    switch(status) {
        case 'ontime': return 'Tepat Waktu';
        case 'late': return 'Terlambat';
        case 'absent': return 'Tidak Hadir';
        default: return status;
    }
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

// Add CSS styles for attendance history specific elements
const attendanceHistoryStyle = document.createElement('style');
attendanceHistoryStyle.textContent = `
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
`;

// Append attendance history styles to head
document.head.appendChild(attendanceHistoryStyle);
