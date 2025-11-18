import React, { useState, useEffect } from "react";
import Navbar from "./Navbar.js";
import { getMyGrievances } from "../services/ApiService.js";
import { useAuth } from "../services/AuthContext.js";
// 1. Import the new modal component
import UserGrievanceViewModal from "./UserGrievanceViewModal.js";

function UserStatus() {
  const { user } = useAuth();
  const [tickets, setTickets] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // --- 2. Add state for the modal ---
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState(null);

  useEffect(() => {
    const fetchTickets = async () => {
      if (!user) {
        setError("You must be logged in to view grievances.");
        setIsLoading(false);
        return;
      }

      try {
        const data = await getMyGrievances(user.userId);
        setTickets(data);
        setIsLoading(false);
      } catch (err) {
        setError(err.message);
        setIsLoading(false);
      }
    };

    fetchTickets();
  }, [user]);

  // --- 3. Add handlers for the modal ---
  const handleViewTicket = (ticket) => {
    setSelectedTicket(ticket);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedTicket(null);
  };

  const renderTableBody = () => {
    if (isLoading) {
      return (
        <tr>
          <td colSpan="6" className="px-6 py-4 text-center text-gray-900">
            Loading grievances...
          </td>
        </tr>
      );
    }

    if (error) {
      return (
        <tr>
          <td colSpan="6" className="px-6 py-4 text-center text-red-600">
            Error: {error}
          </td>
        </tr>
      );
    }

    if (tickets.length === 0) {
      return (
        <tr>
          <td colSpan="6" className="px-6 py-4 text-center text-gray-900">
            No grievances found.
          </td>
        </tr>
      );
    }

    return tickets.map((ticket) => (
      <tr
        key={ticket.id}
        className="bg-white/40 border-b border-white/20 hover:bg-white/10"
      >
        {/* --- 4. Added Ticket ID --- */}
        <th
          scope="row"
          className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
        >
          {ticket.id}
        </th>
        <td className="px-6 py-4 text-gray-900">{ticket.category}</td>
        <td className="px-6 py-4 text-gray-900">{ticket.locationInput}</td>
        <td className="px-6 py-4 text-gray-900 truncate max-w-xs" title={ticket.description}>
          {ticket.description || "N/A"}
        </td>
        <td className="px-6 py-4 text-gray-900">{ticket.status}</td>
        <td className="px-6 py-4">
          {/* --- 5. Updated Action Button --- */}
          <button
            onClick={() => handleViewTicket(ticket)}
            className="font-medium text-blue-600 hover:underline"
          >
            View / Comment
          </button>
        </td>
      </tr>
    ));
  };

  return (
    <>
      <div className="flex flex-col min-h-screen font-mono">
        <Navbar />
        <div className="relative overflow-x-auto shadow-xl sm:rounded-lg m-8 bg-white/15 backdrop-blur-sm p-4">
          <div className="flex flex-column sm:flex-row flex-wrap space-y-4 sm:space-y-0 items-center justify-between pb-4 p-4">
            <div>
              <h2 className="text-2xl font-semibold text-white">My Grievances</h2>
            </div>
            {/* Filter and Search UI (unchanged) */}
            <div className="flex items-center space-x-4">
              {/* <button
                id="dropdownRadioButton"
                data-dropdown-toggle="dropdownRadio"
                className="inline-flex items-center text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-mono rounded-lg text-sm px-3 py-1.5"
                type="button"
              >
                <svg className="w-3 h-3 text-gray-500 me-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm3.982 13.982a1 1 0 0 1-1.414 0l-3.274-3.274A1.012 1.012 0 0 1 9 10V6a1 1 0 0 1 2 0v3.586l2.982 2.982a1 1 0 0 1 0 1.414Z" />
                </svg>
                Last 30 days
                <svg className="w-2.5 h-2.5 ms-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4"/>
                </svg>
              </button> */}
              <div className="relative">
                <div className="absolute inset-y-0 left-0 rtl:inset-r-0 rtl:right-0 flex items-center ps-3 pointer-events-none">
                  <svg className="w-5 h-5 text-gray-500" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd"></path>
                  </svg>
                </div>
                <input
                  type="text"
                  id="table-search"
                  className="block p-2 ps-10 text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 placeholder-gray-400"
                  placeholder="Search for items"
                ></input>
              </div>
            </div>
          </div>
          
          {/* --- 6. Updated Table Wrapper --- */}
          <div className="overflow-x-auto rounded-lg shadow-md">
            <table className="w-full text-sm text-left rtl:text-right text-gray-900">
              <thead className="text-xs text-gray-700 uppercase bg-white/50">
                <tr>
                  {/* --- 7. Added ID Header --- */}
                  <th scope="col" className="px-6 py-3">
                    Ticket ID
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Category
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Location
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Description
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Status
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>{renderTableBody()}</tbody>
            </table>
          </div>
        </div>
      </div>
      
      {/* --- 8. Add the new modal component --- */}
      <UserGrievanceViewModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        ticket={selectedTicket}
      />
    </>
  );
}
export default UserStatus;