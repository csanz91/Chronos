import { WorkEventTimeData } from './WorkEventTimeData'
import { WORKING, ON_BREAK, IDLE } from './EventStates'
import { formatDuration, getUtcTimestamp } from './TimeUtils'

export class WorkEvent {
  constructor(proyectId) {
    this.proyectId = proyectId
    this.state = IDLE
    this.description = ''
    this.workEventTimeData = new WorkEventTimeData(0)
    this.breaks = []
    this.date = ''
    this.duration = 0
  }

  getCurrentState() {
    return this.state
  }

  calculateDuration() {
    if (this.state === IDLE) {
      this.duration = 0
    }

    var finalUtcTimestamp
    if (this.state === WORKING) {
      finalUtcTimestamp = getUtcTimestamp()
    } else if (this.state === ON_BREAK) {
      var lastBreak = this.breaks[this.breaks.length - 1]
      finalUtcTimestamp = lastBreak.initialUtcTimestamp
    } else {
      finalUtcTimestamp = this.workEventTimeData.finalUtcTimestamp
    }

    var duration = finalUtcTimestamp - this.workEventTimeData.initialUtcTimestamp
    this.breaks.forEach(function(breakEventTimeData) {
      if (breakEventTimeData.finalUtcTimestamp) {
        duration -= breakEventTimeData.finalUtcTimestamp - breakEventTimeData.initialUtcTimestamp
      }
    })
    this.duration = duration
  }

  getFormattedDuration() {
    return formatDuration(this.duration)
  }
}
