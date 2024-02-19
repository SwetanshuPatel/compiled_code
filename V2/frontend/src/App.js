import { useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import axios from "axios";
import Login from "./Components/Auth/login";
import Home from "./Components/Home/home";

export default function App() {
  const [user, setUser] = useState(null);

  const getUser = async () => {
    try {
      const url = `${process.env.REACT_APP_BACKEND_URL}/auth/login/success`;
      const { data } = await axios.get(url, { withCredentials: true });
      setUser(data.user.json);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <Routes>
      <Route
        exact
        path="/"
        element={user ? <Home user={user} /> : <Navigate to="/login" />}
      />
      <Route
        exact
        path="/login"
        element={user ? <Navigate to="/" /> : <Login />}
      />
    </Routes>
  );
}