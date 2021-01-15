/*
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2021-01-15 14:40:11
 * @LastEditors: sueRimn
 * @LastEditTime: 2021-01-15 14:42:54
 */
$(function () {
  $(".sec-nav >.my-btn").on('click',function () {
    $.ajax({
      type: "get",
      url: "/dataset",
      dataType: "json",
      data: { name: 'realTimeUpdate' },
      success: function (data) {
        console.log(data)
        var htnlStr = template('dataset', {
          dataset: data
        })
        $('.data-table').html(htnlStr)
      }
    })
  })
})