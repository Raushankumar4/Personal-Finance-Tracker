import { Outlet } from "react-router-dom";
import { useAuth } from "./context/AuthContext";
import { useEffect } from "react";

const App = () => {
  const { isAuthenticated } = useAuth();
  useEffect(() => {
    if (!isAuthenticated) {
      window.location.href = "/login";
    }
  }, []);
  return (
    <div>
      <Outlet />
    </div>
  );
};

export default App;
