const deleteButton = document.querySelector('.delete-calendar-button');
deleteButton.addEventListener('click', () => {
    if (!currentCalendar) return alert("Select a calendar first");

    if (!confirm(`Are you sure you want to delete "${currentCalendar}"?`)) return;

    delete calendars[currentCalendar];
    currentCalendar = null;

    updateCalendarView();
    updateCalendarName();     
    updateDropdownList(); 
});
