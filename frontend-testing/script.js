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
        const response = await fetch("http://127.0.0.1:8000/api/chatbot", {
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
        const response = await fetch("http://127.0.0.1:8000/api/chatbot", {
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