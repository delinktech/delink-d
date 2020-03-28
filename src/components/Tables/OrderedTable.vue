<template>
  <div>
    <md-table v-if="countries" v-model="countries" :table-header-color="tableHeaderColor">
      <md-table-row slot="md-table-row" slot-scope="{ item }" @click="viewCountry(item.country_name)">
        <md-table-cell md-label="Country">{{ item.country_name }}</md-table-cell>
        <md-table-cell md-label="Cases">{{ item.cases }}</md-table-cell>
        <md-table-cell md-label="Active Cases">{{ item.active_cases }}</md-table-cell>
        <md-table-cell md-label="Deaths">{{ item.deaths }}</md-table-cell>
        <md-table-cell md-label="Critical Cases">{{ item.serious_critical }}</md-table-cell>
        <md-table-cell md-label="Recovered">{{ item.total_recovered }}</md-table-cell>
      </md-table-row>
    </md-table>
  </div>
</template>

<script>
export default {
  name: "ordered-table",
  props: {
    tableHeaderColor: {
      type: String,
      default: ""
    },
    countries: Array,
  },
  data() {
    return {};
  },
  methods: {
    viewCountry(country) {
      this.$router.push({path: `/country/${country}`});
    }
  },
};
</script>
