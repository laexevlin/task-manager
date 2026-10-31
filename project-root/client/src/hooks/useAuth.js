import { useState, useEffect } from "react";
import * as authApi from "../api/auth.js";

export function useAuth(onAlert) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadCurrentUser() {
      try {
        const data = await authApi.getCurrentUser();
        setUser(data);
      } catch (error) {
        setUser(null);
      } finally {
        setLoading(false);
      }
    }
    loadCurrentUser();
  }, []);

  async function login(email, password) {
    let loggedInUser;
    try {
      loggedInUser = await authApi.login(email, password);
    } catch (err) {
      onAlert(err.message);
      return;
    }
    setUser(loggedInUser);
  }

  async function register(email, password) {
    let registeredUser;
    try {
      registeredUser = await authApi.register(email, password);
    } catch (err) {
      onAlert(err.message);
      return;
    }

    setUser(registeredUser);
  }

  async function logout() {
    await authApi.logout();
    setUser(null);
  }

  return { user, loading, login, register, logout };
}
