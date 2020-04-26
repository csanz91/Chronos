import { getUtcTimestamp } from '@/utils/TimeUtils'
import { ProyectData } from '@/utils/ProyectData'
import { localStore } from './index'

import Vue from 'vue'

function recoverProyectsObjects(object) {
  return Object.keys(object).reduce(function(result, key) {
    result[key] = Object.assign(new ProyectData(), (object[key]))
    return result
  }, {})
}

const state = {
  proyects: recoverProyectsObjects(localStore.get('proyects'))
}

const getters = {
  allProyects() {
    return Object.values(state.proyects)
  },
  getProyect: () => (proyectId) => {
    return state.proyects[proyectId]
  },
  selectedProyectForEdition() {
    return state.selectedProyectForEdition
  }
}

const mutations = {
  SAVE_PROYECT(state, modifiedProyect) {
    Vue.set(state.proyects, modifiedProyect.proyectId, modifiedProyect)
  },
  DELETE_PROYECT(state, proyectId) {
    Vue.delete(state.proyects, proyectId)
  },
  ARCHIVE_PROYECTS(state) {
    localStore.set('proyects', state.proyects)
  }
}

const actions = {
  saveProyect({ commit }, proyect) {
    if (!proyect.proyectId) {
      proyect.proyectId = getUtcTimestamp()
    }
    commit('SAVE_PROYECT', proyect)
    commit('ARCHIVE_PROYECTS')
  },
  deleteProyect({ commit, getters }, proyectId) {
    // Check if the proyect exists
    if (!getters.getProyect(proyectId)) {
      return
    }
    commit('DELETE_PROYECT', proyectId)
    commit('ARCHIVE_PROYECTS')
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
