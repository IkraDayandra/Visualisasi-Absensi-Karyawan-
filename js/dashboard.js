// Dashboard page JavaScript functionality

// Initialize dashboard when page loads
document.addEventListener('DOMContentLoaded', function() {
    console.log('Dashboard page loaded');
    
    // Initialize sidebar state (open by default on desktop)
    if (window.innerWidth <= 768) {
        sidebarOpen = false;
        closeSidebarMobile();
    } else {
        sidebarOpen = true;
        openSidebarDesktop();
    }
    
    // Initialize dashboard charts and content
    initOverviewCharts();
    
    console.log('✅ Dashboard initialization complete');
});

// Overview Dashboard Charts
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

    // Calculate late frequency from sample data
    const lateFrequency = {};
    sampleData.forEach(employee => {
        if (employee.status === 'late') {
            const id = employee.id;
            if (!lateFrequency[id]) {
                lateFrequency[id] = {
                    name: employee.name,
                    department: employee.department,
                    count: 0
                };
            }
            lateFrequency[id].count += Math.floor(Math.random() * 5) + 1; // Random count for demo
        }
    });

    // Convert to array and sort by count
    const lateEmployees = Object.values(lateFrequency)
        .sort((a, b) => b.count - a.count)
        .slice(0, 5); // Top 5

    container.innerHTML = '';
    
    if (lateEmployees.length === 0) {
        container.innerHTML = `
            <div style="text-align: center; padding: 50px; color: #27ae60;">
                <i class="fas fa-check-circle" style="font-size: 48px; margin-bottom: 15px;"></i>
                <p>Tidak ada karyawan yang sering terlambat!</p>
            </div>
        `;
        return;
    }
    
    lateEmployees.forEach((employee, index) => {
        const div = document.createElement('div');
        div.className = 'late-employee-item';
        div.innerHTML = `
            <div class="employee-info">
                <div class="employee-name">${index + 1}. ${employee.name}</div>
                <div class="employee-dept">${employee.department}</div>
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

// Add CSS styles for dashboard specific elements
const dashboardStyle = document.createElement('style');
dashboardStyle.textContent = `
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
`;

// Append dashboard styles to head
document.head.appendChild(dashboardStyle);
