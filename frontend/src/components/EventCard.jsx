const EventCard = ({ title, date, category, fee, description }) => {
  return (
    <article className="flex h-full flex-col justify-between rounded-2xl border border-slate-800 bg-slate-900/60 p-6 shadow-lg shadow-slate-950/40">
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="rounded-full bg-slate-800 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-slate-300">
            {category}
          </span>
          <span className="rounded-full bg-cyan-500/10 px-3 py-1 text-xs font-semibold text-cyan-300">
            {fee}
          </span>
        </div>
        <h3 className="text-xl font-semibold text-white">{title}</h3>
        <p className="text-sm text-slate-400">{date}</p>
        {description ? <p className="text-sm text-slate-300">{description}</p> : null}
      </div>
      <button
        type="button"
        className="mt-6 w-full rounded-full border border-cyan-400/60 px-4 py-2 text-sm font-semibold text-cyan-200 transition hover:bg-cyan-500 hover:text-slate-950"
      >
        Learn More
      </button>
    </article>
  );
};

export default EventCard;
