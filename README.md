# AWS Serverless Todo App

This is a serverless Todo application built with AWS services. The backend is powered by AWS Lambda, API Gateway, and DynamoDB, while the frontend can be accessed via Postman or a custom frontend app. This app allows you to create, retrieve, update, and delete (CRUD) todo items using RESTful API endpoints.

## Project Overview

This project demonstrates the use of AWS serverless technologies to build a simple, scalable, and cost-effective backend for a Todo application. It includes:
- AWS Lambda functions for backend logic.
- DynamoDB as the database for storing todo items.
- API Gateway to expose RESTful endpoints.


## Prerequisites

1. **AWS Account**: You will need an AWS account to set up and run this project.
2. **Node.js and npm**: For local development, you need Node.js and npm installed.
3. **AWS CLI**: Optional, but recommended for managing AWS resources from the command line.
4. **Postman**: Optional, for testing API endpoints.

## Setup and Deployment

### Step 1: Set Up DynamoDB Table

1. Go to the **DynamoDB Console** in AWS.
2. Create a new table:
   - **Table Name**: `Todos`
   - **Primary Key**: `id` (String)

### Step 2: Set Up Lambda Functions

1. Create four Lambda functions:
   - `CreateTodo`: Handles creating a new todo item.
   - `GetTodos`: Retrieves all todo items.
   - `UpdateTodo`: Updates an existing todo item.
   - `DeleteTodo`: Deletes a specific todo item.

2. Use the provided code in each `.js` file and upload them as Lambda functions. Remember to:
   - Set `TABLE_NAME` as an environment variable for each function, with the value `Todos`.
   - Ensure each function has permissions to access DynamoDB.

### Step 3: Configure API Gateway

1. Go to the **API Gateway Console** and create a new REST API.
2. Create a `/todos` resource and configure methods for each CRUD operation:
   - **POST** `/todos` - Create a new todo item.
   - **GET** `/todos` - Retrieve all todo items.
   - **PUT** `/todos/{id}` - Update a specific todo item by ID.
   - **DELETE** `/todos/{id}` - Delete a specific todo item by ID.
3. Link each method to the respective Lambda function and enable CORS.

4. **Deploy the API** to a stage (e.g., `dev`) and copy the endpoint URL.

## API Endpoints

Once deployed, you can interact with the API endpoints. Replace `your-api-id`, `region`, and `dev` in the URLs with your API’s specific information.

## Testing with Postman

	1.	Open Postman.
	2.	Create a New Request for each CRUD operation and enter the API endpoint and HTTP method.
	3.	Set the Body for POST and PUT requests with JSON format.
	4.	Send the Request and view the response in Postman.

## License

This project is open source and available under the MIT License.

This `README.md` file provides a complete overview of the project, instructions for setup and deployment, details on each API endpoint, and guidelines for testing with Postman. You can further customize it as needed for your specific setup or to include additional details.