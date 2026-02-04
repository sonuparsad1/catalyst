import { Link } from "react-router-dom";

const formatPrice = (price) => (price > 0 ? `$${price}` : "Free");

const EventCard = ({ id, title, date, time, category, price, venue, description }) => {
  return (
    <article className="flex h-full flex-col justify-between rounded-2xl border border-border bg-card-gradient p-6 shadow-card-ambient">
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="rounded-full bg-elevated px-3 py-1 text-xs font-semibold uppercase tracking-wide text-textSecondary">
            {category}
          </span>
          <span className="rounded-full border border-primary/40 px-3 py-1 text-xs font-semibold text-primary">
            {formatPrice(price)}
          </span>
        </div>
        <h3 className="text-xl font-semibold text-textPrimary">{title}</h3>
        <p className="text-sm text-textSecondary">
          {date} • {time}
        </p>
        <p className="text-sm text-textSecondary">{venue}</p>
        {description ? (
          <p className="text-sm text-textSecondary">{description}</p>
        ) : null}
      </div>
      <Link
        to={`/events/${id}`}
        className="mt-6 w-full rounded-full border border-primary/60 bg-surface px-4 py-2 text-center text-sm font-semibold text-textPrimary transition hover:border-primary"
      >
        Learn More
      </Link>
    </article>
  );
};

export default EventCard;
