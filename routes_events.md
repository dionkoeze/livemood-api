## token contents
A token contains user permissions only.
```json
{
  "userid": "uuid",
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

## client direction events
These events are emitted by the server and caught by the client.

#### roomVotes
Contains current total votes in a room. It only contains total votes to make use of socket.io rooms. The personal votes are only sent to the single socket.
```json
{
  "room": "roomName",
  "votes": [
    {
      "label": "moodLabel",
      "votes": 5.67,
    },
  ],
}
```

#### socketVotes
Contains votes of this socket (i.e. personal votes) in a room.
```json
{
  "room": "roomName",
  "votes": [
    {
      "label": "moodLabel",
      "votes": 5.67,
    },
  ],
}
```

#### pollVotes
Contains votes of the current poll.
```json
{
  "room": "roomName",
  "poll": "pollName",
  "votes": [
    {
      "label": "optionLabel",
      "votes": 5.67,
    },
  ],
}
```

## server direction events
These events are emitted by the client and caught by the server.

#### voteLabel
Vote on a specific label in a room. Vote is only accepted when socket is in the room. Token required for private rooms.
```json
{
  "room": "roomName",
  "label": "moodLabel",
  "token": "jwt",
}
```

#### votePoll
Vote on a label in the current poll. Vote is only accepted when socket is in the room. Token required for private rooms.
```json
{
  "room": "roomName",
  "poll": "pollName",
  "label": "optionLabel",
  "token": "jwt",
}
```

#### join
Join a room. Effect is that votes and updates are sent to this client. Joining is idempotent. Token required for private rooms.
```json
{
  "room": "roomName",
  "token": "jwt",
}
```

#### leave
Leave a room. Effect is that votes and updates are not sent any more to this client. Leaving is idempotent.
```json
{
  "room": "roomName",
}
```

#### clear
Clear all votes and unpinned labels.

```json
{
  "room": "roomName",
  "token": "jwt",
}
```

#### removeLabel
Clear votes of specific label, removes label if unpinned.
```json
{
  "room": "roomName",
  "label": "moodLabel",
  "token": "jwt",
}
```

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

#### GET /join/<uuid>
Join a (possibly private) room.

Request body (token optionally gets updated):
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
  "token": "jwt",
}
```

Response body empty if successful with status 201.

#### GET /room/<uuid>
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

#### PUT /room
