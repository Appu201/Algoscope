// Each function is a generator that yields a snapshot of the array's state
// after every meaningful operation (comparison or write). The UI drives
// these generators one step at a time so any algorithm can be animated
// through the exact same playback engine.

function* bubbleSort(arr) {
  const a = [...arr]
  const n = a.length
  let comparisons = 0
  let writes = 0
  const sorted = new Set()

  for (let i = 0; i < n - 1; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      comparisons++
      yield { array: [...a], comparing: [j, j + 1], sorted: [...sorted], comparisons, writes }
      if (a[j] > a[j + 1]) {
        ;[a[j], a[j + 1]] = [a[j + 1], a[j]]
        writes++
        yield { array: [...a], comparing: [j, j + 1], sorted: [...sorted], comparisons, writes }
      }
    }
    sorted.add(n - i - 1)
  }
  sorted.add(0)
  yield { array: [...a], comparing: [], sorted: a.map((_, i) => i), comparisons, writes, done: true }
}

function* selectionSort(arr) {
  const a = [...arr]
  const n = a.length
  let comparisons = 0
  let writes = 0
  const sorted = []

  for (let i = 0; i < n; i++) {
    let minIdx = i
    for (let j = i + 1; j < n; j++) {
      comparisons++
      yield { array: [...a], comparing: [minIdx, j], sorted: [...sorted], comparisons, writes }
      if (a[j] < a[minIdx]) minIdx = j
    }
    if (minIdx !== i) {
      ;[a[i], a[minIdx]] = [a[minIdx], a[i]]
      writes++
    }
    sorted.push(i)
    yield { array: [...a], comparing: [], sorted: [...sorted], comparisons, writes }
  }
  yield { array: [...a], comparing: [], sorted: a.map((_, i) => i), comparisons, writes, done: true }
}

function* insertionSort(arr) {
  const a = [...arr]
  const n = a.length
  let comparisons = 0
  let writes = 0

  for (let i = 1; i < n; i++) {
    let j = i
    while (j > 0) {
      comparisons++
      const settled = Array.from({ length: i }, (_, k) => k)
      yield { array: [...a], comparing: [j - 1, j], sorted: settled, comparisons, writes }
      if (a[j - 1] > a[j]) {
        ;[a[j - 1], a[j]] = [a[j], a[j - 1]]
        writes++
        j--
        yield { array: [...a], comparing: [j, j + 1], sorted: settled, comparisons, writes }
      } else {
        break
      }
    }
  }
  yield { array: [...a], comparing: [], sorted: a.map((_, i) => i), comparisons, writes, done: true }
}

function* mergeSort(arr) {
  const a = [...arr]
  let comparisons = 0
  let writes = 0

  function* merge(start, mid, end) {
    const left = a.slice(start, mid)
    const right = a.slice(mid, end)
    let i = 0
    let j = 0
    let k = start

    while (i < left.length && j < right.length) {
      comparisons++
      yield { array: [...a], comparing: [start + i, mid + j], sorted: [], comparisons, writes }
      if (left[i] <= right[j]) {
        a[k] = left[i]
        i++
      } else {
        a[k] = right[j]
        j++
      }
      writes++
      k++
      yield { array: [...a], comparing: [], sorted: [], comparisons, writes }
    }
    while (i < left.length) {
      a[k] = left[i]
      i++
      k++
      writes++
      yield { array: [...a], comparing: [], sorted: [], comparisons, writes }
    }
    while (j < right.length) {
      a[k] = right[j]
      j++
      k++
      writes++
      yield { array: [...a], comparing: [], sorted: [], comparisons, writes }
    }
  }

  function* sortRange(start, end) {
    if (end - start <= 1) return
    const mid = Math.floor((start + end) / 2)
    yield* sortRange(start, mid)
    yield* sortRange(mid, end)
    yield* merge(start, mid, end)
  }

  yield* sortRange(0, a.length)
  yield { array: [...a], comparing: [], sorted: a.map((_, i) => i), comparisons, writes, done: true }
}

function* quickSort(arr) {
  const a = [...arr]
  let comparisons = 0
  let writes = 0

  function* partition(low, high) {
    const pivot = a[high]
    let i = low - 1
    for (let j = low; j < high; j++) {
      comparisons++
      yield { array: [...a], comparing: [j, high], sorted: [], comparisons, writes }
      if (a[j] < pivot) {
        i++
        ;[a[i], a[j]] = [a[j], a[i]]
        writes++
        yield { array: [...a], comparing: [i, j], sorted: [], comparisons, writes }
      }
    }
    ;[a[i + 1], a[high]] = [a[high], a[i + 1]]
    writes++
    yield { array: [...a], comparing: [i + 1, high], sorted: [], comparisons, writes }
    return i + 1
  }

  function* sortRange(low, high) {
    if (low < high) {
      const pivotIndex = yield* partition(low, high)
      yield* sortRange(low, pivotIndex - 1)
      yield* sortRange(pivotIndex + 1, high)
    }
  }

  yield* sortRange(0, a.length - 1)
  yield { array: [...a], comparing: [], sorted: a.map((_, i) => i), comparisons, writes, done: true }
}

export const ALGORITHMS = {
  bubble: bubbleSort,
  selection: selectionSort,
  insertion: insertionSort,
  merge: mergeSort,
  quick: quickSort,
}
