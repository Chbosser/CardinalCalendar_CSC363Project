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
// function getRequiredCourses(data) {

//     data.forEach(course => {
//         const classTemplate = document.getElementById('class-div-template');
//         const classClone = classTemplate.content.cloneNode(true);
//         const classRoot = document.querySelector('.class-div');
//         const monday = document.querySelector('.mon');
//         const tuesday = document.querySelector('.tue');
//         const wednesday = document.querySelector('.wed');
//         const thursday = document.querySelector('.thu');
//         const friday = document.querySelector('.fri');

//         const title = classClone.querySelector('.class-ID').textContent = course.crs_code;
//         const prof = classClone.querySelector('.class-location').textContent = course.class_instructor;

//         console.log(typeof(course.class_time));
//         console.log(course.class_time);
//         if (course.class_time === "9:40AM-10:55AM") {
//             setRootCSSVariables()
//         }
//         else if (course.class_time === "9:10AM-10:00AM") {
//             setRootCSSVariables();
//         }
//         else if (course.class_time === "9:40AM-12:10PM") {
//             setRootCSSVariables();
//         }
//         else if (course.class_time === "10:10AM-11:00AM") {
//             setRootCSSVariables(188, 93);
//         }
//         else if (course.class_time === "11:10AM-12:25PM") {
//             setRootCSSVariables(300, 145);
//         }
//         else if (course.class_time === "11:10AM-12:00PM") {
//             setRootCSSVariables(300, 93);
//         }
//         else if (course.class_time === "11:10AM-1:40PM") {
//             setRootCSSVariables(300, 290);
//         }
//         else if (course.class_time === "12:40PM-1:55PM") {
//             setRootCSSVariables(490,121);
//         }
//         else if (course.class_time === "12:40PM-3:10PM") {
//             setRootCSSVariables(490, 255);
//         }
//         else if (course.class_time === "12:40PM-1:30PM") {
//             setRootCSSVariables(490, 75);
//         }
//         else if (course.class_time === "2:10PM-3:25PM") {
//             setRootCSSVariables(635, 145);
//         }
//         else if (course.class_time === "2:10PM-4:40PM") {
//             setRootCSSVariables();
//         }
//         else if (course.class_time === "2:10PM-3:00PM") {
//             setRootCSSVariables();
//         }
//         else if (course.class_time === "3:40PM-4:55PM") {
//             setRootCSSVariables();
//         }
//         else if (course.class_time === "3:40PM-6:10PM") {
//             setRootCSSVariables();
//         }
//         else if (course.class_time === "5:10PM-7:40PM") {
//             setRootCSSVariables(490,121);
//         }
//         else if (course.class_time === "5:10PM-6:25PM") {
//             setRootCSSVariables();
//         }
//         else if (course.class_time === "6:10PM-8:40PM") {
//             setRootCSSVariables();
//         }
//         else if (course.class_time === "6:40PM-9:10PM") {
//             setRootCSSVariables();
//         }












//         if (course.class_days === "Mon Wed Fri") {
//             classClone.querySelector('.class-time').textContent = course.class_time; 
//             monday.appendChild(classClone);
//             wednesday.appendChild(classClone);
//             friday.appendChild(classClone);
//         }
//         else if (course.class_days === "Mon Wed") {
//             classClone.querySelector('.class-time').textContent =  course.class_time;
//             monday.appendChild(classClone);
//             wednesday.appendChild(classClone);
//         }
//         else if (course.class_days === "Tues Thurs") {
//             classClone.querySelector('.class-time').textContent = course.class_time;
//             tuesday.appendChild(classClone);
//             thursday.appendChild(classClone);
//         }
//         else if (course.class_days === "Mon") {
//             classClone.querySelector('.class-time').textContent = course.class_time;
//             monday.appendChild(classClone);
//         }
//         else if (course.class_days === "Tues") {
//             classClone.querySelector('.class-time').textContent = course.class_time;
//             tuesday.appendChild(classClone);
//         }
//         else if (course.class_days === "Wed") {
//             classClone.querySelector('.class-time').textContent = course.class_time;
//             wednesday.appendChild(classClone);
//         }
//         else if (course.class_days === "Thur") {
//             classClone.querySelector('.class-time').textContent = course.class_time;
//             thursday.appendChild(classClone);
//         }
//         else if (course.class_days === "Fri") {
//             classClone.querySelector('.class-time').textContent = course.class_time;
//             friday.appendChild(classClone);
//         }
//     })
// }

// function getRequiredCourses(data) {
//     const classTemplate = document.getElementById('class-div-template');

//     // CSS positioning for each known time
//     const timeMap = {
//         "9:40AM-10:55AM":  { top: 0, height: 0 },     // fill in later
//         "9:10AM-10:00AM":  { top: 0, height: 0 },
//         "9:40AM-12:10PM":  { top: 0, height: 0 },
//         "10:10AM-11:00AM": { top: 188, height: 93 },
//         "11:10AM-12:25PM": { top: 300, height: 145 },
//         "11:10AM-12:00PM": { top: 300, height: 93 },
//         "11:10AM-1:40PM":  { top: 300, height: 290 },
//         "12:40PM-1:55PM": { top: 490, height: 121 },
//         "12:40PM-3:10PM": { top: 490, height: 255 },
//         "12:40PM-1:30PM": { top: 490, height: 75 },
//         "2:10PM-3:25PM":  { top: 635, height: 145 },
//         "5:10PM-7:40PM":  { top: 490, height: 121 }
//     };

//     const dayColumns = {
//         "Mon": document.querySelector('.mon'),
//         "Tues": document.querySelector('.tue'),
//         "Wed": document.querySelector('.wed'),
//         "Thurs": document.querySelector('.thu'),
//         "Fri": document.querySelector('.fri')
//     };

//     data.forEach(course => {
//         const days = course.class_days.split(" ");
//         const classTime = course.class_time;
//         const blockPosition = timeMap[classTime] || { top: 0, height: 0 };

//         days.forEach(day => {
//             const clone = classTemplate.content.cloneNode(true);
//             const block = clone.querySelector('.class-div');

//             // apply CSS variables to the block
//             block.style.setProperty("--class-div-position", `${blockPosition.top}px`);
//             block.style.setProperty("--class-div-height", `${blockPosition.height}px`);

//             // fill in content
//             block.querySelector('.class-ID').textContent = course.crs_code;
//             block.querySelector('.class-location').textContent = course.class_instructor;
//             block.querySelector('.class-time').textContent = classTime;

//             // append to correct column
//             if (dayColumns[day]) {
//                 dayColumns[day].appendChild(clone);
//             } else {
//                 console.warn("Unknown day:", day);
//             }
//         });
//     });
// }


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

        messageContainer.appendChild(clone);

        root.scrollIntoView({ behavior: 'smooth', block: 'end' });
    });
}

function setRootCSSVariables(position, height) {
    r.style.setProperty('--class-div-position', `${position}px`);
    r.style.setProperty('--class-div-height', `${height}px`);
}