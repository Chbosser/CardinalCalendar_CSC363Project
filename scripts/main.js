'use strict'

const input = document.querySelector('.chat-text-box');
const messageContainer = document.querySelector('.messages');
const template = document.getElementById('course-template');
const r = document.querySelector(':root');

input.addEventListener('keydown', async (event) => {
    if (event.key === "Enter") {
        if (input.value === '') {
            console.log('user input empty');
        }
        else {
            const userInput = input.value;
            
            const newUserMessage = document.createElement('div');
            newUserMessage.textContent = userInput;
            newUserMessage.classList.add('message');
            newUserMessage.classList.add('user');
            messageContainer.appendChild(newUserMessage);

            input.value = ' ';
            newUserMessage.scrollIntoView({'behavior': 'smooth'});
            const formData = new FormData();
            formData.append('chat-input', userInput);

            const response = await fetch('http://127.0.0.1:8000/cardinalcalendar', {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            })

            const data = await response.json(); // data is a list of objects in a list
            if (response.status === 200) {
                const requiredCourses = JSON.parse(data[0]); // gets the first list of objects (required courses)
                const otherCourses = JSON.parse(data[1]); // gets the second list of objects (courses != required courses)
                getRequiredCourses(requiredCourses);
                getOtherCourses(otherCourses);



            }
        }

    }
})
function getRequiredCourses(data) {

    const classTemplate = document.getElementById('class-div-template');
    const courseColors = [
    "#A7C7E7", // light periwinkle
    "#B8E1C6", // mint green
    "#FFD6E0", // baby pink
    "#D9C3FF", // lavender
    "#FFF6A7", // soft yellow
    "#FFE4C4", // peach cream
    "#B7E0FF"  // sky blue
    ];

    data.forEach(course => {
        let randomNumber = Math.floor(Math.random() * (courseColors.length-1 - 0 + 1)) + 0;
        
        const monday = document.querySelector('.mon');
        const tuesday = document.querySelector('.tue');
        const wednesday = document.querySelector('.wed');
        const thursday = document.querySelector('.thu');
        const friday = document.querySelector('.fri');

        const days = course.class_days.split(" ");

        days.forEach(day => {

            const classClone = classTemplate.content.cloneNode(true);
            const classRoot = classClone.querySelector('.class-div');

            classRoot.querySelector('.class-ID').textContent = course.crs_code;
            classRoot.querySelector('.class-location').textContent = course.class_instructor;
            classRoot.querySelector('.class-time').textContent = course.class_time;
            classRoot.style.setProperty('--class-div-color', `${courseColors[randomNumber]}`)

            if (course.class_time === "9:40AM-10:55AM") {
                setRootCSSVariables(classRoot, 150, 125)
            }
            else if (course.class_time === "9:10AM-10:00AM") {
                setRootCSSVariables(classRoot, 75, 93);
            }
            else if (course.class_time === "9:40AM-12:10PM") {
                setRootCSSVariables(classRoot, 150, 258);
            }
            else if (course.class_time === "10:10AM-11:00AM") {
                setRootCSSVariables(classRoot, 188, 93);
            }
            else if (course.class_time === "11:10AM-12:25PM") {
                setRootCSSVariables(classRoot, 300, 145);
            }
            else if (course.class_time === "11:10AM-12:00PM") {
                setRootCSSVariables(classRoot, 300, 93);
            }
            else if (course.class_time === "11:10AM-1:40PM") {
                setRootCSSVariables(classRoot, 300, 290);
            }
            else if (course.class_time === "12:40PM-1:55PM") {
                setRootCSSVariables(classRoot, 480,130);
            }
            else if (course.class_time === "12:40PM-3:10PM") {
                setRootCSSVariables(classRoot, 480, 255);
            }
            else if (course.class_time === "12:40PM-1:30PM") {
                setRootCSSVariables(classRoot, 480, 75);
            }
            else if (course.class_time === "2:10PM-3:25PM") {
                setRootCSSVariables(classRoot, 635, 145);
            }
            else if (course.class_time === "2:10PM-4:40PM") {
                setRootCSSVariables(classRoot, 635, 295);
            }
            else if (course.class_time === "2:10PM-3:00PM") {
                setRootCSSVariables(classRoot, 635, 92);
            }
            else if (course.class_time === "3:40PM-4:55PM") {
                setRootCSSVariables(classRoot, 820, 123);
            }
            else if (course.class_time === "3:40PM-6:10PM") {
                setRootCSSVariables(classRoot, 820, 265);
            }
            else if (course.class_time === "5:10PM-7:40PM") {
                setRootCSSVariables(classRoot, 965,290);
            }
            else if (course.class_time === "5:10PM-6:25PM") {
                setRootCSSVariables(classRoot, 965, 145);
            }
            else if (course.class_time === "6:10PM-8:40PM") {
                setRootCSSVariables(classRoot, 1080, 290);
            }
            else if (course.class_time === "6:40PM-9:10PM") {
                setRootCSSVariables(classRoot, 1150, 265);
            }

            const closeButton = classRoot.querySelector('.close-class-div');
            closeButton.addEventListener('click', () => {
                classRoot.classList.add('delete');
            })

            if (day === "Mon") {
                monday.appendChild(classClone);
            } else if (day === "Tues") {
                tuesday.appendChild(classClone);
            } else if (day === "Wed") {
                wednesday.appendChild(classClone);
            } else if (day === "Thurs") {
                thursday.appendChild(classClone);
            } else if (day === "Fri") {
                friday.appendChild(classClone);
            }

        })
    })
}


function getOtherCourses(data) {

    data.forEach(course => {
        const clone = template.content.cloneNode(true);
        const root = clone.querySelector('.course');

        const title = clone.querySelector('.course-title-div');
        title.insertBefore(document.createTextNode(course.crs_code + "-"), title.firstElementChild);

        clone.querySelector('.section').textContent = course.class_section_number;

        clone.querySelector('.course-description').textContent = course.crs_name;
        clone.querySelector('.course-semester span').textContent = course.term;

        if (course.class_days === "Mon Wed Fri") {
            clone.querySelector('.course-time span').textContent = "MWF " + course.class_time;
        }
        else if (course.class_days === "Mon Wed") {
            clone.querySelector('.course-time span').textContent = "MW "  + course.class_time;
        }
        else if (course.class_days === "Tues Thurs") {
            clone.querySelector('.course-time span').textContent = "TuTh " + course.class_time;
        }
        else if (course.class_days === "Mon") {
            clone.querySelector('.course-time span').textContent = "M " + course.class_time;
        }
        else if (course.class_days === "Tues") {
            clone.querySelector('.course-time span').textContent = "Tu " + course.class_time;
        }
        else if (course.class_days === "Wed") {
            clone.querySelector('.course-time span').textContent = "W " + course.class_time;
        }
        else if (course.class_days === "Thur") {
            clone.querySelector('.course-time span').textContent = "Th " + course.class_time;
        }
        else if (course.class_days === "Fri") {
            clone.querySelector('.course-time span').textContent = "F " + course.class_time;
        }
        else {
            clone.querySelector('.course-time span').textContent = course.class_time;
        }
        
        const instructor = clone.querySelector('.course-instructor');
        instructor.appendChild(document.createTextNode(course.class_instructor));



        const courseButton = clone.querySelector('.course-button');
        courseButton.addEventListener('click', () => {
            const sinlgeCourse = []
            sinlgeCourse.push(course)
            getRequiredCourses(sinlgeCourse);

        })

        messageContainer.appendChild(clone);

        root.scrollIntoView({ behavior: 'smooth', block: 'end' });
    });
}

function setRootCSSVariables(element, position, height) {
    element.style.setProperty('--class-div-position', `${position}px`);
    element.style.setProperty('--class-div-height', `${height}px`);
}

function setting() {
   var bodyElement = document.body;
   bodyElement.classList.toggle("dark-mode");
}

function toggleMenu() {
    const menu = document.getElementById('settings-menu');
    if (menu.style.display === 'block') {
        menu.style.display = 'none';  // Hide
    } else {
        menu.style.display = 'block'; // Show
    }
}


function updateCalendarView() {
    const container = document.querySelector('.block'); // your main calendar container
    container.innerHTML = ""; // clear previous events

    if (!currentCalendar) return;

    const calendarEvents = calendars[currentCalendar]; // get current calendar events

    for (let day in calendarEvents) {
        const classTemplate = document.getElementById('class-div-template');
        const classClone = classTemplate.content.cloneNode(true);
        const classRoot = classClone.querySelector('.class-div');

        const eventData = calendarEvents[day];
        classRoot.querySelector('.class-ID').textContent = eventData.title || '';
        classRoot.querySelector('.class-location').textContent = eventData.location || '';
        classRoot.querySelector('.class-time').textContent = eventData.time || '';

        container.appendChild(classClone);
    }
}

function updateCalendarName() {
    const nameElement = document.querySelector('.calendar-name');
    if (currentCalendar) {
        nameElement.textContent = currentCalendar;
    } else {
        nameElement.textContent = "Select";
    }
}

function updateDropdownList() {
    dropdownList.innerHTML = ""; 

    for (let name in calendars) {
        const item = document.createElement('div');
        item.classList.add('calendar-dropdown-item');
        item.textContent = name;

        item.addEventListener('click', () => {
            currentCalendar = name;
            updateCalendarView();
            updateCalendarName();
            dropdownList.style.display = 'none';
        });

        dropdownList.appendChild(item);
    }
}


function addEventToCurrentCalendar(day, eventData) {
    if (!currentCalendar) return;
    calendars[currentCalendar][day] = eventData;
    updateCalendarView();
}

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
    if (mode === "confirm") {
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
        closePopup();
    };

    // Cancel button
    cancelBtn.onclick = closePopup;

    function closePopup() {
        popup.style.display = "none";
        overlay.style.display = "none";
    }
}
