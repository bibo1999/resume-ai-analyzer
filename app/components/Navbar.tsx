import { Link } from "react-router";
import { usePuterStore } from "~/lib/puter";
import { useNavigate } from "react-router";
import { useState, useEffect, useRef } from "react";
import { useScrollPosition } from "./useScrollPosition";

const Navbar = () => {
  const { auth, isLoading } = usePuterStore();
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { isAtTop } = useScrollPosition();

  const handleSignOut = async () => {
    await auth.signOut();
    setIsDropdownOpen(false);
    navigate("/auth");
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div
      className={`
        sticky top-0 z-50
        transition-all duration-300 ease-in-out
        ${isAtTop ? "pt-0" : "pt-4 max-sm:pt-2"}
      `}
    >
      <nav
        className={`
          flex flex-row justify-between items-center 
          p-4 px-10 max-sm:px-4 max-sm:py-3
          transition-all duration-300 ease-in-out
          ${
            isAtTop
              ? "w-full rounded-none bg-gradient-to-r from-[#F4E4C1] via-[#E8E4DC] to-[#F4E4C1] border-b border-[#C9A76A]/40 shadow-sm"
              : "navbar max-w-[1200px] mx-auto"
          }
        `}
      >
        <Link to="/" className="shrink-0">
          <p className="text-2xl max-sm:text-lg font-bold logo-gradient whitespace-nowrap">
            ATS Scan AI
          </p>
        </Link>

        <div className="flex items-center gap-4 max-sm:gap-2">
          <Link to="/upload" className="primary-button w-fit max-sm:text-sm max-sm:px-4 max-sm:py-2">
            Upload Resume
          </Link>

          {auth.isAuthenticated && (
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center gap-2 px-4 py-2 max-sm:px-2 max-sm:py-2 text-sm font-medium text-dark-200 border-2 border-gray-200 rounded-full hover:bg-gray-50 transition-all duration-200"
              >
                <div
                  className="w-8 h-8 max-sm:w-7 max-sm:h-7 rounded-full flex items-center justify-center text-white font-semibold max-sm:text-sm"
                  style={{
                    background:
                      "linear-gradient(135deg, var(--color-navy-900), var(--color-navy-800))",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
                  }}
                >
                  {auth.user?.username.charAt(0).toUpperCase()}
                </div>
                <span className="max-sm:hidden">Profile</span>
                <svg
                  className={`w-4 h-4 max-sm:w-3 max-sm:h-3 transition-transform duration-200 ${
                    isDropdownOpen ? "rotate-180" : ""
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>

              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-64 max-sm:w-56 bg-[#EBE4D6] rounded-2xl shadow-lg border border-gray-200 overflow-hidden z-50 animate-fadeIn">
                  <div className="p-4 border-b border-gray-200">
                    <p className="text-sm text-gray-500">Signed in as</p>
                    <p className="text-base font-semibold text-dark-200 truncate">
                      {auth.user?.username}
                    </p>
                  </div>
                  <div className="p-2 flex flex-col gap-1">
                    <Link
                      to="/wipe"
                      onClick={() => setIsDropdownOpen(false)}
                      className="w-full px-4 py-2 text-sm text-dark-200 hover:bg-gray-50 rounded-lg transition-colors"
                    >
                      Clear Resume Data
                    </Link>

                    {/* Divider */}
                    <div className="h-px bg-gray-200 my-1" />

                    {/* Sign Out */}
                    <button
                      onClick={handleSignOut}
                      disabled={isLoading}
                      className="w-full text-left px-4 py-2 text-sm text-dark-200 hover:bg-gray-50 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isLoading ? "Signing out..." : "Sign Out"}
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </nav>
    </div>
  );
};

export default Navbar;