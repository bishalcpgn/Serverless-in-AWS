const apiUrl = ''; //Invoke URL Here 

// Handle Add User Button Click
document.getElementById('addUserButton').addEventListener('click', async function(event) {
    event.preventDefault(); // Prevent form submission

    const userid = document.getElementById('userid').value;
    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;

    try {
        const response = await fetch(`${apiUrl}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ id: userid, name: username, email: email })
        });

        if (!response.ok) {
            throw new Error('Error adding user');
        }

        // Reset the form
        document.getElementById('addUserForm').reset();

        // Optionally, fetch and update the user list after adding a user
        fetchUsers();
    } catch (error) {
        console.error('Error:', error);
        alert('Failed to add user: ' + error.message);
    }
});

// Handle Get Users Button Click
document.getElementById('getUsersButton').addEventListener('click', function(event) {
    event.preventDefault(); // Prevent default action

    fetchUsers(); // Fetch and display users
});

// Fetch and Display Users
async function fetchUsers() {
    try {
        const response = await fetch(`${apiUrl}`, {
            method: 'GET'
        });

        if (!response.ok) {
            throw new Error('Error fetching users');
        }

        const result = await response.json(); // Parse the response as JSON
        const users = JSON.parse(result.body); // Parse the 'body' field to get the user array

        // Display Users
        const userList = document.getElementById('userList');
        userList.innerHTML = ''; // Clear the list

        users.forEach(user => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${user.id}</td>
                <td>${user.name}</td>
                <td>${user.email}</td>
            `;
            userList.appendChild(row);
        });
    } catch (error) {
        console.error('Error:', error);
        alert('Failed to fetch users: ' + error.message);
    }
}

// Fetch users when the page loads
window.onload = fetchUsers;
