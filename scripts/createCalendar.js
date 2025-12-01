const calendars = {}; // Stores calendar data
let currentCalendar = null;

const createButton = document.querySelector('.create-calendar-button');

createButton.addEventListener('click', () => {
    // Open the custom popup (instead of prompt)
    openPopup((name) => {

        if (!name || !name.trim()) return;

        if (calendars[name]) {
            alert("Calendar already exists!");
            return;
        }

        // Create new calendar
        calendars[name] = {}; 
        currentCalendar = name;

        // Update UI
        updateCalendarView();
        updateCalendarName(); 
        updateDropdownList(); 
    });
});





const dropdownButton = document.querySelector('.calendar-dropdown-button');
const dropdownList = document.querySelector('.calendar-dropdown-list');

// Toggle dropdown visibility when button is clicked
dropdownButton.addEventListener('click', () => {
    if (dropdownList.style.display === 'block') {
        dropdownList.style.display = 'none';
    } else {
        dropdownList.style.display = 'block';
    }
});
