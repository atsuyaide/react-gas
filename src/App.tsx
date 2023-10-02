import { Backdrop, CircularProgress } from "@mui/material";
import { useState } from "react";
import "./App.css";
import Form from "./components/ Form";
import Icons from "./components/Icons";

function App() {
  const [loading, setLoading] = useState<boolean>(false);
  return (
    <>
      <Icons />
      <Form setLoading={setLoading} />
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </>
  );
}

export default App;
