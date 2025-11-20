'use-strict'
const form = document.querySelector('.sign-up-form');
form.addEventListener('submit', async(event) => {
    event.preventDefault();
    const formData = new FormData(form)

    const response = await fetch('http://127.0.0.1:8000/register', {
        method: 'POST',
        body: formData,
        headers: {
            'Accept': 'application/json',
        }
    });
    const data = await response.json()
    if (response.status == 201) {
        window.location.href = "login.html";
    }
})