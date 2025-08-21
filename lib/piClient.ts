declare global {
  interface Window { Pi: any }
}
export function initPi(sandbox = true) {
  if (typeof window === "undefined" || !window.Pi) return null;
  window.Pi.init({ version: "2.0", sandbox });
  return window.Pi;
}
