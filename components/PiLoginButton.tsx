import React from "react";
import axios from "axios";
import { initPi } from "@/lib/piClient";

const API_BASE = process.env.NEXT_PUBLIC_API_URL!;

export default function PiLoginButton() {
  const onLogin = async () => {
    const Pi = initPi(true); // Sandbox: true
    if (!Pi) return alert("Open this site inside Pi Browser.");

    try {
      const scopes = ["username", "payments"];
      const authResult = await Pi.authenticate(scopes, (p:any) => {
        console.log("Incomplete payment found:", p);
      });

      const { data } = await axios.post(`${API_BASE}/api/pi/login`, {
        uid: authResult.user.uid,
        username: authResult.user.username,
        accessToken: authResult.accessToken
      });

      if (data.ok) {
        localStorage.setItem("token", data.token);
        alert("Logged in with Pi!");
      } else {
        alert(data.message || "Login failed");
      }
    } catch (e:any) {
      console.error(e);
      alert(e?.message || "Pi login error");
    }
  };

  return <button onClick={onLogin}>Sign in with Pi</button>;
}
