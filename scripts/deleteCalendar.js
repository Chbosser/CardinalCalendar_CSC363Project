function openPopup(onConfirm, defaultValue = "", title = "Enter Calendar Name", mode = "input") {
    const popup = document.getElementById("popup");
    const overlay = document.getElementById("popup-overlay");
    const confirmBtn = document.getElementById("popup-confirm");
    const cancelBtn = document.getElementById("popup-cancel");
    const inputWrapper = document.getElementById("popup-input-wrapper");
    const input = document.getElementById("popup-input");
    const popupTitle = document.getElementById("popup-title");

    // Set the popup title
    popupTitle.textContent = title;

    // Show popup and overlay
    popup.style.display = "block";
    overlay.style.display = "block";

    // Show or hide input depending on mode
    if (mode === "Delete") {
        inputWrapper.style.display = "none";  // hide input for delete
    } else {
        inputWrapper.style.display = "block"; // show input for create/rename
        input.value = defaultValue;
        input.focus();
    }

    // Confirm button
    confirmBtn.onclick = () => {
        const value = mode === "input" ? input.value.trim() : true;
        onConfirm(value);
        const calendars = document.querySelectorAll('.class-div');
        calendars.forEach(classDiv => {
        classDiv.classList.add('delete');
        });
        closePopup();
    };

    // Cancel button
    cancelBtn.onclick = closePopup;

    function closePopup() {
        popup.style.display = "none";
        overlay.style.display = "none";
    }
}

const deleteButton = document.querySelector('.delete-calendar-button');

deleteButton.addEventListener('click', () => {

    openPopup(
        () => {
            calendarName.textContent = "Untitled";            
            currentCalendar = null;

            updateCalendarView();
            updateCalendarName();

        },
        "",                // defaultValue not needed
        "Are you sure?",   // popup title
        "Delete"          // mode = "confirm" hides input

        
    );
});

