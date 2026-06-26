import { ALGO_INFO } from '../algorithms/algoInfo'

export default function Controls({
  algoKey,
  onAlgoChange,
  size,
  onSizeChange,
  speed,
  onSpeedChange,
  isPlaying,
  isFinished,
  onGenerate,
  onToggleRun,
  onReset,
}) {
  return (
    <section className="panel controls" aria-label="Visualizer controls">
      <div className="controls__row">
        <label className="controls__field">
          <span className="controls__label">Algorithm</span>
          <select
            className="controls__select"
            value={algoKey}
            onChange={(e) => onAlgoChange(e.target.value)}
            disabled={isPlaying}
          >
            {Object.entries(ALGO_INFO).map(([key, info]) => (
              <option key={key} value={key}>
                {info.name}
              </option>
            ))}
          </select>
        </label>

        <label className="controls__field">
          <span className="controls__label">Array size — {size}</span>
          <input
            type="range"
            min={10}
            max={100}
            value={size}
            onChange={(e) => onSizeChange(Number(e.target.value))}
            disabled={isPlaying}
          />
        </label>

        <label className="controls__field">
          <span className="controls__label">Speed — {speed}</span>
          <input
            type="range"
            min={1}
            max={10}
            value={speed}
            onChange={(e) => onSpeedChange(Number(e.target.value))}
          />
        </label>
      </div>

      <div className="controls__row controls__actions">
        <button className="btn btn--ghost" onClick={onGenerate} disabled={isPlaying}>
          New array
        </button>
        <button className="btn btn--primary" onClick={onToggleRun}>
          {isPlaying ? 'Pause' : isFinished ? 'Sort again' : 'Sort'}
        </button>
        <button className="btn btn--ghost" onClick={onReset} disabled={isPlaying}>
          Reset
        </button>
      </div>
    </section>
  )
}
