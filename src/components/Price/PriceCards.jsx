export default function PriceCard({ name, cost, children, onSubscribe }) {
  return (
    <>
      <div
        className={
          "card w-96 shadow-sm border border-1 " +
          (cost > 0
            ? "bg-indigo-400 border-indigo-400 text-white"
            : "bg-base-100 border-gray-200")
        }
      >
        <div className="card-body">
          {cost > 0 ? (
            <span className="badge badge-xs badge-warning">Más Popular</span>
          ) : (
            <span className="badge badge-xs">Gratuito</span>
          )}
          <div className="flex justify-between">
            <h2 className="text-3xl font-bold">{name}</h2>
            {cost > -1 ? <span className="text-xl">${cost}/mes</span> : null}
          </div>
          <ul className="mt-6 flex flex-col gap-2 text-xs">{children}</ul>
          <div className="mt-6">
            <button
              className="btn btn-primary btn-block"
              onClick={() => onSubscribe(name === "Premium" ? 2 : 1)}
            >
              Subscribirse
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
