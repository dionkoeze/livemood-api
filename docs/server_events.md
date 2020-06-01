## server direction events
These events are emitted by the client and caught by the server.

#### voteLabel
Vote on a specific label in a room. Vote is only accepted when socket is in the room. Token required for private rooms.
```json
{
  "id": "roomUuid",
  "label": "moodLabel",
  "token": "jwt",
}
```

#### votePoll
Vote on a label in the current poll. Vote is only accepted when socket is in the room. Token required for private rooms.
```json
{
  "id": "roomUuid",
  "poll": "pollName",
  "label": "optionLabel",
  "token": "jwt",
}
```

#### join
Join a room. Effect is that votes and updates are sent to this client. Joining is idempotent. Token required for private rooms.
```json
{
  "id": "roomUuid",
  "token": "jwt",
}
```

#### leave
Leave a room. Effect is that votes and updates are not sent any more to this client. Leaving is idempotent.
```json
{
  "id": "roomUuid",
}
```

#### clear
Clear all votes and unpinned labels.

```json
{
  "id": "roomUuid",
  "token": "jwt",
}
```

#### removeLabel
Clear votes of specific label, removes label if unpinned.
```json
{
  "id": "roomUuid",
  "label": "moodLabel",
  "token": "jwt",
}
```

#### pinLabel
Set pinned status of label (use to pin or unpin). 
```json
{
  "id": "roomUuid",
  "label": "moodLabel",
  "pinned": true
}
```
