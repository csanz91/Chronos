<template>
  <div>
    <vue-good-table
        :columns="columns"
        :rows="rows"
        max-height="300px"
        :pagination-options="{
            enabled: true,
            perPage: 5,
            mode: 'records',
            perPageDropdown: [5, 10],
            dropdownAllowAll: false,
        }"
        :sort-options="{
            enabled: true,
            initialSortBy: {field: 'initialUtcTimestamp', type: 'asc'}
        }"/>
  </div>
</template>

<script>
import 'vue-good-table/dist/vue-good-table.css'
import { VueGoodTable } from 'vue-good-table'
import { formatDuration } from '@/utils/TimeUtils'

export default {
  components: {
    VueGoodTable
  },
  data() {
    return {
      columns: [
        {
          label: 'Proyect',
          field: 'proyectName'
        },
        {
          label: 'Description',
          field: 'workDescription'
        },
        {
          label: 'Started At',
          field: 'initialUtcTimestamp',
          type: 'date',
          dateInputFormat: 't',
          dateOutputFormat: 'yyyy-MM-dd HH:mm'
        },
        {
          label: 'Finished At',
          field: 'finalUtcTimestamp',
          type: 'date',
          dateInputFormat: 't',
          dateOutputFormat: 'yyyy-MM-dd HH:mm'
        },
        {
          label: 'Worked During',
          field: 'duration'
        }
      ]
    }
  },
  props: {
    range: {
      required: true
    }
  },
  computed: {
    rows() {
      var rows = []
      const workDays = this.$store.getters.getWorkDays(this.range.start, this.range.end)
      workDays.forEach(workDay => {
        workDay.workEvents.forEach(workEvent => {
          var proyect = this.$store.getters.getProyect(workEvent.proyectId)
          if (proyect) {
            rows.push({
              proyectName: proyect.proyectName,
              workDescription: workEvent.description,
              initialUtcTimestamp: workEvent.workEventTimeData.initialUtcTimestamp,
              finalUtcTimestamp: workEvent.workEventTimeData.finalUtcTimestamp,
              duration: formatDuration(workEvent.duration)
            })
          }
        })
      })
      return rows
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
