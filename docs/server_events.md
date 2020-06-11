## server direction events
These events are emitted by the client and caught by the server.

#### voteLabel
Vote on a specific label in a room. Vote is only accepted when socket is in the room. Token required for private rooms.
```json
{
  "id": "roomId",
  "label": "moodLabel",
}
```

#### retractVoteLabel
Clear your vote of a specific label.
```json
{
  "id": "roomId",
  "label": "moodLabel",
}
```

#### votePoll
Vote on a label in the current poll. Vote is only accepted when socket is in the room. Token required for private rooms.
```json
{
  "id": "roomId",
  "poll": "pollName",
  "label": "optionLabel",
}
```

#### restractVotePoll
Clear your vote of a label in a poll
```json
{
  "id": "roomId",
  "poll": "pollName",
  "label": "optionLabel",
}
```

#### clear
Clear all votes and unpinned labels.

```json
{
  "id": "roomId",
}
```

#### clearLabel
Clear votes of specific label, removes label if unpinned.
```json
{
  "id": "roomId",
  "label": "moodLabel",
  "token": "jwt",
}
```

#### pinLabel
Set pinned status of label (use to pin or unpin). 
```json
{
  "id": "roomId",
  "label": "moodLabel",
  "pinned": true
}
```
