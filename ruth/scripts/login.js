'use-strict'
const form = document.querySelector('.login-form');
form.addEventListener('submit', async(event) => {
    event.preventDefault();
    const formData = new FormData(form)

    const response = await fetch('http://127.0.0.1:8000/login', {
        method: 'POST',
        body: formData,
        headers: {
            'Accept': 'application/json',
        }
    });
    const data = await response.json()
    if (data.success == true) {
        console.log(data)
        window.location.href = "/main-page.html";
    }
    else {
        console.log(data)
        const message = document.querySelector('.login-valid');
        message.classList.remove('hidden')
    }
})