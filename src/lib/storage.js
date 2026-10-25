export function readList(key) {
  try {
    const value = JSON.parse(localStorage.getItem(key) ?? '[]')
    return Array.isArray(value) ? value : []
  } catch {
    return []
  }
}

export function appendToList(key, entry) {
  const list = [...readList(key), entry]
  localStorage.setItem(key, JSON.stringify(list))
  return list
}

export function makeReference(prefix) {
  return `${prefix}-${Date.now().toString(36).toUpperCase().slice(-5)}${Math.floor(Math.random() * 90 + 10)}`
}
