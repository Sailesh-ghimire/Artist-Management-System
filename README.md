# Fullstack Admin Panel

## Description

This project is a fullstack admin panel for managing users, artists, and songs. It includes a frontend built with React and a backend developed with Node.js and Express, using PostgreSQL as the database. The application allows for CRUD operations on user, artist, and song records, and features authentication and authorization.

## Table of Contents

- [Features](#features)
- [Technologies](#technologies)
- [Setup](#setup)
- [Usage](#usage)
- [API](#api)

## Features

- **User Management:** Create, read, update, and delete user records.
- **Artist Management:** Create, read, update, and delete artist records.
- **Song Management:** Create, read, update, and delete song records.
- **Authentication:** User login and session management.
- **Pagination:** Handle large datasets with pagination controls.
- **Responsive Design:** Modern UI with responsive layout using Tailwind CSS.

## Technologies

- **Frontend:**

  - React
  - Tailwind CSS
  - TanStack Table (formerly React Table)
  - React Hook Form
  - Zod

- **Backend:**

  - Node.js
  - Express
  - PostgreSQL

- **Authentication:**
  - JWT

## Setup

### Prerequisites

- Node.js (v16 or later)
- PostgreSQL

### Frontend Setup

1. Navigate to the `frontend` directory:

   cd frontend

2. Install dependencies:
   npm install

### Backend Setup

1. Navigate to the backend directory:
   cd backend

2. Install dependencies:
   npm install

#### Usage

1. Start the backend server:
   nodemon index

2. Start the frontend development server:
   npm start

Open your browser and navigate to http://localhost:3000 to access the admin panel.

### API

Auth Endpoints

1. POST /api/auth/register :to register user
2. POST /api/auth/login :to Login user

User Endpoints

1. GET /api/users/?page=1&limit=5 Fetch all users(paginated)
2. POST /api/users: Create a new user
3. PUT /api/users/:id : Update user details
4. DELETE /api/users/:id : Delete a user

Song Endpoints

1. GET /api/artists/artist_id/songs :Fetch songs By Artist
2. POST /api/songs :Create a new song
3. PUT /api/songs/:id : Update song details
4. DELETE /api/songs/:id : Delete a song

Artist Endpoints

1. GET /api/artists/?page=1&limit=5 :Fetch all artists(paginated)
2. POST /api/artists/ :Create a new artist
3. PUT /api/artists/:id : Update artist details
4. DELETE /api/artists/:id :Delete an artist
