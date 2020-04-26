<template>

  <div class="Proyects-container Container">
    <p class="Proyects-heading">Proyects</p>
    <p v-if="allProyects.length === 0" class="Bar">No proyects defined yet. You can add one in the Proyect Managment tab in the drawer.</p>
    <proyect-bar v-for="proyect in allProyects" :key="proyect.proyectId" :proyect=proyect />
  </div>

</template>

<script>
import proyectBar from '@/components/proyectsList/Proyect-bar'

export default {
  components: {
    proyectBar
  },
  computed: {
    allProyects() {
      return this.$store.getters.allProyects
    }
  }
}
</script>

<style lang="scss" scoped>

.Proyects-container {
  float: left;
  width: 45%;
  max-height: calc(100vh - 85px);
  overflow: auto
}

</style>
