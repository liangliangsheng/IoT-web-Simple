/*
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2020-12-31 12:07:04
 * @LastEditors: sueRimn
 * @LastEditTime: 2021-01-15 13:44:29
 */
var express = require('express')
var path = require('path')
var router = require('./router')
var mqtt = require('./mqtt/subclient')
var expressArtTemplate =  require('express-art-template')
app = express()


app.use('/public/', express.static(path.join(__dirname, './public/')))
app.use('/node_modules/', express.static(path.join(__dirname, './node_modules/')))

// art-template配置
// 在服务端删除art-template原生语法，预留给前端使用，避免冲突
expressArtTemplate.template.defaults.rules.shift()
app.engine('html', expressArtTemplate);
app.set('views', path.join(__dirname, './views/'))         // 默认找view目录

app.use(router)

app.listen(3000, function () {
    console.log('running')
})