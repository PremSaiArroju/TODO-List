const apiUrl = 'YOUR_API_ENDPOINT_HERE'; // Replace with your API Gateway endpoint

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
                <button onclick="deleteTodo('${todo.id}')">Delete</button>
            `;
            todoList.appendChild(listItem);
        });
    } catch (error) {
        console.error('Error fetching todos:', error);
    }
}

// Add a new todo
async function addTodo() {
    const title = document.getElementById('todoInput').value;
    if (!title) return;

    try {
        await fetch(`${apiUrl}/todos`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ title })
        });
        document.getElementById('todoInput').value = ''; // Clear the input
        getTodos(); // Refresh the todo list
    } catch (error) {
        console.error('Error adding todo:', error);
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

// Initial fetch of todos on page load
getTodos();