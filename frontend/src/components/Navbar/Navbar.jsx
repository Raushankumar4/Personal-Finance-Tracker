import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

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

  const toggleDropdown = () => {
    setDropdownOpen((prev) => !prev);
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header className="fixed top-0 left-0 right-0  shadow-sm h-16 bg-[#ffff] border-b border-gray-200 flex items-center px-4 z-10">
      <div className="flex flex-1 items-center justify-between">
        <h1 className="text-xl sm:text-xl font-semibold px-2">
          Personal Finance Tracker
        </h1>

        {user ? (
          <div className="flex items-center space-x-4 relative">
            <div
              className="flex items-center space-x-3 bg-gray-100 rounded-full px-4 py-2 cursor-pointer"
              onClick={toggleDropdown}
            >
              <div className="w-8 h-8 flex items-center justify-center rounded-full bg-indigo-500 text-white font-semibold text-sm">
                {getInitials(user.username || "User")}
              </div>
              <div className="hidden sm:block text-left">
                <p className="text-xs text-gray-500 truncate">
                  {user.username}
                </p>
              </div>
            </div>

            {dropdownOpen && (
              <div
                className="absolute right-4 mt-22 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-20"
                style={{
                  opacity: dropdownOpen ? 1 : 0,
                  transform: dropdownOpen
                    ? "translateY(0)"
                    : "translateY(-10px)",
                  transition: "all 0.2s ease-in-out",
                }}
              >
                <button
                  onClick={handleLogout}
                  className="w-full text-left text-sm text-red-500 hover:bg-gray-100 py-2 px-4 rounded-tl-lg rounded-tr-lg"
                >
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
