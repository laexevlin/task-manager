# Task Manager

A full-stack task management application built with HTML, CSS, React, Node.js, Express, and PostgreSQL.

## Features

- User registration and login
- Password hashing with bcrypt
- JWT-based authentication using HTTP-only cookies
- Create, view and delete tasks
- Mark tasks as "in process" or "done"
- Task filtering
- Light and dark themes
- Responsive user interface

## Requirements

- Node.js
- PostgreSQL
- npm

## Installation

Clone the repository:

```bash
git clone git@github.com:laexevlin/task-manager.git
cd task-manager/project-root
```

Install backend dependencies:

```bash
cd server
npm install
```

Install frontend dependencies:

```bash
cd ../client
npm install
```

### Environment Variables

Create a `.env` file in the `server` directory and configure your database connection and JWT secret.

Never commit your `.env` file or share your secret keys.

### Running the Application

Start the backend:

```bash
cd server
npm run dev
```

Start the frontend in a separate terminal:

```bash
cd client
npm run dev
```

## License

No license has been specified for this project.








