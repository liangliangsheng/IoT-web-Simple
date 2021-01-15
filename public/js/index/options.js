const colorList = ["#9E87FF", '#73DDFF', '#fe9a8b', '#F56948', '#9E87FF']

let lineOption = {
    backgroundColor: '#fff',
    title: {
        text: 'Chart of Temperature and Humidity',
        textStyle: {
            fontSize: 14,
            fontWeight: 600,
            color: '#777',
            fontFamily: ''
        },
        top: '3%',
        left: '5%'
    },
    legend: {
        icon: 'tangle',
        top: '3%',
        right: '5%',
        itemWidth: 20,
        itemHeight: 10,
        itemGap: 20,
        textStyle: {
            color: '#556677'
        }
    },
    tooltip: {
        trigger: 'axis',
        axisPointer: {
            label: {
                show: true,
                backgroundColor: '#fff',
                color: '#556677',
                borderColor: 'rgba(0,0,0,0)',
                shadowColor: 'rgba(0,0,0,0)',
                shadowOffsetY: 0
            },
            lineStyle: {
                width: 0
            }
        },
        backgroundColor: '#fff',
        textStyle: {
            color: '#333333'
        },
        padding: [10, 10],
        extraCssText: 'box-shadow: 1px 0 2px 0 rgba(163,163,163,0.5)'
    },
    grid: {
        top: '16%',
        bottom: '12%',
        left: '7%',
        right: '7%'
    },
    xAxis: [{
        type: 'category',
        data: ['北京', '上海', '广州', '深圳', '香港', '澳门', '台湾'],
        axisLine: {
            lineStyle: {
                color: '#DCE2E8'
            }
        },
        axisTick: {
            show: true,
            inside: true,
        },
        axisLabel: {
            interval: 0,
            textStyle: {
                color: '#aaaaaa'
            },
            // 默认x轴字体大小
            fontSize: 12,
            // margin:文字到x轴的距离
            margin: 15,
        },
        axisPointer: {
            label: {
                // show:false,
                // padding: [11, 5, 7],
                padding: [5, 5, 5, 5],

                // 这里的margin和axisLabel的margin要一致!
                margin: 10,
                // 移入时的字体大小
                fontSize: 12,
                backgroundColor: 'auto'
            }
        },
        boundaryGap: false
    }],
    yAxis: [{
        type: 'value',
        axisTick: {
            show: false
        },
        axisLine: {
            show: true,
            lineStyle: {
                color: '#DCE2E8',
            }
        },
        axisLabel: {
            textStyle: {
                color: '#999999',
            },
            formatter: '{value}℃'
        },
        splitLine: {
            show: false
        }
    }, {
        type: 'value',
        position: 'right',
        axisTick: {
            show: false
        },
        axisLabel: {
            textStyle: {
                color: '#999999'
            },
            formatter: '{value}%'
        },
        axisLine: {
            show: true,
            lineStyle: {
                color: '#DCE2E8'
            }
        },
        splitLine: {
            show: false
        }
    }],
    series: [{
        name: 'Temperature',
        type: 'line',
        data: [10, 10, 30, 12, 15, 3, 7],
        symbolSize: 1,
        symbol: 'circle',
        smooth: true,
        yAxisIndex: 0,
        showSymbol: false,
        lineStyle: {
            width: 4,
            color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [{
                offset: 0,
                color: '#fe9a'
            },
            {
                offset: 1,
                color: '#fe9a8b'
            }
            ]),
            shadowColor: 'rgba(254,154,139, 0.3)',
            shadowBlur: 10,
            shadowOffsetY: 20
        },
        itemStyle: {
            normal: {
                color: colorList[2],
                borderColor: colorList[2]
            }
        }
    }, {
        name: 'Humidity',
        type: 'line',
        data: [5, 12, 11, 14, 25, 16, 10],
        symbolSize: 1,
        symbol: 'circle',
        smooth: true,
        yAxisIndex: 1,
        showSymbol: false,
        lineStyle: {
            width: 4,
            color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [{
                offset: 0,
                color: '#9effff'
            },
            {
                offset: 1,
                color: '#9E87FF'
            }
            ]),
            shadowColor: 'rgba(158,135,255, 0.3)',
            shadowBlur: 10,
            shadowOffsetY: 20
        },
        itemStyle: {
            normal: {
                color: colorList[0],
                borderColor: colorList[0]
            }
        }
    },

    ]
};
export {
    lineOption,
    // myOption
}