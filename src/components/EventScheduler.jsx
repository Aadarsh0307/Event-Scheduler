import React, { useState } from 'react'
import { generateEventInstances } from '../utils/dateUtils'
import './EventScheduler.css'

const EventScheduler = () => {
  const [startDate, setStartDate] = useState('')
  const [eventTime, setEventTime] = useState('')
  const [recurrence, setRecurrence] = useState('weekly')
  const [dayOfWeek, setDayOfWeek] = useState('Monday')
  const [occurrences, setOccurrences] = useState(5)
  const [viewStart, setViewStart] = useState('')
  const [viewEnd, setViewEnd] = useState('')
  const [instances, setInstances] = useState([])

  const handleGenerate = () => {
    const generated = generateEventInstances({
      startDate,
      eventTime,
      recurrence,
      dayOfWeek,
      occurrences,
      viewStart,
      viewEnd
    })
    setInstances(generated)
  }

  return (
    <div className="scheduler">
      <div className="inputs">
        <label>
          Start Date:
          <input type="date" value={startDate} onChange={e => setStartDate(e.target.value)} />
        </label>

        <label>
          Event Time:
          <input type="time" value={eventTime} onChange={e => setEventTime(e.target.value)} />
        </label>

        <label>
          Recurrence:
          <select value={recurrence} onChange={e => setRecurrence(e.target.value)}>
            <option value="weekly">Weekly</option>
            <option value="daily">Daily</option>
          </select>
        </label>

        {recurrence === 'weekly' && (
          <label>
            Day of Week:
            <select value={dayOfWeek} onChange={e => setDayOfWeek(e.target.value)}>
              {['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'].map(day => (
                <option key={day} value={day}>{day}</option>
              ))}
            </select>
          </label>
        )}

        <label>
          Number of Occurrences:
          <input type="number" min="1" value={occurrences} onChange={e => setOccurrences(e.target.value)} />
        </label>

        <label>
          View Window Start:
          <input type="date" value={viewStart} onChange={e => setViewStart(e.target.value)} />
        </label>

        <label>
          View Window End:
          <input type="date" value={viewEnd} onChange={e => setViewEnd(e.target.value)} />
        </label>

        <button onClick={handleGenerate}>Generate Instances</button>
      </div>

      <div className="instances">
        <h3>Event Instances</h3>
        <ul>
          {instances.map(({ dateTime, inView }, index) => (
            <li key={index} className={inView ? 'in-view' : 'out-of-view'}>
              {dateTime} {inView ? '' : '(Outside view)'}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default EventScheduler
