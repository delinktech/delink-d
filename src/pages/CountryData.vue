<template>
  <div class="content">
    <div class="md-layout">
      <!-- row 1 global stats cards -->
      <div class="md-layout-item md-medium-size-50 md-xsmall-size-100 md-size-25">
        <stats-card data-background-color="blue">
          <template slot="header">
            <md-icon>people</md-icon>
          </template>

          <template slot="content">
            <p class="category">Total Cases</p>
            <h3 class="title">{{countryStats.total_cases}}</h3>
          </template>

          <template slot="footer">
            <div class="stats">
              <md-icon>date_range</md-icon>
              Last update {{lastUpdate}}
            </div>
          </template>
        </stats-card>
      </div>
      <div class="md-layout-item md-medium-size-50 md-xsmall-size-100 md-size-25">
        <stats-card data-background-color="blue">
          <template slot="header">
            <md-icon>people</md-icon>
          </template>

          <template slot="content">
            <p class="category">Active Cases</p>
            <h3 class="title">{{countryStats.active_cases}}</h3>
          </template>

          <template slot="footer">
            <div class="stats">
              <md-icon>date_range</md-icon>
              Last update {{lastUpdate}}
            </div>
          </template>
        </stats-card>
      </div>
      <div class="md-layout-item md-medium-size-50 md-xsmall-size-100 md-size-25">
        <stats-card data-background-color="green">
          <template slot="header">
            <md-icon>people</md-icon>
          </template>

          <template slot="content">
            <p class="category">Total Recovered</p>
            <h3 class="title">{{countryStats.total_recovered}}</h3>
          </template>

          <template slot="footer">
            <div class="stats">
              <md-icon>date_range</md-icon>
              Last update {{lastUpdate}}
            </div>
          </template>
        </stats-card>
      </div>
      <div class="md-layout-item md-medium-size-50 md-xsmall-size-100 md-size-25">
        <stats-card data-background-color="red">
          <template slot="header">
            <md-icon>people</md-icon>
          </template>

          <template slot="content">
            <p class="category">Total Deaths</p>
            <h3 class="title">{{countryStats.total_deaths}}</h3>
          </template>

          <template slot="footer">
            <div class="stats">
              <md-icon>date_range</md-icon>
              Last update {{lastUpdate}}
            </div>
          </template>
        </stats-card>
      </div>
      <div class="md-layout-item md-medium-size-50 md-xsmall-size-100 md-size-25">
        <stats-card data-background-color="red">
          <template slot="header">
            <md-icon>people</md-icon>
          </template>

          <template slot="content">
            <p class="category">Serious Critical</p>
            <h3 class="title">{{countryStats.serious_critical}}</h3>
          </template>

          <template slot="footer">
            <div class="stats">
              <md-icon>date_range</md-icon>
              Last update {{lastUpdate}}
            </div>
          </template>
        </stats-card>
      </div>
      <div class="md-layout-item md-medium-size-50 md-xsmall-size-100 md-size-25">
        <stats-card data-background-color="orange">
          <template slot="header">
            <md-icon>people</md-icon>
          </template>

          <template slot="content">
            <p class="category">New Cases</p>
            <h3 class="title">{{countryStats.new_cases}}</h3>
          </template>

          <template slot="footer">
            <div class="stats">
              <md-icon>date_range</md-icon>
              Last update {{lastUpdate}}
            </div>
          </template>
        </stats-card>
      </div>
      <div class="md-layout-item md-medium-size-50 md-xsmall-size-100 md-size-25">
        <stats-card data-background-color="orange">
          <template slot="header">
            <md-icon>people</md-icon>
          </template>

          <template slot="content">
            <p class="category">New Deaths</p>
            <h3 class="title">{{countryStats.new_deaths}}</h3>
          </template>

          <template slot="footer">
            <div class="stats">
              <md-icon>date_range</md-icon>
              Last update {{lastUpdate}}
            </div>
          </template>
        </stats-card>
      </div>

      <!-- row 2 global data on a table -->
      <!-- <div class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-100">
        <md-card>
          <md-card-header data-background-color="orange">
            <h4 class="title">Global COVID-19 Stats</h4>
            <p class="category">All countries and number of corona cases</p>
          </md-card-header>
          <md-card-content>
            <ordered-table table-header-color="orange" :countries="countries"></ordered-table>
          </md-card-content>
        </md-card>
      </div>-->

      <!-- row 3 global data on charts -->
      <!-- <div class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-33">
        <chart-card
          :chart-data="dailySalesChart.data"
          :chart-options="dailySalesChart.options"
          :chart-type="'Line'"
          data-background-color="blue"
        >
          <template slot="content">
            <h4 class="title">Daily Sales</h4>
            <p class="category">
              <span class="text-success">
                <i class="fas fa-long-arrow-alt-up"></i> 55%
              </span>
              increase in today sales.
            </p>
          </template>

          <template slot="footer">
            <div class="stats">
              <md-icon>access_time</md-icon>updated 4 minutes ago
            </div>
          </template>
        </chart-card>
      </div>-->
    </div>
  </div>
</template>

<script>
import moment from "moment";
import { getCasesForCountry } from "../services/cases.service";
import { StatsCard, ChartCard, OrderedTable } from "@/components";

export default {
  components: {
    StatsCard
    // ChartCard,
    // OrderedTable
  },
  data() {
    return {
      countryStats: {
        total_cases: null,
        active_cases: null,
        total_deaths: null,
        total_recovered: null,
        serious_critical: null,
        new_cases: null,
        new_deaths: null,
        record_date: null
      },
      countryName: null,
      lastUpdate: null
    };
  },
  created() {
    this.countryName = this.$route.params.name;
    this.fetchCountryData(this.countryName);
  },
  methods: {
    fetchCountryData(countryName) {
      getCasesForCountry(countryName)
        .then(response => {
          console.log("CountryStats::", response);
          this.lastUpdate = moment(
            response.stat_by_country[response.stat_by_country.length - 1]
          ).fromNow();
          this.countryStats =
            response.stat_by_country[response.stat_by_country.length - 1];
        })
        .catch(error => console.log("Error::", error));
    }
  }
};
</script>
