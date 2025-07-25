// Rekap Presensi page JavaScript functionality

// Variables for calendar
let currentMonth = new Date().getMonth();
let currentYear = new Date().getFullYear();

// Initialize rekap presensi when page loads
document.addEventListener('DOMContentLoaded', function() {
    console.log('Rekap Presensi page loaded');
    
    // Initialize sidebar state (open by default on desktop)
    if (window.innerWidth <= 768) {
        sidebarOpen = false;
        closeSidebarMobile();
    } else {
        sidebarOpen = true;
        openSidebarDesktop();
    }
    
    // Generate the attendance calendar
    generateEmployeeRecap();
    
    console.log('✅ Rekap Presensi initialization complete');
});

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

// Add CSS styles for calendar specific elements
const calendarStyle = document.createElement('style');
calendarStyle.textContent = `
/* Calendar Container Styles */
.calendar-container {
    background: white;
    border-radius: 12px;
    padding: 20px;
    box-shadow: 0 2px 10px rgba(0,0,0,0.1);
    margin-top: 20px;
}

.calendar-header {
    text-align: center;
    margin-bottom: 20px;
    padding-bottom: 15px;
    border-bottom: 2px solid #007bff;
}

.calendar-header h3 {
    color: #007bff;
    font-size: 20px;
    margin: 0;
    font-weight: 600;
}

/* Calendar Table Styles */
.calendar-table {
    width: 100%;
    border-collapse: collapse;
    font-size: 12px;
    overflow-x: auto;
}

.calendar-table th {
    background: #f8f9fa;
    color: #495057;
    font-weight: 600;
    padding: 8px 4px;
    text-align: center;
    border: 1px solid #dee2e6;
    position: sticky;
    top: 0;
    z-index: 10;
}

.calendar-table .employee-number {
    width: 40px;
    min-width: 40px;
}

.calendar-table .employee-name {
    width: 150px;
    min-width: 150px;
    text-align: left;
    padding-left: 10px;
}

.calendar-table .day-header {
    width: 30px;
    min-width: 30px;
}

.calendar-table td {
    border: 1px solid #dee2e6;
    padding: 4px;
    text-align: center;
    vertical-align: middle;
}

.calendar-table .employee-name {
    text-align: left;
    padding-left: 10px;
    font-weight: 500;
}

.calendar-table .employee-number {
    font-weight: 600;
    background: #f8f9fa;
}

/* Day Status Styles */
.day-cell {
    padding: 2px;
}

.day-status {
    width: 24px;
    height: 24px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto;
    font-weight: 600;
    font-size: 11px;
}

.day-status.present {
    background: #d4edda;
    color: #155724;
}

.day-status.absent {
    background: #f8d7da;
    color: #721c24;
}

.day-status.weekend {
    background: #fff3cd;
    color: #856404;
}

/* Calendar Legend Styles */
.calendar-legend {
    display: flex;
    justify-content: center;
    gap: 20px;
    margin-top: 20px;
    padding-top: 15px;
    border-top: 1px solid #dee2e6;
}

.legend-item {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 14px;
    font-weight: 500;
}

.legend-color {
    width: 16px;
    height: 16px;
    border-radius: 50%;
}

.legend-color.present {
    background: #d4edda;
}

.legend-color.absent {
    background: #f8d7da;
}

.legend-color.weekend {
    background: #fff3cd;
}

/* Responsive Design */
@media (max-width: 768px) {
    .calendar-table {
        font-size: 10px;
    }
    
    .calendar-table .employee-name {
        width: 120px;
        min-width: 120px;
    }
    
    .calendar-table .day-header {
        width: 25px;
        min-width: 25px;
    }
    
    .day-status {
        width: 20px;
        height: 20px;
        font-size: 10px;
    }
    
    .calendar-legend {
        flex-wrap: wrap;
        gap: 15px;
    }
}
`;

// Append calendar styles to head
document.head.appendChild(calendarStyle);
