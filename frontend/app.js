const apiUrl = 'https://upklhowv3m.execute-api.us-east-1.amazonaws.com/dev';  // Replace with your API Gateway endpoint
let currentEditId = null; // Track if we're in "edit mode" and storing the ID of the todo being edited

// Fetch and display todos from the API
async function getTodos() {
    try {
        const response = await fetch(`${apiUrl}/todos`);
        const todos = await response.json();
        const todoList = document.getElementById('todoList');
        todoList.innerHTML = '';

        todos.forEach(todo => {
            const listItem = document.createElement('li');
            listItem.innerHTML = `
                ${todo.title}
                <button onclick="startEdit('${todo.id}', '${todo.title}')">Edit</button>
                <button onclick="deleteTodo('${todo.id}')">Delete</button>
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
        await updateTodo(currentEditId, title);
    } else {
        // Add a new todo
        await addTodo(title);
    }

    document.getElementById('todoInput').value = ''; // Clear the input
    currentEditId = null; // Reset edit mode
    getTodos(); // Refresh the todo list
}

// Function to add a new todo
async function addTodo(title) {
    try {
        await fetch(`${apiUrl}/todos`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ title })
        });
    } catch (error) {
        console.error('Error adding todo:', error);
    }
}

// Function to update an existing todo
async function updateTodo(id, title) {
    try {
        await fetch(`${apiUrl}/todos/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ title })
        });
    } catch (error) {
        console.error('Error updating todo:', error);
    }
}

// Delete a todo
async function deleteTodo(id) {
    try {
        await fetch(`${apiUrl}/todos/${id}`, {
            method: 'DELETE'
        });
        getTodos(); // Refresh the todo list
    } catch (error) {
        console.error('Error deleting todo:', error);
    }
}

// Function to initiate editing a todo
function startEdit(id, title) {
    document.getElementById('todoInput').value = title; // Set the input field to the todo's title
    currentEditId = id; // Set the currentEditId to the id of the todo being edited
}

// Initial fetch of todos on page load
getTodos();