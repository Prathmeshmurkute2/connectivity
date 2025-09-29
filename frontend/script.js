const form = document.getElementById("userForm");
const userList = document.getElementById("userList");

form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;

    try {
        // Send POST request to backend
        const res = await fetch("http://localhost:5000/submit", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, email })
        });

        const data = await res.json();
        alert(data.message);

        form.reset();
        fetchUsers(); // Refresh user list
    } catch (err) {
        console.error(err);
    }
});

// Function to fetch all users
async function fetchUsers() {
    try {
        const res = await fetch("http://localhost:5000/users");
        const users = await res.json();

        userList.innerHTML = "";
        users.forEach(user => {
            const li = document.createElement("li");
            li.textContent = `${user.name} - ${user.email}`;
            userList.appendChild(li);
        });
    } catch (err) {
        console.error(err);
    }
}

// Fetch users when page loads
fetchUsers();
