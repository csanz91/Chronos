<template>
  <div class="Drawer">
    <transition
      name="fade"
      mode="out-in"
    >
      <component :is="currentDrawer" />
    </transition>
    <app-drawer-menu />
  </div>
</template>

<script>
import proyectsManagement from '@/components/drawer/ProyectsManagement/Proyects-management'
import appDrawerMenu from '@/components/drawer/Drawer-menu'
import appDrawerAbout from '@/components/drawer/Drawer-about'
import dataAnalysis from '@/components/drawer/DataAnalysis/Drawer-data-analysis'
import appDrawerSettings from '@/components/drawer/Drawer-settings'

export default {
  name: 'Drawer',

  components: {
    proyectsManagement,
    appDrawerMenu,
    appDrawerAbout,
    dataAnalysis,
    appDrawerSettings
  },

  computed: {
    currentDrawer() {
      return this.$store.getters.currentDrawer
    }
  }
}
</script>

<style lang="scss" scoped>
.Drawer {
  background-color: $colorLightNavy;
  position: relative;
  width: 100%;
  height: calc(100% - 68px);
  z-index: 1;
  -webkit-app-region: no-drag;
}
</style>
