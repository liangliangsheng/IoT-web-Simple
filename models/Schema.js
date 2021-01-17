/*
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2021-01-17 11:28:46
 * @LastEditors: sueRimn
 * @LastEditTime: 2021-01-17 11:43:44
 */
var mongoose = require('mongoose')
var deviceData = mongoose.Schema({
  id: {
      type: String,
      required: true
  },
  Temperature: {
      type: Number,
      required: true
  },
  EnvHumidity: {
      type: Number,
      required: true
  },
  Latitude: {
      type: Number,
      required: true
  },
  Longitude: {
      type: Number,
      required: true
  },
  // time: {
  //     type: Date,
  //     // 注意不要写Date.now()会即刻调用，给了一个方法
  //     default: Date.now,
  // }
  timeNumber: {
      type:Number,
      required:true
  },
  timeString: {
      type:String,
      required:true
  }
})

var deviceInfo = mongoose.Schema({
  id: {
      type: String,
      required: true
  },
  timeNumber: {
      type:Number,
      required:true
  },
  timeString: {
      type:String,
      required:true
  }
})

module.exports.deviceData = deviceData
module.exports.deviceInfo = deviceInfo