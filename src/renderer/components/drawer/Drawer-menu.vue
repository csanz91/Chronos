<template>
  <div class="Drawer-menu">
    <div
      class="Drawer-menu-wrapper"
      @click="setDrawerComponent('proyectsManagement')"
      :class="{ 'is-active': currentDrawer === 'proyectsManagement' }"
    >
      <div class="Drawer-menu-button">
        <div class="Icon-wrapper">
          <svg
            version="1.2"
            baseProfile="tiny"
            id="timer-icon"
            class="Icon"
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            x="0px"
            y="0px"
            viewBox="0 0 32 32"
            width="18"
            xml:space="preserve"
          >
            <g>
              <path
                fill="#868C99"
                d="M12 2h20v4h-20v-4zM12 14h20v4h-20v-4zM12 26h20v4h-20v-4zM0 4c0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.209-1.791 4-4 4s-4-1.791-4-4zM0 16c0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.209-1.791 4-4 4s-4-1.791-4-4zM0 28c0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.209-1.791 4-4 4s-4-1.791-4-4z"
              />
            </g>
          </svg>
        </div>
      </div>
    </div>
    <div
      class="Drawer-menu-wrapper"
      @click="setDrawerComponent('dataAnalysis')"
      :class="{ 'is-active': currentDrawer === 'dataAnalysis' }"
    >
      <div class="Drawer-menu-button">
        <div class="Icon-wrapper">
          <svg
            version="1.2"
            baseProfile="tiny"
            id="timer-icon"
            class="Icon"
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            x="0px"
            y="0px"
            viewBox="0 0 32 32"
            width="18"
            xml:space="preserve"
          >
            <g>
              <path
                fill="#868C99"
                d="M14 18v-14c-7.732 0-14 6.268-14 14s6.268 14 14 14 14-6.268 14-14c0-2.251-0.532-4.378-1.476-6.262l-12.524 6.262zM28.524 7.738c-2.299-4.588-7.043-7.738-12.524-7.738v14l12.524-6.262z"
              />
            </g>
          </svg>
        </div>
      </div>
    </div>
    <div
      class="Drawer-menu-wrapper"
      @click="setDrawerComponent('appDrawerSettings')"
      :class="{ 'is-active': currentDrawer === 'appDrawerSettings' }"
    >
      <div class="Drawer-menu-button">
        <svg
          version="1.2"
          baseProfile="tiny"
          id="settings-icon"
          class="Icon"
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          x="0px"
          y="0px"
          viewBox="0 0 19.5 20"
          width="18"
          xml:space="preserve"
        >
          <path
            fill="#868C99"
            d="M17.2,11c0-0.3,0.1-0.6,0.1-1s0-0.7-0.1-1l2.1-1.6c0.2-0.1,0.2-0.4,0.1-0.6l-2-3.5C17.3,3.1,17,3,16.8,3.1
            l-2.5,1c-0.5-0.4-1.1-0.7-1.7-1l-0.4-2.7C12.2,0.2,12,0,11.7,0h-4C7.5,0,7.3,0.2,7.2,0.4L6.9,3.1c-0.6,0.3-1.2,0.6-1.7,1l-2.5-1
            C2.4,3,2.2,3.1,2.1,3.3l-2,3.5C-0.1,6.9,0,7.2,0.2,7.4L2.3,9c0,0.3-0.1,0.6-0.1,1s0,0.7,0.1,1l-2.1,1.6C0,12.8-0.1,13,0.1,13.3
            l2,3.5c0.1,0.2,0.4,0.3,0.6,0.2l2.5-1c0.5,0.4,1.1,0.7,1.7,1l0.4,2.6c0,0.2,0.2,0.4,0.5,0.4h4c0.3,0,0.5-0.2,0.5-0.4l0.4-2.6
            c0.6-0.3,1.2-0.6,1.7-1l2.5,1c0.2,0.1,0.5,0,0.6-0.2l2-3.5c0.1-0.2,0.1-0.5-0.1-0.6L17.2,11z M9.7,13.5c-1.9,0-3.5-1.6-3.5-3.5
            s1.6-3.5,3.5-3.5s3.5,1.6,3.5,3.5S11.7,13.5,9.7,13.5z"
          />
        </svg>
      </div>
    </div>
    <div
      class="Drawer-menu-wrapper"
      @click="setDrawerComponent(ABOUT)"
      :class="{ 'is-active': currentDrawer === ABOUT }"
    >
      <div class="Drawer-menu-button">
        <div class="Icon-wrapper">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            id="about-icon"
            width="24"
            height="24"
            viewBox="0 0 24 24"
          >
            <path
              fill="none"
              d="M0 0h24v24H0V0z"
            />
            <path
              fill="#868C99"
              d="M11 7h2v2h-2zm0 4h2v6h-2zm1-9C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"
            /></svg>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

const SETTINGS = 'appDrawerSettings'
const ABOUT = 'appDrawerAbout'

export default {
  name: 'Drawer-menu',

  computed: {
    currentDrawer() {
      return this.$store.getters.currentDrawer
    }
  },

  created() {
    this.SETTINGS = SETTINGS
    this.ABOUT = ABOUT
  },

  methods: {
    setDrawerComponent(component) {
      const payload = {
        key: 'currentDrawer',
        val: component
      }
      this.$store.dispatch('setViewState', payload)
    }
  }
}
</script>

<style lang="scss" scoped>
.Drawer-menu {
  background-color: $colorNavy;
  display: flex;
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 36px;
}

.Drawer-menu-wrapper {
  align-items: center;
  display: flex;
  flex: 1 1 auto;
  justify-content: center;
  position: relative;
  transition: $transitionDefault;
  height: 100%;
  &:hover {
    background-color: $colorLightNavy;
  }
  // &:hover:not(.is-active) {
  //   background-color: $colorLightNavy;
  // }
  &::after {
    background-color: $colorRed;
    content: '';
    margin: 0 auto;
    position: absolute;
    right: 0;
    bottom: 0;
    left: 0;
    transition: $transitionSnappy;
    width: 0;
    height: 2px;
  }
  &.is-active::after {
    width: 33%;
  }
}

.Drawer-menu-button {
  align-items: center;
  display: flex;
  justify-content: center;
  width: 45px;
  height: 100%;
  &.is-active {
    border-bottom: 4px solid $colorRed;
  }
}
</style>
