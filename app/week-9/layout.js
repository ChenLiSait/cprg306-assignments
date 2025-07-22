// app/week-9/layout.js
import { AuthContextProvider } from "./_utils/auth-context";

export default function Layout({ children }) {
  return <AuthContextProvider>{children}</AuthContextProvider>;
}
