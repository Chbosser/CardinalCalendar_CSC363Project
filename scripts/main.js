'use strict'

const input = document.querySelector('.chat-text-box');
const messageContainer = document.querySelector('.messages');
const template = document.getElementById('course-template');

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

                getOtherCourses(otherCourses);



            }
        }

    }
})
function getRequiredCourses(data) {

}

function getOtherCourses(data) {

    data.forEach(course => {
        const clone = template.content.cloneNode(true);
        const root = clone.querySelector('.course');

        const title = clone.querySelector('.course-title');
        title.insertBefore(document.createTextNode(course.crs_code + " "), title.firstElementChild);

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

        messageContainer.appendChild(clone);

        root.scrollIntoView({ behavior: 'smooth', block: 'end' });
    });
}