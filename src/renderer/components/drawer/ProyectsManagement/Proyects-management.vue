<template>
  <div class="Container">
    <p class="Drawer-heading">Proyects Management</p>
    <div class="Setting-wrapper">
      <div class="Proyects-list-header">
        <p>Proyects</p>
        <div class="Button" @click="newProyect" :key="'add'">
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
              height="12px"
              class="Icon"
          >
            <path fill="#F6F2EB" d="M31 12h-11v-11c0-0.552-0.448-1-1-1h-6c-0.552 0-1 0.448-1 1v11h-11c-0.552 0-1 0.448-1 1v6c0 0.552 0.448 1 1 1h11v11c0 0.552 0.448 1 1 1h6c0.552 0 1-0.448 1-1v-11h11c0.552 0 1-0.448 1-1v-6c0-0.552-0.448-1-1-1z"></path>
          </svg>
          </div>
        </div>
      </div>
      <proyects-management-bar v-for="proyect in allProyects" :key="proyect.proyectId" :proyect=proyect @editProyect="editProyect(proyect.proyectId)" @deleteProyect="deleteProyect(proyect.proyectId)" :onEdition="proyect.proyectId===proyectIdOnEdition" />
    </div>
    <div>
      <proyects-management-form v-if="showForm" :proyect=editedProyect @saveProyect="saveProyect($event)" @cancelEdition="cancelEdition()" />
    </div>
  </div>
</template>

<script>
import { ProyectData } from '@/utils/ProyectData'
import proyectsManagementBar from '@/components/drawer/ProyectsManagement/Proyects-management-bar'
import proyectsManagementForm from '@/components/drawer/ProyectsManagement/Proyects-management-form'

export default {
  name: 'Proyects-Management',
  components: {
    proyectsManagementBar,
    proyectsManagementForm
  },
  data() {
    return {
      editedProyect: new ProyectData(),
      proyectIdOnEdition: 0,
      showForm: false
    }
  },

  computed: {
    allProyects() {
      return this.$store.getters.allProyects
    }
  },

  methods: {
    newProyect() {
      this.editedProyect = new ProyectData()
      this.showForm = true
    },
    editProyect(proyectId) {
      this.proyectIdOnEdition = proyectId
      this.editedProyect = Object.assign(new ProyectData(), this.$store.getters.getProyect(proyectId))
      this.showForm = true
    },
    deleteProyect(proyectId) {
      this.$store.dispatch('deleteProyect', proyectId)
    },
    saveProyect(proyect) {
      this.$store.dispatch('saveProyect', proyect)
      this.showForm = false
    },
    cancelEdition() {
      this.proyectIdOnEdition = 0
      this.showForm = false
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

.Button {
  border: 2px solid $colorBlueGrey;

  border-radius: 100%;
  display: flex;
  justify-content: center;
  transition: $transitionDefault;
  width: 30px;
  height: 30px;
  -webkit-app-region: no-drag;
  &:hover {
    background-color: $colorNavy;
    & .Icon path  {
      stroke: $colorGreen;
      fill: $colorGreen;
    }
  }
}

.Setting-wrapper {
  border-radius: 4px;
  float: left;
  width: 45%;
  margin-top: 30px;
  padding: 10px;
  max-height: calc(100vh - 200px);
  overflow: auto
}

.Proyects-list-header{
  display: flex;
  justify-content: space-between;
  align-items: baseline;
}

.Time-selector {
  width: 120px;
  display: inline-flex;
  float: initial;
}

.Button-icon-wrapper {
  align-items: center;
  display: flex;
  height: 100%;
}
</style>
