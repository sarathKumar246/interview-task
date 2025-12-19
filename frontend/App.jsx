import { useState } from "react";
import Generate from "./Generate";
import Saved from "./Saved";

export default function App() {
  const [page, setPage] = useState("generate");

  return (
    <div style={{ padding: 20 }}>
      <h1>Mini Interview Question Generator</h1>

      <button onClick={() => setPage("generate")}>Generate</button>
      <button onClick={() => setPage("saved")}>My Question Sets</button>

      {page === "generate" ? <Generate /> : <Saved />}
    </div>
  );
}
