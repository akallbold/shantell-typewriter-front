import { useState } from "react";
import "./App.css";
import { Button, IconButton, Box, TextField } from "@mui/material";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";

function InputPanel(props) {
  const { input, setInput, setError, loading, setLoading } = props;
  const [url, setUrl] = useState("");

  const saveTextToDatabase = async () => {
    setLoading(true);
    const uuid = Math.random().toString(36).substring(7);
    const body = JSON.stringify({ text: input, id: uuid });
    try {
      fetch("/.netlify/functions/writeText", {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify(body),
      })
        .then(function (res) {
          console.log({ res });
          setUrl(`${window.location.href}${uuid}`);
          setLoading(false);
        })
        .catch(function (res) {
          setError(res);
          setLoading(false);
        });
    } catch (err) {
      console.log(err);
    }
  };

  const copyText = (t) => {
    console.log("Copy text to clipboard: ", t);
    navigator.clipboard.writeText(t);
  };

  if (loading) return null;

  return (
    <Box sx={{ width: "100%" }}>
      <span>
        To use this site, input a phrase in the textbox below and press the
        submit button. Then visit the link provided to watch your text be
        written in the coolest font out there,
        <span className="shantell"> Shantell Sans!</span>
      </span>
      {/* {url && ( */}
      <>
        <h3>{url}</h3>
        <IconButton onClick={() => copyText(url)}>
          <ContentCopyIcon />
        </IconButton>
      </>
      {/* )} */}

      <TextField value={input} onChange={(e) => setInput(e.target.value)} />
      <Button variant="contained" onClick={saveTextToDatabase}>
        Get Link
      </Button>
    </Box>
  );
}

export default InputPanel;
