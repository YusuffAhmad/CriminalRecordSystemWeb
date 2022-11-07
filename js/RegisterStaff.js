var aRegisterForm = document.querySelector('#registerForm');
var registerButton = document.querySelector('#submit');
console.log(aRegisterForm);
const host = "https://localhost:5001"

registerForm.addEventListener('submit', function(e) {
    e.preventDefault();
    registerButton.textContent = ``
    registerButton.classList.add("loader");
    registerButton.style.display = "block";

    var formData = new FormData(aRegisterForm);

    console.log('Processing...');
    console.log('fd', formData)
    fetch(`${host}/Staff/Create`, {
            method: "POST",
            body: formData,
            
        })
        .then(function(response) {
            return response.json();
        }).then(function(result) {
            if (result.success == true) {
                alert(result.message)
                location.reload();
            }
            else if (result.success == false){
                alert(result.message)
            }
        })
        .catch(function(err) {
            console.log(err.message);
        })
})