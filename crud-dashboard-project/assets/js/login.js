let loginForm = document.getElementById('Login_form');
loginForm.addEventListener('submit', async function (e) {
    e.preventDefault();
    let email = document.getElementById("email").value;
    let pwd = document.getElementById("password").value;
    let user = {
        email: email,
        password: pwd
    };

    try {
        let response = await fetch("https://crud-api-5f45.onrender.com/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(user)
        })

        let data = await response.json();
        if (response.ok) {
            localStorage.setItem("token", data.token);
            alert("login successful !");
            window.location.href = "Dashboard.html";
        } else {
            alert(data.message || "login failed!");
        }

    }
    catch (error) {
        console.log(error);
        alert("Something went wrong!");
    }
});