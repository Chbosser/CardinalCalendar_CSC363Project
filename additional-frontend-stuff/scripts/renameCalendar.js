const renameButton = document.querySelector('.edit-calendar-button');
renameButton.addEventListener('click', () => {
    if (!currentCalendar) return alert("Select a calendar first");

    const newName = prompt("Enter new calendar name:", currentCalendar);
    if (!newName || calendars[newName]) return alert("Invalid or duplicate name");

    // Rename in the object
    calendars[newName] = calendars[currentCalendar];
    delete calendars[currentCalendar];
    currentCalendar = newName;

    updateCalendarView();
    updateCalendarName();      
    updateDropdownList(); 
});
