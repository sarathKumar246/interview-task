import { useEffect, useState } from "react";

export default function Saved() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/saved")
      .then(res => res.json())
      .then(setData);
  }, []);

  return (
    <>
      <h2>Saved Question Sets</h2>

      <a href="http://localhost:3000/export">
        <button>Export CSV</button>
      </a>

      <pre>{JSON.stringify(data, null, 2)}</pre>
    </>
  );
}
