import PiLoginButton from "@/components/PiLoginButton";
import PiPayButton from "@/components/PiPayButton";

export default function Home() {
  return (
    <main style={{ padding: 24, fontFamily: "system-ui" }}>
      <h1>Freelance Pi Hub</h1>
      <p>Test Pi sign-in and payment (Sandbox).</p>
      <div style={{ display: "grid", gap: 12, maxWidth: 320 }}>
        <PiLoginButton />
        <PiPayButton />
      </div>
    </main>
  );
}
