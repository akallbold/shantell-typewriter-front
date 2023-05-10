import "./App.css";
import InputPanel from "./InputPanel";
import TypewriterPanel from "./TypewriterPanel";
import { useEffect, useState } from "react";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import { useParams } from "react-router";

// const BACKEND_BASE_URL = process.env.REACT_APP_BACKEND_BASE_URL;

function App() {
  const [text, setText] = useState("");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  let { id } = useParams();

  const readText = () => {
    if (id) {
      setLoading(true);
      fetch("/.netlify/functions/getText", {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({ id }),
      })
        .then((res) => res.json())
        .then((res) => {
          setText(res.text);
          setLoading(false);
        })
        .catch((res) => {
          setError(res);
          setLoading(false);
        });
    }
  };

  useEffect(() => {
    readText();
  });

  if (error) console.log({ error });

  if (loading) return null;
  return (
    <div className="App">
      <Grid2 container sx={{ padding: "2rem", justifyContent: "center" }}>
        {id && (
          <Grid2>
            <TypewriterPanel text={text} />
          </Grid2>
        )}

        <Grid2>
          <InputPanel setError={setError} setLoading={setLoading} />
        </Grid2>
      </Grid2>
    </div>
  );
}

export default App;
