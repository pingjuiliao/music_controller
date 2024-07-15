import React, { Component, useState } from "react";
import { render } from "react-dom";
import { TextField, Button, Grid, Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";

export default function HomePage() {

  const navigate = useNavigate();
  let [roomCode, setRoomCode] = useState("");
  let [error, setError] = useState("");

  function handleTextFieldChange(e) {
    setRoomCode(e.target.value);
  }

  function roomButtonPressed() {
    // console.log(roomCode);
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        code: roomCode
      }),
    };
    fetch('/api/join-room', requestOptions)
      .then((response) => {
        if (response.ok) {
          navigate(`/room/${roomCode}`);
        } else {
          setError("Room not found");
        }
      }).catch((err) => {
        console.log(err);
      });
  }

  return (
    <Grid container spacing={1} alignItems="center" direction="column">
      <Grid item xs={12}>
        <Typography variant="h4" component="h4">
          Join a Room
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <TextField
          error={error}
          label="Code"
          placeholder="Enter a Room Code"
          value={roomCode}
          helperText={error}
          variant="outlined"
          onChange={handleTextFieldChange}
        />
      </Grid>
      <Grid item xs={12}>
        <Button variant="contained" color="primary"
         onClick={roomButtonPressed}>
          Enter Room
        </Button>
      </Grid>
      <Grid item xs={12}>
        <Button variant="contained" color="success" to="/" component={Link}>
          Back
        </Button>
      </Grid>
    </Grid>
  );
}
