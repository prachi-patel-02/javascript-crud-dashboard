let submitBtn = document.getElementById("submitBtn");
let deleteModal = document.getElementById("deleteModal");
let confirmDeleteBtn = document.getElementById("confirmDelete");
let cancelDeleteBtn = document.getElementById("cancelDelete");

let deleteUserId = null;

let token = localStorage.getItem("token");
let editUserId = null;

if (!token) {
    window.location.href = "login.html";
}

let addUserBtn = document.getElementById("addUserBtn");
let form = document.getElementById("addUserForm");
addUserBtn.addEventListener("click", function () {
    if (form.style.display === "none") {
        form.style.display = "block";
    } else {
        form.style.display = "none";
    }
});


// ADD-USERS

form.addEventListener("submit", function (e) {
    e.preventDefault();

    let name = document.getElementById("name").value;
    let email = document.getElementById("email").value;
    let department = document.getElementById("department").value;

    if (editUserId === null) {

        // CREATE
        fetch("https://crud-api-5f45.onrender.com/dashboard/user", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({ name, email, department })
        })
            .then(res => res.json())
            .then(data => {
                alert("User Created!");
                form.reset();
                loadUsers();
            });

    } else {

        // update
        fetch(`https://crud-api-5f45.onrender.com/dashboard/user/${editUserId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({ name, email, department })
        })
            .then(res => res.json())
            .then(data => {
                alert("User Updated!");
                form.reset();
                form.style.display = "none";
                editUserId = null;
                submitBtn.innerText = "Save";
                loadUsers();
            });
    }
});


// DISPLAY-USER

function loadUsers() {
    fetch("https://crud-api-5f45.onrender.com/dashboard/users", {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${token}`
        }
    })
        .then(res => res.json())
        .then(data => {
            let tbody = document.querySelector("#userTable tbody");
            tbody.innerHTML = "";

            data.forEach(user => {
                let row = document.createElement("tr");

                row.innerHTML = `
                <td>${user.name}</td>
                <td>${user.email}</td>
                <td>${user.department}</td>
                <td>
                    <button onclick="editUser('${user.id}', '${user.name}', '${user.email}', '${user.department}')">Edit</button>
                    <button onclick="deleteUser('${user.id}')">Delete</button>
                    </td>
            `;
                tbody.appendChild(row);
            });
        });
}

// DELETE-USER

function deleteUser(id) {
    deleteUserId = id;
    deleteModal.style.display = "flex";
}

// Confirm-Delete

confirmDeleteBtn.addEventListener("click", function () {

    fetch(`https://crud-api-5f45.onrender.com/dashboard/user/${deleteUserId}`, {
        method: "DELETE",
        headers: {
            "Authorization": `Bearer ${token}`
        }
    })
        .then(res => res.json())
        .then(data => {
            deleteModal.style.display = "none";
            loadUsers();
        });

});

// Cancel-Delete


cancelDeleteBtn.addEventListener("click", function () {
    deleteModal.style.display = "none";
});

// edit

function editUser(id, name, email, department) {
    editUserId = id;

    document.getElementById("name").value = name;
    document.getElementById("email").value = email;
    document.getElementById("department").value = department;
    submitBtn.innerText = "Update";
    form.style.display = "block";
}
document.querySelector('h1').innerText = `welcome`;
let logout_btn = document.createElement('button')
logout_btn.innerText = "LOGOUT";
logout_btn.classList.add("logout-btn");
logout_btn.addEventListener('click', function () {
    localStorage.removeItem("token");
    window.location.href = "login.html";

})

document.body.appendChild(logout_btn);
loadUsers();