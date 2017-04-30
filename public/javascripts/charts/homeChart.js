/**
 * Created by CoderSong on 17/4/28.
 */
var stepChart = echarts.init(document.getElementById('main'));
var heartbeatChart = echarts.init(document.getElementById('heartbeat-chart'));

$(document).ready(function () {
  var token = $('#main').attr('data-token');
  var _url = '/api/healthy?token=' + token;
  $.ajax({
    url: _url,
    type: 'GET',
    success: function (data) {
      let _data = data.data;
      console.log(_data);
    }
  })
});

var colors = ['#5793f3', '#d14a61', '#675bba'];

stepOption = {
  color: colors,
  title: {
    text: '步数'
  },
  tooltip: {
    trigger: 'none',
    axisPointer: {
      type: 'cross'
    }
  },
  legend: {
    data: ['爸爸的步数', '妈妈的步数', '儿子的步数'],
    left: 'right'
  },
  grid: {
    top: 70,
    bottom: 50
  },
  xAxis: [
    {
      type: 'category',
      axisTick: {
        alignWithLabel: true
      },
      axisLine: {
        onZero: false,
        lineStyle: {
          color: colors[0]
        }
      },
      axisPointer: {
        label: {
          formatter: function (params) {
            return '步数  ' + params.value + '：' + params.seriesData[0].data;
          }
        }
      },
      data: ["0:00", "2:00", "4:00", "6:00", "8:00", "10:00", "12:00", "14:00", "16:00", "18:00", "20:00", "22:00"]
    }, {
      type: 'category',
      axisTick: {
        alignWithLabel: true
      },
      axisLine: {
        onZero: false,
        lineStyle: {
          color: colors[0]
        }
      },
      axisPointer: {
        label: {
          formatter: function (params) {
            return '步数  ' + params.value + '：' + params.seriesData[0].data;
          }
        }
      },
      data: ["0:00", "2:00", "4:00", "6:00", "8:00", "10:00", "12:00", "14:00", "16:00", "18:00", "20:00", "22:00"]
    }, {
      type: 'category',
      axisTick: {
        alignWithLabel: true
      },
      axisLine: {
        onZero: false,
        lineStyle: {
          color: colors[0]
        }
      },
      axisPointer: {
        label: {
          formatter: function (params) {
            return '步数  ' + params.value + '：' + params.seriesData[0].data;
          }
        }
      },
      data: ["0:00", "2:00", "4:00", "6:00", "8:00", "10:00", "12:00", "14:00", "16:00", "18:00", "20:00", "22:00"]
    }
  ],
  yAxis: [
    {
      type: 'value'
    }
  ],
  series: [
    {
      name: '爸爸的步数',
      type: 'line',
      xAxisIndex: 0,
      smooth: true,
      data: [0, 0, 0, 100, 400, 300, 175, 500, 1400, 1000, 600, 100]
    }, {
      name: '妈妈的步数',
      type: 'line',
      xAxisIndex: 0,
      smooth: true,
      data: [0, 0, 0, 120, 500, 600, 700, 800, 1000, 1200, 200, 100]
    }, {
      name: '儿子的步数',
      type: 'line',
      xAxisIndex: 0,
      smooth: true,
      data: [0, 0, 0, 0, 0, 0, 600, 1000, 2000, 2500, 400, 0]
    }
  ]
};

heartbeatOption = {
  title: {
    text: '心跳',
  },
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'cross'
    }
  },
  legend: {
    data: ['爸爸心跳数', '妈妈心跳数', '儿子心跳数'],
    left: 'right'
  },
  xAxis: {
    type: 'category',
    boundaryGap: false,
    data: ['00:00', '01:15', '02:30', '03:45', '05:00', '06:15', '07:30', '08:45', '10:00', '11:15', '12:30', '13:45', '15:00', '16:15', '17:30', '18:45', '20:00', '21:15', '22:30', '23:45']
  },
  yAxis: {
    type: 'value',
    axisLabel: {
      formatter: '{value}'
    },
    axisPointer: {
      snap: true
    }
  },
  visualMap: {
    show: false,
    dimension: 0,
    pieces: [{
      lte: 6,
      color: 'green'
    }, {
      gt: 6,
      lte: 8,
      color: 'red'
    }, {
      gt: 8,
      lte: 14,
      color: 'green'
    }, {
      gt: 14,
      lte: 17,
      color: 'red'
    }, {
      gt: 17,
      color: 'green'
    }]
  },
  series: [
    {
      name: '爸爸心跳数',
      type: 'line',
      smooth: true,
      data: [60, 81, 89, 75, 66, 80, 82, 71, 72, 88, 91, 97, 80, 68, 67, 78, 98, 68, 100, 90],
    }, {
      name: '妈妈心跳数',
      type: 'line',
      smooth: true,
      data: [76, 83, 75, 66, 100, 81, 95, 65, 95, 90, 65, 88, 67, 91, 88, 71, 84, 69, 75, 88],
    }, {
      name: '儿子心跳数',
      type: 'line',
      smooth: true,
      data: [80, 77, 62, 80, 81, 73, 65, 88, 67, 98, 68, 82, 95, 96, 68, 68, 84, 89, 90, 94],
    }
  ]
};

stepChart.setOption(stepOption);
heartbeatChart.setOption(heartbeatOption);