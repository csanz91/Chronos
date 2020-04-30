<template>
    <div
        v-bind:class="{ 'Proyect-selected': selected,
                        'Proyect-selected-running': running }"
        class="Proyect-wrapper">
        <div>
      <p class="Proyect-title">{{proyect.proyectName}}</p>
      <p class="Proyect-description">{{proyect.proyectDescription}}</p>
      </div>
      <section class="Button-wrapper">
      <div class="Button" v-if="running" @click="stopWork" :key="'stop'">
        <div class="Button-icon-wrapper">
          <svg
            version="1.2"
            baseProfile="tiny"
            id="Layer_1"
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            x="0px"
            y="0px"
            viewBox="0 0 7.6 7.6"
            xml:space="preserve"
            height="15px"
            class="Icon--stop"
          >
            <rect fill="#F6F2EB" width="15" height="15" />
          </svg>
        </div>
      </div>
      <transition name="fade" mode="out-in">
        <div class="Button" v-if="!running" @click="startWork" :key="'start'">
          <div class="Button-icon-wrapper">
            <svg
              version="1.2"
              baseProfile="tiny"
              id="Layer_1"
              xmlns="http://www.w3.org/2000/svg"
              xmlns:xlink="http://www.w3.org/1999/xlink"
              x="0px"
              y="0px"
              viewBox="0 0 7.6 15"
              xml:space="preserve"
              height="15px"
              class="Icon--start"
            >
              <polygon fill="#F6F2EB" points="0,0 0,15 7.6,7.4 " />
            </svg>
          </div>
        </div>

        <div class="Button" v-if="onBreak" @click="resumeWork" :key="'resume'">
          <div class="Button-icon-wrapper">
            <svg
              version="1.2"
              baseProfile="tiny"
              id="Layer_1"
              xmlns="http://www.w3.org/2000/svg"
              xmlns:xlink="http://www.w3.org/1999/xlink"
              x="0px"
              y="0px"
              viewBox="0 0 32 32"
              xml:space="preserve"
              height="20px"
              class="Icon--resume"
            >
            <path fill="#F6F2EB" d="M27.802 5.197c-2.925-3.194-7.13-5.197-11.803-5.197-8.837 0-16 7.163-16 16h3c0-7.18 5.82-13 13-13 3.844 0 7.298 1.669 9.678 4.322l-4.678 4.678h11v-11l-4.198 4.197z"></path>
            <path fill="#F6F2EB" d="M29 16c0 7.18-5.82 13-13 13-3.844 0-7.298-1.669-9.678-4.322l4.678-4.678h-11v11l4.197-4.197c2.925 3.194 7.13 5.197 11.803 5.197 8.837 0 16-7.163 16-16h-3z"></path>
            </svg>
          </div>
        </div>
        <div class="Button" v-else-if="working" @click="holdWork" :key="'pause'">
          <div class="Button-icon-wrapper">
            <svg
              version="1.2"
              baseProfile="tiny"
              id="Layer_2"
              xmlns="http://www.w3.org/2000/svg"
              xmlns:xlink="http://www.w3.org/1999/xlink"
              x="0px"
              y="0px"
              viewBox="0 0 10.9 18"
              xml:space="preserve"
              height="15px"
              class="Icon--pause"
            >
              <line
                fill="none"
                stroke="#F6F2EB"
                stroke-width="3"
                stroke-linecap="round"
                stroke-miterlimit="10"
                x1="1.5"
                y1="1.5"
                x2="1.5"
                y2="16.5"
              />
              <line
                fill="none"
                stroke="#F6F2EB"
                stroke-width="3"
                stroke-linecap="round"
                stroke-miterlimit="10"
                x1="9.4"
                y1="1.5"
                x2="9.4"
                y2="16.5"
              />
            </svg>
          </div>
        </div>
      </transition>
    </section>
    </div>

</template>

<script>
import { ProyectData } from '@/utils/ProyectData'

export default {
  props: {
    proyect: {
      type: ProyectData,
      required: true
    }
  },
  computed: {
    selected() {
      return this.$store.getters.selectedProyectId === this.proyect.proyectId
    },
    working() {
      return this.$store.getters.working && this.selected
    },
    running() {
      return this.$store.getters.running && this.selected
    },
    onBreak() {
      return this.$store.getters.onBreak && this.selected
    },
    finished() {
      return this.$store.getters.finished && this.selected
    }
  },

  methods: {
    startWork() {
      this.$store.dispatch('startWork', this.proyect.proyectId)
    },
    resumeWork() {
      this.$store.dispatch('resumeWork')
    },
    holdWork() {
      this.$store.dispatch('holdWork')
    },
    stopWork() {
      this.$store.dispatch('stopWork')
    }
  }
}
</script>

<style lang="scss" scoped>

.Button {
  border: 2px solid $colorBlueGrey;

  border-radius: 10%;
  display: flex;
  justify-content: center;
  transition: $transitionDefault;
  width: 55px;
  height: 55px;
  -webkit-app-region: no-drag;
  &:hover {
    background-color: $colorNavy;
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

.Button-wrapper {
  display: flex;
  justify-content: center;
  margin: 0 0 0 0;
}

.Button-icon-wrapper {
  align-items: center;
  display: flex;
  height: 100%;
}

@keyframes blink {
  to {
    background-color: lighten($colorLightNavy, 7%);
  }
  from {
    background-color: lighten($colorLightNavy, 13%);
  }
}

.Proyect-selected{
  background-color: $colorLightNavy;
}

.Proyect-selected-running{
  animation: blink 2s infinite alternate steps(24);
  transform: rotateZ(360deg);
  will-change: transform;
}

.Proyect-title {
  color: $colorWhite;
  font-size: 16px;
  letter-spacing: 0.05em;
  padding: 6px 0 0 12px;
}

.Proyect-description {
  color: $colorWhite;
  font-size: 14px;
  letter-spacing: 0.05em;
  padding: 12px 0 6px 12px;
}

.Proyect-wrapper {
  background-color: $colorLightNavy;
  border-radius: 4px;
  display: flex;
  justify-content: space-between;
  margin: 12px 0;
}

</style>
