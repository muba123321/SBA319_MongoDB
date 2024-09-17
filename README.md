# SBA319_MongoDB
# ActivityHub

## Description
ActivityHub is a platform that allows users to create and participate in both public and private activities. Activities can be held at physical locations or online, and users can interact by rating and commenting on completed activities.

## Features
- Create, update, delete, and join activities.
- Add comments and rate activities.
- CRUD activity for User

## Technologies Used
- Node.js: Backend server
- Express: Web framework for routing and API handling
- MongoDB: Database for storing user and activity data
- Mongoose: Object Data Modeling (ODM) library for MongoDB
- Multer: Middleware for handling file uploads
- bcrypt: Password hashing

## API Routes

### User Routes
- `POST /api/users/`: Create a new user.
- `POST /api/users/login/`: Login an existing user.
- `GET /api/users/`: Get all users.
- `GET /api/users/:id`: Get user by ID.
- `PATCH /api/users/:id`: Update user by ID.
- `DELETE /api/users/:id`: Delete user by ID.

### Activity Routes
- `POST /api/activities/`: Create a new activity.
- `GET /api/activities/`: Get all activities.
- `GET /api/activities/:id`: Get activity by ID.
- `PUT /api/activities/:id`: Update activity by ID .
- `DELETE /api/activities/:id`: Delete activity by ID .
- `POST /api/activities/:id/comments`: Add a comment to an activity.


## NOTE
- This is a simplified version of the ActivityHub API. I plan to us this project in my capstone and will change the multer for image uploads and incorperate Firebase storage with S3 bucket. At the moment you can upload images used as express static method in the app. and stored in the upload folder on the app.

### In order to efficiently create and update a user or an activity, 
- Use any external platform such as postman, Thunder client, insomnia etc. - In the body use Json format to input keys and values but you will not be able to upload an image.
- To upload an image, you can use the Form data instead of JSON format for the body and upload a file for profilePicture for user or images for activities.