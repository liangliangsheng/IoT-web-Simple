/*
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2020-12-31 12:11:51
 * @LastEditors: sueRimn
 * @LastEditTime: 2021-01-15 14:32:23
 */
var express = require('express')
var Sensor = require('./models/sensor')
var router = express.Router()

router.get('/', function (req, res) {
    Sensor.findOne().select("")
        .sort({ timeNumber: -1 })
        .exec(function (err, data) {
            if (err) {
                console.log("查询数据失败")
                return res.status(500).send("Server errow")
            }
            res.render('index.html', {
                nowData: data
            })
        })
})

router.get('/dataset', function (req, res) {
    let queryName = req.query.name
    Sensor.find()
        .sort({ timeNumber: -1 })
        .limit(20)
        .exec(function (err, data) {
            if (err) {
                console.log("查询数据失败")
                return res.status(500).send("Server errow")
            }
            // 异步时时更新
            if (queryName == 'realTimeUpdate') {
                return res.send(data)
            }
            // 请求页面
            res.render('dataset.html', {
                dataset: data
            })
        })
})



router.get('/updateCharts', function (req, res) {
    // console.log(req.query);
    let queryName = req.query.name
    if (queryName == 'init') {
        let initAmount = 7;
        return updateCharts(res, initAmount)
    }
    if (queryName == 'realTimeUpdate') {
        let realAmount = 7;
        return updateCharts(res, realAmount)
    }

})
// router.get('/ditu', function (req, res) {
//         res.render('lines-bmap.html')
// })

function updateCharts(res, amount) {
    Sensor.find()
        .sort({ timeNumber: -1 })
        .limit(amount)
        .select('Temperature EnvHumidity Latitude Longitude timeString -_id')
        .exec(function (err, data) {
            if (err) {
                console.log("查询数据失败")
                return res.status(500).send("Server find errow")
            }
            res.send(data)
        })
}

module.exports = router