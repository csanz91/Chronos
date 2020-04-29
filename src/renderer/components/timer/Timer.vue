<template>
  <div class="Timer-wrapper">
    <app-tray-icon />
    <p class="Today-worked">Worked Today: {{timeWorkedToday}}</p>

    <app-timer-dial :current-state="currentState">
    </app-timer-dial>
    <textarea v-if="running || finished"
    :disabled=!running
      class="Description-field"
      v-model="description"
      placeholder="Work Description"
    />
  </div>
</template>

<script>
import appTrayIcon from '@/components/TrayIcon'
import appTimerDial from '@/components/timer/Timer-dial'

export default {
  components: {
    appTrayIcon,
    appTimerDial
  },

  computed: {
    // store getters
    currentState() {
      return this.$store.getters.workState
    },

    running() {
      return this.$store.getters.running
    },

    finished() {
      return this.$store.getters.finished
    },

    timeWorkedToday() {
      return this.$store.getters.timeWorkedToday
    },

    description: {
      get() {
        return this.$store.getters.description
      },
      set(value) {
        this.$store.dispatch('updateDescription', value)
      }
    }
  }
}
</script>

<style lang="scss" scoped>

.Description-field {
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
  background: transparent;
  padding: 10px 15px;
  margin: 0px 0px;
  -webkit-transition: all 0.1s ease-in-out;
  -moz-transition: all 0.1s ease-in-out;
  -ms-transition: all 0.1s ease-in-out;
  -o-transition: all 0.1s ease-in-out;
  transition: all 0.1s ease-in-out;
  border-bottom: 1px solid $colorBlueGrey;
  font-family: 'Lato', sans-serif;
  height: 90px;
}

.Timer-wrapper {
  display: flex;
  flex-direction: column;
}

.Today-worked {
  font-size: 20px;
  margin: 0;
  align-self: center;
}
</style>
