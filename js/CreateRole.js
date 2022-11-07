var aRegisterForm = document.querySelector('#registerForm');
var registerButton = document.querySelector('#submit');

console.log(aRegisterForm);
const host = "https://localhost:5001"

registerForm.addEventListener('submit', function(e) {
    e.preventDefault();
    let token = localStorage.getItem("jwtoken");
    if(token  !== null){
        let payload = parseJwt(token);
        let role = payload.role;
        console.log(role)
        if (role !== "SuperAdmin") {
            alert("Not Authorized to access this resource")
            return;
        }
    }
    
    registerButton.textContent = ``
    registerButton.classList.add("loader");
    registerButton.style.display = "block";

    var formData = new FormData(aRegisterForm);

    console.log('Processing...');
    console.log('fd', formData)
    fetch(`${host}/Role/Create`, {
            method: "POST",
            body: formData,
            
        })
        .then(function(response) {
            console.log("123");
            return response.json();
        }).then(function(result) {
            console.log("1", result);
            if(result.success === false)
            {
                console.log(result.message)
                alert(result.message)
                
            }
            if (result.data!== null) {
                console.log(result);
                alert(result.message);
                location.reload();
            }
        })
        .catch(function(err) {
            console.log(err)
        })
})
function parseJwt (token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
};