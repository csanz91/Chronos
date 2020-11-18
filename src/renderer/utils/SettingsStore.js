import { WorkEvent } from './WorkEvent'

const Store = require('electron-store')

export const store = new Store({
  defaults: {
    alwaysOnTop: false,
    minToTray: true,
    workEvents: {},
    currentWorkEvent: new WorkEvent(),
    lastActiveTime: 0,
    proyects: {},
    seppelMail: '',
    seppelPassword: ''
  }
})
