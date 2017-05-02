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
      stepChart.setOption(_data.stepChart);
      heartbeatChart.setOption(_data.wishChart);
    }
  })
});