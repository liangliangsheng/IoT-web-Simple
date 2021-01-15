/*
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2020-12-25 12:11:32
 * @LastEditors: sueRimn
 * @LastEditTime: 2021-01-14 13:10:50
 */
var mqtt = require('mqtt');
var client2 = mqtt.connect("mqtt://47.111.122.217:1883");   //指定服务端地址和端口
var Sensor = require('../models/sensor')

client2.subscribe('test', { qos: 1 });//订阅主题为test的消息  

client2.on('message', function (top, message) {
    
    var data = JSON.parse(message.toString())
    console.log(data)
    
    // 添加时间数据
    let date = new Date()
    data.timeNumber = date.getTime()
    data.timeString = dateFormat("YYYY-mm-dd HH:MM:SS", date)

    // 存储数据
    new Sensor(data)
        .save(function (err, user) {
            if (err) {
                return console.log("存储失败")
                // return console.log(err)
            }
            console.log("收到数据，储存成功")
        })
})

// 日期方法
function dateFormat(fmt, date) {
    let ret;
    const opt = {
        "Y+": date.getFullYear().toString(),        // 年
        "m+": (date.getMonth() + 1).toString(),     // 月
        "d+": date.getDate().toString(),            // 日
        "H+": date.getHours().toString(),           // 时
        "M+": date.getMinutes().toString(),         // 分
        "S+": date.getSeconds().toString()          // 秒
        // 有其他格式化字符需求可以继续添加，必须转化成字符串
    };
    for (let k in opt) {
        ret = new RegExp("(" + k + ")").exec(fmt);
        if (ret) {
            fmt = fmt.replace(ret[1], (ret[1].length == 1) ? (opt[k]) : (opt[k].padStart(ret[1].length, "0")))
        };
    };
    return fmt;
}