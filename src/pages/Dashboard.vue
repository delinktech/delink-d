<template>
  <div class="content">
    <div class="lastUpdate">
      <span class="category">Last Update: {{lastUpdateTime}} || {{localTime}}</span>
    </div>
    <div class="md-layout">
      <!-- row 1 global stats cards -->
      <div class="md-layout-item md-medium-size-50 md-xsmall-size-100 md-size-25">
        <stats-card data-background-color="blue">
          <template slot="header">
            <md-icon>people</md-icon>
          </template>

          <template slot="content">
            <p class="category">Total Cases</p>
            <h3 class="title">{{worldStats.total_cases}}</h3>
            <md-progress-spinner
              :md-diameter="30"
              :md-stroke="3"
              md-mode="indeterminate"
              v-if="loadingWorldData"
            ></md-progress-spinner>
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
            <h3 class="title">{{worldStats.total_recovered}}</h3>
            <md-progress-spinner
              :md-diameter="30"
              :md-stroke="3"
              md-mode="indeterminate"
              v-if="loadingWorldData"
            ></md-progress-spinner>
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
            <h3 class="title">{{worldStats.total_deaths}}</h3>
            <md-progress-spinner
              :md-diameter="30"
              :md-stroke="3"
              md-mode="indeterminate"
              v-if="loadingWorldData"
            ></md-progress-spinner>
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
            <h3 class="title">{{worldStats.new_deaths}}</h3>
            <md-progress-spinner
              :md-diameter="30"
              :md-stroke="3"
              md-mode="indeterminate"
              v-if="loadingWorldData"
            ></md-progress-spinner>
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
      <div class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-100">
        <md-card>
          <md-card-header data-background-color="orange">
            <h4 class="title">Global COVID-19 Stats</h4>
            <p class="category">All countries and number of corona cases</p>
          </md-card-header>
          <md-card-content>
            <div class="md-progress-container">
              <md-progress-spinner
                :md-diameter="50"
                :md-stroke="3"
                md-mode="indeterminate"
                v-if="loadingCountryData"
              ></md-progress-spinner>
            </div>
            <ordered-table table-header-color="orange" :countries="countries"></ordered-table>
          </md-card-content>
        </md-card>
      </div>

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
      </div>
      <div class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-33">
        <chart-card
          :chart-data="emailsSubscriptionChart.data"
          :chart-options="emailsSubscriptionChart.options"
          :chart-responsive-options="emailsSubscriptionChart.responsiveOptions"
          :chart-type="'Bar'"
          data-background-color="red">
          <template slot="content">
            <h4 class="title">Email Subscription</h4>
            <p class="category">Last Campaign Performance</p>
          </template>

          <template slot="footer">
            <div class="stats">
              <md-icon>access_time</md-icon>updated 10 days ago
            </div>
          </template>
        </chart-card>
      </div>
      <div class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-33">
        <chart-card
          :chart-data="dataCompletedTasksChart.data"
          :chart-options="dataCompletedTasksChart.options"
          :chart-type="'Line'"
          data-background-color="green">
          <template slot="content">
            <h4 class="title">Completed Tasks</h4>
            <p class="category">Last Campaign Performance</p>
          </template>

          <template slot="footer">
            <div class="stats">
              <md-icon>access_time</md-icon>campaign sent 26 minutes ago
            </div>
          </template>
        </chart-card>
      </div>-->

      <!-- snackbar -->
      <md-snackbar
        :md-position="position"
        :md-duration="isInfinity ? Infinity : duration"
        :md-active.sync="showSnackbar"
        md-persistent
      >
        <span>Error loading data! Please try again</span>
      </md-snackbar>
    </div>
  </div>
</template>

<script>
import moment from "moment";
import { getWorldStats } from "../services/cases.service";
import { getCasesByCountry } from "../services/cases.service";
import { StatsCard, ChartCard, OrderedTable } from "@/components";

export default {
  components: {
    StatsCard,
    // ChartCard,
    OrderedTable
  },
  data() {
    return {
      loadingWorldData: true,
      loadingCountryData: true,
      worldStats: {
        total_cases: null,
        total_deaths: null,
        total_recovered: null,
        new_cases: null,
        new_deaths: null,
        statistic_taken_at: null
      },
      lastUpdate: null,
      lastUpdateTime: null,
      localTime: null,
      countries: [],
      showSnackbar: false,
      position: "center",
      duration: 4000,
      isInfinity: false
      //     labels: ["M", "T", "W", "T", "F", "S", "S"],
      //     series: [[12, 17, 7, 17, 23, 18, 38]]
      //   },
      //   options: {
      //     lineSmooth: this.$Chartist.Interpolation.cardinal({
      //       tension: 0
      //     }),
      //     low: 0,
      //     high: 50, // creative tim: we recommend you to set the high sa the biggest value + something for a better look
      //     chartPadding: {
      //       top: 0,
      //       right: 0,
      //       bottom: 0,
      //       left: 0
      //     }
      //   }
      // },
      // dataCompletedTasksChart: {
      //   data: {
      //     labels: ["12am", "3pm", "6pm", "9pm", "12pm", "3am", "6am", "9am"],
      //     series: [[230, 750, 450, 300, 280, 240, 200, 190]]
      //   },

      //   options: {
      //     lineSmooth: this.$Chartist.Interpolation.cardinal({
      //       tension: 0
      //     }),
      //     low: 0,
      //     high: 1000, // creative tim: we recommend you to set the high sa the biggest value + something for a better look
      //     chartPadding: {
      //       top: 0,
      //       right: 0,
      //       bottom: 0,
      //       left: 0
      //     }
      //   }
      // },
      // emailsSubscriptionChart: {
      //   data: {
      //     labels: [
      //       "Ja",
      //       "Fe",
      //       "Ma",
      //       "Ap",
      //       "Mai",
      //       "Ju",
      //       "Jul",
      //       "Au",
      //       "Se",
      //       "Oc",
      //       "No",
      //       "De"
      //     ],
      //     series: [[542, 443, 320, 780, 553, 453, 326, 434, 568, 610, 756, 895]]
      //   },
      //   options: {
      //     axisX: {
      //       showGrid: false
      //     },
      //     low: 0,
      //     high: 1000,
      //     chartPadding: {
      //       top: 0,
      //       right: 5,
      //       bottom: 0,
      //       left: 0
      //     }
      //   },
      //   responsiveOptions: [
      //     [
      //       "screen and (max-width: 640px)",
      //       {
      //         seriesBarDistance: 5,
      //         axisX: {
      //           labelInterpolationFnc: function(value) {
      //             return value[0];
      //           }
      //         }
      //       }
      //     ]
      //   ]
      // }
    };
  },
  created() {
    this.fetchWorldData();
    this.fetchCountryData();
  },
  methods: {
    fetchWorldData() {
      getWorldStats()
        .then(response => {
          this.lastUpdate = moment.utc(response.statistic_taken_at).fromNow();
          this.lastUpdateTime = moment.parseZone(response.statistic_taken_at);
          this.localTime = new Date(
            response.statistic_taken_at + " UTC"
          ).toString();
          this.worldStats = response;
          this.loadingWorldData = false;
        })
        .catch(error => (this.showSnackbar = true));
    },
    fetchCountryData() {
      getCasesByCountry()
        .then(response => {
          this.countries = response.countries_stat.sort((a, b) =>
            parseFloat(a.cases.replace(/,/g, "")) <
            parseFloat(b.cases.replace(/,/g, ""))
              ? 1
              : -1
          );
          this.loadingCountryData = false;
        })
        .catch(error => (this.showSnackbar = true));
    }
  }
};
</script>
<style lang="scss" scoped>
.lastUpdate {
  margin: 15px 0;
}
.md-progress-container {
  text-align: center;
}
</style>
