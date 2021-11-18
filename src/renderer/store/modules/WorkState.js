import { WorkEvent } from '@/utils/WorkEvent'
import { getUtcTimestamp, getCurrentDate } from '@/utils/TimeUtils'
import { WorkEventTimeData } from '../../utils/WorkEventTimeData'
import { WORKING, ON_BREAK, IDLE, FINISHED } from '../../utils/EventStates'
import { store } from '@/utils/SettingsStore'

const notifier = require('node-notifier')
const path = require('path')

const state = {
  currentWorkEvent: Object.assign(new WorkEvent(), store.get('currentWorkEvent')),
  lastActiveTime: store.get('lastActiveTime')
}

const getters = {
  workState() {
    return state.currentWorkEvent.getCurrentState()
  },
  duration() {
    return state.currentWorkEvent.duration
  },
  currentWorkDate() {
    return state.currentWorkEvent.date
  },
  formattedDuration() {
    return state.currentWorkEvent.getFormattedDuration()
  },
  onIdle(_, getters) {
    return getters.workState === IDLE
  },

  onBreak(_, getters) {
    return getters.workState === ON_BREAK
  },

  working(_, getters) {
    return getters.workState === WORKING
  },

  running(_, getters) {
    return getters.workState === WORKING || getters.workState === ON_BREAK
  },

  finished(_, getters) {
    return getters.workState === FINISHED
  },

  selectedProyectId() {
    return state.currentWorkEvent.proyectId
  },

  description() {
    return state.currentWorkEvent.description
  },
  lastActiveTime() {
    return state.lastActiveTime
  }
}

const mutations = {
  CALCULATE_DURATION(state) {
    state.currentWorkEvent.calculateDuration()
  },

  START_WORK(state, proyectId) {
    state.currentWorkEvent = new WorkEvent(proyectId)
    state.currentWorkEvent.workEventTimeData.initialUtcTimestamp = getUtcTimestamp()
    state.currentWorkEvent.date = getCurrentDate()
    state.currentWorkEvent.state = WORKING
  },

  RESUME_WORK(state) {
    var lastBreak = state.currentWorkEvent.breaks[state.currentWorkEvent.breaks.length - 1]
    lastBreak.finalUtcTimestamp = getUtcTimestamp()
    state.currentWorkEvent.state = WORKING
  },

  HOLD_WORK(state) {
    state.currentWorkEvent.breaks.push(new WorkEventTimeData(getUtcTimestamp()))
    state.currentWorkEvent.state = ON_BREAK
  },

  STOP_WORK(state, finalUtcTimestamp) {
    if (!finalUtcTimestamp) {
      finalUtcTimestamp = getUtcTimestamp()
    }
    if (state.currentWorkEvent.state === WORKING || state.currentWorkEvent.state === ON_BREAK) {
      state.currentWorkEvent.workEventTimeData.finalUtcTimestamp = finalUtcTimestamp
    } if (state.currentWorkEvent.state === ON_BREAK) {
      var lastBreak = state.currentWorkEvent.breaks[state.currentWorkEvent.breaks.length - 1]
      lastBreak.finalUtcTimestamp = finalUtcTimestamp
    }
    state.currentWorkEvent.state = FINISHED
  },

  UPDATE_DESCRIPTION(state, payload) {
    state.currentWorkEvent.description = payload
  },

  SAVE_CURRENT_WORK(state) {
    store.set('currentWorkEvent', state.currentWorkEvent)
  },

  SAVE_LAST_ACTIVE_TIME(state) {
    state.lastActiveTime = getUtcTimestamp()
    store.set('lastActiveTime', state.lastActiveTime)
  }
}

const actions = {
  calculateDuration({ commit, getters }) {
    if (getters.working) {
      commit('CALCULATE_DURATION')
    }
  },

  startWork({ commit, getters, state }, selectedProyectId) {
    if (getters.onIdle || getters.finished) {
      commit('START_WORK', selectedProyectId)
    } else {
      // Another proyect has been ordered to start
      commit('STOP_WORK')
      if (state.currentWorkEvent.duration < 60) {
        commit('WORK_TOO_SHORT_WARNING', true)
      } else {
        commit('ARCHIVE_WORK', state.currentWorkEvent)
        commit('START_WORK', selectedProyectId)
      }
    }
    commit('SAVE_CURRENT_WORK')
  },

  resumeWork({ commit, getters }) {
    if (getters.onBreak) {
      commit('RESUME_WORK')
      commit('SAVE_CURRENT_WORK')
    }
  },

  holdWork({ commit, getters }) {
    if (getters.working) {
      commit('HOLD_WORK')
      commit('SAVE_CURRENT_WORK')
    }
  },

  stopWork({ commit, state }) {
    commit('STOP_WORK')
    commit('CALCULATE_DURATION')
    if (state.currentWorkEvent.duration < 60) {
      commit('WORK_TOO_SHORT_WARNING', true)
    } else {
      commit('ARCHIVE_WORK', state.currentWorkEvent)
      commit('SAVE_CURRENT_WORK')
      commit('SAVE_WORK_EVENTS')
    }
  },

  archiveWork({ commit, state }) {
    commit('ARCHIVE_WORK', state.currentWorkEvent)
  },

  saveCurrentWork({ commit }) {
    commit('SAVE_CURRENT_WORK')
  },

  saveWorkEvents({ commit }) {
    commit('SAVE_WORK_EVENTS')
  },

  updateDescription(context, payload) {
    context.commit('UPDATE_DESCRIPTION', payload)
    context.commit('SAVE_CURRENT_WORK')
  },

  checkDayOverflow({ commit, getters, state }) {
    var currendDate = getCurrentDate()
    if (getters.running && currendDate !== state.currentWorkEvent.date) {
      var proyectIdMem = state.currentWorkEvent.proyectId
      commit('STOP_WORK', getters.lastActiveTime)
      commit('ARCHIVE_WORK', state.currentWorkEvent)
      commit('SAVE_WORK_EVENTS')
      var currentDateTime = new Date(currendDate)
      var timeDiff = Math.abs(currentDateTime.getTime() - new Date().getTime())
      var appRunningDuringOverflow = timeDiff < 20000
      if (appRunningDuringOverflow) {
        commit('START_WORK', proyectIdMem)
      } else {
        commit('DAY_OVERFLOW_WARNING', true)
      }
      commit('SAVE_CURRENT_WORK')
    }
    commit('SAVE_LAST_ACTIVE_TIME')
  },

  updateWorkReminder({ commit, getters, state }) {
    if (getters.working) {
      // Do not keep the notifications
      notifier.notify({
        remove: 'ALL'
      })
      notifier.notify({
        title: 'Reminder',
        message: 'Remember to update your work',
        sound: false,
        icon: path.join(__static, 'icon.png'),
        appID: 'com.csm.chronos'
      })
    }
  }

}

export default {
  state,
  getters,
  mutations,
  actions
}
