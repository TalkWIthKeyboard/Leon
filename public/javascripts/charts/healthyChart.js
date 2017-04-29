/**
 * Created by CoderSong on 17/4/26.
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

var colors = ['#5793f3'];

stepOption = {
  color: colors,
  title: {
    text: '步数（每小时）'
  },
  tooltip: {
    trigger: 'none',
    axisPointer: {
      type: 'cross'
    }
  },
  legend: {
    data: ['步数']
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
    }
  ],
  yAxis: [
    {
      type: 'value'
    }
  ],
  series: [
    {
      name: '步数',
      type: 'line',
      xAxisIndex: 0,
      smooth: true,
      data: [0, 0, 0, 0, 28, 70, 175, 400, 1000, 1200, 800, 100]
    }
  ]
};

heartbeatOption = {
  title: {
    text: '心跳次数（每分钟）',
  },
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'cross'
    }
  },
  toolbox: {
    show: true,
    feature: {
      saveAsImage: {}
    }
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
      name: '心跳数',
      type: 'line',
      smooth: true,
      data: [81, 73, 79, 77, 68, 75, 70, 70, 71, 77, 84, 73, 78, 75, 68, 73, 71, 83, 83, 70],
      markArea: {
        data: [[{
          name: '最高峰',
          xAxis: '11:15'
        }, {
          xAxis: '13:45'
        }]]
      }
    }
  ]
};

stepChart.setOption(stepOption);
heartbeatChart.setOption(heartbeatOption);