import React, { Component, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Grid, Button, Typography } from '@mui/material';
import CreateRoomPage from "./CreateRoomPage";

export default function Room() {
  const { roomCode } = useParams();
  const navigate = useNavigate();
  const [roomState, setRoomState] = useState({
    votesToSkip: 2,
    guestCanPause: false,
    isHost: false,
  });

  const [showSettings, setShowSettings] = useState(false);


  fetch("/api/get-room" + "?code=" + roomCode)
    .then((response) => {
      if (!response.ok) {
        navigate("/create");
      }
      return response.json(); })
    .then((data) => {
      setRoomState({
        votesToSkip: data.votes_to_skip,
        guestCanPause: data.guest_can_pause,
        isHost: data.is_host,
      });
  });

  function leaveButtonPressed() {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    };

    fetch("/api/leave-room", requestOptions)
      .then((_response) => {
        navigate("/");
    });
  }

  function renderSettingsButton() {
    return (
      <Grid item xs={12} align="center">
        <Button variant="contained" color="primary" onClick={() => setShowSettings(true)}>
          Settings
        </Button>
      </Grid>
    );
  }

  function renderSettings() {
    return (
    <Grid container spacing={1}>
      <Grid item xs={12} align="center"></Grid>
      <CreateRoomPage update={true} votesToSkip={roomState.votesToSkip}
        guestCanPause={roomState.guestCanPause}
        roomCode={roomCode}
        updateCallBack={null} />
      <Grid item xs={12} align="center">
        <Button variant="contained" color="success" onClick={() => setShowSettings(false)}>
          Close
        </Button>
      </Grid>
    </Grid>
    );
  }

  if (showSettings) {
    return renderSettings();
  }

  return (
    <Grid container spacing={1}>
      <Grid item xs={12} align="center">
        <Typography variant="h4" component="h4">
           Code: {roomCode}
        </Typography>
      </Grid>
      <Grid item xs={12} align="center">
        <Typography variant="h6" component="h6">
           Votes: {roomState.votesToSkip}
        </Typography>
      </Grid>
      <Grid item xs={12} align="center">
        <Typography variant="h6" component="h6">
           Guest Can Pause: {roomState.guestCanPause.toString()}
        </Typography>
      </Grid>
      <Grid item xs={12} align="center">
        <Typography variant="h6" component="h6">
           Host: {roomState.isHost.toString()}
        </Typography>
      </Grid>
      {roomState.isHost? renderSettingsButton(): null}
      <Grid item xs={12} align="center">
        <Button variant="contained" color="success" onClick={leaveButtonPressed}>
          Leave Room
        </Button>
      </Grid>
    </Grid>
  );
}
 /*<div>
    <h3>{roomCode}</h3>
    <p>Votes: {roomState.votesToSkip}</p>
    <p>Guest Can Pause: {roomState.guestCanPause.toString()}</p>
    <p>is host: {roomState.isHost.toString()}</p>
    </div*/
