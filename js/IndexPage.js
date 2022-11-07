let profilePix = document.querySelector('#profile-picture');
let username = document.querySelector('#user-DisplayName');

profilePix.addEventListener('onload', ()=> {
    profilePix.src = localStorage.getItem(ProfilePicture);
});
username.addEventListener('onload', ()=> {
    username.innerHTML =`${localStorage.getItem(appUser)}`
});

