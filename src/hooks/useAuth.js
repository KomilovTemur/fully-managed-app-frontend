export default function useAuth() {
  const user = { loggedIn: localStorage.getItem("token") };
  return user && user.loggedIn;
}
