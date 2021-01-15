/*
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2021-01-06 15:55:56
 * @LastEditors: sueRimn
 * @LastEditTime: 2021-01-06 15:59:38
 */
var mongoose = require('mongoose')
var uris = 'mongodb://localhost/test'

mongoose.connect(uris, { useNewUrlParser: true, useUnifiedTopology: true }, function (err) {
    if (err) {
        return console.log(err)
    }
    console.log("数据库连接成功")
})

module.exports = mongoose
