## http endpoints

#### POST /auth
Request token for authentication.

Request body:
```json
{
  "email": "ex@amp.le",
  "password": "superSecret",
}
```

Reponse body:
```json
{
  "token": "jwt",
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

Response body status 201 (if successful):
```json
{
  "token": "jwt",
}
```

Otherwise status 

#### GET /user
Retrieve user information based on token. Route is guarded, status 401 if token is invalid.

Request body:
```json
{
  "token": "jwt",
}
```

Response body:
```json
{
  "email": "ex@amp.le",
}
```

#### GET /join/\<uuid>
Join a (possibly private) room. Uuid is *not* room uuid, but ephemeral join id. Token supplied gets appended with private room access.

Request body:
```json
{
  "token": "jwt",
}
```

Response body:
```json
{
  "token": "jwt",
}
```

#### POST /room
Create a new room. Route is guarded, status 401 if token is invalid.

Request body:
```json
{
  "room": "roomName",
  "token": "jwt",
}
```

Response body with status 201:
```json
{
  "id": "roomId",
  "token": "jwt",
}
```

#### GET /room/\<uuid>
Get room details. Route is guarded, status 401 if token is invalid.

Request body:
```json
{
  "token": "jwt",
}
```

Response body:
```json
{
  "id": "uuid",
  "room": "roomName",
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

#### DELETE /room/\<uuid>
Delete a room.

Request and response empty.

#### POST /room/\<uuid>/owner
Add owner to room.

Request body:
```json
{
  "token": "jwt",
  "email": "ex@amp.le",
}
```

Response body:
```json

```

#### DELETE /room/\<uuid>/owner
Remove ownership. Only owner itself has access to this route.

#### POST /room/\<uuid>/poll

#### GET /room/\<uuid>/poll

#### DELETE /room/\<uuid>/poll

#### PUT /room/\<uuid>/poll