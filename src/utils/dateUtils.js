export function generateEventInstances({
  startDate,
  eventTime,
  recurrence,
  dayOfWeek,
  occurrences,
  viewStart,
  viewEnd
}) {
  if (!startDate || !eventTime || !occurrences) return []

  const result = []
  let current = new Date(startDate)
  const viewStartDate = viewStart ? new Date(viewStart) : null
  const viewEndDate = viewEnd ? new Date(viewEnd) : null

  const weekdayMap = {
    Sunday: 0,
    Monday: 1,
    Tuesday: 2,
    Wednesday: 3,
    Thursday: 4,
    Friday: 5,
    Saturday: 6
  }

  if (recurrence === 'weekly') {
    const targetDay = weekdayMap[dayOfWeek]
    while (current.getDay() !== targetDay) {
      current.setDate(current.getDate() + 1)
    }
  }

  for (let i = 0; i < occurrences; i++) {
    const date = new Date(current)
    const [hours, minutes] = eventTime.split(':')
    date.setHours(+hours, +minutes)

    const dateTime = date.toLocaleString()
    const inView =
      (!viewStartDate || date >= viewStartDate) &&
      (!viewEndDate || date <= viewEndDate)

    result.push({ dateTime, inView })

    current.setDate(current.getDate() + (recurrence === 'daily' ? 1 : 7))
  }

  return result
}
