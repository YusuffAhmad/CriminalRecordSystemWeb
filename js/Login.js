var email = document.getElementById('email');
var password = document.getElementById('password')
var loginForm = document.getElementById('loginForm');
var loginBtn = document.getElementById('LOGIN');
const host = "https://localhost:5001"

loginForm.addEventListener('submit', function(e) {
    e.preventDefault();
    loginBtn.textContent = `Loading...`
    loginBtn.classList.add("loader");
    loginBtn.style.display = "block";
    data = {
        password : password.value,
        email : email.value,
    };
    console.log(data.email)
    console.log(data.password)
  
    fetch(`${host}/User/Login`, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json',
        }
    })
    .then(function(output) {
        console.log("Happening..");
        return output.json();
    })
    .then(function(results) {
        if (results.success == true) {
            localStorage.setItem("jwtoken", results.token)
            let payload = parseJwt(results.token);
            let role = payload.role;
            console.log(role)
            if (role == "SuperAdmin") {
                localStorage.setItem("jwtoken", results.token)
                location.href = "Index.html";
            }
            else if (role == "Admin"){
                localStorage.setItem("jwtoken", results.token)
                location.href = "Dashboard.html";
            }
            else{
                alert("User Not Yet Authorized")
            }
        }
    })
    .catch(function(err) {
        console.log(err.error);
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