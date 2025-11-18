import { useMemo, useState, useEffect } from "react";
import AdminNavbar from "./AdminNavbar";
import { 
  getAllGrievances, 
  updateGrievanceStatus, 
  getGrievanceImageUrl 
} from "../services/ApiService.js";
// 1. Import the new modal component
import GrievanceViewModal from "./GrievanceViewModal";

export default function Dashboard() {
  const [tickets, setTickets] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // State for the confirmation modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [confirmationDetails, setConfirmationDetails] = useState(null);

  // --- 2. New state for the "View Details" modal ---
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState(null);


  useEffect(() => {
    fetchTickets();
  }, []);

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

  const stats = useMemo(() => {
    // ... (your stats logic is unchanged) ...
    const total = tickets.length;
    const pending = tickets.filter(
      (t) => !t.status || t.status === "submitted" || t.status === "Pending"
    ).length;
    const inProgress = tickets.filter((t) => t.status === "In Progress").length;
    const resolved = tickets.filter((t) => t.status === "Resolved").length;
    return { total, pending, inProgress, resolved };
  }, [tickets]);

  // --- Confirmation Modal Logic (unchanged) ---
  const handleStatusChangeAttempt = (id, newStatus) => {
    const ticket = tickets.find((t) => t.id === id);
    if (!ticket) return;
    const currentStatus = ticket.status || "Pending";
    if (newStatus === currentStatus) return;
    setConfirmationDetails({
      id,
      newStatus,
      currentStatus,
      requester: `${ticket.firstName} ${ticket.lastName}`
    });
    setIsModalOpen(true);
  };
  
  const handleConfirmUpdate = async () => {
    if (!confirmationDetails) return;
    const { id, newStatus } = confirmationDetails;
    const originalTickets = [...tickets];
    setTickets((prev) =>
      prev.map((t) => (t.id === id ? { ...t, status: newStatus } : t))
    );
    setIsModalOpen(false); 
    try {
      const updatedTicketFromServer = await updateGrievanceStatus(id, newStatus);
      setTickets((prev) =>
        prev.map((t) => (t.id === id ? updatedTicketFromServer : t))
      );
    } catch (err) {
      console.error("Failed to update status:", err);
      setError("Failed to update status for ticket #" + id + ". Please try again.");
      setTickets(originalTickets);
    } finally {
      setConfirmationDetails(null);
    }
  };

  const handleCancelUpdate = () => {
    setIsModalOpen(false);
    setConfirmationDetails(null);
  };

  // --- 3. New handlers for the "View Details" modal ---
  const handleViewTicket = (ticket) => {
    setSelectedTicket(ticket);
    setIsViewModalOpen(true);
  };

  const handleCloseViewModal = () => {
    setIsViewModalOpen(false);
    setSelectedTicket(null);
  };


  const refreshData = () => {
    fetchTickets();
  };

  return (
    <>
      
      <div className="flex flex-col min-h-screen font-mono">
        <AdminNavbar />
        <div className="relative overflow-x-auto shadow-xl sm:rounded-lg m-8 bg-white/15 backdrop-blur-sm p-4">
          
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-3xl md:text-4xl font-bold text-white">
              All Grievances
            </h1>
            <button
              onClick={refreshData}
              className="px-4 py-2 bg-teal-500 font-bold text-white rounded-md shadow-sm hover:bg-teal-700"
            >
              Refresh Data
            </button>
          </div>

          <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <StatCard title="Pending" value={stats.pending} accent="from-yellow-400 to-yellow-500" />
            <StatCard title="In Progress" value={stats.inProgress} accent="from-indigo-400 to-indigo-500" />
            <StatCard title="Resolved" value={stats.resolved} accent="from-green-400 to-green-500" />
            <StatCard title="Total Tickets" value={stats.total} accent="from-gray-400 to-gray-500" />
          </section>

          <section>
            {/* <div className="mb-4 flex items-center justify-between">
              <h2 className="text-xl font-semibold text-white">All Grievances</h2>
              <div className="text-sm text-gray-700">Total: {stats.total}</div>
            </div> */}

            <div className="overflow-x-auto rounded-lg shadow-md">
              <table className="w-full text-sm text-left text-black bg-white/25">
                <thead className="text-xs text-black uppercase bg-white/20">
                  <tr>
                    <th scope="col" className="px-6 py-3">Ticket ID</th>
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
                    <tr><td colSpan="7" className="text-center py-4">Loading tickets...</td></tr>
                  )}
                  {error && (
                    <tr><td colSpan="7" className="text-center py-4 text-red-600">{error}</td></tr>
                  )}
                  {!isLoading && !error && tickets.map((ticket) => (
                    <tr key={ticket.id} className="bg-white/40 border-b border-white/20 hover:bg-white/10">
                      {/* --- 4. Updated ID Cell --- */}
                      <th scope="row" className="px-6 py-4 font-medium text-gray-900">
                      
                          {ticket.id}
                      </th>
                      {/* --- 4. Updated Requester Cell --- */}
                      <td className="px-6 py-4">
                        
                          <div className="font-medium">{ticket.firstName} {ticket.lastName}</div>
                          <div className="text-xs text-black">{ticket.email}</div>
                        
                      </td>
                      <td className="px-6 py-4">{ticket.category}</td>
                      <td className="px-6 py-4">{ticket.locationInput}</td>
                      <td className="px-6 py-4 max-w-xs truncate" title={ticket.description}>
                        {ticket.description || "N/A"}
                      </td>
                      <td className="px-6 py-4 font-medium">
                        <select
                          value={ticket.status || "Pending"}
                          onChange={(e) => handleStatusChangeAttempt(ticket.id, e.target.value)}
                          className={`p-1 rounded-md text-xs border-0 ${
                            (ticket.status || "Pending") === "Pending"
                              ? "bg-yellow-100 text-yellow-950"
                              : ticket.status === "In Progress"
                              ? "bg-indigo-100 text-indigo-950"
                              : ticket.status === "Resolved"
                              ? "bg-green-100 text-green-950"
                              : "bg-yellow-100"
                          }`}
                        >
                          <option value="Pending">Pending</option>
                          <option value="In Progress">In Progress</option>
                          <option value="Resolved">Resolved</option>
                        </select>
                      </td>
                      <td className="px-6 py-4">
                        <button 
                          onClick={() => handleViewTicket(ticket)} 
                          className="font-medium text-blue-600 hover:underline"
                        >
                          View Ticket
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </div>
      </div>

      {/* Confirmation Modal (unchanged) */}
      <ConfirmationModal
        isOpen={isModalOpen}
        onCancel={handleCancelUpdate}
        onConfirm={handleConfirmUpdate}
        details={confirmationDetails}
      />

      {/* --- 5. Render the new "View Details" modal --- */}
      <GrievanceViewModal
        isOpen={isViewModalOpen}
        onClose={handleCloseViewModal}
        ticket={selectedTicket}
      />
    </>
  );
}

// ... (StatCard component is unchanged) ...
function StatCard({ title, value, accent = "from-indigo-400 to-indigo-500" }) {
  return (
    <div className="p-4 rounded-lg bg-white/30 backdrop-blur-sm shadow-sm flex items-center justify-between">
      <div>
        <div className="text-lg text-gray-900">{title}</div>
      </div>
      <div
        className={`h-12 w-12 rounded-full bg-gradient-to-br ${accent} flex items-center justify-center text-white shadow`}
      >
        <span className="font-bold text-lg">{value}</span>
      </div>
    </div>
  );
}

// ... (ConfirmationModal component is unchanged) ...
function ConfirmationModal({ isOpen, onCancel, onConfirm, details }) {
  if (!isOpen || !details) return null;
  const { id, newStatus, currentStatus, requester } = details;
  const getStatusClass = (status) => {
    switch (status) {
      case "Pending": return "bg-yellow-100 text-yellow-800";
      case "In Progress": return "bg-indigo-100 text-indigo-800";
      case "Resolved": return "bg-green-100 text-green-800";
      default: return "bg-yellow-100 text-gray-800";
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
      <div className="relative w-full max-w-md p-6 bg-white rounded-xl shadow-2xl m-4">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Confirm Status Change</h2>
        <div className="space-y-3 text-gray-700">
          <p>Are you sure you want to change the status for: </p>
          <p>
            <span className="font-semibold">Ticket #{id}</span> from <span className="font-semibold">{requester}</span>?
          </p>
          <div className="flex items-center justify-center space-x-2">
            <span className={`px-2 py-1 rounded-md text-sm font-medium ${getStatusClass(currentStatus)}`}>
              {currentStatus}
            </span>
            <span className="text-gray-500">→</span>
            <span className={`px-2 py-1 rounded-md text-sm font-medium ${getStatusClass(newStatus)}`}>
              {newStatus}
            </span>
          </div>
        </div>
        <div className="flex justify-end space-x-4 mt-6">
          <button
            onClick={onCancel}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
          >
            Confirm Change
          </button>
        </div>
        <button 
          onClick={onCancel}
          className="absolute top-4 right-4 text-gray-400 hover:text-black"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>
      </div>
    </div>
  );
}