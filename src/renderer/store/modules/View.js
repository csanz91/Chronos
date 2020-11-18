import { store } from '@/utils/SettingsStore'

const state = {
  currentDrawer: 'appDrawerSettings',
  drawerOpen: false,
  alwaysOnTop: store.get('alwaysOnTop'),
  minToTray: store.get('minToTray'),
  seppelMail: store.get('seppelMail'),
  seppelPassword: store.get('seppelPassword'),
  os: process.platform,
  dayOverflowWarning: false,
  workTooShortWarning: false
}

const getters = {

  currentDrawer() {
    return state.currentDrawer
  },

  drawerOpen() {
    return state.drawerOpen
  },

  alwaysOnTop() {
    return state.alwaysOnTop
  },

  minToTray() {
    return state.minToTray
  },

  os() {
    return state.os
  },
  seppelMail() {
    return state.seppelMail
  },
  seppelPassword() {
    return state.seppelPassword
  },
  dayOverflowWarning() {
    return state.dayOverflowWarning
  },
  workTooShortWarning() {
    return state.workTooShortWarning
  }
}

const mutations = {
  SET_SETTING(state, payload) {
    store.set(payload.key, payload.val)
  },

  SET_VIEW_STATE(state, payload) {
    state[payload.key] = payload.val
  },

  TOGGLE_DRAWER(state) {
    state.drawerOpen = !state.drawerOpen
  },
  DAY_OVERFLOW_WARNING(state, payload) {
    state.dayOverflowWarning = payload
  },
  WORK_TOO_SHORT_WARNING(state, payload) {
    state.workTooShortWarning = payload
  }
}

const actions = {
  setSetting({ commit }, payload) {
    commit('SET_SETTING', payload)
  },

  setViewState({ commit }, payload) {
    commit('SET_VIEW_STATE', payload)
  },

  toggleDrawer({ commit }) {
    commit('TOGGLE_DRAWER')
  },

  setDayOverFlowWarning({ commit }, payload) {
    commit('DAY_OVERFLOW_WARNING', payload)
  },

  setWorkTooShortWarning({ commit }, payload) {
    commit('WORK_TOO_SHORT_WARNING', payload)
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
