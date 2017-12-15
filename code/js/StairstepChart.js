import Chart from 'chart.js';

// { data : Array [year, value],
//   selector : SelectorString for Canvas Element,
//   element : CanvasElement }
export default function StairstepChart(config) {
  let data = config.data;
  let selector = config.selector;
  let element = config.element || document.querySelector(selector);
  if (!element) {
    throw new Error('Could not find a canvas element to bind the chart to. Attempted selector was "' + selector + '"')
  }

  let ctx = element.getContext('2d');
  
  var myChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: data.all.map(function(obj) {
        return obj.date.getFullYear();
      }),
      datasets: [
        {
          steppedLine: true,
          label: 'Total Boulder Solar Added (kW)',
          data: data.past.map(function(obj) {
            return {x:obj.date.getFullYear(), y : obj.value};
          }),
          backgroundColor: "rgba(255, 99, 132, 0.2)",
          borderColor: 'rgba(255,99,132,1)',
          borderWidth: 2
        },
        {
          steppedLine: true,
          label: 'Projected Boulder Solar Added (kw)',
          data: data.futurePlus.map(function(obj) {
            return {x:obj.date.getFullYear(), y : obj.value};
          }),
          backgroundColor: "rgba(255, 99, 132, 0.2",
          borderColor: ['blue'],
          borderWidth: 2
        },
        {
          label: 'Fort Collins Climate Goal (kW)',
          data: [{x:2020,y:37348},{x:2030,y:149392}],
          backgroundColor: "transparent",
          borderColor: 'rgba(255,99,132,1)',
          borderWidth: 2
        }
      ]
    },
    responsive: true,
    maintainAspectRatio: true,
    options: {
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero:true
          }
        }]
      }
    }
  });

}