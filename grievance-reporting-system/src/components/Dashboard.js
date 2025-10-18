import { useMemo, useState } from "react";
import AdminNavbar from "./AdminNavbar";
// import TicketTable from "./TicketTable";

const initialTickets = [
  { id: 1, title: "Login issue", requester: "Alice", priority: "High", status: "Pending", createdAt: "2025-10-10" },
  { id: 2, title: "Billing discrepancy", requester: "Bob", priority: "Medium", status: "In Progress", createdAt: "2025-10-09" },
  { id: 3, title: "Feature request", requester: "Charlie", priority: "Low", status: "Resolved", createdAt: "2025-10-08" },
  { id: 4, title: "Page 500 error", requester: "Diana", priority: "High", status: "Pending", createdAt: "2025-10-11" },
];

export default function Dashboard() {
  const [tickets, setTickets] = useState(initialTickets);

  const stats = useMemo(() => {
    const total = tickets.length;
    const pending = tickets.filter(t => t.status === "Pending").length;
    const inProgress = tickets.filter(t => t.status === "In Progress").length;
    const resolved = tickets.filter(t => t.status === "Resolved").length;
    return { total, pending, inProgress, resolved };
  }, [tickets]);

  const updateTicketStatus = (id, newStatus) => {
    setTickets(prev => prev.map(t => (t.id === id ? { ...t, status: newStatus } : t)));
  };

  const addDummyTicket = () => {
    const newTicket = {
      id: Date.now(),
      title: `New ticket ${tickets.length + 1}`,
      requester: "System",
      priority: "Low",
      status: "Pending",
      createdAt: new Date().toISOString().slice(0, 10),
    };
    setTickets(prev => [newTicket, ...prev]);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminNavbar />

      <main className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl md:text-3xl font-bold">Admin Dashboard</h1>
          <div className="flex gap-2">
            <button
              onClick={addDummyTicket}
              className="px-4 py-2 bg-blue-600 text-white rounded-md shadow-sm hover:bg-blue-700"
            >
              Add Dummy Ticket
            </button>
          </div>
        </div>

        {/* Stats */}
        <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <StatCard title="Pending" value={stats.pending} accent="from-yellow-400 to-yellow-500" />
          <StatCard title="In Progress" value={stats.inProgress} accent="from-indigo-400 to-indigo-500" />
          <StatCard title="Resolved" value={stats.resolved} accent="from-green-400 to-green-500" />
          <StatCard title="Total" value={stats.total} accent="from-gray-400 to-gray-500" />
        </section>

        {/* Ticket table */}
        <section className="bg-white rounded-xl shadow-md p-4">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-semibold">Tickets</h2>
            <div className="text-sm text-gray-500">Total: {stats.total}</div>
          </div>

          {/* <TicketTable tickets={tickets} onUpdateStatus={updateTicketStatus} /> */}
        </section>
      </main>
    </div>
  );
}

function StatCard({ title, value, accent = "from-indigo-400 to-indigo-500" }) {
  return (
    <div className="p-4 rounded-lg bg-white shadow-sm flex items-center justify-between">
      <div>
        <div className="text-sm text-gray-500">{title}</div>
        <div className="text-2xl font-bold">{value}</div>
      </div>
      <div className={`h-12 w-12 rounded-full bg-gradient-to-br ${accent} flex items-center justify-center text-white shadow`}>
        <span className="font-bold">{value}</span>
      </div>
    </div>
  );
}
