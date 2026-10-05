export function formatOpenFda(val) {
  if (!val) {
    return 'Not Available'
  }
  if (Array.isArray(val)) {
    if (val.length === 0) {
      return 'Not Available'
    }
    return val.join(', ')
  }
  return String(val)
}
