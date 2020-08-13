<template>
  <div class="Container">
    <p class="Drawer-heading">Settings</p>
    <div class="Setting-wrapper Bar">
      <p class="Setting-title">Always On Top</p>
      <div
        class="Checkbox"
        @click="selectAlwaysOnTop"
        :class="alwaysOnTop ? 'is-active' : 'is-inactive'"
      ></div>
    </div>
    <div
      class="Setting-wrapper Bar"
      v-if="os === 'win32'">
      <p class="Setting-title">Minimize to Tray</p>
      <div
        class="Checkbox"
        @click="selectMinToTray"
        :class="minToTray ? 'is-active' : 'is-inactive'"
      ></div>
    </div>
    <div
      class="Setting-wrapper Bar">
      <p class="Setting-title">Username</p>
      <input
            placeholder="XXX Mail"
            ref="nameField"
            class="Input-field"
            v-model="seppelMail"

        />
    </div>
    <div
      class="Setting-wrapper Bar">
      <p class="Setting-title">Password</p>
      <input
            placeholder="XXX Password"
            ref="nameField"
            class="Input-field"
            type="password"
            v-model="seppelPassword"

        />
    </div>

  </div>
</template>

<script>
import { ipcRenderer } from 'electron'

export default {
  name: 'Drawer-settings',

  computed: {
    alwaysOnTop() {
      return this.$store.getters.alwaysOnTop
    },

    minToTray() {
      return this.$store.getters.minToTray
    },

    os() {
      return this.$store.getters.os
    },
    seppelMail: {
      get() {
        return this.$store.getters.seppelMail
      },
      set(value) {
        const payload = {
          key: 'seppelMail',
          val: value
        }
        this.$store.dispatch('setSetting', payload)
        this.$store.dispatch('setViewState', payload)
      }
    },
    seppelPassword: {
      get() {
        return this.$store.getters.seppelPassword
      },
      set(value) {
        const payload = {
          key: 'seppelPassword',
          val: value
        }
        this.$store.dispatch('setSetting', payload)
        this.$store.dispatch('setViewState', payload)
      }
    }
  },

  methods: {
    selectAlwaysOnTop() {
      const payload = {
        key: 'alwaysOnTop',
        val: !this.alwaysOnTop
      }
      ipcRenderer.send('toggle-alwaysOnTop', !this.alwaysOnTop)
      this.$store.dispatch('setSetting', payload)
      this.$store.dispatch('setViewState', payload)
    },

    selectMinToTray() {
      const payload = {
        key: 'minToTray',
        val: !this.minToTray
      }
      ipcRenderer.send('toggle-minToTray', !this.minToTray)
      this.$store.dispatch('setSetting', payload)
      this.$store.dispatch('setViewState', payload)
    },
    editUsername() {
      const payload = {
        key: 'minToTray',
        val: !this.minToTray
      }
      ipcRenderer.send('toggle-minToTray', !this.minToTray)
      this.$store.dispatch('setSetting', payload)
      this.$store.dispatch('setViewState', payload)
    }
  }
}
</script>

<style lang="scss" scoped>
.Checkbox {
  background-color: $colorNavy;
  border: 2px solid $colorBlueGrey;
  border-radius: 100%;
  display: inline-block;
  transition: $transitionDefault;
  align-self: center;
  width: 16px;
  height: 16px;
  &:hover {
    border-color: $colorRed;
  }
  &.is-active {
    background-color: $colorRed;
    border-color: $colorNavy;
    &:hover {
      background-color: $colorNavy;
      border-color: $colorRed;
    }
  }
}

.Setting-wrapper {
  background-color: $colorNavy;
}

.Input-field {
  display: flex;
  align-self: center;
  font-weight: 300;
  width: 250px;
  font-size: 20px;
  border: 0px;
  outline: none;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
  color: $colorWhite;
  background: $colorLightNavy;
  margin: 0px 0px;
  padding: 5px;
  -webkit-transition: all 0.1s ease-in-out;
  -moz-transition: all 0.1s ease-in-out;
  -ms-transition: all 0.1s ease-in-out;
  -o-transition: all 0.1s ease-in-out;
  transition: all 0.1s ease-in-out;
  //border-bottom: 1px solid $colorBlueGrey;
}
</style>
