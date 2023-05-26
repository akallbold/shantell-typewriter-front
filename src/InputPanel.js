import { useState } from "react";
import "./App.css";
import { Button, CircularProgress, IconButton, TextField } from "@mui/material";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";

const createShortUrlEndpoint = process.env.REACT_APP_CREATE_SHORT_URL_ENDPOINT;
const baseUrl = process.env.REACT_APP_BASE_URL;
const characters =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"; // B64

function InputPanel(props) {
  const { setError } = props;
  const [urlToCopy, setUrlToCopy] = useState("");
  const [loading, setLoading] = useState("");
  const [input, setInput] = useState("");

  const saveTextToDatabase = async () => {
    const uuid = Math.random().toString(36).substring(7);
    const body = JSON.stringify({ text: input, id: uuid });

    fetch("/.netlify/functions/writeText", {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(body),
    })
      .then((res) => res.json())
      .then((res) => {
        return `${baseUrl}${res.id}`;
      })
      .catch(function (res) {
        setError(res);
        setLoading(false);
      });
  };

  const createRandomString = () => {
    let result = "";
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < 6) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
      counter += 1;
    }
    return result;
  };

  const getBitlyAddress = async (fullUrl) => {
    if (createShortUrlEndpoint) {
      const newShortUrlId = createRandomString();
      fetch(createShortUrlEndpoint, {
        method: "POST",
        body: JSON.stringify({ fullUrl, newShortUrlId }),
      })
        .then((res) => res.json())
        .then((res) => res.id)
        .catch((res) => {
          setError(res);
          setLoading(false);
        });
    }
  };

  const saveText = async () => {
    setLoading(true);
    const longUrl = await saveTextToDatabase();
    const shortUrl = await getBitlyAddress(longUrl);
    setUrlToCopy(shortUrl);
    setLoading(false);
  };

  const copyText = () => {
    navigator.clipboard.writeText(urlToCopy);
  };
  console.log({ urlToCopy });
  return (
    <Grid2 container sx={{ width: "100%" }} justifyContent="center">
      <Grid2
        flexDirection="column"
        sx={{ border: "thick double #000000", marginBottom: "2rem" }}
      >
        <span>
          To generate your own handwritten note, type a phrase in the text
          container below and press the 'Get Link' button. Then visit the link
          provided to watch your text be handwritten in the coolest font out
          there,
          <span className="shantell"> Shantell Sans!</span>
        </span>
      </Grid2>
      <Grid2> {loading && <CircularProgress sx={{ margin: "1rem" }} />}</Grid2>
      {urlToCopy && (
        <Grid2
          flexDirection="row"
          alignContent="center"
          justifyContent="center"
        >
          <span>{urlToCopy}</span>
          <IconButton onClick={copyText}>
            <ContentCopyIcon />
          </IconButton>
        </Grid2>
      )}
      <Grid2 flexDirection="column" display="flex" sx={{ width: "100%" }}>
        <TextField
          value={input}
          onChange={(e) => setInput(e.target.value)}
          sx={{
            width: "100%",
          }}
        />
        <Button
          variant="contained"
          color="secondary"
          onClick={saveText}
          sx={{
            marginTop: ".5rem",
            fontWeight: "bold",
            width: "100%",
          }}
        >
          Get Link ✍️
        </Button>
      </Grid2>
    </Grid2>
  );
}

export default InputPanel;
