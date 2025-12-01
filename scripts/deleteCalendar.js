const deleteButton = document.querySelector('.delete-calendar-button');

deleteButton.addEventListener('click', () => {
    if (!currentCalendar) return alert("Select a calendar first");

    openPopup(
        () => {
            delete calendars[currentCalendar];
            currentCalendar = null;

            updateCalendarView();
            updateCalendarName();
            updateDropdownList();
        },
        "",                // defaultValue not needed
        "Are you sure?",   // popup title
        "confirm"          // mode = "confirm" hides input
    );
});

