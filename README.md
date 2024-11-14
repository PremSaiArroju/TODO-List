# AWS Serverless Todo App

This is a serverless Todo application built with AWS services. The backend is powered by AWS Lambda, API Gateway, and DynamoDB, while the frontend can be accessed via Postman or a custom frontend app. This app allows you to create, retrieve, update, and delete (CRUD) todo items using RESTful API endpoints.

## Project Overview

This project demonstrates the use of AWS serverless technologies to build a simple, scalable, and cost-effective backend for a Todo application. It includes:
- **AWS Lambda** functions for backend logic.
- **DynamoDB** as the database for storing todo items.
- **API Gateway** to expose RESTful endpoints with CORS enabled.
- **Postman or a custom frontend** to interact with the backend.

## Prerequisites

1. **AWS Account**: Required to set up and run AWS resources.
2. **Node.js and npm**: For local development, if needed.
3. **AWS CLI**: Optional but recommended for managing AWS resources from the command line.
4. **Postman**: Optional, for testing API endpoints.

## Setup and Deployment

### Step 1: Set Up DynamoDB Table

1. Go to the **DynamoDB Console** in AWS.
2. Create a new table:
   - **Table Name**: `Todos`
   - **Primary Key**: `id` (String)

### Step 2: Set Up Lambda Function with CORS Headers

1. Create a single Lambda function for handling all CRUD operations (Create, Read, Update, Delete).
   - Use the provided code, which includes the necessary CORS headers for each response.
   - Set an environment variable named `TABLE_NAME` with the value `Todos`.
   - Ensure the Lambda function has IAM permissions to interact with DynamoDB.

2. **Lambda Function Code**:
   - Make sure each response includes CORS headers to handle browser-based requests.

### Step 3: Configure API Gateway

1. Go to the **API Gateway Console** and create a new REST API.
2. Create a `/todos` resource and configure methods for each CRUD operation:
   - **POST** `/todos` - Create a new todo item.
   - **GET** `/todos` - Retrieve all todo items.
   - **PUT** `/todos/{id}` - Update a specific todo item by ID.
   - **DELETE** `/todos/{id}` - Delete a specific todo item by ID.
3. Link each method to the respective Lambda function and enable **CORS** for each method:
   - Enable CORS in API Gateway by selecting **Actions > Enable CORS** for each method, including **OPTIONS**.
4. **Deploy the API** to a stage (e.g., `dev`) and copy the endpoint URL.

### Step 4: Enable CORS for Gateway Responses (Optional but Recommended)

1. In **API Gateway**, go to **Gateway Responses**.
2. Edit responses like **Default 4XX** and **Default 5XX** to include CORS headers:
   - `Access-Control-Allow-Origin` set to `*`
   - `Access-Control-Allow-Methods` set to `GET,POST,PUT,DELETE,OPTIONS`
   - `Access-Control-Allow-Headers` set to `Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token`
3. Redeploy the API to apply these changes.

## API Endpoints

Once deployed, you can interact with the following API endpoints (replace `your-api-id`, `region`, and `stage` with your API’s specific information):

- **Create Todo**: `POST https://{your-api-id}.execute-api.{region}.amazonaws.com/{stage}/todos`
- **Retrieve Todos**: `GET https://{your-api-id}.execute-api.{region}.amazonaws.com/{stage}/todos`
- **Update Todo**: `PUT https://{your-api-id}.execute-api.{region}.amazonaws.com/{stage}/todos/{id}`
- **Delete Todo**: `DELETE https://{your-api-id}.execute-api.{region}.amazonaws.com/{stage}/todos/{id}`

## Testing with Postman

1. Open Postman.
2. Create a New Request for each CRUD operation and enter the corresponding API endpoint and HTTP method.
3. Set the Body for **POST** and **PUT** requests with JSON format, e.g., `{ "title": "Your Todo Title" }`.
4. Send the Request and view the response in Postman.

## License

This project is open source and available under the MIT License.