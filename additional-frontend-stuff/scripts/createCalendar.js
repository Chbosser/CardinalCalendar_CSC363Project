const calendars = {}; // Stores calendar data
let currentCalendar = null;

const createButton = document.querySelector('.create-calendar-button');
createButton.addEventListener('click', () => {
    const name = prompt("Enter calendar name:");

    if (!name) return;

    if (calendars[name]) {
        alert("Calendar already exists!");
        return;
    }

    calendars[name] = {}; // empty object for events
    currentCalendar = name;

    updateCalendarView();
    updateCalendarName(); 
    updateDropdownList(); 
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
