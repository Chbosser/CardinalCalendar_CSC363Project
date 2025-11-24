// async function getData() {
//     const url = "http://127.0.0.1:8000/api";
//     try {
//         const response = await fetch(url);
//         if (!response.ok) {
//         throw new Error(`Response status: ${response.status}`);
//         }

//         const result = await response.json();
//         console.log(result);
//     } catch (error) {
//         console.error(error.message);
//     }
//     }
//     getData();
'use strict'
const input = document.querySelector('.main-input');
const button = document.querySelector('.input-button');
const calendarURL = "http://127.0.0.1:8000/cardinalcalendar";
const chatbotURL = "http://127.0.0.1:8000/api/chatbot";

console.log(input)
input.addEventListener('keydown', async(event) => {
    if (event.key === 'Enter') {
        event.preventDefault()
        const startChat = document.querySelector('.chat-bot');
        startChat.classList.add('hidden');

        const mainChat = document.querySelector('.chat-window');
        mainChat.classList.remove('hidden');

        let text = document.querySelector('.main-input');
        const newMessage = document.createElement('div');

        newMessage.textContent = text.value;
        newMessage.classList.add('message');
        newMessage.classList.add('user');

        const messageChat = document.querySelector('.messages');
        messageChat.appendChild(newMessage);

        const userInput = document.querySelector('.wrapper');
        const formData = new FormData(userInput);
        const response = await fetch(calendarURL, {
            method: "POST",
            body: formData,
            headers: {
                'Accept': 'application/json',
            }
        });
        let data = await response.json();
        if (response.status == 200) {
            // console.log(typeof(data[0]));
            // console.log(data);
            // const newChatMessage = document.createElement('div');
            // newChatMessage.textContent = data[0];
            // data = JSON.parse(data[0]);
            // console.log(typeof(data[0]));
            // console.log(data);
            // console.log(data[0].crs_code);
            // newChatMessage.classList.add('message');
            // newChatMessage.classList.add('system');
            // messageChat.appendChild(newChatMessage);
            // newChatMessage.scrollIntoView({behavior: 'smooth', block: 'end'})
            data = JSON.parse(data[0]);
            required_courses(data);
        }



        console.log('Enter was pressed');
    }
})

const input2 = document.querySelector('.main-input2');
input2.addEventListener('keydown', async (event) => {
    if (event.key === 'Enter') {
        event.preventDefault()
        let text = input2.value
        console.log(text)
        const newMessage = document.createElement('div');
        newMessage.textContent = text;

        newMessage.classList.add('message');
        newMessage.classList.add('user');

        const messageChat = document.querySelector('.messages');
        messageChat.appendChild(newMessage);
        input2.value = '';
        newMessage.scrollIntoView({behavior: 'smooth', block: 'end'})

        const formData = new FormData();
        formData.append("chat-input", text)
        const response = await fetch(calendarURL, {
            method: "POST",
            body: formData,
            headers: {
                'Accept': 'application/json',
            }
        });
        const data = await response.json();
        if (response.status == 200) {
            console.log(data);

            const newChatMessage = document.createElement('div');
            newChatMessage.textContent = data
            newChatMessage.classList.add('message');
            newChatMessage.classList.add('system');
            messageChat.appendChild(newChatMessage);
            newChatMessage.scrollIntoView({behavior: 'smooth', block: 'end'})
        }


    }
})

// button.addEventListener('click', () => {
//     let text = input2.value
//     const newMessage = document.createElement('div');
//     newMessage.textContent = text;

//     newMessage.classList.add('message user');

//     const messageChat = documet.querySelector('messages');
//     messageChat.appendChild(newMessage);
//     preventDefault();
// })

function required_courses(data) {
    const container = document.querySelector('.messages');
    const template = document.getElementById('course-template');

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

        container.appendChild(clone);

        root.scrollIntoView({ behavior: 'smooth', block: 'end' });
    });
}
