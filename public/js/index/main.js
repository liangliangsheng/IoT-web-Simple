/*
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2021-01-13 20:35:15
 * @LastEditors: sueRimn
 * @LastEditTime: 2021-01-15 16:52:37
 */
import { lineOption } from './options.js'
let myChart1 = echarts.init(document.querySelector('.line-chart'));
let map
let temArray = []
let humArray = []
let timeArray = []
let latitude = ''
let longitude = ''
let realTime = 5000
let marker
let chartsFlag = 0

$.ajax({
  type: "get",
  url: "/updateCharts",
  dataType: "json",
  data: { name: 'init' },
  success: function (data) {
    charts(data, chartsFlag)
    setInterval(realTimeUpdate, realTime)
  },
  error: function (xhr) {
    console.log(xhr.status);
  }
})

function realTimeUpdate() {
  $.ajax({
    type: "get",
    url: "/updateCharts",
    data: { name: 'realTimeUpdate' },
    dataType: "json",
    success: function (data) {
      charts(data, chartsFlag)
    },
    error: function (xhr) {
      console.log(xhr.status);
    }
  })
}

function charts(data, flag) {
  let nowData = data[0]
  let revData = data.reverse()
  temArray = revData.map(item => item.Temperature)
  humArray = revData.map(item => item.EnvHumidity)
  timeArray = revData.map(item => item.timeString.split(' ')[1])
  latitude = nowData.Latitude
  longitude = nowData.Longitude

  console.log(nowData);
  
  if (flag) {
    // 更新框中数据
    $('.now p').text(nowData.timeString)
    $('.wendu h3').text(nowData.Temperature+'°C')
    $('.shidu h3').text(nowData.EnvHumidity+'%')
    $('.location h3').text(latitude + ' , ' + longitude)
    // 更新折线图
    myChart1.setOption({
      xAxis: {
        data: timeArray
      },
      series: [{
        name: 'Temperature',
        data: temArray
      }, {
        name: 'Humidity',
        data: humArray
      }]
    });
    // console.log(latitude);
    // console.log(longitude);
    // console.log(timeArray);
    // 清楚标记
    map.removeOverlay(marker);
    // 在地图上添加新的点标记
    marker = new BMapGL.Marker(new BMapGL.Point(latitude, longitude));
    map.addOverlay(marker);
  }
  else {
    // 绘制折线图
    lineOption.xAxis[0].data = timeArray
    lineOption.series[0].data = temArray
    lineOption.series[1].data = humArray
    myChart1 = echarts.init(document.querySelector('.line-chart'));
    myChart1.setOption(lineOption);

    // 绘制地图
    map = new BMapGL.Map('location');
    map.centerAndZoom(new BMapGL.Point(120.12979, 30.25949), 11);
    map.enableScrollWheelZoom(true);
    // 创建点标记
    marker = new BMapGL.Marker(new BMapGL.Point(latitude, longitude));
    // 在地图上添加点标记
    map.addOverlay(marker);
    chartsFlag = 1
  }
}