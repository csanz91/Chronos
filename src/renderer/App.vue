<template>
  <div id="app">
    <app-titlebar />
    <transition name="slide-left" mode="out-in">
      <app-drawer v-if="drawerOpen" />
    </transition>
    <popup v-if="workTooShortWarning">
      <h3 slot="body">The completed work is very short</h3>
      <h3 slot="footer">Do you want to discard it?</h3>
      <button slot="acceptButton" class="Button" @click=workTooShortDiscard>
        <div class="Button-icon-wrapper">
            <p>Discard Work</p>
        </div>
      </button>
      <button slot="cancelButton" class="Button" @click=workTooShortSave>
      <div class="Button-icon-wrapper">
          <p>Save Work</p>
      </div>
      </button>
    </popup>
    <popup v-if="dayOverflowWarning">
      <h3 slot="body">Yesterday's project was left running</h3>
      <h3 slot="footer">The final time is set to when the app or the computer were closed</h3>
      <button slot="cancelButton" class="Button" @click=dayOverflowCancel>
      <div class="Button-icon-wrapper">
          <p>Close</p>
      </div>
      </button>
    </popup>
    <div id="boxes">
    <proyects-list />
    <app-timer />
    </div>
  </div>
</template>

<script>
import appDrawer from '@/components/drawer/Drawer'
import appTimer from '@/components/timer/Timer'
import proyectsList from '@/components/proyectsList/ProyectsList'
import appTitlebar from '@/components/Titlebar'
import Popup from '@/components/Modal/Popup'

export default {
  name: 'chronos',

  components: {
    appDrawer,
    proyectsList,
    appTimer,
    appTitlebar,
    Popup
  },

  computed: {
    // store getters
    drawerOpen() {
      return this.$store.getters.drawerOpen
    },
    os() {
      return this.$store.getters.os
    },
    workTooShortWarning() {
      return this.$store.getters.workTooShortWarning
    },
    dayOverflowWarning() {
      return this.$store.getters.dayOverflowWarning
    }
  },
  methods: {
    workTooShortSave() {
      this.$store.dispatch('archiveWork')
      this.$store.dispatch('saveCurrentWork')
      this.$store.dispatch('saveWorkEvents')
      this.$store.dispatch('setWorkTooShortWarning', false)
    },
    workTooShortDiscard() {
      this.$store.dispatch('setWorkTooShortWarning', false)
    },
    dayOverflowCancel() {
      this.$store.dispatch('setDayOverFlowWarning', false)
    }
  },
  created() {
    this.durationInterval = setInterval(
      () => this.$store.dispatch('calculateDuration'),
      200
    )
    this.dayOverflowInterval = setInterval(
      () => this.$store.dispatch('checkDayOverflow'),
      10000
    )
    this.$store.dispatch('checkDayOverflow')
  },
  beforeDestroy() {
    clearInterval(this.durationInterval)
    clearInterval(this.dayOverflowInterval)
  }
}
</script>

<style lang="scss">
#app {
  animation: fade-in 0.5s ease forwards;
  position: relative;
  overflow: hidden;
  height: 100vh;
}
#boxes {
  width: -webkit-fill-available;
  display: table;
  clear: both;
}

.Button {
  border: 2px solid $colorBlueGrey;
  display: flex;
  margin-left: 10px;
  justify-content: space-around;
  align-items: center;
  transition: $transitionDefault;
  width: 100px;
  height: 45px;
  -webkit-app-region: no-drag;
  float: right;
  background: $colorNavy;
  color: $colorWhite;
  &:disabled{
    background: $colorBlueGrey;
    color: $colorWhite;
    opacity: 0.6;
    cursor: not-allowed;
  }
  &:not([disabled]):hover{
    background-color: $colorLightNavy;
    & .Icon--pause line {
      stroke: $colorRed;
    }
    & .Icon--start polygon {
      fill: $colorRed;
    }
    & .Icon--stop rect {
      fill: $colorRed;
    }
    & .Icon--resume path {
      fill: $colorRed;
    }
  }
}
</style>
