import {
  Box,
  Button,
  Divider,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  useMediaQuery,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";

import CloseIcon from "@mui/icons-material/Close";
import { useTheme } from "@mui/material/styles";

import { useDispatch, useSelector } from "react-redux";
import {
  logTime,
  selectActivelog,
  closeModal,
  selectOpenModal,
} from "src/features/logtime/logTimeSlice";
import { generateHalfHourArray } from "./utils";

const Logtime = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: isMobile ? "90%" : 600,
    bgcolor: "background.paper",
    " .MuiInputLabel-shrink": {
      margin: "-0.5rem",
    },

    boxShadow: 24,
    p: 4,
  };

  const open = useSelector(selectOpenModal);
  const activeLog = useSelector(selectActivelog);
  const dispatch = useDispatch();
  const [startEnd, setStartEnd] = useState(false);
  const toggleStartEnd = () => setStartEnd(!startEnd);
  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(logTime(formFields, activeLog ? activeLog.Id : ""));
  };
  const [formFields, setFormFields] = useState({
    Id: "",
    description: "",
    date: "",
    duration: "",
    start: "",
    end: "",
    startEnd: false,
  });
  useEffect(() => {
    if (activeLog)
      setFormFields({
        Id: activeLog.Id,
        description: activeLog.description,
        date: activeLog.date,
        duration: activeLog.duration,
        start: "",
        end: "",
        startEnd: false,
      });
  }, [activeLog]);
  const handleFormField = (event) => {
    let val = event.target.value;
    let key = event.target.name;
    setFormFields({ ...formFields, [key]: val });
  };

  const hoursArray = generateHalfHourArray();

  return (
    <>
      {open && (
        <Box sx={{ p: "2rem" }}>
          <Modal
            open={open}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <form onSubmit={handleSubmit} autoComplete="off">
                <Typography id="modal-modal-title" variant="h6" component="h2">
                  Log Time
                </Typography>
                <Divider sx={{ my: 3 }} />
                <Box sx={{ mb: 3 }}>
                  <TextField
                    label="Work description"
                    name="description"
                    value={formFields.description}
                    onChange={handleFormField}
                    id="description"
                    type="text"
                    required
                    variant="outlined"
                    fullWidth
                  />
                </Box>

                <Box
                  display={"flex"}
                  gap={2}
                  sx={{ justifyContent: "space-between" }}
                  alignItems={"center"}
                >
                  <TextField
                    value={formFields.date}
                    onChange={(e) => handleFormField(e)}
                    id="date"
                    name="date"
                    required
                    variant="outlined"
                    type="date"
                    fullWidth
                  />{" "}
                  {!startEnd && (
                    <TextField
                      value={formFields.duration}
                      onChange={(e) => handleFormField(e)}
                      id="duration"
                      required
                      name="duration"
                      variant="outlined"
                      type="number"
                      fullWidth
                      label="Duration "
                    />
                  )}
                  {!startEnd ? (
                    <Typography
                      style={{ textDecoration: "underline", cursor: "pointer" }}
                      onClick={() => toggleStartEnd()}
                      sx={{ width: "100%" }}
                    >
                      Set Start and end time
                    </Typography>
                  ) : (
                    <>
                      {" "}
                      <FormControl fullWidth>
                        <InputLabel>Start Time</InputLabel>
                        <Select
                          value={formFields.start}
                          onChange={(e) => handleFormField(e)}
                          id="start"
                          name="start"
                          required={startEnd}
                        >
                          {hoursArray.map((hour) => (
                            <MenuItem key={hour} value={hour}>
                              {hour}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                      <FormControl fullWidth>
                        <InputLabel>End Time</InputLabel>
                        <Select
                          value={formFields.end}
                          onChange={(e) => handleFormField(e)}
                          id="end"
                          name="end"
                          required={startEnd}
                        >
                          {hoursArray.map((hour) => (
                            <MenuItem key={hour} value={hour}>
                              {hour}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                      <CloseIcon
                        style={{ cursor: "pointer" }}
                        onClick={() => toggleStartEnd()}
                      />
                    </>
                  )}
                </Box>

                <Box sx={{ mt: 5, float: "right", display: "flex", gap: 2 }}>
                  <Button variant="contained" type="submit">
                    Log time
                  </Button>
                  <Button
                    variant="outlined"
                    onClick={() => dispatch(closeModal(false))}
                  >
                    Cancel
                  </Button>
                </Box>
              </form>
            </Box>
          </Modal>
        </Box>
      )}
    </>
  );
};

export default Logtime;
