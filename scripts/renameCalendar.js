const renameButton = document.querySelector('.edit-calendar-button');
renameButton.addEventListener('click', () => {
    if (!currentCalendar) return alert("Select a calendar first");

    // Open your custom popup instead of prompt()
    openPopup(
        (newName) => {
            if (!newName || calendars[newName]) {
                alert("Invalid or duplicate name");
                return;
            }

            // Rename in the object
            calendars[newName] = calendars[currentCalendar];
            delete calendars[currentCalendar];
            currentCalendar = newName;

            updateCalendarView();
            updateCalendarName();
            updateDropdownList();
        },

        // Prefill input field with current name
        currentCalendar,

        "Rename Calendar"
    );
});

