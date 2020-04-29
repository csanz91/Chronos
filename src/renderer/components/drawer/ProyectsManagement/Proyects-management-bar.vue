<template>
    <div
        class="Proyect-wrapper"
        v-bind:class="{ 'Proyect-selected': onEdition}"
        >
        <div>
        <p class="Proyect-title Setting-title">{{proyect.proyectName}}</p>
        <p class="Proyect-description">{{proyect.proyectDescription}}</p>
    </div>
    <section class="Button-wrapper">
    <div class="Button" v-if="!running" @click="deleteProyect" :key="'delete'">
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
            class="Icon"
            >
                <path fill="#F6F2EB" d="M31.708 25.708c-0-0-0-0-0-0l-9.708-9.708 9.708-9.708c0-0 0-0 0-0 0.105-0.105 0.18-0.227 0.229-0.357 0.133-0.356 0.057-0.771-0.229-1.057l-4.586-4.586c-0.286-0.286-0.702-0.361-1.057-0.229-0.13 0.048-0.252 0.124-0.357 0.228 0 0-0 0-0 0l-9.708 9.708-9.708-9.708c-0-0-0-0-0-0-0.105-0.104-0.227-0.18-0.357-0.228-0.356-0.133-0.771-0.057-1.057 0.229l-4.586 4.586c-0.286 0.286-0.361 0.702-0.229 1.057 0.049 0.13 0.124 0.252 0.229 0.357 0 0 0 0 0 0l9.708 9.708-9.708 9.708c-0 0-0 0-0 0-0.104 0.105-0.18 0.227-0.229 0.357-0.133 0.355-0.057 0.771 0.229 1.057l4.586 4.586c0.286 0.286 0.702 0.361 1.057 0.229 0.13-0.049 0.252-0.124 0.357-0.229 0-0 0-0 0-0l9.708-9.708 9.708 9.708c0 0 0 0 0 0 0.105 0.105 0.227 0.18 0.357 0.229 0.356 0.133 0.771 0.057 1.057-0.229l4.586-4.586c0.286-0.286 0.362-0.702 0.229-1.057-0.049-0.13-0.124-0.252-0.229-0.357z"></path>

            </svg>
        </div>
    </div>
    <div class="Button" @click="editProyect" :key="'edit'">
        <div class="Button-icon-wrapper">
        <svg
            version="1.2"
            baseProfile="tiny"
            id="Layer_2"
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            x="0px"
            y="0px"
            viewBox="0 0 32 32"
            xml:space="preserve"
            height="20px"
            class="Icon"
        >
            <path fill="#F6F2EB" d="M27 0c2.761 0 5 2.239 5 5 0 1.126-0.372 2.164-1 3l-2 2-7-7 2-2c0.836-0.628 1.874-1 3-1zM2 23l-2 9 9-2 18.5-18.5-7-7-18.5 18.5zM22.362 11.362l-14 14-1.724-1.724 14-14 1.724 1.724z"></path>
        </svg>
        </div>
    </div>
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
    },
    onEdition: {
      type: Boolean,
      required: true
    }
  },
  computed: {
    selected() {
      return this.$store.getters.selectedProyectId === this.proyect.proyectId
    },
    running() {
      return this.$store.getters.running && this.selected
    }
  },

  methods: {
    editProyect() {
      this.$emit('editProyect')
    },
    deleteProyect() {
      this.$emit('deleteProyect')
    }
  }
}
</script>

<style lang="scss" scoped>

.Button {
  border-radius: 10%;
  display: flex;
  justify-content: center;
  transition: $transitionDefault;
  width: 35px;
  height: 35px;
  align-self: center;
  padding: 5px;
  margin: 5px;
  -webkit-app-region: no-drag;
  &:hover {
    background-color: $colorLightNavy;
    & .Icon path  {
      stroke: $colorRed;
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
    background-color: lighten($colorLightNavy, 5%);
  }
  from {
    background-color: lighten($colorLightNavy, 15%);
  }
}

.Proyect-selected{
  background-color: lighten($colorLightNavy, 15%) !important;
}

.Proyect-selected-running{
  animation: blink 1s infinite alternate steps(24);
  transform: rotateZ(360deg);
}

.Proyect-title {
  padding: 6px 0 0 12px;
}

.Proyect-description {
  color: $colorWhite;
  font-size: 14px;
  letter-spacing: 0.05em;
  padding: 12px 0 6px 12px;
}

.Proyects-heading {
  font-size: 18px;
  letter-spacing: 0.05rem;
  padding: 10px;
  text-align: left;
}

.Proyect-wrapper {
  background-color: $colorNavy;
  border-radius: 4px;
  display: flex;
  justify-content: space-between;
  margin: 12px 0;
}

</style>
