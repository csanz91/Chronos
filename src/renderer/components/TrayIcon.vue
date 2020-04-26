<template> </template>

<script>
import { ipcRenderer } from 'electron'
const workColor = '#FF4E4D'
const finishedColor = '#05EB8B'
const breakColor = '#0BBCDA'
export default {

  computed: {
    minToTray() {
      return this.$store.getters.minToTray
    },
    working() {
      return this.$store.getters.working
    },
    onBreak() {
      return this.$store.getters.onBreak
    },
    finished() {
      return this.$store.getters.finished
    }
  },
  methods: {
    updateTrayImage() {
      if (!this.minToTray) {
        return
      }
      let color
      if (this.working) {
        color = workColor
      } else if (this.onBreak) {
        color = breakColor
      } else {
        color = finishedColor
      }
      const image = createTrayImage(color)
      ipcRenderer.send('tray-icon-update', image)
    }
  },
  watch: {
    working: function(newState, oldState) {
      if (newState) {
        this.updateTrayImage()
      }
    },
    onBreak: function(newState, oldState) {
      if (newState) {
        this.updateTrayImage()
      }
    },
    finished: function(newState, oldState) {
      if (newState) {
        this.updateTrayImage()
      }
    },
    minToTray: function() {
      this.updateTrayImage()
    }
  },

  mounted() {
    this.updateTrayImage()
  }
}

function createTrayImage(color) {
  const size = 32
  const bgColor = '#2F384B'

  const arcRadiusRatio = 0.55
  const arcLineWidthRatio = 0.3

  const arcColor = color
  const outerRadius = size / 2
  const innerRadius = outerRadius * arcRadiusRatio
  const lineWidth = outerRadius * arcLineWidthRatio
  const fullCircle = 2 * Math.PI
  const center = outerRadius

  const canvas = document.createElement('canvas')
  canvas.width = size
  canvas.height = size

  const ctx = canvas.getContext('2d')

  ctx.fillStyle = bgColor
  ctx.strokeStyle = arcColor
  ctx.lineWidth = lineWidth

  ctx.beginPath()
  ctx.arc(center, center, outerRadius, 0, fullCircle, false)
  ctx.fill()

  ctx.beginPath()
  ctx.arc(center, center, innerRadius, 0, fullCircle, false)
  ctx.stroke()

  const dataUrl = canvas.toDataURL('image/png')
  return dataUrl
}
</script>
