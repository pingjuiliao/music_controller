import React, { Component, useState } from 'react';
import { useParams } from 'react-router-dom';

export default function Room() {
  const { roomCode } = useParams();

  const [roomState, setRoomState] = useState({
    votesToSkip: 2,
    guestCanPause: false,
    isHost: false,
  });

  fetch("/api/get-room" + "?code=" + roomCode)
    .then((response) => response.json())
    .then((data) => {
      setRoomState({
        votesToSkip: data.votes_to_skip,
        guestCanPause: data.guest_can_pause,
        isHost: data.is_host,
      });
  });

  return (
    <div>
    <h3>{roomCode}</h3>
    <p>Votes: {roomState.votesToSkip}</p>
    <p>Guest Can Pause: {roomState.guestCanPause.toString()}</p>
    <p>is host: {roomState.isHost.toString()}</p>
    </div>
  );
}
