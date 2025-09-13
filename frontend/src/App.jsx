import { Outlet } from "react-router-dom";
import { useAuth } from "./context/AuthContext";
import { useEffect } from "react";
import { Navbar } from "./components/Navbar/Navbar";

const App = () => {
  const { isAuthenticated } = useAuth();
  useEffect(() => {
    if (!isAuthenticated) {
      window.location.href = "/login";
    }
  }, []);
  return (
    <div>
      <Navbar/>
      <Outlet />
    </div>
  );
};

export default App;
