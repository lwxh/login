$(function(){
    //初始化时间组件
    timeComponent();

    //使用仿真数据
    //初始化航线地图和航线的下拉选择框
    let mapChart = fakeDataChinaAirlineMap();

    //使用仿真数据
    //初始化管理员画像
    fakeDataManagerPortraitChart();

    //使用仿真数据
    //初始化管理员基础信息
    fakeDataManagerBaseInfo();

    //使用仿真数据
    //设置默认航线画像
    fakeDataAirlinePortraitChart("广州", "上海");

    //使用仿真数据
    //设置默认航线基本信息
    fakeDataAirlineBaseInfo('广州', '上海');

    //使用仿真数据
    //设置默认航线的overview
    fakeDataOverviewChart('广州', '上海');

    //初始化与航线画像相关的日期类型和时间类型筛选框
    initDateAndTimeTypeSelection();

    //绑定点击时事件
    bindClickEvents(mapChart);
});

/**
 * 页面点击事件绑定
 */
function bindClickEvents(mapChart){
    //设置航线地图的点击事件
    if(mapChart){
        mapChart.on('click', function (params) {
            if (params.componentSubType === 'lines') {
                // 根据点击的航线设置检索框内的内容
                $("#selectStart").val(params.data.fromName).select2();
                $("#selectEnd").val(params.data.toName).select2();

                //根据点击到的航线设置航线画像和航线基本信息
                fakeDataAirlinePortraitChart(params.data.fromName, params.data.toName);
                fakeDataAirlineBaseInfo(params.data.fromName, params.data.toName);

                //根据点击到的航线设置航线的overview
                fakeDataOverviewChart(params.data.fromName, params.data.toName);
            }
        });
    }

    //添加一系列跳转到下一界面的点击事件
    $("#airline").click(function () {
        goto_managerWorkPage();
    });
    $("#main_atten").click(function () {
        goto_managerWorkPage();
    });
    $("#main_reven").click(function(){
        goto_managerWorkPage();
    });
    $("#main_carryAbility").click(function(){
        goto_managerWorkPage();
    });
    $("#main_workload").click(function(){
        goto_managerWorkPage();
    });
    $("#main_flyCount").click(function(){
        goto_managerWorkPage();
    });
    $("#ridership").click(function(){
        goto_managerWorkPage();
    });
    $("#team_scatter_rate").click(function(){
        goto_managerWorkPage();
    });

    //设置航线搜索按钮的点击事件
    $("#btnSearch").click(function () {
        //设置指标图
        fakeDataOverviewChart($("#selectStart").val(), $("#selectEnd").val());

        //设置航线画像与基本信息
        fakeDataAirlinePortraitChart($("#selectStart").val(), $("#selectEnd").val())
        fakeDataAirlineBaseInfo($("#selectStart").val(), $("#selectEnd").val());
    });

    //设置当日期类型和时段类型发生变化时的响应行为，即重新设置航线画像
    $("#selectDateType").change(function(){
        fakeDataAirlinePortraitChart($("#selectStart").val(), $("#selectEnd").val());
    });
    $("#selectTimeType").change(function(){
        fakeDataAirlinePortraitChart($("#selectStart").val(), $("#selectEnd").val());
    });
    
    //响应展示和隐藏注释的点击事件
    $(".replay-recent-report").click(function(event){
        if($('.replay-explain-div').is(':hidden')){
            $('.replay-explain-div').show();
        }
        else{
            $('.replay-explain-div').hide();
        }
    });
}

/**
 * 设置航线的基础信息
 * 参数：航线基础信息
 */
function setAirlineBaseInfo(baseInfo) {
    $("#airline_start_point").text('起点：' + baseInfo['startPoint']);
    $("#airline_end_point").text('终点：' + baseInfo['endPoint']);
    $("#airline_length").text('里程：' + baseInfo['length']);
}

/**
 * 初始化管理员基础信息
 * 参数：管理员基础信息
 */
function initManagerBaseInfo(baseInfo){
    $("#manager_company").text("航司：" + baseInfo['company']);
    $("#manager_id").text("ID：" + baseInfo['managerID']);
    $("#manager_name").text("姓名：" + baseInfo['managerName']);
    $("#manager_age").text("年龄：" + baseInfo['managerAge']);
    $("#manager_workAge").text("工龄：" + baseInfo['workAge']);
}

/**
 * 设置航线画像
 * 参数：航线画像数据
 */
function setAirlinePortraitChart(airlinePortrait){
    // 设置线条样式
    let lineStyle = {
        normal: {
            width: 1,
            opacity: 5
        }
    };
    // 绘制航线画像（雷达图）
    let airlinePortraitChart = echarts.init(document.getElementById("airline_portrait"));
    airlinePortraitChart.setOption({
        backgroundColor: '#161627',
        title: {
            text: '航线画像',
            textStyle: {
                color: '#eee'
            }
        },
        tooltip: {
            confine:'true'
        },
        radar: {
          
            indicator: [
                {name: '热门度', max: 1,min:0, color: '#28FF28'},
                {name: '易售度', max: 1,min:0, color: '#28FF28'},
                {name: '收产比', max: 1,min:0, color: '#28FF28'},
                {name: '拒载率', max: 1,min:0, color: 'yellow'},
                {name: '上座率', max: 1,min:0, color: 'yellow'}
            ],
            shape: 'circle',
            splitNumber: 5,
            radius:60,
            nameGap:5,
            name: {
                textStyle: {
                    fontSize:15,
                    color: 'rgb(238, 197, 102)'
                }
            },
            //图形效果
            splitLine: {
                lineStyle: {
                    color: [
                        'rgba(238, 197, 102, 0.1)', 'rgba(238, 197, 102, 0.2)',
                        'rgba(238, 197, 102, 0.4)', 'rgba(238, 197, 102, 0.6)',
                        'rgba(238, 197, 102, 0.8)', 'rgba(238, 197, 102, 1)'
                    ].reverse()
                }
            },
            splitArea: {
                show: false
            },
            axisLine: {
                lineStyle: {
                    color: 'rgba(238, 197, 102, 0.5)'
                }
            }
        },
        series: [
            {
                name: '航线各项参数',
                type: 'radar',
                lineStyle: lineStyle,
                data: airlinePortrait['data'],
                symbol: 'none',
                itemStyle: {
                    normal: {
                        color: '#F9713C'
                    }
                },
                areaStyle: {
                    normal: {
                        opacity: 0.1
                    }
                }
            },
        ]
    });
    return airlinePortraitChart;
}

/**
 * 初始化管理员画像
 * 参数：管理员画像数据
 */
function initManagerPortraitChart(managerPortrait){
    // 设置图像样式
    let lineStyle = {
        normal: {
            width: 1,
            opacity: 5
        }
    };
    // 绘制管理员画像
    let managerPortraitChart = echarts.init(document.getElementById("manager_portrait"));
    managerPortraitChart.setOption({
        backgroundColor: '#161627',
        title: {
            text: '管理员画像',
            textStyle: {
                color: '#eee'
            }
        },
        tooltip: {
            confine:'true'
        },
        radar: {
            indicator: [
                {name: '激进性', max: 1,min:0,color: '#28FF28'},
                {name: '保守性', max: 1,min:0,color: '#28FF28'},
                {name: '工作强度', max: 1,min:0, color: 'yellow'},
                {name: '产出性', max: 1,min:0, color: 'yellow'},
                {name: '热门度',max:1,min:0, color: '#28FF28'}
            ],
            shape: 'circle',
            splitNumber: 5,
            radius:60,
            nameGap:5,
            name: {
                textStyle: {
                    fontSize:15,
                    color: 'rgb(238, 197, 102)'
                }
            },

            //图形效果
            splitLine: {
                lineStyle: {
                    color: [
                        'rgba(238, 197, 102, 0.1)', 'rgba(238, 197, 102, 0.2)',
                        'rgba(238, 197, 102, 0.4)', 'rgba(238, 197, 102, 0.6)',
                        'rgba(238, 197, 102, 0.8)', 'rgba(238, 197, 102, 1)'
                    ].reverse()
                }
            },
            splitArea: {
                show: false
            },
            axisLine: {
                lineStyle: {
                    color: 'rgba(238, 197, 102, 0.5)'
                }
            }
        },
        series: [
            {
                name: '管理员各项参数',
                type: 'radar',
                lineStyle: lineStyle,
                data: managerPortrait['data'],
                symbol: 'none',
                itemStyle: {
                    normal: {
                        color: '#F9713C'
                    }
                },
                areaStyle: {
                    normal: {
                        opacity: 0.1
                    }
                }
            },
        ]
    });
    return managerPortraitChart;
}

/**
 * 根据航线设置该航线的overview图表
 * 参数：航线的起点和终点
 */
function setOverviewChart(startPoint, endPoint, overviewData){
    // 分发数据
    let date = overviewData['date'];
    let atten = overviewData['atten'];
    let aveAtten = overviewData['aveAtten'];
    let reven = overviewData['reven'];
    let aveReven = overviewData['aveReven'];
    let companyCarryAbility = overviewData['companyCarryAbility'];
    let aveCompanyCarryAbility = overviewData['aveCompanyCarryAbility'];
    let managerWorkload = overviewData['managerWorkload'];
    let aveWorkload = overviewData['aveWorkload'];
    let flyCount = overviewData['flyCount'];
    let aveFlyCount = overviewData['aveFlyCount'];
    let airlineRidership = overviewData['airlineRidership'];
    let teamScatterRate = overviewData['teamScatterRate'];

    // 绘制折线图
    setLineChart(date, [atten, aveAtten], 'main_atten', startPoint, endPoint);
    setLineChart(date, [reven, aveReven], 'main_reven', startPoint, endPoint);
    setLineChart(date, [companyCarryAbility, aveCompanyCarryAbility], 'main_carryAbility', startPoint, endPoint);
    setLineChart(date, [airlineRidership], 'ridership', startPoint, endPoint);
    setLineChart(date, [managerWorkload, aveWorkload], 'main_workload', startPoint, endPoint);
    setLineChart(date, [flyCount, aveFlyCount], 'main_flyCount', startPoint, endPoint);
    setLineChart(date, [teamScatterRate], 'team_scatter_rate', startPoint, endPoint);
}

/**
 * 依据给定的数据绘制折线图
 */
function setLineChart(category, seriesData, divID, startPoint, endPoint) {
    let series = [];
    for(let i = 0; i < seriesData.length; i++){
        let element = {};
        element.name = seriesData[i]['name'];
        element.data = seriesData[i]['data'];
        element.type = 'line';
        series.push(element);
    }
    let chart = echarts.init(document.getElementById(divID));
    chart.setOption({
        title:{
            text: series[0].name + "    " + startPoint + '->' + endPoint,
            left: '3%',
            top:'2%',
        },
        legend:{
            textStyle: {
                fontSize: 15,
            },
            y:'10%'
        },
        tooltip: {          //显示提示框
            trigger: 'axis',
            formatter: function(params){
                  var relVal = params[0].name+"<br/>";
                for(let i=0;i<params.length;i++){
                    relVal +=  '<i style="display: inline-block;width: 10px;height: 10px;background: ' +
                    params[i].color +
                    ';margin-right: 5px;border-radius: 50%;}"></i><span style="display:inline-block;">' +
                    params[i].seriesName +
                    '</span> : '+ params[i].value + '<br/>';
                    if(params[i].seriesName=='市场平均日工作量')
                        relVal += '-------------------------'+'<br>'+ '日工作量' + ': '+'管理员当天操作总数' + '<br/>';
                    if(params[i].seriesName=='市场平均操作航班数')
                        relVal += '-------------------------'+'<br>'+ '操作航班数' + ': '+'管理员当天操作的航班个数' + '<br/>';
                    if(params[i].seriesName=='市场平均上座')
                        relVal += '-------------------------'+'<br>'+ '日均上座率' + ': '+'该航线上管理员当天' + '<br/>'+'所管理的航班的平均上座率';
                    if(params[i].seriesName=='市场平均客公里收入')
                        relVal += '-------------------------'+'<br>'+ '客公里收入' + ': '+'该航线上管理员当天所管理的' + '<br/>'+'航班的总收入除以总营业客公里数';
                    if(params[i].seriesName=='平均运输量')
                        relVal += '-------------------------'+'<br>'+ '日运输量' + ': '+'管理员所管理的' + '<br/>'+'航班当天所运载旅客人次';
                    if(params[i].seriesName=='航线运输量')
                        relVal += '-------------------------'+'<br>'+ '航线运输量' + ': '+'航线当天所运载的旅客人次';
                    if(params[i].seriesName=='团散客比率')
                        relVal += '-------------------------'+'<br>'+ '团散客比率' + ': '+'该航线当天所运载的旅客中'+'<br/>'+'团队旅客数与散客数的比率';
                    }
//             relVal += params[0].seriesName+ ' : ' + params[0].value+"<br/>";
//             relVal +=params[1].seriesName+ ' : ' +params[1].value+"<br/>";
//             relVal += params[2].seriesName+ ' : ' + params[2].value+"%";
            return relVal;
            },
            axisPointer: {
                type: 'cross'
            },
            confine:'false'
        },
        xAxis: {
            type: 'category',
            data: category,
            scale: true,
            boundaryGap : false,
            axisLine: {onZero: false},
            splitLine: {show: false},
            splitNumber: 20,
            min: 0,
            max: 'dataMax'
        },
        yAxis: {
            scale: true,
            min: function(value){
                return value.min;
            },
            max: function (value) {
                return value.max
            },
            splitArea: {
                show: true
            }
        },
        series: series,
        grid:{
            left:'12%',
            right:'12%',
            bottom:'15%'
        }
    });
    return chart;
}

/**
 * 跳转到下一个界面
 */
function goto_managerWorkPage(callback){
    var manager=getQueryString("Mid");
    var s_cityId = $("#selectStart").val();
    var e_cityId = $("#selectEnd").val();
    // $.ajax({
    //     url: "/managerWork",
    //     data: {
    //         "start_city": s_cityId,
    //         "end_city": e_cityId,
    //         "manager":manager
    //     },
    //     type: "GET",
    //     dataType: "json",
    //     contentType:"application/json; charset=utf-8",
    //     success: function f (data){
    //         window.location.href="/managerWorkPage.html?manager="+manager+"&start_city="+data.start_city+"&end_city="+data.end_city;
    //     }
    // });
    
    //跳转
    window.location.href="./managerWorkPage.html?manager="+manager+"&start_city="+s_cityId+"&end_city="+e_cityId;

    if(typeof(callback)=='function'){
        callback();
    }
}

/**
 * 初始化管理员所管理的航班所在的航线地图，以及选择航线的下拉框
 * 参数：航线地图数据
 */
function initChinaAirlineMapAndSelection(ChinaAirlineMapData){
    //分发数据
    let geoCoordMap = ChinaAirlineMapData['geoCoordMap'];
    let lines = ChinaAirlineMapData['lines'];
    let nodes = ChinaAirlineMapData['nodes'];

    //设置下拉框
    if(lines && lines.length>0){
        let from=Array.from(new Set(lines.map(v=>v.from)));
        $("#selectStart").select2({
            data:from
        });
        let to=Array.from(new Set(lines.map(v=>v.to)));
        $("#selectEnd").select2({
            data:to
        });
    }

    //绘制航线地图
    let chartMap = setChartMap(lines,nodes,geoCoordMap);
    return chartMap;
}

/**
 * 处理地图图表连线数据
 */
function convertDataLines (lines, geoCoordMap,type=true) {
    var res = [];
    for (var i = 0; i < lines.length; i++) {
        var dataItem = lines[i];
        var fromCoord = geoCoordMap[dataItem.from];
        var toCoord = geoCoordMap[dataItem.to];

        if (type && fromCoord && toCoord) {
            // console.log(dataItem[2]);
            res.push({
                fromName: dataItem.from,
                toName: dataItem.to,
                coords: [fromCoord, toCoord],
                value: dataItem.value,
            });
        }
        if (!type && fromCoord && toCoord && dataItem.value <= -1) {
            // console.log(dataItem[2]);
            res.push({
                fromName: dataItem.from,
                toName: dataItem.to,
                coords: [fromCoord, toCoord],
                value: dataItem.value,
            });
        }
    }
    return res;
};

/**
 * 处理地图图表节点数据
 */
function convertDataNodes (nodes,geoCoordMap) {
    var res = [];
    for (var i = 0; i < nodes.length; i++) {
        var geoCoord = geoCoordMap[nodes[i].name];
        if (geoCoord) {
            res.push({
                name: nodes[i].name,
                value: geoCoord.concat(nodes[i].value),
                symbolSize:120 / 8, // 散点的大小，通过之前设置的权重来计算，val的值来自data返回的value
            });
        }
    }
    return res;
};

/**
 * 设置地图图标
 */
function setChartMap (lines,nodes,geoCoordMap){

    var chart = echarts.init(document.getElementById("main_china"));

    // 小飞机的图标，可以用其他图形替换
    var planePath = 'path://M1705.06,1318.313v-89.254l-319.9-221.799l0.073-208.063c0.521-84.662-26.629-121.796-63.961-121.491c-37.332-0.305-64.482,36.829-63.961,121.491l0.073,208.063l-319.9,221.799v89.254l330.343-157.288l12.238,241.308l-134.449,92.931l0.531,42.034l175.125-42.917l175.125,42.917l0.531-42.034l-134.449-92.931l12.238-241.308L1705.06,1318.313z';

    color = ['#9ae5fc', 'red']; // 自定义图中要用到的颜色

    // 最后初始化世界地图中的相关数据
    option = {
        backgroundColor: '#878ba2',
        title: {
            textStyle: {
                color: '#fff',
                fontSize: 10
            },
            top: '10px',
            left: '10px'
        },
        tooltip: {
            trigger: 'item'
        },

        //地图
        geo: {
            map: 'china', // 与引用进来的地图js名字一致
            roam: true, // 禁止缩放平移
            itemStyle: { // 每个区域的样式
                normal: {
                    areaColor: '#323c48'
                },
                emphasis: {
                    areaColor: '#2a333d'
                }
            },
            regions: [{ // 选中的区域
                name: 'China',
                selected: false,
                itemStyle: { // 高亮时候的样式
                    emphasis: {
                        areaColor: '#7d7d7d'
                    }
                },
                label: { // 高亮的时候不显示标签
                    emphasis: {
                        show: false
                    }
                }
            }]
        },

        // 将之前处理的数据放到这里
        series: [],

        textStyle: {
            fontSize: 12
        }
    };

    option.series.push(
        //异常航线特效
        {
            type: 'lines',
            effect: {
                show: true, // 动效是否显示
                period: 0.5, // 特效动画时间
                trailLength: 7, // 特效尾迹的长度
                color: color[1], // 特效颜色
                symbolSize: 3 // 特效大小
            },
            lineStyle: {
                normal: { // 正常情况下的线条样式
                    color: color[1],
                    width: 0, // 因为是叠加效果，要是有宽度，线条会变粗，白色航线特效不明显
                    curveness: -0.2 // 线条曲度
                }
            },
            data: convertDataLines(lines, geoCoordMap, false), // 特效的起始、终点位置
            zlevel: 1 // 用于分层，z-index的效果
        },
        // 小飞机航线效果
        {
            type: 'lines',
            zlevel: 2,
            //symbol: ['none', 'arrow'],   // 用于设置箭头
            symbolSize: 10,
            effect: {
                show: true,
                period: 6,
                trailLength: 0,
                symbol: planePath, // 特效形状，可以用其他svg pathdata路径代替
                symbolSize: 25
            },
            lineStyle: {
                normal: {
                    color: color[0],
                    width: 3,
                    opacity: 0.6,
                    curveness: -0.2
                }
            },
            data: convertDataLines(lines, geoCoordMap, true) // 特效的起始、终点位置，一个二维数组，相当于coords: convertData(item[1])
        },
        { // 散点效果
            type: 'effectScatter',
            coordinateSystem: 'geo', // 表示使用的坐标系为地理坐标系
            zlevel: 3,
            rippleEffect: {
                brushType: 'stroke' // 波纹绘制效果
            },
            label: {
                normal: { // 默认的文本标签显示样式
                    show: true,
                    position: 'left', // 标签显示的位置
                    formatter: '{b}' // 标签内容格式器
                }
            },
            itemStyle: {
                normal: {
                    color: color[0]
                }
            },
            data: convertDataNodes(nodes,geoCoordMap),
        }
    );

    if (option && typeof option === "object") {
        chart.setOption(option, true);
    }

    return chart;
}

/**
 * 时间选择组件
 */
function timeComponent(){
    layui.use('laydate', function(){
        var laydate = layui.laydate;
        var endTime='2019-11-10';
        var startTime='2019-11-01';
        laydate.render({
            elem: '#txtTimeRange'
            ,range: '~'
            ,theme:'grid'
            ,format: 'yyyy-MM-dd'
            ,value:startTime+' ~ '+endTime
        });
    })
}

/**
 * 初始化与航线画像相关的日期类型筛选和时间类型筛选的筛选框
 */
function initDateAndTimeTypeSelection(){
    let dateType = ['不限', '周一', '周二', '周三', '周四', '周五', '周六', '周日', '国庆', '春节', '小长假'];
    $("#selectDateType").select2({
        data:dateType
    });
    let timeType = ['不限', '早班', '午班', '晚班'];
    $("#selectTimeType").select2({
        data:timeType
    });
}

/**
 * 根据起点和终点确定航线id
 */
function indexOfAirline(startPoint, endPoint){
    if(startPoint === '广州' && endPoint === '上海'){
        return 0;
    }
    else if(startPoint === '广州' && endPoint === '北京'){
        return 1;
    }
    else if(startPoint === '广州' && endPoint === '贵阳'){
        return 2;
    }
    else if(startPoint === '广州' && endPoint === '成都'){
        return 3;
    }
    else if(startPoint === '广州' && endPoint === '乌鲁木齐'){
        return 4;
    }
    else if(startPoint === '乌鲁木齐' && endPoint === '广州'){
        return 5;
    }
    else {
        return 0;
    }
}

/**
 * 解析页面参数
 */
function getQueryString(name) {
    const reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    const urlObj=window.location;
    var r =urlObj.href.indexOf('#')>-1? urlObj.hash.split("?")[1].match(reg) : urlObj.search.substr(1).match(reg);
    if (r != null) return decodeURI(r[2]); return null;
}



/*****************************\
         START  仿真数据
\*****************************/
/**
 * 为管理员基础信息生成一组仿真数据
 * 并使用这组仿真数据来初始化管理员基础信息
 */
function fakeDataManagerBaseInfo(){
    let baseInfo = {
        'company':'东方航空公司',
        'managerID':getQueryString("Mid"),
        'managerName':'小王',
        'managerAge':'27岁',
        'workAge':'3年'
    };
    //初始化管理员基本信息
    return initManagerBaseInfo(baseInfo);
}

/**
 * 为管理员画像生成一组仿真数据
 * 并使用这组仿真数据来初始化管理员画像
 */
function fakeDataManagerPortraitChart(){
    let managerPortrait = {
        'data': [
            [0.3,0.7,0.8,0.8,0.6]
        ]
    }
    //初始化管理员画像
    return initManagerPortraitChart(managerPortrait);
}

/**
 * 为航线基础信息生成一组仿真数据
 * 并使用这组仿真数据来设置航线基础信息
 */
function fakeDataAirlineBaseInfo(startPoint, endPoint){
    let fakeDataset = ['109km', '350km', '120km', '86km', '260km', '260km'];
    let baseInfo = {
        'startPoint': startPoint,
        'endPoint': endPoint,
        'length': fakeDataset[indexOfAirline(startPoint, endPoint)]
    };
    // 设置航线基础信息
    return setAirlineBaseInfo(baseInfo);
}

/**
 * 为航线画像生成一组仿真数据
 * 并使用这组仿真数据来设置航线画像
 */
function fakeDataAirlinePortraitChart(startPoint, endPoint){
    let fakeDataset = [
        [0.50, 0.80, 0.70, 0.05, 0.90],
        [0.60, 0.70, 0.70, 0.04, 0.80],
        [0.40, 0.40, 0.50, 0.14, 0.70],
        [0.65, 0.74, 0.76, 0.59, 0.72],
        [0.27, 0.63, 0.37, 0.18, 0.31],
        [0.57, 0.38, 0.48, 0.27, 0.37],
    ];
    let airlinePortraitData = [];
    airlinePortraitData.push(fakeDataset[indexOfAirline(startPoint, endPoint)]);
    if($("#selectDateType").val() === '周一' 
    || $("#selectDateType").val() === '周二'
    || $("#selectDateType").val() === '周三'
    || $("#selectDateType").val() === '周四'){
        airlinePortraitData[0][0] += 0.1;
        airlinePortraitData[0][1] -= 0.10;
        airlinePortraitData[0][3] += 0.05;
        airlinePortraitData[0][4] -= 0.08;
    }
    else if($("#selectDateType").val() === '周五'
    || $("#selectDateType").val() === '周六'
    || $("#selectDateType").val() === '周日'){
        airlinePortraitData[0][0] -= 0.05;
        airlinePortraitData[0][1] += 0.05;
        airlinePortraitData[0][3] -= 0.08;
        airlinePortraitData[0][4] += 0.06;
    }
    else if($("#selectDateType").val() === '国庆'){
        airlinePortraitData[0][0] -= 0.15;
        airlinePortraitData[0][1] += 0.10;
        airlinePortraitData[0][3] -= 0.5;
        airlinePortraitData[0][4] = 0.95;
    }
    else if($("#selectDateType").val() === '春节'){
        airlinePortraitData[0][0] -= 0.20;
        airlinePortraitData[0][1] += 0.3;
        airlinePortraitData[0][3] -= 0.10;
        airlinePortraitData[0][4] = 0.99
    }
    else if($("#selectDateType").val() === '小长假'){
        airlinePortraitData[0][0] -= 0.10;
        airlinePortraitData[0][1] += 0.10;
        airlinePortraitData[0][3] -= 0.1;
        airlinePortraitData[0][4] += 0.10;
    }
    
    if($("#selectTimeType").val() === '早班'){
        airlinePortraitData[0][3] -= 0.1;
        airlinePortraitData[0][4] -= 0.1;
    }
    else if($("#selectTimeType").val() === '午班'){
        airlinePortraitData[0][3] += 0.10;
        airlinePortraitData[0][4] += 0.10;
    }
    else if($("#selectTimeType").val() === '晚班'){
        airlinePortraitData[0][3] -= 0.10;
        airlinePortraitData[0][4] -= 0.10;
    }
    let airlinePortrait = {
        'data': airlinePortraitData
    }
    //设置航线画像
    return setAirlinePortraitChart(airlinePortrait);
}

/**
 * 为overview生成一组仿真数据
 * 并使用这组仿真数据来设置overview视图
 */
function fakeDataOverviewChart(startPoint, endPoint){
    let date = ["2019/11/1", "2019/11/2", "2019/11/3", "2019/11/4", "2019/11/5",
    "2019/11/6", "2019/11/7", "2019/11/8", "2019/11/8", "2019/11/10"];
    let attenData = [
        [0.89, 0.95, 0.95, 0.79, 0.86, 0.89, 0.79, 0.91, 0.89, 0.88],
        [0.79, 0.65, 0.87, 0.81, 0.91, 0.83, 0.78, 0.90, 0.79, 0.69],
        [0.89, 0.79, 0.91, 0.89, 0.88, 0.79, 0.65, 0.87, 0.81, 0.91],
        [0.83, 0.78, 0.90, 0.79, 0.69, 0.89, 0.95, 0.95, 0.79, 0.86],
        [0.79, 0.65, 0.87, 0.81, 0.91, 0.87, 0.81, 0.91, 0.83, 0.78],
        [0.79, 0.86, 0.89, 0.79, 0.91, 0.91, 0.89, 0.88, 0.79, 0.65]
    ];
    let aveAttenData = [
        [0.79, 0.85, 0.75, 0.99, 0.76, 0.84, 0.85, 0.90, 0.96, 0.77],
        [0.75, 0.75, 0.83, 0.80, 0.99, 0.81, 0.70, 0.79, 0.87, 0.66],
        [0.84, 0.85, 0.90, 0.96, 0.77, 0.75, 0.75, 0.83, 0.80, 0.99],
        [0.81, 0.70, 0.79, 0.87, 0.66, 0.79, 0.85, 0.75, 0.99, 0.76],
        [0.90, 0.96, 0.77, 0.75, 0.75, 0.75, 0.99, 0.76, 0.84, 0.85],
        [0.85, 0.90, 0.96, 0.77, 0.75, 0.76, 0.84, 0.85, 0.90, 0.96]
    ];
    let revenData = [
        [1.37, 1.35, 1.54, 1.32, 1.45, 1.29, 1.42, 1.32, 1.12, 1.52],
        [1.24, 1.21, 1.22, 1.42, 1.48, 1.23, 1.29, 1.32, 1.67, 1.39],
        [1.29, 1.42, 1.32, 1.12, 1.52, 1.24, 1.21, 1.22, 1.42, 1.48],
        [1.29, 1.42, 1.32, 1.12, 1.52, 1.22, 1.42, 1.48, 1.23, 1.29],
        [1.22, 1.42, 1.48, 1.23, 1.29, 1.54, 1.32, 1.45, 1.29, 1.42],
        [1.24, 1.21, 1.22, 1.42, 1.48, 1.37, 1.35, 1.54, 1.32, 1.45]
    ];
    let aveRevenData = [
        [1.32, 1.05, 1.50, 1.42, 1.42, 1.19, 1.32, 1.31, 1.32, 1.53],
        [1.28, 1.11, 1.32, 1.40, 1.58, 1.13, 1.21, 1.30, 1.87, 1.31],
        [1.19, 1.32, 1.31, 1.32, 1.53, 1.28, 1.11, 1.32, 1.40, 1.58],
        [1.13, 1.21, 1.30, 1.87, 1.31, 1.32, 1.31, 1.32, 1.53, 1.28],
        [1.28, 1.11, 1.32, 1.40, 1.58, 1.05, 1.50, 1.42, 1.42, 1.19],
        [1.87, 1.31, 1.32, 1.31, 1.32, 1.11, 1.32, 1.40, 1.58, 1.13]
    ];
    //航线市场客流量
    let airlineRidershipData = [
        [2724, 2622, 2691, 2547, 2622, 2547, 2622, 2628, 2292, 2367],
        [2847, 2908, 2789, 2759, 2876, 2879, 2638, 2848, 2875, 2867],
        [2476, 2567, 2378, 2463, 2458, 2645, 2348, 2573, 2780, 2347],
        [2698, 2738, 2569, 2590, 2638, 2598, 2450, 2548, 2649, 2359],
        [1783, 1748, 1907, 1749, 1687, 1907, 1780, 1950, 1689, 1863],
        [1907, 1780, 1950, 1689, 1863, 1783, 1748, 1907, 1749, 1687]
    ];
    //航司运载量
    let companyCarryAbilityData = [
        [789, 873, 798, 908, 874, 897, 849, 874, 876, 764],
        [897, 849, 874, 876, 764, 789, 873, 798, 908, 874],
        [487, 457, 509, 476, 487, 501, 476, 498, 529, 468],
        [501, 476, 498, 529, 468, 487, 457, 509, 476, 487],
        [509, 476, 487, 501, 476, 529, 468, 487, 457, 509],
        [529, 468, 487, 457, 509, 509, 476, 487, 501, 476]
    ];
    //市场平均运载量
    let aveCompanyCarryAbilityData = [
        [908, 874, 897, 849, 874, 849, 874, 876, 764, 789],
        [849, 874, 876, 764, 789, 908, 874, 897, 849, 874],
        [784, 689, 904, 893, 789, 879, 687, 894, 783, 690],
        [879, 687, 894, 783, 690, 784, 689, 904, 893, 789],
        [328, 340, 409, 378, 419, 327, 387, 403, 378, 367],
        [327, 387, 403, 378, 367, 328, 340, 409, 378, 419]
    ];
    //管理员工作量数据
    let managerWorkloadData = [
        [137, 109, 89, 90, 102, 94, 87, 79, 90, 113],
        [102, 94, 87, 79, 90, 113, 137, 109, 89, 90],
        [90, 102, 94, 87, 79, 94, 87, 79, 90, 113],
        [94, 87, 79, 90, 113, 90, 102, 94, 87, 79],
        [78, 83, 69, 66, 72, 90, 86, 63, 82, 71],
        [90, 86, 63, 82, 71, 78, 83, 69, 66, 72]
    ];
    let aveWorkloadData = [
        [98, 78, 93, 67, 83, 76, 87, 74, 69, 84],
        [76, 87, 74, 69, 84, 98, 78, 93, 67, 83],
        [67, 83, 76, 87, 74, 69, 66, 72, 90, 86],
        [69, 84, 98, 78, 93, 86, 63, 82, 71, 78],
        [86, 63, 82, 71, 78, 87, 74, 69, 66, 72],
        [87, 74, 69, 84, 98, 74, 69, 66, 72, 90]
    ];
    let flyCountData = [
        [7, 6, 8, 5, 9, 7, 5, 4, 9, 7],
        [8, 9, 5, 8, 6, 9, 7, 5, 9, 4],
        [8, 5, 6, 3, 6, 9, 5, 8, 6, 8],
        [7, 5, 4, 9, 7, 7, 6, 8, 5, 9],
        [9, 7, 5, 9, 4, 8, 9, 5, 8, 6],
        [9, 5, 8, 6, 8, 8, 5, 6, 3, 6]
    ];
    let aveFlyCountData = [
        [5, 9, 7, 5, 4, 9, 5, 8, 6, 9],
        [7, 7, 6, 8, 5, 5, 6, 3, 6, 9],
        [6, 8, 8, 5, 6, 8, 5, 9, 7, 7],
        [8, 6, 8, 8, 5, 9, 7, 7, 6, 8],
        [9, 4, 8, 9, 5, 9, 5, 8, 6, 9],
        [8, 5, 9, 7, 7, 8, 8, 5, 9, 7]
    ];
    let teamScatterRateData = [
        [0.38, 0.27, 0.25, 0.41, 0.27, 0.31, 0.25, 0.37, 0.41, 0.27],
        [0.41, 0.37, 0.45, 0.32, 0.41, 0.32, 0.42, 0.18, 0.33, 0.45],
        [0.31, 0.25, 0.37, 0.41, 0.27, 0.41, 0.37, 0.45, 0.32, 0.41],
        [0.41, 0.37, 0.27, 0.41, 0.37, 0.45, 0.32, 0.41, 0.41, 0.27],
        [0.32, 0.42, 0.18, 0.33, 0.45, 0.38, 0.27, 0.25, 0.41, 0.27],
        [0.31, 0.25, 0.37, 0.41, 0.27, 0.41, 0.37, 0.45, 0.32, 0.41]
    ];
    let index = indexOfAirline(startPoint, endPoint); //确定航线
    // 构造仿真数据
    let overviewData = {
        'date': date,
        'managerWorkload': {
            'name': '日工作量',
            'data': managerWorkloadData[index]
        },
        'aveWorkload': {
            'name': '市场平均日工作量',
            'data': aveWorkloadData[index]
        },
        'flyCount': {
            'name': '操作航班数',
            'data': flyCountData[index]
        },
        'aveFlyCount': {
            'name': '市场平均操作航班数',
            'data': aveFlyCountData[index]
        },
        'atten': {
            'name': '日均上座率',
            'data':attenData[index]
        },
        'aveAtten':{
            'name': '市场平均上座',
            'data': aveAttenData[index]
        },
        'reven': {
            'name': '客公里收入',
            'data': revenData[index]
        },
        'aveReven':{
            'name': '市场平均客公里收入',
            'data': aveRevenData[index]
        },
        'companyCarryAbility': {
            'name': '日运输量',
            'data': companyCarryAbilityData[index]
        },
        'aveCompanyCarryAbility': {
            'name': '平均运输量',
            'data': aveCompanyCarryAbilityData[index]
        },
        'airlineRidership': {
            'name': '航线运输量',
            'data': airlineRidershipData[index]
        },
        'teamScatterRate': {
            'name': '团散客比率',
            'data': teamScatterRateData[index]
        }
    }
    return setOverviewChart(startPoint, endPoint, overviewData);
}

/**
 * 生成一组航线地图的仿真数据
 * 并使用这组仿真数据来设置航线地图和航线的筛选框
 */
function fakeDataChinaAirlineMap(){
    let ChinaAirlineMapData = {
        'geoCoordMap': {
            "成都":[104.06,30.67],
            "广州":[113.5107,23.2196],
            "上海":[121.283653,31.144328],
            "中国":[116.4,39.9],
            "乌鲁木齐":[87.33037,43.534519],
            "北京":[116.232849,39.54257],
            "贵阳":[106.709177,26.629907]
        },
        'lines': [
            {'from': '广州', 'to': '上海', 'value': -1},
            {'from': '广州', 'to': '北京', 'value': 0},
            {'from': '广州', 'to': '成都', 'value': 0},
            {'from': '广州', 'to': '贵阳', 'value': 0},
            {'from': '广州', 'to': '乌鲁木齐', 'value': 0},
            {'from': '乌鲁木齐', 'to': '广州', 'value': 0}
        ],
        'nodes': [
            {'name': '广州', 'value': 0},
            {'name': '上海', 'value': 0},
            {'name': '北京', 'value': -1},
            {'name': '成都', 'value': 0},
            {'name': '贵阳', 'value': 0},
            {'name': '乌鲁木齐', 'value': 0}
        ]
    };
    return initChinaAirlineMapAndSelection(ChinaAirlineMapData);
}
/*****************************\
         END  仿真数据
\*****************************/



/*****************************\
         START  真实数据
\*****************************/
/**
 * 异步获取管理员基本信息的真实数据，并使用该真实数据初始化管理员的基本信息
 */
function getRealDataManagerBaseInfo(){
    $.ajax({
        url: "/data/manager/managerBaseInfo",
        data: {
            'MID': getQueryString("Mid")
        },
        type: "GET",
        dataType: "json",
        success: function f (data){
            initManagerBaseInfo(data);
        }
    });
}

/**
 * 异步获取管理员画像的真实数据，并使用该数据初始化管理员画像
 */
function getRealDataManagerPortraitChart(){
    $.ajax({
        url: "/data/manager/managerPortrait",
        data: {
            'MID': getQueryString("Mid")
        },
        type: "GET",
        dataType: "json",
        success: function f (data){
            initManagerPortraitChart(data);
        }
    });
}

/**
 * 异步获取航线基本信息的真实数据，并使用该数据设置航线基本信息
 */
function getRealDataAirlineBaseInfo(startPoint, endPoint){
    $.ajax({
        url: "/data/manager/airlineBaseInfo",
        data: {
            'startPoint': startPoint,
            'endPoint': endPoint
        },
        type: "GET",
        dataType: "json",
        success: function f (data){
            setAirlineBaseInfo(data);
        }
    });
}

/**
 * 异步获取航线画像的真实数据，并使用该数据设置航线画像
 */
function getRealDataAirlinePortraitChart(startPoint, endPoint){
    $.ajax({
        url: "/data/manager/airlinePortrait",
        data: {
            'startPoint': startPoint,
            'endPoint': endPoint,
            'dateType': $("#selectDateType").val(),
            'timeType': $("#selectTimeType").val()
        },
        type: "GET",
        dataType: "json",
        success: function f (data){
            setAirlinePortraitChart(data);
        }
    });
}

/**
 * 异步获取overview视图的真实数据，并使用该数据设置overview视图
 */
function getRealDataOverviewChart(startPoint, endPoint){
    $.ajax({
        url: "/data/manager/overview",
        data: {
            'startPoint': startPoint,
            'endPoint': endPoint,
            'MID': getQueryString("Mid")
        },
        type: "GET",
        dataType: "json",
        success: function f (data){
            setOverviewChart(startPoint, endPoint, data);
        }
    });
}

/**
 * 异步获取航线地图的真实数据，并使用该数据初始化航线地图和航线筛选框
 */
function getRealDataChinaAirlineMap(){
    let mapChart;
    $.ajax({
        url: "/data/manager/overview",
        data: {
            'MID': getQueryString("Mid")
        },
        type: "GET",
        dataType: "json",
        success: function f (data){
            mapChart = initChinaAirlineMapAndSelection(data);
            // 为航线地图设置点击事件
            mapChart.on('click', function (params) {
                if (params.componentSubType === 'lines') {
                    // 根据点击的航线设置检索框内的内容
                    $("#selectStart").val(params.data.fromName).select2();
                    $("#selectEnd").val(params.data.toName).select2();
    
                    //根据点击到的航线设置航线画像和航线基本信息
                    getRealDataAirlinePortraitChart(params.data.fromName, params.data.toName);
                    getRealDataAirlineBaseInfo(params.data.fromName, params.data.toName);
    
                    //根据点击到的航线设置航线的overview
                    getRealDataOverviewChart(params.data.fromName, params.data.toName);
                }
            });
        }
    });
    return mapChart;
}
/*****************************\
         END  真实数据
\*****************************/
