import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { getUserContent, getAdminContent } from "../api/auth";
import { clearAuth, getName, getRole } from "../utils/auth";

const DashboardPage = () => {
  const navigate = useNavigate();
  const role     = getRole();
  const name     = getName();

  const userQuery = useQuery({
    queryKey: ["user-content"],
    queryFn: getUserContent,
  });

  const adminQuery = useQuery({
    queryKey: ["admin-content"],
    queryFn: getAdminContent,
    enabled: role === "ADMIN",
  });

  const handleLogout = () => {
    clearAuth();
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-3xl mx-auto">

        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
            <p className="text-gray-500 mt-1">
              Welcome, <span className="font-semibold text-gray-700">{name}</span>
            </p>
          </div>
          <div className="flex items-center gap-3">
            <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
              role === "ADMIN"
                ? "bg-purple-100 text-purple-700"
                : "bg-green-100 text-green-700"
            }`}>
              {role}
            </span>
            <button
              onClick={handleLogout}
              className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition text-sm"
            >
              Logout
            </button>
          </div>
        </div>

        {/* User Content Card */}
        <div className="bg-white rounded-xl shadow p-6 mb-4">
          <h2 className="text-lg font-semibold text-gray-700 mb-2">🙍 User Content</h2>
          {userQuery.isLoading && <p className="text-gray-400 text-sm">Loading...</p>}
          {userQuery.isError  && <p className="text-red-500 text-sm">Failed to load content.</p>}
          {userQuery.data     && <p className="text-gray-600">{userQuery.data.message}</p>}
        </div>

        {/* Admin Content Card — only shown to ADMIN */}
        {role === "ADMIN" && (
          <div className="bg-white rounded-xl shadow p-6 border-l-4 border-purple-500">
            <h2 className="text-lg font-semibold text-purple-700 mb-2">🔐 Admin Content</h2>
            {adminQuery.isLoading && <p className="text-gray-400 text-sm">Loading...</p>}
            {adminQuery.isError  && <p className="text-red-500 text-sm">Failed to load admin content.</p>}
            {adminQuery.data     && <p className="text-gray-600">{adminQuery.data.message}</p>}
          </div>
        )}

      </div>
    </div>
  );
};

export default DashboardPage;   