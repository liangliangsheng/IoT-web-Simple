/*
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2020-12-29 11:02:40
 * @LastEditors: sueRimn
 * @LastEditTime: 2021-01-13 16:18:20
 */
var mongoose = require('./db')

var userSchema = mongoose.Schema({
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

module.exports = mongoose.model('Sensor', userSchema, 'sensors')