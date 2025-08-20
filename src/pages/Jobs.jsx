import React, { useEffect, useState } from "react";
import API from "../lib/api.js"; // note the .js extension

export default function Jobs() {
  const [jobs, setJobs] = useState([]);
  const [err, setErr] = useState("");

  useEffect(() => {
    (async () => {
      try {
        const res = await API.get("/jobs");
        setJobs(res.data.jobs || []);
      } catch (e) {
        setErr("Couldn't load jobs. Please try again.");
      }
    })();
  }, []);

  return (
    <div>
      <h1 style={{fontSize: 28, fontWeight: 700, marginBottom: 16}}>Open Jobs</h1>
      {err && <p style={{color: "crimson"}}>{err}</p>}
      {jobs.map((j) => (
        <div key={j.id} style={{border: "1px solid #eee", borderRadius: 8, padding: 16, marginBottom: 12}}>
          <div style={{fontWeight: 700, marginBottom: 6}}>{j.title}</div>
          <div style={{color: "#555", marginBottom: 6}}>Budget: {j.budget} PI</div>
          <div>{j.description}</div>
          <div style={{color: "#777", marginTop: 8, fontSize: 14}}>
            Platform fee {j.platformFeePct}% · Client fee {j.clientFeePct}%
          </div>
        </div>
      ))}
    </div>
  );
}