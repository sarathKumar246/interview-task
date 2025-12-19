import { useState } from "react";

export default function Generate() {
  const [role, setRole] = useState("");
  const [difficulty, setDifficulty] = useState("Junior");
  const [output, setOutput] = useState("");

  async function generate() {
    const res = await fetch("http://localhost:3000/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ role, difficulty })
    });

    const data = await res.json();
    setOutput(data.questions);
  }

  return (
    <>
      <h2>Generate Questions</h2>

      <input
        placeholder="Role (e.g. Software Developer)"
        onChange={e => setRole(e.target.value)}
      />

      <select onChange={e => setDifficulty(e.target.value)}>
        <option>Junior</option>
        <option>Mid</option>
        <option>Senior</option>
      </select>

      <button onClick={generate}>Generate</button>

      <pre>{output}</pre>
    </>
  );
}
