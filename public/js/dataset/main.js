/*
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2021-01-15 14:40:11
 * @LastEditors: sueRimn
 * @LastEditTime: 2021-01-17 16:33:30
 */
$(function () {
  // 为更新数据按钮监听事件
  $(".sec-nav >.my-btn").on('click', function () {
    $.ajax({
      type: "get",
      url: "/dataset",
      dataType: "json",
      data: { name: 'realTimeUpdate', deviceIndex: getNowDevice() },
      success: function (data) {
        console.log(data)
        var htnlStr = template('dataset', {
          dataset: data
        })
        $('.data-table').html(htnlStr)
      }
    })
  })

  // 为设备切换绑定监听事件
  $('.device-index').on("click", 'a', function (event) {
    $('.device-button .text').text($(event.target).text())
    event.preventDefault()
    $(".sec-nav >.my-btn").trigger('click')
  })
})

function getNowDevice() {
  let deviceIndex = $('.device-button .text').text().split('-')[1]
  return deviceIndex
}