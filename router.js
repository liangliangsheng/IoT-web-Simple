/*
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2020-12-31 12:11:51
 * @LastEditors: sueRimn
 * @LastEditTime: 2021-01-17 16:41:03
 */
var express = require('express')
let mongoose = require('./models/db.js')
let schema = require('./models/Schema.js')
var router = express.Router()
let deviceInfo = mongoose.model('Info', schema.deviceInfo, 'infos')

router.get('/', function (req, res) {
    // 异步更新数据
    if (req.query.name == 'realTimeUpdate') {
        return updateDataset(res, req.query.deviceIndex)
    }
    // 初始化页面
    initHtml(res, function (res, deviceData, countArray) {
        deviceData.findOne().select("")
            .sort({ timeNumber: -1 })
            .exec(function (err, data) {
                if (err) {
                    console.log("查询数据失败")
                    return res.status(500).send("Server errow")
                }
                // console.log(count, data);
                res.render('index.html', {
                    deviceIndex: countArray,
                    nowData: data
                })
            })

    })
})

router.get('/dataset', function (req, res) {
    // 异步更新数据表
    if (req.query.name == 'realTimeUpdate') {
        return updateDataset(res, req.query.deviceIndex)
    }

    // 初始化页面
    initHtml(res, function (res, deviceData, countArray) {
        deviceData.find()
            .sort({ timeNumber: -1 })
            .limit(20)
            .exec(function (err, data) {
                if (err) {
                    console.log("查询数据失败")
                    return res.status(500).send("Server errow")
                }
                res.render('dataset.html', {
                    deviceIndex: countArray,
                    dataset: data
                })
            })
    })
})


function initHtml(res, callback) {
    // 统计有多少个设备
    deviceInfo.countDocuments({}, function (err, count) {
        if (err) {
            return console.log(err);
        }
        // 设备数组
        let countArray = new Array(count).fill(1).map((item, index) => item + index)
        // 显示第一个设备数据
        deviceInfo.findOne().exec(function (err, data) {
            // console.log(data.id);
            let deviceData = mongoose.model('Device' + data.id, schema.deviceData, 'devices' + data.id)
            callback(res, deviceData, countArray)
        })
    })
}

function updateCharts(res, dataCount, deviceIndex) {
    // 根据设备index找到对应collection
    deviceInfo.findOne().skip(deviceIndex - 1).exec(function (err, data) {
        // console.log(.id);
        let deviceData = mongoose.model('Device' + data.id, schema.deviceData, 'devices' + data.id)

        // 返回数据
        deviceData.find()
            .sort({ timeNumber: -1 })
            .limit(dataCount)
            .select('Temperature EnvHumidity Latitude Longitude timeString -_id')
            .exec(function (err, data) {
                if (err) {
                    console.log("查询数据失败")
                    return res.status(500).send("Server find errow")
                }
                res.send(data)
            })
    })
}

function updateDataset(res, deviceIndex) {
    deviceInfo.findOne().skip(deviceIndex - 1).exec(function (err, data) {
        // 根据设备index找到对应collection
        let deviceData = mongoose.model('Device' + data.id, schema.deviceData, 'devices' + data.id)

        // 返回数据
        deviceData.find()
            .sort({ timeNumber: -1 })
            .limit(20)
            .exec(function (err, data) {
                if (err) {
                    console.log("查询数据失败")
                    return res.status(500).send("Server errow")
                }
                res.send(data)
            })
    })
}
module.exports = router