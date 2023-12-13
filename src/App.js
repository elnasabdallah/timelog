import { Box, Container } from "@mui/material";
import ButtonAppBar from "src/components/appBar/Appbar";

import LogButtons from "src/components/logButtons/LogButtons";
import Home from "src/pages/home/Home";

import Logtime from "src/features/logtime/Logtime";

function App() {
  return (
    <div className="App">
      <ButtonAppBar />
      <Container>
        <Box
          sx={{
            display: "flex",

            justifyContent: "center",
          }}
        >
          <LogButtons />
        </Box>
        <Home />
        <Logtime />
      </Container>
    </div>
  );
}

export default App;
