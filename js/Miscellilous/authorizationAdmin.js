let token = localStorage.getItem("jwtoken");
    
if(token  !== null){
        let payload = parseJwt(token);
        let role = payload.role;
        console.log(role)
        if (role !== "Admin") {
            alert("Not Authorized to access this resource")
            location.href = "login.html";
        }
    }
    
function parseJwt (token) {
        var base64Url = token.split('.')[1];
        var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));
    
        return JSON.parse(jsonPayload);
    };