<template>
    <div>
      <canvas id="myChart"></canvas>
    </div>
  </template>
  
  <script>
  import { Line } from 'chart.js';
  import io from 'socket.io-client';
  
  export default {
    name: 'RealTimeChart',
    data() {
      return {
        socket: null,
        chart: null,
        chartData: {
          labels: [],
          datasets: [
            {
              label: 'Real-time Data',
              data: [],
              borderColor: 'rgba(75, 192, 192, 1)',
              backgroundColor: 'rgba(75, 192, 192, 0.2)',
            },
          ],
        },
        chartOptions: {
          scales: {
            x: {
              type: 'time',
              time: {
                unit: 'second'
              }
            }
          }
        },
      };
    },
    mounted() {
      this.initializeChart();
      this.setupSocket();
    },
    methods: {
      initializeChart() {
        const ctx = document.getElementById('myChart').getContext('2d');
        this.chart = new Line(ctx, {
          data: this.chartData,
          options: this.chartOptions,
        });
      },
      setupSocket() {
        this.socket = io('http://localhost:3000');
        this.socket.on('newData', (data) => {
          this.addData(data);
        });
      },
      addData(data) {
        const currentTime = new Date();
        if (this.chartData.labels.length > 20) {
          this.chartData.labels.shift();
          this.chartData.datasets[0].data.shift();
        }
        this.chartData.labels.push(currentTime);
        this.chartData.datasets[0].data.push(data);
        this.chart.update();
      },
    },
  };
  </script>
  
  <style scoped>
  /* Add any required styles */
  </style>
  