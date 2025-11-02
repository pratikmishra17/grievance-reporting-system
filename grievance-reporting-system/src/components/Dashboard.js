import { useMemo, useState, useEffect } from "react";
import AdminNavbar from "./AdminNavbar";
import { getAllGrievances } from "../services/ApiService.js"; // Import your API function

export default function Dashboard() {
  const [tickets, setTickets] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch data from your Spring Boot API
  useEffect(() => {
    const fetchTickets = async () => {
      try {
        setIsLoading(true);
        const data = await getAllGrievances();
        setTickets(data);
        setError(null);
      } catch (err) {
        setError(err.message || "Failed to fetch tickets.");
        setTickets([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTickets();
  }, []); // The empty array [] means this runs once when the component mounts

  // This will now automatically update when 'tickets' are fetched
  const stats = useMemo(() => {
    const total = tickets.length;
    // Assume null/undefined status is 'Pending' or 'Open'
    const pending = tickets.filter(t => !t.status || t.status === "Pending" || t.status === "Open").length;
    const inProgress = tickets.filter(t => t.status === "In Progress").length;
    const resolved = tickets.filter(t => t.status === "Resolved").length;
    return { total, pending, inProgress, resolved };
  }, [tickets]);

  // Optional: A function to update status (you'll need a backend endpoint for this)
  const updateTicketStatus = (id, newStatus) => {
    // This is just a local update for now.
    // TODO: Call an API to persist this change
    setTickets(prev => prev.map(t => (t.id === id ? { ...t, status: newStatus } : t)));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      

      <main className="bg-[url(/public/bg_image.jpg)] bg-cover bg-center container mx-auto px-4 py-8">
      <AdminNavbar />
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl md:text-3xl font-mono">Admin Dashboard</h1>
          {/* Button to refresh data */}
          <button
            onClick={() => {
              // Re-run the fetch
              setIsLoading(true);
              getAllGrievances()
                .then(data => {
                  setTickets(data);
                  setError(null);
                })
                .catch(err => {
                  setError(err.message || "Failed to fetch tickets.");
                  setTickets([]);
                })
                .finally(() => setIsLoading(false));
            }}
            className="px-4 py-2 bg-blue-600 text-white rounded-md shadow-sm hover:bg-blue-700"
          >
            Refresh Data
          </button>
        </div>

        {/* Stats */}
        <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <StatCard title="Pending" value={stats.pending} accent="from-yellow-400 to-yellow-500" />
          <StatCard title="In Progress" value={stats.inProgress} accent="from-indigo-400 to-indigo-500" />
          <StatCard title="Resolved" value={stats.resolved} accent="from-green-400 to-green-500" />
          <StatCard title="Total Tickets" value={stats.total} accent="from-gray-400 to-gray-500" />
        </section>

        {/* Ticket table */}
        <section className="bg-white rounded-xl shadow-md p-4">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-mono">All Grievances</h2>
            <div className="text-sm text-gray-500">Total: {stats.total}</div>
          </div>

          {/* This is the new dynamic table */}
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left text-gray-700">
              <thead className="text-xs text-gray-800 uppercase bg-gray-100">
                <tr>
                  <th scope="col" className="px-6 py-3">ID</th>
                  <th scope="col" className="px-6 py-3">Requester</th>
                  <th scope="col" className="px-6 py-3">Category</th>
                  <th scope="col" className="px-6 py-3">Location</th>
                  <th scope="col" className="px-6 py-3">Description</th>
                  <th scope="col" className="px-6 py-3">Status</th>
                  <th scope="col" className="px-6 py-3">Action</th>
                </tr>
              </thead>
              <tbody>
                {isLoading && (
                  <tr>
                    <td colSpan="7" className="text-center py-4">Loading tickets...</td>
                  </tr>
                )}
                {error && (
                  <tr>
                    <td colSpan="7" className="text-center py-4 text-red-600">{error}</td>
                  </tr>
                )}
                {!isLoading && !error && tickets.map(ticket => (
                  <tr key={ticket.id} className="bg-white border-b hover:bg-gray-50">
                    <th scope="row" className="px-6 py-4 font-medium text-gray-900">
                      {ticket.id}
                    </th>
                    <td className="px-6 py-4">
                      {ticket.firstName} {ticket.lastName}
                      <div className="text-xs text-gray-500">{ticket.email}</div>
                    </td>
                    <td className="px-6 py-4">{ticket.category}</td>
                    <td className="px-6 py-4">{ticket.locationInput}</td>
                    <td className="px-6 py-4 max-w-xs truncate" title={ticket.description}>
                      {ticket.description || "N/A"}
                    </td>
                    <td className="px-6 py-4 font-medium">
                      {/* This dropdown is a placeholder for changing status */}
                      <select
                        value={ticket.status || "Pending"}
                        onChange={(e) => updateTicketStatus(ticket.id, e.target.value)}
                        className={`p-1 rounded-md text-xs ${
                          (ticket.status || "Pending") === "Pending" ? "bg-yellow-100 text-yellow-800" :
                          (ticket.status === "In Progress") ? "bg-indigo-100 text-indigo-800" :
                          (ticket.status === "Resolved") ? "bg-green-100 text-green-800" : "bg-gray-100"
                        }`}
                      >
                        <option value="Pending">Pending</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Resolved">Resolved</option>
                      </select>
                    </td>
                    <td className="px-6 py-4">
                      <a href="#" className="font-medium text-blue-600 hover:underline">Edit</a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </main>
    </div>
  );
}

// Your StatCard component (no changes needed)
function StatCard({ title, value, accent = "from-indigo-400 to-indigo-500" }) {
  return (
    <div className="p-4 rounded-lg bg-white shadow-sm flex items-center justify-between">
      <div>
        <div className="text-sm text-gray-500">{title}</div>
        <div className="text-2xl font-mono">{value}</div>
      </div>
      <div className={`h-12 w-12 rounded-full bg-gradient-to-br ${accent} flex items-center justify-center text-white shadow`}>
        <span className="font-mono">{value}</span>
      </div>
    </div>
  );
}
