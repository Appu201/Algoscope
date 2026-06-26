import { useEffect, useRef, useState } from 'react'
import Header from './components/Header'
import Controls from './components/Controls'
import Visualizer from './components/Visualizer'
import { StatsPanel, InfoPanel } from './components/Panels'
import { ALGORITHMS } from './algorithms/sortingAlgorithms'

function randomArray(size) {
  return Array.from({ length: size }, () => Math.floor(Math.random() * 380) + 20)
}

export default function App() {
  const [size, setSize] = useState(40)
  const [originalArray, setOriginalArray] = useState(() => randomArray(40))
  const [array, setArray] = useState(originalArray)
  const [algoKey, setAlgoKey] = useState('bubble')
  const [speed, setSpeed] = useState(6)

  const [comparing, setComparing] = useState([])
  const [sorted, setSorted] = useState([])
  const [comparisons, setComparisons] = useState(0)
  const [writes, setWrites] = useState(0)
  const [elapsed, setElapsed] = useState(0)

  const [isPlaying, setIsPlaying] = useState(false)
  const [isFinished, setIsFinished] = useState(false)

  const generatorRef = useRef(null)

  const delay = (11 - speed) * 40 // speed 1 -> 400ms, speed 10 -> 40ms

  const resetStats = () => {
    setComparing([])
    setSorted([])
    setComparisons(0)
    setWrites(0)
    setElapsed(0)
    setIsFinished(false)
    generatorRef.current = null
  }

  const handleGenerate = (newSize = size) => {
    const next = randomArray(newSize)
    setOriginalArray(next)
    setArray(next)
    setIsPlaying(false)
    resetStats()
  }

  const handleSizeChange = (newSize) => {
    setSize(newSize)
    handleGenerate(newSize)
  }

  const handleAlgoChange = (key) => {
    setAlgoKey(key)
    setIsPlaying(false)
    resetStats()
    setArray(originalArray)
  }

  const handleReset = () => {
    setIsPlaying(false)
    resetStats()
    setArray(originalArray)
  }

  const handleToggleRun = () => {
    if (isFinished) {
      // Sort the same data again from scratch
      resetStats()
      setArray(originalArray)
      generatorRef.current = ALGORITHMS[algoKey](originalArray)
      setIsPlaying(true)
      return
    }
    if (!generatorRef.current) {
      generatorRef.current = ALGORITHMS[algoKey](array)
    }
    setIsPlaying((p) => !p)
  }

  useEffect(() => {
    if (!isPlaying) return
    const id = setInterval(() => {
      const gen = generatorRef.current
      if (!gen) return
      const { value, done } = gen.next()
      if (done) {
        setIsPlaying(false)
        return
      }
      setArray(value.array)
      setComparing(value.comparing || [])
      setSorted(value.sorted || [])
      setComparisons(value.comparisons)
      setWrites(value.writes)
      setElapsed((e) => e + delay)
      if (value.done) {
        setIsPlaying(false)
        setIsFinished(true)
        setComparing([])
      }
    }, delay)
    return () => clearInterval(id)
  }, [isPlaying, delay])

  const status = isPlaying ? 'Sorting' : isFinished ? 'Sorted' : 'Idle'
  const maxValue = Math.max(...originalArray, 1)

  return (
    <div className="app">
      <Header />

      <main className="layout">
        <Controls
          algoKey={algoKey}
          onAlgoChange={handleAlgoChange}
          size={size}
          onSizeChange={handleSizeChange}
          speed={speed}
          onSpeedChange={setSpeed}
          isPlaying={isPlaying}
          isFinished={isFinished}
          onGenerate={() => handleGenerate(size)}
          onToggleRun={handleToggleRun}
          onReset={handleReset}
        />

        <Visualizer array={array} comparing={comparing} sorted={sorted} maxValue={maxValue} />

        <div className="layout__panels">
          <StatsPanel comparisons={comparisons} writes={writes} elapsed={elapsed} status={status} />
          <InfoPanel algoKey={algoKey} />
        </div>
      </main>

      <footer className="footer">
        React · Vite · hand-built animation engine, no charting library
      </footer>
    </div>
  )
}
