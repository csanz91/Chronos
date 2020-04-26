<template>
    <div class="Container Form-Container">
        <div class="Radio-Button" @click="selectSeppelProyect">
        <p class="Setting-title">Is a Seppel Proyect?</p>
        <div
            class="Checkbox"
            :class="proyect.isSeppProyect ? 'is-active' : 'is-inactive'"
        ></div>
        </div>
        <input
            ref="nameField"
            class="Input-field"
            v-model="proyect.proyectName"
            @input="searchSeppelProyect"
            @change="selectProyect"
            placeholder="Proyect Name"
            list="seppelProyects"
        />
        <datalist v-if="proyect.isSeppProyect" id="seppelProyects">
            <option v-for="seppelProyect in seppelProyects" :key="seppelProyect.proyectId">{{seppelProyect.proyectName}}</option>
        </datalist>
        <textarea
            class="Input-field Description"
            v-model="proyect.proyectDescription"
            placeholder="Proyect Description"
        />
        <div style="height:20px"></div>
        <button class="Button" :disabled=!dataIsValid @click="saveProyect" :key="'save'">
        <div class="Button-icon-wrapper">
            <p>Save</p>
        </div>
        </button >
        <button class="Button" @click="cancelEdition" :key="'cancel'">
        <div class="Button-icon-wrapper">
            <p>Cancel</p>
        </div>
        </button>
    </div>

</template>

<script>
import { ProyectData } from '@/utils/ProyectData'
import SeppelServices from '@/services/SeppelServices'
export default {
  props: {
    proyect: {
      type: ProyectData,
      required: true
    }
  },
  data() {
    return {
      seppelProyects: []
    }
  },
  computed: {
    selected() {
      return this.$store.getters.selectedProyectId === this.proyect.proyectId
    },
    running() {
      return this.$store.getters.running && this.selected
    },
    dataIsValid() {
      return !!(this.proyect.proyectName && this.proyect.proyectDescription)
    }
  },

  methods: {
    selectSeppelProyect() {
      this.proyect.isSeppProyect = !this.proyect.isSeppProyect
    },
    saveProyect() {
      this.$emit('saveProyect', this.proyect)
    },
    cancelEdition() {
      this.$emit('cancelEdition')
    },
    selectProyect(event) {
      const selectedProyectName = event.target.value
      this.seppelProyects.forEach(proyect => {
        if (proyect.proyectName === selectedProyectName) {
          Object.assign(this.proyect, proyect)
        }
      })
    },
    async searchSeppelProyect(event) {
      if (this.proyect.isSeppProyect) {
        const response = await SeppelServices.getProyects(event.target.value)
        this.seppelProyects = response
      }
    }
  }
}
</script>

<style lang="scss" scoped>

.Form-Container{
    margin: 10px;
    padding: 10px;
    width: -webkit-fill-available;
    display: flow-root;
}

.Input-field {
  display: flex;
  align-self: center;
  font-weight: 300;
  width: -webkit-fill-available;
  font-size: 18px;
  border: 0px;
  outline: none;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
  color: $colorWhite;
  background: transparent;
  padding: 10px 15px;
  margin: 25px 0px;
  justify-content: space-between;
  -webkit-transition: all 0.1s ease-in-out;
  -moz-transition: all 0.1s ease-in-out;
  -ms-transition: all 0.1s ease-in-out;
  -o-transition: all 0.1s ease-in-out;
  transition: all 0.1s ease-in-out;
  border-bottom: 1px solid $colorBlueGrey;
}

.Description{
    font-family: 'Lato', sans-serif;
    height: 90px;
}

.Radio-Button {
  border-bottom: 1px solid $colorBlueGrey;
  display: flex;
  outline: none;
  align-self: center;
  font-weight: 300;
  width: -webkit-fill-available;
  padding: 10px 15px;
  margin: 25px 0px;
  justify-content: space-between;
  align-items: center;
  transition: $transitionDefault;
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

.Button {
  border: 2px solid $colorBlueGrey;
  display: flex;
  margin-left: 10px;
  justify-content: space-around;
  align-items: center;
  transition: $transitionDefault;
  width: 90px;
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

.Checkbox {
  background-color: $colorNavy;
  border: 2px solid $colorBlueGrey;
  border-radius: 100%;
  display: inline-block;
  transition: $transitionDefault;
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
  border-radius: 4px;
  display: flex;
  justify-content: space-between;
  margin: 12px 0;
  padding: 12px;
}
</style>
