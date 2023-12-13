import { React, useEffect } from "react";
import LogCard from "src/components/logCard/LogCard";
import { useDispatch, useSelector } from "react-redux";
import { selectlog, daylogged, today } from "src/features/logtime/logTimeSlice";
import { Box, useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import PieChart from "src/components/chart/PieChart";

const Home = () => {
  const theme = useTheme();
  const logs = useSelector(selectlog);
  const loggedToday = useSelector(today);
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const dispatch = useDispatch();
  const style = {
    width: isMobile ? "90%" : "50%",
  };

  useEffect(() => {
    dispatch(daylogged());
  });

  return (
    <Box>
      <Box sx={{ display: "flex", justifyContent: "space-around" }}>
        <PieChart
          labelShare="logged today"
          labelTotal="unlogged"
          share={loggedToday}
          total={20}
        />
        <PieChart
          labelShare="logged this week"
          labelTotal="unlogged"
          share={0}
          total={20}
        />
        <PieChart
          labelShare="logged this month"
          labelTotal="unlogged"
          share={0}
          total={20}
        />
      </Box>

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {logs ? (
          logs.map((log) => (
            <Box key={log.Id} sx={style}>
              <LogCard log={log}></LogCard>
            </Box>
          ))
        ) : (
          <></>
        )}
      </Box>
    </Box>
  );
};

export default Home;
