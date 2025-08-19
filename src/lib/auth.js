export function saveAuth({ token, user }) {
  localStorage.setItem('auth.token', token);
  localStorage.setItem('auth.user', JSON.stringify(user));
}
export function getToken() {
  return localStorage.getItem('auth.token');
}
export function getUser() {
  const u = localStorage.getItem('auth.user');
  return u ? JSON.parse(u) : null;
}
export function clearAuth() {
  localStorage.removeItem('auth.token');
  localStorage.removeItem('auth.user');
}