## client direction events
These events are emitted by the server and caught by the client.

#### roomVotes
Contains current total votes in a room. It only contains total votes to make use of socket.io rooms. The personal votes are only sent to the single socket.
```json
{
  "id": "roomId",
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
  "id": "roomId",
  "room": "roomName",
  "votes": [
    {
      "label": "moodLabel",
      "votes": 5.67,
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
