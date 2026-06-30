# Backend API Documentation

## POST /users/register

Registers a new user and returns a new user object with an authentication token.

### Description

This endpoint accepts a request body containing the user's full name, email, and password. It validates the request data, hashes the password, creates a new user record, and returns a JSON response with the created user and a JWT token.

### Request URL

`POST /users/register`

### Request Headers

- `Content-Type: application/json`

### Request Body

```json
{
  "fullname": {
    "firstname": "John",
    "lastname": "Doe"
  },
  "email": "john.doe@example.com",
  "password": "secret123"
}
```

### Required Fields

- `fullname.firstname` (string) - required, minimum 3 characters
- `fullname.lastname` (string) - optional, minimum 3 characters if provided
- `email` (string) - required, must be a valid email address
- `password` (string) - required, minimum 6 characters

### Response Status Codes

- `201 Created`
  - User successfully created.
  - Response includes the created user object and an auth token.
- `400 Bad Request`
  - Validation failed or required fields are missing.
  - Response includes validation error details.
- `500 Internal Server Error`
  - Server-side error during registration.

### Example Success Response

```json
{
  "user": {
    "_id": "609d9b8f1c4ae12f7890abcd",
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "john.doe@example.com"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6..."
}
```

### Notes

- The password is stored hashed in the database.
- The response omits the password field.
- Ensure `JWT_SECRET` is configured in environment variables for token generation.
