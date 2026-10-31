import { useState } from "react";
import { Sun, MoonStar } from "lucide-react";

import "./AuthForm.css";

export default function AuthForm({
  onLogin,
  onRegister,
  onAlert,
  theme,
  onToggleTheme,
}) {
  const [authStatus, setAuthStatus] = useState("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const isLogin = authStatus === "login";

  async function handleSubmit(event) {
    event.preventDefault();
    if (!email.trim() || !password.trim()) return;

    setSubmitting(true);
    try {
      if (isLogin) {
        await onLogin(email, password);
      } else {
        await onRegister(email, password);
      }
      setEmail("");
      setPassword("");
    } catch (err) {
      onAlert(err.message);
    } finally {
      setSubmitting(false);
    }
  }

  function changeAuthStatus() {
    setAuthStatus(isLogin ? "register" : "login");
  }

  return (
    <>
      <button onClick={onToggleTheme} className="header__btn header__theme-btn auth__theme-btn">
        {theme === "light" ? <MoonStar /> : <Sun />}
      </button>
      <section className="auth-form">
        <form onSubmit={handleSubmit} className="auth-form__form">
          <h1>{isLogin ? "Log in" : "Sign up"}</h1>
          <input
            className="auth-form__input auth-form__input-email"
            placeholder="E-Mail"
            id="auth-email"
            type="text"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
          <input
            className="auth-form__input auth-form__input-password"
            autoComplete="off"
            placeholder="Password"
            id="auth-password"
            type="text"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
          <button
            type="submit"
            className="auth-form__btn auth-form__submit-btn"
            disabled={submitting}
          >
            {submitting ? "Please wait..." : isLogin ? "Log in" : "Sign up"}
          </button>
          <button
            type="button"
            className="auth-form__btn auth-form__change-btn"
            disabled={submitting}
            onClick={changeAuthStatus}
          >
            {isLogin
              ? "You have no account? Sign up"
              : "You already have an account? Log in"}
          </button>
        </form>
      </section>
    </>
  );
}
