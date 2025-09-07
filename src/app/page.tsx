export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <button className="btn rounded-sm btn-error">Det blev fel</button>

      <div className="card bg-base-100 w-96 shadow-sm">
        <figure>
          <img
            src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
            alt="Shoes" />
        </figure>
        <div className="card-body">
          <h2 className="card-title">Card Title</h2>
          <p>A card component has a figure, a body part, and inside body there are title and actions parts</p>
          <div className="card-actions justify-end">
            <button className="btn btn-primary rounded-sm">Buy Now</button>
          </div>
        </div>
      </div>
    </div>
  );
}
