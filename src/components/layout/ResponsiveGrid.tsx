type Props = {
  children: React.ReactNode;
  className?: string;
};

export default function ResponsiveGrid({ children, className = "" }: Props) {
  return (
    <section
      className={`grid gap-6 md:gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 ${className}`}
    >
      {children}
    </section>
  );
}
