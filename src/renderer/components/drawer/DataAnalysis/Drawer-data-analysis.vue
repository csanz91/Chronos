<template>
  <div class="Container">
    <div class="Time-selection">
      <date-picker
        mode='range'
        v-model='selectedRange'
        :max-date='new Date()'
        is-dark
        :first-day-of-week="2"
        class="Time-selector">
      <input class="Input-field" :value='formmatedRange'>
      </date-picker>
      <button class="Button" @click="selectThisMonth">
        <div class="Button-icon-wrapper">
            <p>This Month</p>
        </div>
      </button>
      <button class="Button" @click="selectThisWeek">
        <div class="Button-icon-wrapper">
            <p>This Week</p>
        </div>
      </button>
      <button class="Button" @click="selectToday">
        <div class="Button-icon-wrapper">
            <p>Today</p>
        </div>
      </button>
      <!-- <button class="Button" @click="uploadWorks">
        <div class="Button-icon-wrapper">
            <p>Upload Works</p>
        </div>
      </button> -->
    </div>
    <p class="Drawer-heading">Summary</p>
    <div class="Setting-wrapper">
      <proyect-summary-bar v-for="proyectId in proyectsSummaryAvailable" :key="proyectId" :proyectId=proyectId :range=selectedRange />
    </div>
    <p class="Drawer-heading">Detailed Work Events</p>
    <div class="Setting-wrapper">
      <proyect-summary-table :range=selectedRange />
    </div>
  </div>
</template>

<script>
import DatePicker from 'v-calendar/lib/components/date-picker.umd'
import proyectSummaryBar from '@/components/drawer/DataAnalysis/Proyect-summary-bar'
import proyectSummaryTable from '@/components/drawer/DataAnalysis/Proyect-summary-table'
import { moveDate } from '@/utils/TimeUtils'
import SeppelServices from '@/services/SeppelServices'

export default {
  name: 'Data-analysis',
  components: {
    DatePicker,
    proyectSummaryBar,
    proyectSummaryTable
  },
  data() {
    return {
      selectedRange: {
        start: moveDate(new Date(), -1),
        end: new Date()
      }
    }
  },

  computed: {
    proyectsSummaryAvailable() {
      return this.$store.getters.proyectsSummaryAvailable(this.selectedRange.start, this.selectedRange.end)
    },
    formmatedRange() {
      return `${this.selectedRange.start.toDateString()} - ${this.selectedRange.end.toDateString()}`
    }
  },

  methods: {
    selectToday() {
      const today = new Date()
      this.selectedRange.start = today
      this.selectedRange.end = today
    },
    selectThisWeek() {
      var curr = new Date() // get current date
      var first = curr.getDate() - ((curr.getDay() + 6) % 7) // First day is the day of the month - the day of the week
      var last = first + 6 // last day is the first day + 6

      this.selectedRange.start = new Date(curr.setDate(first))
      this.selectedRange.end = new Date(curr.setDate(last))
    },
    selectThisMonth() {
      var date = new Date()
      this.selectedRange.start = new Date(date.getFullYear(), date.getMonth(), 1)
      this.selectedRange.end = new Date(date.getFullYear(), date.getMonth() + 1, 0)
    },
    uploadWorks() {
      SeppelServices.getUserId().then(userId => {
        console.log(userId)
        // const workDays = this.$store.getters.getWorkDays(this.selectedRange.start, this.selectedRange.end)
        // workDays.forEach(workDay => {
        //   workDay.workEvents.forEach(workEvent => {
        //     var proyect = this.$store.getters.getProyect(workEvent.proyectId)
        //     if (proyect && proyect.isSeppProyect) {
        //       const initialDate = new Date(workEvent.workEventTimeData.initialUtcTimestamp * 1000)
        //       const hoursDuration = Math.round((workEvent.duration / 3600 + Number.EPSILON) * 100) / 100
        //       SeppelServices.uploadWork(userId, initialDate, proyect.extProyectId, hoursDuration)
        //     }
        //   })
        // })
      })
    }

  }
}
</script>

<style lang="scss" scoped>

.Setting-wrapper {
  background-color: $colorNavy;
  border-radius: 4px;
  margin: 12px 0;
  padding: 12px;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  grid-auto-flow: dense;
}

.Time-selector {
  display: inline-flex;
  float: initial;
}

.Button {
  border: 1px solid $colorWhite;
  border-radius: 5px;
  display: flex;
  font-size: 16px;
  margin-left: 10px;
  justify-content: space-around;
  align-items: center;
  transition: $transitionDefault;
  width: 100px;
  height: 38px;
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

.Time-selection{
  padding-top: 10px;
}

.Input-field {
  text-align: center;
  display: flex;
  align-self: center;
  font-weight: 300;
  width: 300px;
  height: 38px;
  font-size: 16px;
  outline: none;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
  color: $colorWhite;
  background: $colorNavy;
  margin: 0px 0px;
  padding: 5px;
  -webkit-transition: all 0.1s ease-in-out;
  -moz-transition: all 0.1s ease-in-out;
  -ms-transition: all 0.1s ease-in-out;
  -o-transition: all 0.1s ease-in-out;
  transition: all 0.1s ease-in-out;
  border: 1px solid $colorWhite;
  border-radius: 5px;
}
</style>
