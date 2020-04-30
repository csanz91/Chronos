<template>
<div class="Proyect-wrapper">
    <div class="Proyect-texts">
        <p class="Proyect-title">{{proyectName}}</p>
        <p class="Proyect-description">{{proyectDescription}}</p>
    </div>
    <p class="Proyect-summary">{{formattedDuration}}</p>
</div>

</template>

<script>
import { formatDuration } from '@/utils/TimeUtils'

export default {
  props: {
    proyectId: {
      type: String,
      required: true
    },
    range: {
      required: true
    }
  },
  computed: {
    proyect() {
      return this.$store.getters.getProyect(this.proyectId)
    },
    proyectName() {
      return this.proyect.proyectName
    },
    proyectDescription() {
      return this.proyect.proyectDescription
    },
    formattedDuration() {
      var totalSeconds = this.$store.getters.proyectSummary(this.proyectId, this.range.start, this.range.end)
      return formatDuration(totalSeconds)
    }
  }
}
</script>

<style lang="scss" scoped>

.Proyect-texts {
  align-content: space-evenly;
  display: grid;
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

.Proyect-summary {
  color: $colorWhite;
  font-size: 18px;
  letter-spacing: 0.05em;
  display: flex;
  align-items: center;
  padding: 0 12px 0 0;
  min-width: fit-content;
}

.Proyect-wrapper {
  background-color: $colorLightNavy;
  border-radius: 4px;
  display: flex;
  justify-content: space-between;
  margin: 4px 4px;
  width: -webkit-fill-available;
  min-width: 225px;
}

</style>
