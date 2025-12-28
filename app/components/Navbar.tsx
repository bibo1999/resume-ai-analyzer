import { Link } from "react-router"
import { usePuterStore } from "~/lib/puter";
import { useNavigate } from "react-router";
import { useState, useEffect, useRef } from "react";

const Navbar = () => {
    const { auth, isLoading } = usePuterStore();
    const navigate = useNavigate();
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const handleSignOut = async () => {
        await auth.signOut();
        setIsDropdownOpen(false);
        navigate('/auth');
    };

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsDropdownOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <nav className="navbar">
            <Link to="/">
                <p className="text-2xl font-bold text-gradient">ATS Scan AI</p>
            </Link>
            
            <div className="flex items-center gap-4">
                <Link to="/upload" className="primary-button w-fit">
                    Upload Resume
                </Link>
                
                {auth.isAuthenticated && (
                    <div className="relative" ref={dropdownRef}>
                        <button
                            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-dark-200 border-2 border-gray-200 rounded-full hover:bg-gray-50 transition-all duration-200"
                        >
                            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#8e98ff] to-[#606beb] flex items-center justify-center text-white font-semibold">
                                {auth.user?.username.charAt(0).toUpperCase()}
                            </div>
                            <span>Profile</span>
                            <svg 
                                className={`w-4 h-4 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`}
                                fill="none" 
                                stroke="currentColor" 
                                viewBox="0 0 24 24"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                        </button>

                        {isDropdownOpen && (
                            <div className="absolute right-0 mt-2 w-64 bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden z-50 animate-fadeIn">
                                <div className="p-4 border-b border-gray-200">
                                    <p className="text-sm text-gray-500">Signed in as</p>
                                    <p className="text-base font-semibold text-dark-200 truncate">
                                        {auth.user?.username}
                                    </p>
                                </div>
                                <div className="p-2">
                                    <button
                                        onClick={handleSignOut}
                                        disabled={isLoading}
                                        className="w-full text-left px-4 py-2 text-sm text-dark-200 hover:bg-gray-50 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        {isLoading ? 'Signing out...' : 'Sign Out'}
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </nav>
    )
}

export default Navbar