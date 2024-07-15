import React, { useState, useEffect } from "react";
import { render } from "react-dom";
import Room from "./Room";
import RoomJoinPage from "./RoomJoinPage";
import CreateRoomPage from "./CreateRoomPage";
import { Grid, Button, ButtonGroup, Typography } from "@mui/material";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Navigate,
} from "react-router-dom";

export default function HomePage() {
  let [roomCode, setRoomCode] = useState(null);

  useEffect(() => {
    fetch('/api/user-in-room')
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setRoomCode(data.code);
      });
  });

  function clearRoomCode() {
    setRoomCode(null);
  }

  function renderHomePage() {
    return (
      <Grid container spacing={3}>
      <Grid item xs={12} align="center">
      <Typography variant="h3" compact="h3">
      House Party
      </Typography>
      </Grid>
      <Grid item xs={12} align="center">
      <ButtonGroup disableElevation variant="contained" color="primary">
      <Button color="primary" to="/join" component={Link}>
      Join a Room
      </Button>
      <Button color="success" to="/create" component={Link}>
      Create a Room
      </Button>
      </ButtonGroup>
      </Grid>
      </Grid>
    );
  }

  function homeConditionalRoute() {
    if (roomCode) {
      return (
        <Navigate to={`/room/${roomCode}`} />
      );
    }
    return renderHomePage();
  }


  return (
    <Router>
    <Routes>
    <Route exact path="/" element={homeConditionalRoute()} />
    <Route path="/join" element={<RoomJoinPage />} />
    <Route path="/create" element={<CreateRoomPage />} />
    <Route path="/room/:roomCode" element={<Room />} />
    </Routes>
    </Router>
  );
}
