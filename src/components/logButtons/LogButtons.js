import { Box, Button, Stack } from "@mui/material";
import React from "react";

import {
  openModal,
  startLogging,
  stopLogging,
  selectStartTime,
} from "src/features/logtime/logTimeSlice";
import { useDispatch, useSelector } from "react-redux";

const LogButtons = () => {
  const dispatch = useDispatch();
  const startTime = useSelector(selectStartTime);

  return (
    <Box sx={{ p: "2rem" }}>
      <Stack spacing={2} direction="row">
        {!startTime ? (
          <Button variant="contained" onClick={() => dispatch(startLogging())}>
            Start
          </Button>
        ) : (
          <Button
            variant="contained"
            onClick={() => dispatch(stopLogging())}
            color={startTime ? "error" : ""}
          >
            Stop
          </Button>
        )}

        <Button onClick={() => dispatch(openModal())} variant="contained">
          Log Time
        </Button>
      </Stack>
    </Box>
  );
};

export default LogButtons;
