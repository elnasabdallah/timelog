import { Box, CardContent, Typography } from "@mui/material";
import React from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

import { useDispatch } from "react-redux";
import { openModal, deleteLog } from "src/features/logtime/logTimeSlice";
const cardStyle = {
  border: "1px solid grey",
  borderRadius: "5px",
  marginTop: "0.5rem",
  position: "relative",
};
const LogCard = ({ log }) => {
  const dispatch = useDispatch();

  return (
    <>
      <CardContent sx={cardStyle}>
        <Typography sx={{ fontSize: 14 }} gutterBottom>
          Description : {log.description}
        </Typography>
        <Typography variant="h5" component="div"></Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          Date : {log.date}
        </Typography>
        <Typography variant="body2">Hours logged : {log.duration}h</Typography>
        <Box position="absolute" sx={{ top: "0", right: "0" }}>
          <Box display="flex" sx={{ gap: 2, margin: "1rem" }}>
            <EditIcon
              color="success"
              onClick={() => dispatch(openModal(log.Id))}
            />
            <DeleteIcon
              color="error"
              onClick={() => dispatch(deleteLog(log.Id))}
            />
          </Box>
        </Box>
      </CardContent>
    </>
  );
};

export default LogCard;
