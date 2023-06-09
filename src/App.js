import "./App.css";
import InputPanel from "./InputPanel";
import TypewriterPanel from "./TypewriterPanel";
import { useEffect, useState } from "react";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import { useParams } from "react-router";

const BACKEND_BASE_URL = process.env.REACT_APP_BACKEND_BASE_URL;

function App() {
  const [input, setInput] = useState("");
  const [text, setText] = useState("");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  let { id } = useParams();
  useEffect(() => {
    if (id) {
      setLoading(true);
      fetch(`${BACKEND_BASE_URL}/message/${id}`)
        .then((res) => res.json())
        .then((data) => {
          const row = data.rows[0];
          setText(row.text);
          setLoading(false);
        })
        .catch((err) => {
          console.log({ err });
          setError(err);
          setLoading(false);
        });
    }
  }, [id]);

  if (error) console.log({ error });

  if (loading) return null;

  return (
    <div className="App">
      <Grid2 container sx={{ padding: "2rem" }}>
        {id ? (
          <Grid2>
            <TypewriterPanel text={text} />
            <InputPanel
              input={input}
              setInput={setInput}
              setError={setError}
              loading={loading}
            />
          </Grid2>
        ) : (
          <Grid2>
            <InputPanel
              input={input}
              setInput={setInput}
              setError={setError}
              setLoading={setLoading}
              loading={loading}
            />
          </Grid2>
        )}
      </Grid2>
    </div>
  );
}

export default App;
