
const password = document.querySelectorAll('.password');

password.forEach(passwordBox => {
    const input = passwordBox.querySelector('input');
    const eyeBtn = passwordBox.querySelector('i');
    eyeBtn.addEventListener('click', () => {
        eyeBtn.classList.toggle('fa-eye');
        input.type = input.type === 'password' ? 'text' : 'password';
    })
})