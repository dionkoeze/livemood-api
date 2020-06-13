## client direction events
These events are emitted by the server and caught by the client.

#### rooms
All rooms visible to the user.
```json
{
  
}
```

#### roomVotes
Contains current total and personal votes in a room.
```json
{
  "id": "roomId",
  "room": "roomName",
  "votes": [
    {
      "label": "moodLabel",
      "votes": 5.67,
      "personal": 0.43,
    },
  ],
}
```

#### poll
Contains the current poll.
```json
{
  "id": "roomId",
  "room": "roomName",
  "poll": "pollName",
  "active": true,
  "open": true, // options can be added
  "options": [
    "optionA",
    "optionB",
  ],
}
```

```json
{
  "poll": "pollName",
  "active": false,
}
```

#### pollVotes
Contains votes of the current poll.
```json
{
  "id": "roomId",
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
