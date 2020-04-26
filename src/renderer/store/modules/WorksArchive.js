import { WorkDay } from '@/utils/WorkDay'
import { moveDate } from '@/utils/TimeUtils'
import { localStore } from './index'

function recoverWorkDayObjects(object) {
  return Object.keys(object).reduce(function(result, key) {
    result[key] = Object.assign(new WorkDay(), (object[key]))
    return result
  }, {})
}

const state = {
  workEvents: recoverWorkDayObjects(localStore.get('workEvents'))
}

const getters = {

  getWorkDays: () => (initialDate, finalDate) => {
    // Make a copy of the dates to make sure we dont alter the original ones
    const startRangeDate = new Date(initialDate.valueOf())
    var finalRangeDate = new Date(finalDate.valueOf())
    if (!finalRangeDate) {
      finalRangeDate = new Date()
    }
    const workDays = []
    for (var d = startRangeDate; d <= finalRangeDate; d = moveDate(d, 1)) {
      var workDay = state.workEvents[new Date(d).toDateString()]
      if (!workDay) {
        continue
      }
      workDays.push(workDay)
    }
    return workDays
  },

  proyectSummary: (_, getters) => (proyectId, initialDate, finalDate) => {
    let projectSummary = 0
    const workDays = getters.getWorkDays(initialDate, finalDate)
    workDays.forEach(workDay => {
      const projectDuration = workDay.aggWorkEvents[proyectId]
      if (projectDuration) {
        projectSummary += projectDuration
      }
    })
    return projectSummary
  },

  proyectsSummaryAvailable: (_, getters) => (initialDate, finalDate) => {
    let proyectsAvailable = []
    const allProyectsKeys = getters.allProyects.map(p => p.proyectId.toString())
    const workDays = getters.getWorkDays(initialDate, finalDate)
    workDays.forEach(workDay => {
      if (workDay.aggWorkEvents) {
        proyectsAvailable = proyectsAvailable
          .concat(Object.keys(workDay.aggWorkEvents)
            .filter(value => allProyectsKeys.indexOf(value) !== -1 && proyectsAvailable.indexOf(value) === -1))
      }
    })
    return proyectsAvailable
  },

  workDay: () => (date) => {
    var workDay = state.workEvents[date]
    return workDay
  }
}

const mutations = {

  ARCHIVE_WORK(state, currentWorkEvent) {
    var workDate = currentWorkEvent.date
    currentWorkEvent.calculateDuration()
    if (!state.workEvents[workDate]) {
      state.workEvents[workDate] = new WorkDay(workDate)
    }
    state.workEvents[workDate].addWorkEvent(currentWorkEvent)
  },

  SAVE_WORK_EVENTS(state) {
    localStore.set('workEvents', state.workEvents)
  }
}

const actions = {

}

export default {
  state,
  getters,
  mutations,
  actions
}
