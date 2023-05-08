import TypewriterComponent from "typewriter-effect";
import "./App.css";
import { Box } from "@mui/material";

function TypewriterPanel(props) {
  const { text } = props;
  if (!text) return;
  return (
    <Box className="shantell" sx={{ width: "100%", height: "100vh" }}>
      <TypewriterComponent
        onInit={(typewriter) => {
          typewriter.typeString(text).start();
        }}
      />
    </Box>
  );
}

export default TypewriterPanel;
