import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { LogOut } from "lucide-react";

function getInitials(name) {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();
}

export function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => setDropdownOpen((prev) => !prev);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header className="fixed top-0 left-0 right-0 bg-white border-b border-gray-200 shadow-sm h-16 px-4 flex items-center z-20">
      <div className="flex flex-1 items-center justify-between max-w-7xl mx-auto">
        <h1 className="text-lg sm:text-xl font-bold text-gray-800 tracking-tight">
          Personal Finance Tracker
        </h1>

        {user ? (
          <div className="relative">
            <div
              onClick={toggleDropdown}
              className="flex items-center space-x-2 sm:space-x-3 bg-gray-50 hover:bg-gray-100 px-3 sm:px-4 py-2 rounded-full cursor-pointer transition-colors duration-200"
            >
              <div className="w-8 h-8 flex items-center justify-center rounded-full bg-indigo-600 text-white font-semibold text-sm">
                {getInitials(user.username || "U")}
              </div>
              <div className="hidden sm:block">
                <p className="text-sm font-medium text-gray-700 truncate max-w-[100px]">
                  {user.username}
                </p>
              </div>
            </div>

            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg animate-fadeIn z-30">
                <button
                  onClick={handleLogout}
                  className="flex items-center w-full text-left text-sm text-gray-700 hover:bg-gray-100 py-2 px-4 rounded-lg transition-colors duration-150"
                >
                  <LogOut className="h-4 w-4 mr-2 text-red-500" />
                  Logout
                </button>
              </div>
            )}
          </div>
        ) : (
          <p className="text-sm text-gray-500">Not logged in</p>
        )}
      </div>
    </header>
  );
}
