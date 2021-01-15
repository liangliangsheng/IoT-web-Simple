/*
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2020-12-25 12:26:33
 * @LastEditors: sueRimn
 * @LastEditTime: 2020-12-31 14:45:05
 */
var mqtt = require('mqtt');
var client = mqtt.connect('mqtt://47.111.122.217:1883'); //连接到服务端

var qtt = `{
    "id": "1",
    "Temperature": 30,
    "EnvHumidity": 30,
    "Latitude": 120,
    "Longitude": 30
}`
setInterval(function() { //3秒钟发送一次 消息到主题 SN69143809293670state 消息为helloworld
    client.publish('test', qtt, { qos: 0, retain: true });  
}, 3000);