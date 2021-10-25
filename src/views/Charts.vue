<template>
  <section class="charts">
    Market Price over time:
    <div>
      <PriceChart :chartData="chart1Data" />
    </div>
  </section>
</template>

<script>
import {
  getMarketPrice,
  getConfirmedTransactions,
} from "../services/bitcoin.service";
import PriceChart from "../cmps/PriceChart.vue";

export default {
  data() {
    return {
      chart1Data: null,
      loaded: false,
    };
  },

  methods: {
    async getChartData() {
      this.chart1Data = await getMarketPrice();
      this.loaded = true;
    },
  },

  created() {
    this.getChartData();
  },
  components: { PriceChart },
};
</script>
