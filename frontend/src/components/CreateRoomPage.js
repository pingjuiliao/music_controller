import React from "react";
import {Component, useState} from "react";
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
import { Collapse } from "@mui/material";
import Alert from '@mui/material/Alert';

export default function CreateRoomPage({
  guestCanPause = true,
  votesToSkip = 2,
  update = false,
  roomCode = null,
  updateCallback = (() => {}),
}) {

  let [getVotesToSkip, setVotesToSkip] = useState(votesToSkip);
  let [getGuestCanPause, setGuestCanPause] = useState(guestCanPause);
  let [errorMsg, setErrorMsg] = useState("");
  let [successMsg, setSuccessMsg] = useState("");

  const navigate = useNavigate();

  function handleVotesChange(e) {
    setVotesToSkip(e.target.value);
  }

  function handleGuestCanPauseChange(e) {
    const canPause = (e.target.value === "true")? true: false;
    setGuestCanPause(canPause);
  }

  function handleRoomButtonPressed() {
    const requestOptions = {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        votes_to_skip: getVotesToSkip,
        guest_can_pause: getGuestCanPause,
      }),
    };
    fetch('/api/create-room', requestOptions)
      .then((response) => response.json())
      .then((data) => {
        navigate("/room/" + data.code)
      });
  }


  function renderCreateButtons() {
      return (
              <Grid container spacing={1}>
                <Grid item xs={12} align="center">
                  <Button
                    color="primary"
                    variant="contained"
                    onClick={handleRoomButtonPressed}
                  >
                    Create A Room
                  </Button>
                </Grid>
                <Grid item xs={12} align="center">
                  <Button color="success" variant="contained" to="/" component={Link}>
                    Back
                  </Button>
                </Grid>
              </Grid>
      );
  }

  function handleUpdateButtonPressed() {
    // console.log(state);
    const requestOptions = {
      method: 'PATCH',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        votes_to_skip: getVotesToSkip,
        guest_can_pause: getGuestCanPause,
        code: roomCode,
      }),
    };
    fetch('/api/update-room', requestOptions)
      .then((response) => {
        if (response.ok) {
          setSuccessMsg("Room Updated successfully!");
        } else {
          setErrorMsg("Error updating room...");
        }
        updateCallback();
      });
  }



  function renderUpdateButtons() {
      return (
              <Grid container spacing={1}>
                <Grid item xs={12} align="center">
                  <Button
                    color="primary"
                    variant="contained"
                    onClick={handleUpdateButtonPressed}
                  >
                    Update Room
                  </Button>
                </Grid>
              </Grid>
      );
  }

  // console.log(update);
  const title = (update)? "Update Room": "Create a Room";

  return (
    <Grid container spacing={1}>
      <Grid item xs={12} align="center">
          <Collapse in={errorMsg != "" || successMsg != ""}>
            {(successMsg != "")? (
              <Alert severity="success"
               onClose={() => {setSuccessMsg("")}}>
              successMsg </Alert>
            ): (
              <Alert severity="error"
               onClose={() => {setErrorMsg("")}}>
              errorMsg</Alert>
            )}
          </Collapse>
      </Grid>
      <Grid item xs={12} align="center">
        <Typography component="h4" variant="h4">
          {title}
        </Typography>
      </Grid>
      <Grid item xs={12} align="center">
        <FormControl component="fieldset">
          <FormHelperText>
            <div align="center">Guest Control of Playback State</div>
          </FormHelperText>
        <RadioGroup row defaultValue={getGuestCanPause}
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
           defaultValue={getVotesToSkip}
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
      {(update)? renderUpdateButtons(): renderCreateButtons()}
    </Grid>
  );
}
