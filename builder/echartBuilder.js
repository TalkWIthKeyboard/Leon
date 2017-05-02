/**
 * Created by CoderSong on 17/5/2.
 */

let pub = {};
let _ = require('underscore');

/**
 * 折线图（主要是绘制步数和心跳）
 * @param time []
 * @param data [{人：数据[]},{}...]
 * @param legendData [线的描述]
 * @param chartName 表的名字
 */
pub.lineChart = (time, data, legendData, chartName) => {
  let seriesList = [];
  _.each(data, (each, index) => {
    let seriesObj = {};
    seriesObj.name = legendData[index];
    seriesObj.type = 'line';
    seriesObj.smooth = 'true';
    seriesObj.center = ['60%', '55%'];
    seriesObj.data = _.values(each)[0];
    seriesList.push(seriesObj);
  });

  let colors = ['#5793f3', '#d14a61', '#675bba'];

  return {
    title: {
      text: chartName
    },
    tooltip: {
      trigger: 'axis'
    },
    legend: {
      data: legendData,
      left: 'right'
    },
    // 相当于margin
    grid: {
      top: 60,
      bottom: 50,
      x: 50,
      x2: 20
    },
    // x轴
    xAxis: [{
      type: 'category',
      axisTick: {
        alignWithLabel: true
      },
      axisLine: {
        onZero: false,
        lineStyle: {
          color: colors[1]
        }
      },
      data: time,
    }],
    // y轴
    yAxis: [{type: 'value'}],
    // 数据
    series: seriesList
  };
};

/**
 * 饼图（主要绘制心愿的贡献）
 * @param data [{value, name}]
 * @param chartName 表的名字
 * @param dataName 数据名
 */
pub.peiChart = (data, chartName, dataName) => {
  return {
    // 标题
    title: {
      text: chartName,
      left: 'center',
      top: 15,
      textStyle: {
        color: '#010101'
      }
    },
    // 点击后的显示框
    tooltip: {
      trigger: 'item',
      formatter: '{a} <br/>{b} : {c} ({d}%)'
    },
    // 表的样式
    visualMap: {
      show: false,
      min: 80,
      max: 600,
      // 颜色渐变
      inRange: {
        colorLightness: [0, 1]
      }
    },
    // 数据
    series: [{
      name: dataName,
      type:'pie',
      radius : '65%',
      center: ['50%', '55%'],
      data: data.sort((a,b) => a.value - b.value),
      roseType: 'angle',
      label: {
        normal: {
          textStyle: {
            color: '#272822'
          }
        }
      },
      labelLine: {
        normal: {
          lineStyle: {
            color: '#272822'
          },
          smooth: 0.2,
          length: 5,
          length2: 10
        }
      },
      itemStyle: {
        normal: {
          color: '#c23531',
          shadowBlur: 200,
          shadowColor: 'rgba(0, 0, 0, 0.5)'
        }
      },
      animationType: 'scale',
      animationEasing: 'elasticOut',
      animationDelay: function (idx) {
        return Math.random() * 200;
      }
    }]
  };
};

module.exports = pub;
