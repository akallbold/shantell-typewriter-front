import { useEffect, useState } from "react";
import "./App.css";
import { Button, IconButton, Box, TextField } from "@mui/material";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";

const BACKEND_BASE_URL = process.env.REACT_APP_BACKEND_BASE_URL;

function InputPanel(props) {
  const { input, setInput, setError, loading, setLoading } = props;
  const [url, setUrl] = useState("");

  const writeData = async (body) => {
    try {
      const res = await fetch(`${BACKEND_BASE_URL}/create-message`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body,
      });
      return res.json();
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    console.log(url);
  }, [url]);

  const saveTextToDatabase = async () => {
    setLoading(true);
    const uuid = Math.random().toString(36).substring(7);
    const body = JSON.stringify({ text: input, id: uuid, date: Date.now() });
    try {
      await writeData(body);
      const localURL = `${window.location.href}${uuid}`;
      setUrl(localURL);
      setLoading(false);
    } catch (e) {
      setError(e);
      setLoading(false);
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
