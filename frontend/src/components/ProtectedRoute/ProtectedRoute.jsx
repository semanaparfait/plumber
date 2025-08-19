import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";

axios.defaults.withCredentials = true; // send cookies automatically

const ProtectedRoute = ({ children }) => {
    const API_URL =
    process.env.NODE_ENV === "development"
      ? "http://localhost:5000"
      : "https://einstein-plumbers1.onrender.com";

  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    axios.get(`${API_URL}/api/me`)
      .then(() => setAuthenticated(true))
      .catch(() => setAuthenticated(false))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Loading...</p>;

  return authenticated ? children : <Navigate to="/" replace />;
};

export default ProtectedRoute;
