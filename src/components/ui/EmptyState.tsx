export default function EmptyState({
  title = "No results",
  subtitle,
  suggestions = [],
}: {
  title?: string;
  subtitle?: string;
  suggestions?: string[];
}) {
  return (
    <div className="text-center py-16">
      {/* Liten illustration som gradientblob */}
      <div className="mx-auto mb-4 h-20 w-20 rounded-2xl bg-gradient-to-br from-accent-gradientFrom to-accent-gradientTo opacity-80" />
      <h3 className="font-display text-2xl">{title}</h3>
      {subtitle && <p className="lead mt-1">{subtitle}</p>}

      {suggestions.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-2 justify-center">
          {suggestions.map((s, i) => (
            <span
              key={i}
              className="rounded-full px-3 py-1 text-sm bg-gray-100 dark:bg-gray-800"
            >
              {s}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
