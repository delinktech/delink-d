<template>
  <div class="content">
    <div class="lastUpdate">
      <span class="category">Last Update: {{lastUpdateTime}} || {{localTime}}</span>
    </div>
    <div class="md-layout" v-if="!dataLoading">
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
        <stats-card data-background-color="purple">
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
        <stats-card data-background-color="red">
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

      <!-- row 3 global data on charts -->
      <div class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-66">
        <chart-card
          :chart-data="dailySalesChart.data"
          :chart-options="dailySalesChart.options"
          :chart-type="'Line'"
          data-background-color="blue"
        >
          <template slot="content">
            <h4 class="title">Cases per Day</h4>
            <!-- <p class="category">
              <span class="text-success">
                <i class="fas fa-long-arrow-alt-up"></i> 55%
              </span>
              increase in today sales.
            </p>-->
          </template>

          <template slot="footer">
            <div class="stats">
              <md-icon>access_time</md-icon>
              updated {{lastUpdate}}
            </div>
          </template>
        </chart-card>
      </div>
    </div>

    <!-- show data loading spinner -->
    <div class="md-layout progress-bar-container" v-if="dataLoading">
      <md-progress-bar md-mode="query"></md-progress-bar>
      <p style>Loading Data, Please wait</p>
    </div>

    <!-- snackbar -->
    <md-snackbar
      :md-position="position"
      :md-duration="isInfinity ? Infinity : duration"
      :md-active.sync="showSnackbar"
      md-persistent
    >
      <span>Error loading {{countryName}} data! Please try again</span>
    </md-snackbar>
  </div>
</template>

<script>
import moment from "moment";
import { getCasesForCountry } from "../services/cases.service";
import { StatsCard, ChartCard, OrderedTable } from "@/components";

export default {
  components: {
    StatsCard,
    ChartCard
    // OrderedTable
  },
  data() {
    return {
      dataLoading: true,
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
      lastUpdate: null,
      lastUpdateTime: null,
      localTime: null,
      maxNum: null,
      showSnackbar: false,
      position: "center",
      duration: 4000,
      isInfinity: false,
      dailySalesChart: {
        data: {
          labels: [],
          series: []
        },
        options: {
          lineSmooth: this.$Chartist.Interpolation.cardinal({
            tension: 0
          }),
          low: 0,
          high: 100, // creative tim: we recommend you to set the high sa the biggest value + something for a better look
          chartPadding: {
            top: 10,
            right: 10,
            bottom: 30,
            left: 10
          },
          plugins: [
            this.$Chartist.plugins.ctAxisTitle({
              axisX: {
                axisTitle: "Days",
                axisClass: "ct-axis-title",
                offset: {
                  x: 0,
                  y: 50
                },
                textAnchor: "middle"
              },
              axisY: {
                axisTitle: "Cases (K)",
                axisClass: "ct-axis-title",
                offset: {
                  x: 10,
                  y: -5
                },
                textAnchor: "middle",
                flipTitle: false
              }
            })
          ]
        }
      }
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
          const lastUpdateDay =
            response.stat_by_country[response.stat_by_country.length - 1];
          this.lastUpdate = moment.utc(lastUpdateDay.record_date).fromNow();
          this.lastUpdateTime = moment.parseZone(lastUpdateDay.record_date);
          this.localTime = new Date(
            lastUpdateDay.record_date + " UTC"
          ).toString();
          this.countryStats = lastUpdateDay;

          this.maxNum = parseFloat(lastUpdateDay.total_cases.replace(/,/g, "")); // set the chart heighest number

          this.dailySalesChart.options.high =
            this.maxNum >= 1000 ? this.maxNum / 1000 : this.maxNum; // check if max num is > 1000 and devide by 1000

          // call function to display data on a chart
          this.mapData(response.stat_by_country);
        })
        .catch(error => (this.showSnackbar = true));
    },
    mapData(data) {
      // get get countries data per day into the chart
      let series = data.map(d => ({ ...d, day: d.record_date.split(" ")[0] }));
      series = series.reduce((a, c) => {
        let estKey = c["day"];
        (a[estKey] ? a[estKey] : (a[estKey] = null || [])).push(c);
        return a;
      }, {});
      let finSeries = Object.values(series);
      finSeries = finSeries.map(d => d[d.length - 1]);
      const devideBy = this.maxNum >= 1000 ? 1000 : 1;
      this.dailySalesChart.data.series[0] = finSeries.map(
        r => parseFloat(r.total_cases.replace(/,/g, "")) / devideBy
      ); // devide by 1000 to make it fit on chat

      // get labels from the data monthly labels = days
      this.dailySalesChart.data.labels = finSeries.map(r =>
        moment(r.record_date.split(" ")[0]).format("D MMM YY")
      );
      this.dataLoading = false;
    }
  }
};
</script>
<style lang="scss" scoped>
.lastUpdate {
  margin: 15px 0;
}
.progress-bar-container {
  margin: 0;
  width: 100%;
  position: absolute;
  top: 50%;
  -ms-transform: translateY(-50%);
  transform: translateY(-50%);
}
.md-progress-bar {
  margin: 24px;
  width: 100%;
}
.progress-bar-container > p {
  width: 100%;
  text-align: center;
  padding-top: 10px;
}
</style>
