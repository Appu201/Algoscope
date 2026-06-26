export default function Visualizer({ array, comparing, sorted, maxValue }) {
  return (
    <section className="panel scope" aria-label="Sorting visualization">
      <div className="scope__sweep" />
      <div className="scope__bars">
        {array.map((value, idx) => {
          const isComparing = comparing.includes(idx)
          const isSorted = sorted.includes(idx)
          const heightPct = (value / maxValue) * 100
          const className = isSorted
            ? 'bar bar--sorted'
            : isComparing
            ? 'bar bar--comparing'
            : 'bar bar--active'
          return (
            <div
              key={idx}
              className={className}
              style={{ height: `${heightPct}%` }}
              title={value}
            />
          )
        })}
      </div>
    </section>
  )
}
