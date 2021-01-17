/*
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2020-12-25 12:11:32
 * @LastEditors: sueRimn
 * @LastEditTime: 2021-01-17 14:52:40
 */
let mqtt = require('mqtt');
let client2 = mqtt.connect("mqtt://47.111.122.217:1883");   //指定服务端地址和端口
let mongoose = require('../models/db.js')
let schema = require('../models/Schema.js')

// 实例化设备信息表模型
let deviceInfo = mongoose.model('Info', schema.deviceInfo, 'infos')

client2.subscribe('hyk', { qos: 1 });//订阅主题为hyk的消息  

client2.on('message', function (top, message) {

    // 1.处理数据
    let data = JSON.parse(message.toString())
    // console.log(data)
    // 添加数据时间
    let date = new Date()
    data.timeNumber = date.getTime()
    data.timeString = dateFormat("YYYY-mm-dd HH:MM:SS", date)

    // 2.判断设备是否注册
    deviceInfo.countDocuments({ id: data.id }, function (err, count) {
        if (err) {
            return console.log(err);
        }

        // 1.未注册，注册设备
        if (count === 0) {
            // 注册设备信息
            new deviceInfo(data)
                .save(function (err, user) {
                    if (err) {
                        return console.log("注册失败")
                    }
                    console.log("注册成功")
                })
        }
        // 2.存储数据
        let deviceData = mongoose.model('Device' + data.id, schema.deviceData, 'devices' + data.id)
        new deviceData(data)
            .save(function (err, user) {
                if (err) {
                    return console.log("存储失败")
                }
                console.log("收到数据，储存成功")
            })
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