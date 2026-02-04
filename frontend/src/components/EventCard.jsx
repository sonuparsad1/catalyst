const EventCard = ({ title, date, category, fee, description }) => {
  return (
    <article className="flex h-full flex-col justify-between rounded-2xl border border-border bg-surface p-6 shadow-sm shadow-black/30">
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="rounded-full bg-elevated px-3 py-1 text-xs font-semibold uppercase tracking-wide text-textSecondary">
            {category}
          </span>
          <span className="rounded-full bg-primary/15 px-3 py-1 text-xs font-semibold text-primary">
            {fee}
          </span>
        </div>
        <h3 className="text-xl font-semibold text-textPrimary">{title}</h3>
        <p className="text-sm text-textSecondary">{date}</p>
        {description ? (
          <p className="text-sm text-textSecondary">{description}</p>
        ) : null}
      </div>
      <button
        type="button"
        className="mt-6 w-full rounded-full border border-border px-4 py-2 text-sm font-semibold text-textPrimary transition hover:bg-elevated"
      >
        Learn More
      </button>
    </article>
  );
};

export default EventCard;
