<template>

  <div class="Dial-wrapper">
    <p class="Dial-time">{{ formattedDuration }}</p>
    <p class="Dial-label">{{ currentRoundDisplayLabel }}</p>
    <svg
      @click="clockClicked"
      version="1.2"
      baseProfile="tiny"
      id="Layer_1"
      xmlns="http://www.w3.org/2000/svg"
      xmlns:xlink="http://www.w3.org/1999/xlink"
      x="0px"
      y="0px"
      viewBox="0 0 230 230"
      xml:space="preserve"
      width="220"
      height="220"
      class="Dial-fill"
      :class="dialClass"
    >
      <path
        fill="none"
        stroke-linecap="round"
        stroke-miterlimit="10"
        d="M115,5c60.8,0,110,49.2,110,110s-49.2,110-110,110S5,175.8,5,115S54.2,5,115,5"
      />
    </svg>
    <svg
      version="1.2"
      baseProfile="tiny"
      id="Layer_1"
      xmlns="http://www.w3.org/2000/svg"
      xmlns:xlink="http://www.w3.org/1999/xlink"
      x="0px"
      y="0px"
      viewBox="0 0 230 230"
      xml:space="preserve"
      width="220"
      height="220"
      class="Dial-bg"
    >
      <path
        fill="none"
        stroke-width="2"
        stroke-linecap="round"
        stroke-miterlimit="10"
        d="M115,5c60.8,0,110,49.2,110,110s-49.2,110-110,110S5,175.8,5,115S54.2,5,115,5"
      />
    </svg>

  </div>
</template>

<script>
import { WORKING, ON_BREAK, IDLE, FINISHED } from '@/utils/EventStates'

export default {
  props: {
    currentState: {
      type: String,
      required: true
    }
  },

  computed: {
    formattedDuration() {
      return this.$store.getters.formattedDuration
    },
    currentRoundDisplayLabel() {
      switch (this.currentState) {
        case IDLE:
          return 'Ready'
        case ON_BREAK:
          return 'On Break'
        case WORKING:
          return 'Working'
        case FINISHED:
          return 'Finished'
        default:
          return '---'
      }
    },

    dialClass() {
      switch (this.currentState) {
        case IDLE:
          return 'Dial-fill--idle'
        case ON_BREAK:
          return 'Dial-fill--break'
        case WORKING:
          return 'Dial-fill--work'
        case FINISHED:
          return 'Dial-fill--finished'
        default:
          return 'Dial-fill--idle'
      }
    }
  },
  methods: {
    clockClicked() {
      if (this.currentState === ON_BREAK) {
        this.$store.dispatch('resumeWork')
      } else if (this.currentState === WORKING) {
        this.$store.dispatch('holdWork')
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.Dial-wrapper {
  display: flex;
  justify-content: center;
  margin-top: 27px;
  position: relative;
}

.Dial-label {
  letter-spacing: 0.1em;
  position: absolute;
  top: 66%;
  text-transform: uppercase;
}

.Dial-bg {
  stroke: $colorBlueGrey;
}

.Dial-fill {
  position: absolute;
  transform-origin: center;
  -webkit-app-region: no-drag;
}

@keyframes glow {
  from {
    stroke-width: 10;
  }
  to {
    stroke-width: 2;
  }
}

@keyframes blink {
  from {
    stroke: $colorBlue;
    stroke-width: 3;
  }
  to {
    stroke: $colorBlueGrey;
  }
}

.Dial-fill--work {
  stroke: $colorRed;
  transform: translateZ(0);
  will-change: transform;
  animation: glow 1s infinite alternate steps(12);

}

.Dial-fill--break {
  animation: blink 1s infinite alternate steps(12);
}

.Dial-fill--finished {
  stroke: $colorGreen;
}

.Dial-fill--idle {
  stroke: $colorBlueGrey;
}

.Dial-time {
  font-family: 'RobotoMono', monospace;
  font-size: 46px;
  margin: 0;
  position: absolute;
  top: 32%;
}
</style>
