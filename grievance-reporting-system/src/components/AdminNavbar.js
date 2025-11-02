import { Link } from "react-router-dom";

function AdminNavbar() {
  return (
    <nav className="bg-white/30 backdrop-blur-sm rounded-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 relative">

          {/* Left: Logo */}
          <div className="flex-shrink-0">
            <Link to="/user/homepage">
              <img src="/favicon.ico" alt="Logo" className="h-8 w-auto" />
            </Link>
          </div>

          {/* Center: Links */}
          <div className="absolute left-1/2 transform -translate-x-1/2 hidden sm:flex space-x-6">
            <Link
              to="/admin/dashboard"
              className="rounded-md px-3 py-2 text-sm font-mono text-gray-700 hover:text-indigo-700 hover:bg-white/30"
            >
              Home
            </Link>
            <Link
              to="/user/status"
              className="rounded-md px-3 py-2 text-sm font-mono text-gray-700 hover:text-indigo-700 hover:bg-white/30"
            >
              Status
            </Link>
            <Link
              to="/admin/account"
              className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium"
            >
              Account
            </Link>
          </div>

          {/* Right: Notification */}
          <div className="flex items-center space-x-4">
            <button
              type="button"
              className="relative rounded-full p-1 text-gray-600 hover:text-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <span className="sr-only">View notifications</span>
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                className="w-6 h-6"
              >
                <path
                  d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0018 9.75V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default AdminNavbar;
