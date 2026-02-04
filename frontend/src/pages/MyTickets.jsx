import { useContext, useEffect, useState } from "react";
import { QRCodeCanvas } from "qrcode.react";
import AuthContext from "../auth/AuthContext.jsx";
import { listTickets } from "../api/tickets.js";

const MyTickets = () => {
  const { token } = useContext(AuthContext);
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const data = await listTickets(token);
        setTickets(data);
      } catch (err) {
        setError(err?.message || "Unable to load tickets");
      } finally {
        setLoading(false);
      }
    };
    fetchTickets();
  }, [token]);

  return (
    <section className="px-6 py-16">
      <div className="mx-auto w-full max-w-5xl space-y-8">
        <header className="space-y-3">
          <p className="text-xs uppercase tracking-[0.3em] text-muted">My Tickets</p>
          <h1 className="text-3xl font-semibold text-textPrimary">Ticket Wallet</h1>
          <p className="text-sm text-textSecondary">
            Show the QR code at entry. Tickets marked as used cannot be reused.
          </p>
        </header>
        {loading ? (
          <div className="rounded-2xl border border-border bg-card-gradient p-10 text-center text-sm text-muted">
            Loading tickets...
          </div>
        ) : error ? (
          <div className="rounded-2xl border border-border bg-card-gradient p-10 text-center text-sm text-error">
            {error}
          </div>
        ) : tickets.length === 0 ? (
          <div className="rounded-2xl border border-border bg-card-gradient p-10 text-center text-sm text-muted">
            No tickets yet.
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2">
            {tickets.map((ticket) => (
              <article
                key={ticket.id}
                className="rounded-2xl border border-border bg-card-gradient p-6 shadow-card-ambient"
              >
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <p className="text-xs uppercase tracking-[0.3em] text-muted">Event</p>
                    <h2 className="mt-2 text-xl font-semibold text-textPrimary">
                      {ticket.event?.title}
                    </h2>
                    <p className="mt-1 text-sm text-textSecondary">
                      {ticket.event?.date} • {ticket.event?.time}
                    </p>
                    <p className="text-sm text-textSecondary">{ticket.event?.venue}</p>
                  </div>
                  <div className="rounded-xl border border-border bg-surface/70 p-3">
                    <QRCodeCanvas value={ticket.qrData} size={120} />
                  </div>
                </div>
                <div className="mt-4 flex flex-wrap gap-3 text-xs">
                  <span className="rounded-full border border-border px-3 py-1 text-textSecondary">
                    Code: {ticket.ticketCode}
                  </span>
                  <span
                    className={`rounded-full px-3 py-1 font-semibold ${
                      ticket.status === "VALID"
                        ? "bg-success/20 text-success"
                        : ticket.status === "USED"
                          ? "bg-warning/20 text-warning"
                          : "bg-error/20 text-error"
                    }`}
                  >
                    {ticket.status}
                  </span>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default MyTickets;
