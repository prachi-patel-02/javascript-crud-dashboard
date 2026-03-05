let form = document.getElementById('signUp_form');
form.addEventListener('submit', async function (e) {
    e.preventDefault();
    let name = document.getElementById('name').value;
    let email = document.getElementById('email').value;
    let pwd = document.getElementById('password').value;

    let user = {
        name: name,
        email: email,
        password: pwd
    }

    try {
        let response = await fetch("https://crud-api-5f45.onrender.com/signup", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(user)
        });

        let data = await response.json();
        console.log(data);

        if (response.ok) {
            alert("Signup Successful!");
            window.location.href = "Login.html";
        } else {
            alert(data.message || "Signup failed");
        }

    } catch (error) {
        console.log(error);
        alert("Something went wrong!");
    }
});
