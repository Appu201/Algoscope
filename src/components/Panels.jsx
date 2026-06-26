import { ALGO_INFO } from '../algorithms/algoInfo'

function formatTime(ms) {
  const totalSeconds = ms / 1000
  const minutes = Math.floor(totalSeconds / 60)
  const seconds = (totalSeconds % 60).toFixed(2)
  return `${String(minutes).padStart(2, '0')}:${seconds.padStart(5, '0')}`
}

export function StatsPanel({ comparisons, writes, elapsed, status }) {
  return (
    <section className="panel readout" aria-label="Live statistics">
      <h2 className="panel__heading">Live readout</h2>
      <dl className="readout__grid">
        <div className="readout__item">
          <dt>Status</dt>
          <dd className={`readout__status readout__status--${status.toLowerCase()}`}>{status}</dd>
        </div>
        <div className="readout__item">
          <dt>Comparisons</dt>
          <dd>{String(comparisons).padStart(4, '0')}</dd>
        </div>
        <div className="readout__item">
          <dt>Writes</dt>
          <dd>{String(writes).padStart(4, '0')}</dd>
        </div>
        <div className="readout__item">
          <dt>Elapsed</dt>
          <dd>{formatTime(elapsed)}</dd>
        </div>
      </dl>
    </section>
  )
}

export function InfoPanel({ algoKey }) {
  const info = ALGO_INFO[algoKey]
  return (
    <section className="panel info" aria-label="Algorithm details">
      <h2 className="panel__heading">{info.name}</h2>
      <p className="info__desc">{info.desc}</p>
      <dl className="info__grid">
        <div className="info__item">
          <dt>Best</dt>
          <dd>{info.best}</dd>
        </div>
        <div className="info__item">
          <dt>Average</dt>
          <dd>{info.avg}</dd>
        </div>
        <div className="info__item">
          <dt>Worst</dt>
          <dd>{info.worst}</dd>
        </div>
        <div className="info__item">
          <dt>Space</dt>
          <dd>{info.space}</dd>
        </div>
      </dl>
    </section>
  )
}
