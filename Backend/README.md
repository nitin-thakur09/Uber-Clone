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

## POST /users/login

Authenticates an existing user and returns a user object with an authentication token.

### Description

This endpoint accepts a request body containing the user's email and password. It validates the request data, checks the credentials against the stored user record, and returns a JSON response with the authenticated user and a JWT token.

### Request URL

`POST /users/login`

### Request Headers

- `Content-Type: application/json`

### Request Body

```json
{
  "email": "john.doe@example.com",
  "password": "secret123"
}
```

### Required Fields

- `email` (string) - required, must be a valid email address
- `password` (string) - required, minimum 6 characters

### Response Status Codes

- `200 OK`
  - User successfully authenticated.
  - Response includes the authenticated user object and an auth token.
- `400 Bad Request`
  - Validation failed or required fields are missing.
  - Response includes validation error details.
- `401 Unauthorized`
  - Invalid email or password.
- `500 Internal Server Error`
  - Server-side error during login.

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

- The password is compared against the stored hashed password.
- The response omits the password field.
- Ensure `JWT_SECRET` is configured in environment variables for token generation.

## GET /user/profile

Returns the authenticated user's profile information.

### Description

Requires a valid authentication token. The `authMiddleware.authUser` middleware verifies the token and attaches the user to `req.user`.

### Request URL

`GET /user/profile`

### Request Headers

- `Authorization: Bearer <token>` (preferred)
- or cookie: `token` (if the client uses cookies)

### Request Body

None

### Response Status Codes

- `200 OK` - Authenticated; returns the user object.
- `401 Unauthorized` - Missing or invalid token.
- `500 Internal Server Error` - Server-side error.

### Example Success Response

```json
{
  "_id": "609d9b8f1c4ae12f7890abcd",
  "fullname": {
    "firstname": "John",
    "lastname": "Doe"
  },
  "email": "john.doe@example.com"
}
```

### Notes

- The endpoint returns the user object attached by the auth middleware (`req.user`).
- Sensitive fields such as `password` are not returned.

## POST /user/logout

Logs out the authenticated user by clearing the auth cookie (if present) and blacklisting the token so it cannot be reused.

### Description

This endpoint invalidates the current JWT by storing it in a blacklist collection and clearing the `token` cookie on the response.

### Request URL

`POST /user/logout`

### Request Headers

- `Authorization: Bearer <token>`
- or cookie: `token`

### Request Body

None

### Response Status Codes

- `200 OK` - Logout successful; returns a confirmation message.
- `401 Unauthorized` - Missing or invalid token.
- `500 Internal Server Error` - Server-side error.

### Example Success Response

```json
{
  "message": "User logged out successfully"
}
```

### Notes

- The token is recorded in the `blacklistTokens` collection to prevent reuse.
- If your client stores the token in a cookie, the server clears the `token` cookie on logout.

---

# Captain API Documentation

## POST /captains/register

Registers a new captain and returns a new captain object with an authentication token.

### Description

This endpoint accepts a request body containing the captain's full name, email, password, and vehicle information. It validates the request data, hashes the password, checks for duplicate email addresses, creates a new captain record, and returns a JSON response with the created captain and a JWT token.

### Request URL

`POST /captains/register`

### Request Headers

- `Content-Type: application/json`

### Request Body

```json
{
  "fullname": {
    "firstname": "John",
    "lastname": "Doe"
  },
  "email": "john.captain@example.com",
  "password": "secret123",
  "Vehicle": {
    "color": "black",
    "plate": "DL01AB1234",
    "capacity": 4,
    "type": "car"
  }
}
```

### Required Fields

- `fullname.firstname` (string) - required, minimum 3 characters
- `fullname.lastname` (string) - optional, minimum 3 characters if provided
- `email` (string) - required, must be a valid email address
- `password` (string) - required, minimum 6 characters
- `Vehicle.color` (string) - required, minimum 3 characters
- `Vehicle.plate` (string) - required, minimum 3 characters (vehicle registration plate)
- `Vehicle.capacity` (integer) - required, minimum 1
- `Vehicle.type` (string) - required, must be one of: `car`, `motorcycle`, or `auto`

### Response Status Codes

- `201 Created`
  - Captain successfully created.
  - Response includes the created captain object and an auth token.
- `400 Bad Request`
  - Validation failed or required fields are missing.
  - May also indicate that a captain with the provided email already exists.
  - Response includes error details.
- `500 Internal Server Error`
  - Server-side error during registration.

### Example Success Response

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "captain": {
    "_id": "609d9b8f1c4ae12f7890abcd",
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "john.captain@example.com",
    "Vehicle": {
      "color": "black",
      "plate": "DL01AB1234",
      "capacity": 4,
      "type": "car"
    },
    "status": "inactive"
  }
}
```

### Example Error Responses

**Validation Error (400 Bad Request):**
```json
{
  "errors": [
    {
      "msg": "Please provide a valid email address",
      "param": "email"
    },
    {
      "msg": "First name must be at least 3 characters long",
      "param": "fullname.firstname"
    },
    {
      "msg": "Type must be either car, motorcycle, or auto",
      "param": "Vehicle.type"
    }
  ]
}
```

**Duplicate Email (400 Bad Request):**
```json
{
  "message": "Captain with this email already exists"
}
```

### Validation Rules

| Field | Rule | Error Message |
|-------|------|---------------|
| `email` | Must be a valid email | "Please provide a valid email address" |
| `fullname.firstname` | Min 3 characters | "First name must be at least 3 characters long" |
| `password` | Min 6 characters | "Password must be at least 6 characters long" |
| `Vehicle.color` | Min 3 characters | "Color must be at least 3 characters long" |
| `Vehicle.plate` | Min 3 characters | "Plate must be at least 3 characters long" |
| `Vehicle.capacity` | Integer, min 1 | "Capacity must be at least 1" |
| `Vehicle.type` | One of: car, motorcycle, auto | "Type must be either car, motorcycle, or auto" |

### Notes

- The password is stored hashed in the database for security.
- The response omits the password field.
- Ensure `JWT_SECRET` is configured in environment variables for token generation.
- A captain cannot register with an email already associated with another captain account.
- Vehicle type should match one of the predefined options: car, motorcycle, or auto.
- The captain's initial status is set to `inactive` until verified.

### Example cURL Request

```bash
curl -X POST http://localhost:3000/captains/register \
  -H "Content-Type: application/json" \
  -d '{
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "john.captain@example.com",
    "password": "secret123",
    "Vehicle": {
      "color": "black",
      "plate": "DL01AB1234",
      "capacity": 4,
      "type": "car"
    }
  }'
```
