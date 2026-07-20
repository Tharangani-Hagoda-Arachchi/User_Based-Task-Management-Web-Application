# TaskRabbit - Task Management Application

A full-stack task management application that allows users to register, login, create tasks, update task details, change task status, view task details, and manage their daily activities.

The application uses JWT authentication with access tokens and refresh tokens for secure user sessions.

---

## Features

### Authentication
- User registration
- User login/logout
- JWT access token authentication
- Refresh token stored in HTTP-only cookies
- Protected routes
- User profile fetching

### Task Management
- Create new tasks
- View all tasks by sorting
- View single task details
- Update task details
- Delete tasks
- Change task status
  - Pending
  - Completed
- Filter tasks by status
- Pagination support

### Frontend
- Responsive UI
- Redux Toolkit state management
- Axios API integration
- Tailwind CSS styling
- Modal-based forms
- ToastMessages


### Backend
- RESTful API architecture
- Express.js server
- MongoDB database
- Mongoose ODM
- JWT authentication
- Cookie-based refresh token handling

---

#  Technology Stack

## Frontend

- React.js
- Vite
- Redux Toolkit
- React Router DOM
- Axios
- Tailwind CSS
- React Icons

## Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- bcrypt
- Cookie Parser
- dotenv

---



#  Installation and Setup

## 1. Clone Repository

```bash
git clone <repository-url>
```

Move into project folder:

```bash
cd TaskRabbit
```

---

# Backend Setup

## 2. Navigate to Backend

```bash
cd backend
```

Install dependencies:

```bash
npm install
```

---

## 3. Create Environment File

Create `.env` file inside backend folder.

Example:

```env
PORT=4000

MONGO_URI=your_mongodb_connection_string

ACCESS_TOKEN_SECRET=your_access_token_secret

REFRESH_TOKEN_SECRET=your_refresh_token_secret

NODE_ENV=development
```

---

## 4. Start Backend Server

Development mode:

```bash
npm run dev
```

or

```bash
npm start
```

Backend will run:

```
http://localhost:4000
```

---

# Frontend Setup

## 5. Navigate to Frontend

Open another terminal:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```



## 7. Start Frontend

Run:

```bash
npm run dev
```

Frontend will run:

```
http://localhost:5173
```

---

# Authentication Flow

1. User registers account.
2. User logs in.
3. Backend generates:
   - Access Token
   - Refresh Token
4. Access token is stored on frontend.
5. Refresh token is stored in HTTP-only cookie.
6. Protected API requests use access token.
7. Logout removes refresh token from database and clears cookie.

---

#  API Endpoints

## Authentication APIs

### Register User

```
POST /api/auth/register
```

Request:

```json
{
  "name": "John",
  "email": "john@gmail.com",
  "password": "123456"
}
```

---

### Login User

```
POST /api/auth/login
```

Request:

```json
{
  "email": "john@gmail.com",
  "password": "123456"
}
```

Response:

```json
{
  "message": "Login successfully",
  "accessToken": "token"
}
```

---

### Logout User

```
POST /api/auth/logout
```

---

### Get User Profile

```
GET /api/auth/profile
```

---

# Task APIs

## Create Task

```
POST /api/tasks
```

Example:

```json
{
"title":"Complete project",
"description":"Finish task manager application",
"priority":"high",
"status":"pending",
"dueDate":"2026-07-25T10:00:00"
}
```

---

## Get All Tasks

```
GET /api/tasks
```

---

## Get Task By ID

```
GET /api/tasks/:id
```

---

## Update Task

```
PUT /api/tasks/:id
```

---

## Update Task Status

```
PATCH /api/tasks/:id/status
```

---

## Delete Task

```
DELETE /api/tasks/:id
```

---

# Testing API

You can test APIs using:

- Postman

Example:

```
http://localhost:4000/api/tasks
```


#  Security Features

- Password hashing using bcrypt
- JWT authentication
- HTTP-only cookies
- Protected routes
- Input validation
- Environment variables

---

# Author
Tharangani Hagoda Arachchi
