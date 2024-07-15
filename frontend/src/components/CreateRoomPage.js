import React, { Component } from "react";
import { render } from "react-dom";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import { Link, useNavigate } from "react-router-dom";
import { browserHistory } from "react-router";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";


export default function HomePage() {
  const navigate = useNavigate();
  let defaultVotes = 2;
  let state = {
    guestCanPause: true,
    votesToSkip: defaultVotes,
  };


  function handleVotesChange(e) {
    state.votesToSkip = e.target.value;
  }

  function handleGuestCanPauseChange(e) {
    state.guestCanPause = (e.target.value === "true")? true: false;
  }

  function handleRoomButtonPressed() {
    // console.log(state);
    const requestOptions = {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        votes_to_skip: state.votesToSkip,
        guest_can_pause: state.guestCanPause,
      }),
    };
    fetch('/api/create-room', requestOptions)
      .then((response) => response.json())
      .then((data) => {
        navigate("/room/" + data.code)
      });
  }

  return (
    <Grid container spacing={1}>
      <Grid item xs={12} align="center">
        <Typography component="h4" variant="h4">
          Create A Room
        </Typography>
      </Grid>
      <Grid item xs={12} align="center">
        <FormControl component="fieldset">
          <FormHelperText>
            <div align="center">Guest Control of Playback State</div>
          </FormHelperText>
          <RadioGroup row defaultValue="true"
           onChange={handleGuestCanPauseChange}>
            <FormControlLabel
             value="true"
             control={<Radio color="primary" />}
             label="Play/Pause"
             labelPlacement="bottom"
            />
            <FormControlLabel
             value="false"
             control={<Radio color="default" />}
             label="No Control"
             labelPlacement="bottom"
            />
          </RadioGroup>
        </FormControl>
      </Grid>
      <Grid item xs={12} align="center">
        <FormControl>
          <TextField required={true}
           type="number"
           onChange={handleVotesChange}
           defaultValue={defaultVotes}
           inputProps={{
             min: 1,
             style: {textAlign: "center"}
           }}
          />
          <FormHelperText>
            <div align="center">Votes Required To Skip Song</div>
          </FormHelperText>
        </FormControl>
      </Grid>
      <Grid item xs={12} align="center">
        <Button color="primary" variant="contained"
         onClick={handleRoomButtonPressed}>
           Create A Room
        </Button>
      </Grid>
      <Grid item xs={12} align="center">
        <Button color="error" variant="contained" to="/"
         component={Link}>
          Back
        </Button>
      </Grid>
    </Grid>
  );
}
