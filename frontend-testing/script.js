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
'use-strict'
const input = document.querySelector('.main-input');
const button = document.querySelector('.input-button');
console.log(input)
input.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
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

        console.log('Enter was pressed');
        event.preventDefault()
    }
})

const input2 = document.querySelector('.main-input2');
input2.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        let text = input2.value
        const newMessage = document.createElement('div');
        newMessage.textContent = text;

        newMessage.classList.add('message');
        newMessage.classList.add('user');

        const messageChat = document.querySelector('.messages');
        messageChat.appendChild(newMessage);
        event.preventDefault();
        input2.value = '';
    }
})

button.addEventListener('click', () => {
    let text = input2.value
    const newMessage = document.createElement('div');
    newMessage.textContent = text;

    newMessage.classList.add('message user');

    const messageChat = documet.querySelector('messages');
    messageChat.appendChild(newMessage);
    preventDefault();
})