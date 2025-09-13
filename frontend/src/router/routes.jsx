import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Login from "../components/auth/Login";
import Register from "../components/auth/Register";
import Dashboard from "../components/pages/Dashboard";

export const router = createBrowserRouter([
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <Dashboard />,
      },
    ],
  },
]);
