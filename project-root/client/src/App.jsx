import "./App.css";
import { useAuth } from "./hooks/useAuth.js";
import TaskSection from "./components/TaskSection.jsx";
import AuthForm from "./components/AuthForm.jsx";
import Toast from "./components/Toast.jsx";
import { useState, useEffect } from "react";

export default function App() {
  const [alertText, setAlertText] = useState("");
  const [theme, setTheme] = useState(
    () => localStorage.getItem("theme") || "light",
  );
  const { user, loading, login, register, logout } = useAuth(setAlertText);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!user) {
    return (
      <>
        <Toast alertText={alertText} onClose={() => setAlertText("")} />
        <AuthForm
          onLogin={login}
          onRegister={register}
          onAlert={setAlertText}
          onToggleTheme={toggleTheme}
          theme={theme}
        />
      </>
    );
  }
  return (
    <>
      <Toast alertText={alertText} onClose={() => setAlertText("")} />
      <TaskSection
        onLogout={logout}
        onAlert={setAlertText}
        onToggleTheme={toggleTheme}
        theme={theme}
      />
    </>
  );
}
