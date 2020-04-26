export function getUtcTimestamp() {
  return Math.floor((new Date()).getTime() / 1000)
}

export function formatDuration(duration) {
  var hours = Math.floor(duration / 3600)
  duration %= 3600
  var minutes = Math.floor(duration / 60)
  var seconds = duration % 60

  if (hours > 0) {
    return `${hours}h ${minutes}m`
  } else {
    return `${minutes}m ${seconds}s`
  }
}

export function getCurrentDate() {
  return new Date().toDateString()
}

export function moveDate(date, days) {
  const newDate = new Date(date.valueOf())
  newDate.setDate(newDate.getDate() + days)
  return newDate
}
