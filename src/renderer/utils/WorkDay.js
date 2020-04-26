export class WorkDay {
  constructor(date) {
    this.date = date
    this.workEvents = []
    this.aggWorkEvents = {}
    this.initialWorkDayUtcTimestamp = 0
    this.finalWorkDayUtcTimestamp = 0
  }

  addWorkEvent(workEvent) {
    this.workEvents.push(workEvent)
    this.aggregateWorkEventsData()
  }

  aggregateWorkEventsData() {
    this.aggWorkEvents = {}
    this.workEvents.forEach(function(workEvent) {
      if (!this.initialWorkDayUtcTimestamp) {
        this.initialWorkDayUtcTimestamp = workEvent.workEventTimeData.initialUtcTimestamp
      }
      this.initialWorkDayUtcTimestamp = Math.min(this.initialWorkDayUtcTimestamp, workEvent.workEventTimeData.initialUtcTimestamp)
      this.finalWorkDayUtcTimestamp = Math.max(this.finalWorkDayUtcTimestamp, workEvent.workEventTimeData.finalUtcTimestamp)

      if (!this.aggWorkEvents[workEvent.proyectId]) {
        this.aggWorkEvents[workEvent.proyectId] = workEvent.duration
      } else {
        this.aggWorkEvents[workEvent.proyectId] += workEvent.duration
      }
    }.bind(this))
  }
}
