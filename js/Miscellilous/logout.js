let logoutButton = document.querySelector('#logout-btn')

logoutButton.addEventListener('click', () => {
    localStorage.clear();
    location.href = "login.html"
})
