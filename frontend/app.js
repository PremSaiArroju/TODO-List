console.log("JavaScript loaded");
const apiUrl = 'https://s78c2m339l.execute-api.us-east-1.amazonaws.com/dev';  // Your API Gateway base URL
let currentEditId = null; // Track if we're in "edit mode" and storing the ID of the todo being edited

// Fetch and display todos from the API
async function getTodos() {
    console.log("Fetching todos...");
    try {
        const response = await fetch(`${apiUrl}/todos`);
        const todos = await response.json();
        console.log("Fetched todos:", todos);  // Log fetched data

        const todoList = document.getElementById('todoList');
        todoList.innerHTML = '';  // Clear the list before adding items

        todos.forEach(todo => {
            const listItem = document.createElement('li');
            listItem.innerHTML = `
                <span>${todo.title}</span>
                <button class="edit-button" onclick="startEdit('${todo.id}', '${todo.title}')">Edit</button>
                <button class="delete-button" onclick="deleteTodo('${todo.id}')">Delete</button>
            `;
            todoList.appendChild(listItem);
        });
    } catch (error) {
        console.error('Error fetching todos:', error);
    }
}

// Add or Update a todo
async function saveTodo() {
    const title = document.getElementById('todoInput').value;
    if (!title) return;

    if (currentEditId) {
        // Update existing todo
        console.log(`Updating todo with id: ${currentEditId}`);
        await updateTodo(currentEditId, title);
    } else {
        // Add a new todo
        console.log("Adding new todo:", title);
        await addTodo(title);
    }

    document.getElementById('todoInput').value = '';  // Clear the input field
    currentEditId = null;  // Reset edit mode
    await getTodos();  // Refresh the list immediately after adding
}

// Function to add a new todo
async function addTodo(title) {
    try {
        const response = await fetch(`${apiUrl}/todos`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ title })
        });
        if (response.ok) {
            console.log("Todo added:", title);
        } else {
            console.error("Error adding todo:", await response.text());
        }
    } catch (error) {
        console.error('Error adding todo:', error);
    }
}

// Function to update an existing todo
async function updateTodo(id, title) {
    try {
        const response = await fetch(`${apiUrl}/todos/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ title })
        });
        if (response.ok) {
            console.log("Todo updated:", title);
        } else {
            console.error("Error updating todo:", await response.text());
        }
    } catch (error) {
        console.error('Error updating todo:', error);
    }
}

// Delete a todo
async function deleteTodo(id) {
    try {
        const response = await fetch(`${apiUrl}/todos/${id}`, {
            method: 'DELETE'
        });
        if (response.ok) {
            console.log("Todo deleted with id:", id);
            await getTodos();  // Refresh the list after deletion
        } else {
            console.error("Error deleting todo:", await response.text());
        }
    } catch (error) {
        console.error('Error deleting todo:', error);
    }
}

// Function to initiate editing a todo
function startEdit(id, title) {
    document.getElementById('todoInput').value = title;  // Set the input field to the todo's title
    currentEditId = id;  // Store the current edit ID
    console.log("Editing todo with id:", id);
}

// Initial fetch of todos on page load
getTodos();