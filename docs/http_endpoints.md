## http endpoints

>Note that each time a route is accessed that refreshes the access token the socket.io connection needs to be reestablished to make use of the new token!

#### POST /auth
Request token for authentication.

Request body for account user:
```json
{
  "type": "account",
  "email": "ex@amp.le",
  "password": "superSecret",
}
```

Success reponse body (sets token as cookie):
```json
{
  "status": "authorized-account",
  "owns": [
    "uuidA",
    "uuidB",
  ],
  "mods": [
    "uuidC",
  ],
  "private": [
    "uuidD",
    "uuidE",
  ],
}
```

Request body for anonymous user:
```json
{
  "type": "anonymous",
}
```

Response body for anonymous user (sets token as cookie):
```json
{
  "status": "authorized-anonymous",
}
```

Response body on failure:
```json
{
  "status": "not-authorized",
  "error": "message",
}
```

#### POST /register
Register new user.

Request body:
```json
{
  "email": "ex@amp.le",
  "password": "superSecret",
}
```

Success response body status 201:
```json
{}
```

Should always succeed to prevent leaking email addresses? If that's the case we need a verification step after sending an email.

#### GET /user
Retrieve user information based on token. Route is guarded, status 401 if token is invalid.

Request body:
```json
{}
```

Response body:
```json
{
  "email": "ex@amp.le",
  "owns": [
    "uuidA",
    "uuidB",
  ],
  "mods": [
    "uuidC",
  ],
  "private": [
    "uuidD",
    "uuidE",
  ],
}
```

#### POST /room
Create a new room. Route is guarded, status 401 if token is invalid.

Request body:
```json
{
  "room": "roomName",
  "private": false,
}
```

Success response body with status 201 (sets new token as cookie):
```json
{
  "id": "roomId",
  "room": "roomName",
  "private": false,
  "owners": [
    "ex@amp.le",
  ],
  "pinned": [
    "Need... coffee...",
    "Too fast!",
    "Cooooooooool!",
  ],
  "polls": [],
}
```

Failure response body with status 400:
```json
{
  "error": "message",
}
```

#### GET /room/\<uuid>
Get room details. Route is guarded, status 401 if token is invalid.

Request body:
```json
{}
```

Response body:
```json
{
  "id": "uuid",
  "room": "roomName",
  "private": true,
  "owners": [
    "ex@amp.le",
  ],
  "pinned": [
    "Need... coffee...",
    "Too fast!",
    "Cooooooooool!",
  ],
  "polls": [
    {
      "poll": "pollName",
      "options": [
        "optionA",
        "optionB",
      ],
    },
  ],
}
```

#### PUT /room/\<uuid>
Modify a room.

Request body can be any subset of these fields:
```json
{
  "room": "roomName",
  "private": true,
  "pinned": [
    "Need... coffee...",
    "Too fast!",
    "Cooooooooool!",
  ],
}
```

#### DELETE /room/\<uuid>
Delete a room. Only owners can delete a room.

Request and response empty.

#### POST /room/\<uuid>/join
Join a (possibly private) room. Existing token gets appended with private room access.

Request body (public room):
```json
{}
```

Request body (private room):
```json
{
  "code": "axu40d",
}
```

Response body (sets new token as cookie):
```json
{}
```

#### POST /room/\<uuid>/leave
Leave a room.

Request and response bodies are empty. Sets new token as cookie.

#### POST /room/\<uuid>/owner
Add owner to room. Two possibilities

Request body (from owner client, to add by email address):
```json
{
  "email": "ex@amp.le",
}
```

Success response status 201 and empty body.

Request body (from other client, with one-time code):
```json
{
  "code": "axu40d",
}
```

#### GET /room/\<uuid>/owner
Route can only be accessed by current owner to obtain a one-time code (limited validity) to grant ownership.

Request body:
```json
{}
```

Response body:
```json
{
  "code": "axu40d",
}
```

#### DELETE /room/\<uuid>/owner
Remove ownership. Only owner has access to this route.

#### POST /room/\<uuid>/poll

#### GET /room/\<uuid>/poll

#### DELETE /room/\<uuid>/poll

#### PUT /room/\<uuid>/poll