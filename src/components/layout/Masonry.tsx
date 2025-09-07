type Props = { children: React.ReactNode };

export default function Masonry({ children }: Props) {
  return (
    <section className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:block lg:columns-3 lg:gap-0 lg:[column-fill:_balance]">
    
      <div className="contents lg:[&>*]:break-inside-avoid lg:[&>*]:mb-6">
        {children}
      </div>
    </section>
  );
}
