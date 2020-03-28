<template>
  <div>
    <md-table v-if="countries" v-model="countries" :table-header-color="tableHeaderColor">
      <md-table-row slot="md-table-row" slot-scope="{ item }">
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
import { getCasesByCountry } from "../../services/cases.service";
export default {
  name: "ordered-table",
  props: {
    tableHeaderColor: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      selected: [],
      countries: [
        {
          country_name: null,
          cases: null,
          active_cases: null,
          deaths: null,
          serious_critical: null,
          total_recovered: null
        }
      ]
    };
  },
  created() {
    this.fetchData();
  },
  methods: {
    fetchData() {
      getCasesByCountry()
        .then(response => {
          this.countries = response.countries_stat;
        })
        .catch(error => console.log("Error::", error));
    }
  }
};
</script>
