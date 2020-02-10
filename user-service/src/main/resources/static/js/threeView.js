$(function(){
    $("#btn_submit5").focus();
    
    let chartNetwork = initChartNetwork();

    let chartRadarCmpFlight = initChartRadarCmpFlight();

    let chartRadarCmpManager = initChartRadarCmpManager();

    let chartRadarTgtFlight = initChartRadarTgtFlight();

    let chartRadarTgtManager = initChartRadarTgtManager();

    //绑定点击时事件
    bindClickEvents();


    var myChart = echarts.init(document.getElementById('this_flight_line'));// 基于准备好的dom，初始化echarts-折线图实例

    var myChartCmp = echarts.init(document.getElementById('flight_cmp'));// 基于准备好的dom，初始化echarts-折线图实例
    var myChart1 = echarts.init(document.getElementById('compare_flight_line'));//优秀管理员1
    // var myChartOri = echarts.init(document.getElementById('main_line'));//优秀管理员1

    //数据切割
    function splitData(rawData) {
        var categoryData = [];
        var Placing_rate = [];
        var return_rate = [];
        var arrow = [];
        var arrow1 = [];
        var arrow_rec = [];
        var is_control = [];//标识该时段是否存在操作0/1
        var arrow2 = [];//标识该时段是否存在操作0/1
        var rpk = [];
        for (var i = 0; i < rawData.length; i++) {
            categoryData.push(rawData[i][0]);
            Placing_rate.push(rawData[i][1]);
            return_rate.push(rawData[i][2]);
            arrow.push(rawData[i][3]);
            arrow1.push(rawData[i][4]);
            arrow_rec.push(rawData[i][5]);
            is_control.push(rawData[i][6]);
            arrow2.push(rawData[i][7]);
            rpk.push(rawData[i][8])
        }
        return {
            categoryData: categoryData,
            //    values: values,
            Placing_rate:Placing_rate,
            return_rate:return_rate,
            arrow:arrow,  //均价图标
            arrow1:arrow1, //收放舱
            arrow_rec:arrow_rec,
            is_control:is_control,
            arrow2:arrow2,
            rpk:rpk
        };
    }
     //数据切割
     function splitDataexcellent(rawData) {
        var categoryData = [];
        var Placing_rate = [];
        var return_rate = [];
        var arrow = [];
        var arrow1 = [];
        var is_control = [];//标识该时段是否存在操作0/1
        var rpk = [];
        for (var i = 0; i < rawData.length; i++) {
            categoryData.push(rawData[i][0]);
            Placing_rate.push(rawData[i][1]);
            return_rate.push(rawData[i][2]);
            arrow.push(rawData[i][3]);
            arrow1.push(rawData[i][4]);
            is_control.push(rawData[i][5]);
            rpk.push(rawData[i][6])
        }
        return {
            categoryData: categoryData,
            Placing_rate:Placing_rate,
            return_rate:return_rate,
            arrow:arrow,  //均价图标
            arrow1:arrow1, //收放舱
            is_control:is_control,
            rpk:rpk
        };
    }
    //组件一管理员数据处理
    var data0Raw = [
        ['2019/1/24(-90d)', 3.96, 0.78, 1449, 99, 42, 0, 0, 0],
        ['2019/1/25(-89d)', 4.22, 2.94, 2121, 2, 40, 1, 0, 0.011],
        ['2019/1/26(-88d)', 4.55, 2.74, 1919, 43, 40, 0, 0, 0.023],
        ['2019/1/27(-87d)', 6.0, 0.77, 1441, 96, 40, 1, 0, 0.035],
        ['2019/1/28(-86d)', 6.56, 1.67, 2442, 30, 40, 0, 0, 0.048],
        ['2019/1/29(-85d)', 7.85, 2.22, 1228, 54, 40, 0, 0, 0.061],
        ['2019/1/30(-84d)', 7.93, 0.85, 1999, 93, 40, 0, 0, 0.074],
        ['2019/1/31(-83d)', 8.05, 0.85, 1999, 93, 23, 0, 0, 0.088],
        ['2019/2/1(-82d)', 8.25, 1.33, 1737, 33, 40, 0, 0, 0.102],
        ['2019/2/2(-81d)', 8.58, 0.85, 1999, 93, 40, 0, 0, 0.116],
        ['2019/2/3(-80d)', 9.04, 2.09, 2828, 6, 12, 0, 0, 0.131],
        ['2019/2/4(-79d)', 9.12, 2.6, 1551, 4, 49, 0, 0, 0.146],
        ['2019/2/5(-78d)', 10.5, 2.42, 1774, 44, 50, 1, 0, 0.162],
        ['2019/2/6(-77d)', 13.2, 2.18, 1331, 12, 34, 0, 0, 0.178],
        ['2019/2/7(-76d)', 13.48, 0.61, 2055, 28, 56, 0, 0, 0.194],
        ['2019/2/8(-75d)', 14.24, 0.52, 1550, 13, 40, 0, 0, 0.211],
        ['2019/2/9(-74d)', 14.75, 2.69, 1776, 94, 90, 0, 0, 0.228],
        ['2019/2/10(-73d)', 17.61, 1.44, 1554, 63, 58, 0, 0, 0.245],
        ['2019/2/11(-72d)', 18.27, 1.48, 2222, 41, 13, 0, 0, 0.263],
        ['2019/2/12(-71d)', 18.39, 2.41, 1665, 54, 59, 0, 1, 0.281],
        ['2019/2/13(-70d)', 19, 0.03, 10, 1666, 37, 0, 0, 0.3],
        ['2019/2/14(-69d)', 19.31, 0.51, 1551, 76, 20, 0, 0, 0.319],
        ['2019/2/15(-68d)', 19.74, 2.89, 1655, 39, 40, 0, 0, 0.338],
        ['2019/2/16(-67d)', 20.75, 1.75, 1111, 80, 30, 0, 0, 0.358],
        ['2019/2/17(-66d)', 21.0, 0.16, 1365, 37, 41, 0, 0, 0.378],
        ['2019/2/18(-65d)', 21.48, 1.06, 1336, 59, 86, 1, 0, 0.399],
        ['2019/2/19(-64d)', 22.66, 1.31, 1797, 6, 30, 0, 0, 0.419],
        ['2019/2/20(-63d)', 22.85, 0.83, 1515, 45, 49, 0, 0, 0.441],
        ['2019/2/21(-62d)', 23.0, 2.57, 1446, 52, 10, 0, 0, 0.462],
        ['2019/2/22(-61d)', 23.47, 0.07, 1636, 38, 40, 0, 0, 0.484],
        ['2019/2/23(-60d)', 24.33, 1.79, 1737, 15, 35, 0, 0, 0.507],
        ['2019/2/24(-59d)', 25.45, 2.48, 900, 62, 32, 0, 0, 0.529],
        ['2019/2/25(-58d)', 25.84, 2.74, 1900, 64, 77, 1, 0, 0.553],
        ['2019/2/26(-57d)', 26.29, 2.63, 1999, 57, 30, 0, 0, 0.576],
        ['2019/2/27(-56d)', 26.69, 1.23, 1010, 91, 1, 0, 0, 0.6],
        ['2019/2/28(-55d)', 27.33, 1.51, 2100, 3, 30, 0, -1, 0.61],
        ['2019/3/1(-54d)', 27.88, 0.1, 2123, 55, 30, 0, 0, 0.621],
        ['2019/3/2(-53d)', 28.33, 1.03, 1270, 57, 61, 1, 0, 0.634],
        ['2019/3/3(-52d)', 28.88, 1.19, 1394, 95, 38, 0, 0, 0.647],
        ['2019/3/4(-51d)', 29.4, 0.17, 1917, 34, 38, 0, 0, 0.662],
        ['2019/3/5(-50d)', 30.0, 2.54, 1995, 60, 23, 0, 0, 0.678],
        ['2019/3/6(-49d)', 30.99, 0.98, 2089, 23, 40, 1, 0, 0.695],
        ['2019/3/7(-48d)', 35.26, 2.45, 2176, 74, 33, 0, 0, 0.713],
        ['2019/3/8(-47d)', 40.5, 0.84, 2250, 44, 56, 0, 1, 0.732],
        ['2019/3/9(-46d)', 45.94, 1.64, 2137, 12, 89, 0, 0, 0.753],
        ['2019/3/10(-45d)', 47.65, 2.38, 2550, 88, 36, 1, 0, 0.774],
        ['2019/3/11(-44d)', 50.84, 1.73, 2328, 73, 39, 0, 0, 0.797],
        ['2019/3/12(-43d)', 52.03, 2.71, 2430, 59, 17, 0, 0, 0.821],
        ['2019/3/13(-42d)', 54.4, 1.07, 1313, 69, 54, 0, 0, 0.846],
        ['2019/3/14(-41d)', 58.72, 1.48, 1544, 55, 77, 1, 0, 0.873],
        ['2019/3/15(-40d)', 58.96, 1.8, 1554, 32, 53, 0, 0, 0.9],
        ['2019/3/16(-39d)', 60.1, 0.63, 1442, 85, 79, 0, 0, 0.929],
        ['2019/3/17(-38d)', 60.64, 2.65, 1555, 71, 50, 0, -1, 0.959],
        ['2019/3/18(-37d)', 61.2, 1.47, 1626, 28, 41, 0, 0, 0.99],
        ['2019/3/19(-36d)', 62.61, 2.61, 1190, 71, 98, 1, 0, 1.022],
        ['2019/3/20(-35d)', 63.71, 1.63, 2110, 75, 45, 1, 0, 1.055],
        ['2019/3/21(-34d)', 64.83, 2.3, 1847, 4, 30, 0, 0, 1.09],
        ['2019/3/22(-33d)', 65.09, 1.43, 1938, 69, 49, 0, 0, 1.125],
        ['2019/3/23(-32d)', 66.7, 1.75, 1075, 74, 40, 0, 0, 1.162],
        ['2019/3/24(-31d)', 69.94, 0.64, 1700, 72, 99, 1, 0, 1.2],
        ['2019/3/25(-30d)', 70.75, 1.8, 3000, 88, 78, 0, 0, 1.269],
        ['2019/3/26(-29d)', 70.12, 2.84, 1100, 87, 51, 0, 0, 1.336],
        ['2019/3/27(-28d)', 72.35, 1.15, 1793, 55, 2, 0, 0, 1.401],
        ['2019/3/28(-27d)', 73.72, 0.53, 2154, 19, 90, 1, 0, 1.464],
        ['2019/3/29(-26d)', 74.53, 1.74, 1996, 3, 40, 0, -1, 1.525],
        ['2019/3/30(-25d)', 75.2, 1.63, 1982, 49, 40, 0, 0, 1.584],
        ['2019/3/31(-24d)', 76.33, 0.92, 1899, 81, 40, 0, 0, 1.641],
        ['2019/4/1(-23d)', 77.56, 0.13, 1783, 52, 17, 1, 0, 1.696],
        ['2019/4/2(-22d)', 78.85, 0.03, 1664, 30, 1, 0, 0, 1.749],
        ['2019/4/3(-21d)', 79.0, 1.3, 1780, 47, 33, 1, 0, 1.8],
        ['2019/4/4(-20d)', 79.24, 2.04, 1337, 54, 85, 0, 0, 1.849],
        ['2019/4/5(-19d)', 80.5, 1.42, 1898, 90, 33, 0, 0, 1.896],
        ['2019/4/6(-18d)', 80.73, 2.67, 1331, 23, 33, 0, 0, 1.941],
        ['2019/4/7(-17d)', 80.05, 0.56, 1796, 85, 81, 0, 0, 1.984],
        ['2019/4/8(-16d)', 80.86, 0.18, 1556, 53, 58, 0, 0, 2.025],
        ['2019/4/9(-15d)', 81.55, 2.03, 1440, 94, 58, 0, 0, 2.064],
        ['2019/4/10(-14d)', 81.04, 2.85, 1551, 5, 40, 0, 0, 2.101],
        ['2019/4/11(-13d)', 81.14, 0.48, 2015, 12, 86, 1, 0, 2.136],
        ['2019/4/12(-12d)', 81.7, 0.22, 1457, 92, 74, 0, 0, 2.169],
        ['2019/4/13(-11d)', 82.29, 2.28, 1884, 89, 46, 0, 0, 2.2],
        ['2019/4/14(-10d)', 82.84, 0.92, 2020, 40, 9, 0, 0, 2.229],
        ['2019/4/15(-9d)', 82.99, 0.39, 1933, 77, 47, 0, 0, 2.256],
        ['2019/4/16(-8d)', 83.07, 0.6, 2134, 67, 33, 0, 0, 2.281],
        ['2019/4/17(-7d)', 83.35, 0.33, 1956, 84, 35, 0, 0, 2.304],
        ['2019/4/18(-6d)', 83.68, 0.12, 1771, 42, 17, 0, 0, 2.325],
        ['2019/4/19(-5d)', 83.97, 0.42, 1814, 90, 67, 1, 0, 2.344],
        ['2019/4/20(-4d)', 84.25, 1.38, 1664, 12, 41, 1, 0, 2.361],
        ['2019/4/21(-3d)', 84.61, 1.8, 1885, 38, 59, 1, 0, 2.376],
        ['2019/4/22(-2d)', 85.0, 2.23, 1552, 88, 89, 1, 0, 2.389],
        ['2019/4/23(-1d)', 86.23, 2.85, 1880, 53, 90, 1, 0, 2.4]
    ]
    var data0 = splitData(data0Raw);

    var num=0;
    var data_Vertical=data0.categoryData[0];
    var data_Vertical_fixed=data0.categoryData[3];
    var data_Vertical_active=NaN;
    //优秀管理员1数据
    var data01Raw =[['2019/1/24(-90d)', 3.96, 0.78, 1449, 99, 0, 0], ['2019/1/25(-89d)', 4.41, 2.94, 1821, 2, 1, 0.011], ['2019/1/26(-88d)', 4.55, 2.74, 1919, 43, 0, 0.023], ['2019/1/27(-87d)', 6.45, 0.77, 2041, 96, 1, 0.035], ['2019/1/28(-86d)', 6.56, 1.67, 1442, 30, 0, 0.048], ['2019/1/29(-85d)', 7.85, 2.22, 1228, 54, 1, 0.061], ['2019/1/30(-84d)', 7.97, 0.44, 1740, 85, 0, 0.074], ['2019/1/31(-83d)', 7.97, 0.85, 1944, 93, 0, 0.088], ['2019/2/1(-82d)', 8.25, 1.33, 1737, 33, 0, 0.102], ['2019/2/2(-81d)', 8.58, 2.87, 1669, 0, 0, 0.116], ['2019/2/3(-80d)', 9.04, 2.09, 1828, 6, 0, 0.131], ['2019/2/4(-79d)', 9.12, 2.6, 1515, 4, 0, 0.146], ['2019/2/5(-78d)', 10.5, 2.42, 1474, 44, 0, 0.162], ['2019/2/6(-77d)', 13.3, 2.18, 2131, 12, 0, 0.178], ['2019/2/7(-76d)', 13.48, 0.61, 1955, 28, 0, 0.194], ['2019/2/8(-75d)', 14.24, 0.52, 1950, 13, 0, 0.211], ['2019/2/9(-74d)', 14.75, 2.69, 1776, 94, 0, 0.228], ['2019/2/10(-73d)', 17.61, 1.44, 1554, 63, 0, 0.245], ['2019/2/11(-72d)', 18.27, 1.48, 1332, 41, 0, 0.263], ['2019/2/12(-71d)', 18.39, 2.41, 1365, 54, 0, 0.281], ['2019/2/13(-70d)', 19, 0.03, 1088, 66, 0, 0.3], ['2019/2/14(-69d)', 19.31, 0.51, 1751, 76, 0, 0.319], ['2019/2/15(-68d)', 19.74, 2.89, 1865, 39, 0, 0.338], ['2019/2/16(-67d)', 19.8, 1.75, 1100, 80, 0, 0.358], ['2019/2/17(-66d)', 21.75, 0.16, 1965, 37, 0, 0.378], ['2019/2/18(-65d)', 22.48, 1.06, 1336, 59, 0, 0.399], ['2019/2/19(-64d)', 24.66, 1.31, 1297, 6, 0, 0.419], ['2019/2/20(-63d)', 24.85, 0.83, 1544, 45, 0, 0.441], ['2019/2/21(-62d)', 25.99, 2.57, 1966, 52, 0, 0.462], ['2019/2/22(-61d)', 26.47, 0.07, 2000, 38, 0, 0.484], ['2019/2/23(-60d)', 29.33, 1.79, 1437, 15, 0, 0.507], ['2019/2/24(-59d)', 29.45, 2.48, 1900, 62, 0, 0.529], ['2019/2/25(-58d)', 30.84, 2.74, 1666, 64, 0, 0.553], ['2019/2/26(-57d)', 31.69, 2.63, 1888, 57, 0, 0.576], ['2019/2/27(-56d)', 33.9, 1.23, 1056, 91, 0, 0.6], ['2019/2/28(-55d)', 34.33, 1.51, 2100, 3, 0, 0.634], ['2019/3/1(-54d)', 34.48, 0.1, 1238, 55, 0, 0.666], ['2019/3/2(-53d)', 35.12, 1.03, 1970, 57, 0, 0.698], ['2019/3/3(-52d)', 36.41, 1.19, 1994, 95, 0, 0.73], ['2019/3/4(-51d)', 36.6, 0.17, 1717, 34, 0, 0.76], ['2019/3/5(-50d)', 36.84, 2.54, 1595, 39, 0, 0.79], ['2019/3/6(-49d)', 37.45, 0.98, 1289, 10, 0, 0.818], ['2019/3/7(-48d)', 40.29, 2.45, 1776, 74, 0, 0.846], ['2019/3/8(-47d)', 41.5, 0.84, 1550, 54, 1, 0.874], ['2019/3/9(-46d)', 45.94, 1.64, 1737, 12, 0, 0.9], ['2019/3/10(-45d)', 46.65, 2.38, 1550, 88, 0, 0.926], ['2019/3/11(-44d)', 48.84, 1.73, 2828, 73, 0, 0.95], ['2019/3/12(-43d)', 50.03, 2.71, 1330, 59, 0, 0.974], ['2019/3/13(-42d)', 51.4, 1.07, 1300, 69, 0, 0.998], ['2019/3/14(-41d)', 51.72, 1.48, 2040, 55, 0, 1.02], ['2019/3/15(-40d)', 51.96, 1.8, 1854, 32, 0, 1.042], ['2019/3/16(-39d)', 52.1, 0.63, 1442, 85, 0, 1.062], ['2019/3/17(-38d)', 52.94, 2.65, 1005, 71, 0, 1.082], ['2019/3/18(-37d)', 52.3, 1.47, 2266, 28, 0, 1.102], ['2019/3/19(-36d)', 53.61, 2.61, 1267, 71, 0, 1.12], ['2019/3/20(-35d)', 54.71, 1.63, 1098, 75, 0, 1.138], ['2019/3/21(-34d)', 55.83, 2.3, 2147, 4, 1, 1.154], ['2019/3/22(-33d)', 56.59, 1.43, 1738, 69, 0, 1.17], ['2019/3/23(-32d)', 56.7, 1.75, 1595, 74, 1, 1.186], ['2019/3/24(-31d)', 56.94, 0.64, 1799, 72, 0, 1.2], ['2019/3/25(-30d)', 57.25, 1.8, 2130, 88, 0, 1.208], ['2019/3/26(-29d)', 58.8, 2.84, 1100, 87, 1, 1.22], ['2019/3/27(-28d)', 59.35, 1.15, 1993, 55, 0, 1.235], ['2019/3/28(-27d)', 59.72, 0.53, 1754, 19, 0, 1.253], ['2019/3/29(-26d)', 60.88, 1.74, 1996, 3, 0, 1.275], ['2019/3/30(-25d)', 61.2, 1.63, 1082, 49, 0, 1.3], ['2019/3/31(-24d)', 61.61, 0.92, 2099, 81, 0, 1.328], ['2019/4/1(-23d)', 61.87, 0.13, 1983, 52, 0, 1.36], ['2019/4/2(-22d)', 61.05, 0.03, 1664, 30, 0, 1.395], ['2019/4/3(-21d)', 62.29, 1.3, 1880, 47, 0, 1.433], ['2019/4/4(-20d)', 62.94, 2.04, 1037, 54, 0, 1.475], ['2019/4/5(-19d)', 62.65, 1.42, 1198, 90, 0, 1.52], ['2019/4/6(-18d)', 63.66, 2.67, 1931, 45, 0, 1.568], ['2019/4/7(-17d)', 67.77, 0.56, 1996, 85, 0, 1.62], ['2019/4/8(-16d)', 70.86, 0.18, 1956, 53, 0, 1.675], ['2019/4/9(-15d)', 73.22, 2.03, 1740, 94, 0, 1.733], ['2019/4/10(-14d)', 77.45, 2.85, 2151, 5, 0, 1.795], ['2019/4/11(-13d)', 79.67, 0.48, 1615, 12, 0, 1.86], ['2019/4/12(-12d)', 80.97, 0.22, 1557, 92, 0, 1.928], ['2019/4/13(-11d)', 82.29, 2.28, 1884, 89, 0, 2], ['2019/4/14(-10d)', 84.54, 0.92, 2000, 40, 0, 2.075], ['2019/4/15(-9d)', 84.66, 0.39, 2233, 77, 1, 2.153], ['2019/4/16(-8d)', 85.0, 0.6, 2034, 67, 0, 2.235], ['2019/4/17(-7d)', 86.35, 0.33, 1556, 84, 0, 2.32], ['2019/4/18(-6d)', 87.56, 0.12, 1771, 42, 0, 2.408], ['2019/4/19(-5d)', 89.78, 0.42, 1423, 90, 0, 2.5], ['2019/4/20(-4d)', 90.0, 1.38, 2164, 12, 0, 2.595], ['2019/4/21(-3d)', 92.23, 1.8, 2085, 38, 1, 2.693], ['2019/4/22(-2d)', 94.48, 2.23, 1552, 88, 1, 2.795], ['2019/4/23(-1d)', 96, 2.85, 1880, 53, 1, 2.9]]
    var data01 = splitDataexcellent(data01Raw);
    var markArr = [], temObj = null;       //均价变化
    var markArr1 = [], temObj1 = null;


    //收放舱图标显示
    var control = [], opt = null;
    data0.arrow1.forEach(function(v, i) {
        if (data0.is_control[i]==1 && v<50) {
            opt = {
                symbol:'path://M 0 0 L 300 0 L150 240 Z',
                value: '放',
                xAxis: data0.categoryData[i],
                yAxis: 10,
                itemStyle: {
                    color: 'red'
                }
            }
        } else if (data0.is_control[i]==1 && v>=50){
            opt = {
                value: '收',
                xAxis: data0.categoryData[i],
                yAxis: 10,
                itemStyle: {
                    color: 'blue'
                }
            }
        }
        else{
            opt = {
                xAxis: data0.categoryData[i],
                yAxis: 10,
                itemStyle: {
                    color: 'rgba(0,0,0,0)'
                }
            }
        }
        control.push(opt)
    });

    var control2 = [], opt2 = null;
    data0.arrow2.forEach(function(v, i) {
        if (data0.arrow2[i]==-1) {
            opt2 = {
                symbol:'path://M 0 0 L 300 0 L150 240 Z',
                value: '放',
                xAxis: data0.categoryData[i],
                yAxis: 10,
                itemStyle: {
                    color: 'gray',
                    itemSize:100
                }
            }
        } else if (data0.arrow2[i]==1){
            opt2 = {
                value: '收',
                xAxis: data0.categoryData[i],
                yAxis: 10,
                itemStyle: {
                    color: 'gray'
                }
            }
        }
        else{
            opt2 = {
                xAxis: data0.categoryData[i],
                yAxis: 10,
                itemStyle: {
                    color: 'rgba(0,0,0,0)'
                }
            }
        }
        control2.push(opt2)
    });

    var control1 = [], opt1 = null;
    data01.arrow1.forEach(function(v, i) {
        if (v <50 && data01.is_control[i]==1) {
            opt1 = {
                symbol:'path://M 0 0 L 300 0 L150 240 Z',
                value: '放',
                xAxis: data01.categoryData[i],
                yAxis: 10,
                itemStyle: {
                    color: 'red',
                    itemSize:100
                }
            }
        } else if (v>=50 && data01.is_control[i]==1){
            opt1 = {
                value: '收',
                xAxis: data01.categoryData[i],
                yAxis: 10,
                itemStyle: {
                    color: 'blue'
                }
            }
        }
        else{
            opt1 = {
                xAxis: data01.categoryData[i],
                yAxis: 10,
                itemStyle: {
                    color: 'rgba(0,0,0,0)'
                }
            }
        }
        control1.push(opt1)
    });




    var flag=0;
    var control_update = [], opt_update = null;

    //推荐操作开关标志，默认为关
    var onAndOff = 0;


    optionCmpColor = ['#8b008b','#FFFF00','#5000b8','#00CC00','#4b0080','#FFa07a',],

    //组件一管理员操作动态复盘设计
    option = {
        title: {
            text: '目标管理员动态复盘',
            left:'center'
        },

        // color:  [optionCmpColor[2],optionCmpColor[4], '',optionCmpColor[0]],
        //标注
        legend: {
            data: ['上座率','收益率','座公里收入'],
            right:'15%',
            top:'10%',
            textStyle:{
                fontSize: 16,
            },
        },


        grid: {
            left: '5%',
            right: '7%',
            bottom: '15%'
        },
        xAxis: {
            type: 'category',
            data: data0.categoryData,
            scale: true,
            boundaryGap : false,
            axisLine: {onZero: false},
            splitLine: {show: false},
            splitNumber: 20,
            min: 'dataMin',
            max: 'dataMax'
        },
        yAxis : [{
            type: 'value',
            min: 0,
            max: 100,
            interval:20,
            axisLabel: {
                formatter: '{value} %'
            }
        },
            {
                type: 'value',
                // min: 0,
                // max: 3,
                // interval: 0.6
            }],
        //添加图片控制按钮
        toolbox: {
            show:true,
            itemSize:"30",
            orient:"vertical",
            right:"0px",
            feature:{
                left:"100px",
                myTool1: {
                    show: true,
                    title: '暂停与开始',
                    icon: 'image://svg/star.jpg',
                   
                    onclick:  function stop(){
                        if(flag==1){
                            clearInterval(dt);
                            flag=0;
                            let pict_dir = 'image://svg/star.jpg'
                            myChart.setOption({
                                toolbox:{
                                    feature:{
                                        myTool1:{
                                            icon: pict_dir
                                        }
                                    }
                                }
                            });
                            myChart1.setOption({
                                toolbox:{
                                    feature:{
                                        myTool1:{
                                            icon: pict_dir
                                        }
                                    }
                                }
                            });
                        }
                        else if(flag == 0){
                            dt =  setInterval(function(){
                                refresh();
                            }, 1000);
                            flag=1;
                            let pict_dir = 'image://svg/stop.jpg';
                            myChart.setOption({
                                toolbox:{
                                    feature:{
                                        myTool1:{
                                            icon: pict_dir
                                        }
                                    }
                                }
                            });
                            myChart1.setOption({
                                toolbox:{
                                    feature:{
                                        myTool1:{
                                            icon: pict_dir
                                        }
                                    }
                                }
                            });
                        }
                    }
                },

                myTool4:{
                    show: true,
                    title: '推荐操作开关',
                    icon: 'image://svg/off.png',
                    onclick: function(params){
                        let picture_dir;
                        if(onAndOff === 1){
                            picture_dir = 'image://svg/off.png';
                            onAndOff = 0;
                        }
                        else{
                            picture_dir = 'image://svg/on.png';
                            onAndOff = 1;
                        }

                        control_update = [];
                        data0.arrow_rec.forEach(function(v, i) {
                            if(onAndOff==1){
                                if(v<30){
                                    opt_update = {
                                        symbol:'path://M 0 0 L 300 0 L150 240 Z',
                                        value: '放',
                                        xAxis: data0.categoryData[i],
                                        yAxis: 30,
                                        itemStyle: {
                                            borderColor:'red',
                                            borderType:'dotted'
                                        }
                                    }
                                }
                                else if(v>=60) {
                                    opt_update = {
                                        value: '收',
                                        xAxis: data0.categoryData[i],
                                        yAxis: 30,
                                        itemStyle: {
                                            borderColor:'blue',
                                            borderType:'dotted',
                                        }
                                    }
                                }
                                else{
                                    opt_update = {
                                        xAxis: data0.categoryData[i],
                                        yAxis: 30,
                                        itemStyle: {
                                            color: 'rgba(0,0,0,0)'
                                        }
                                    }
                                }
                            }
                            else{
                                opt_update = {
                                    xAxis: data0.categoryData[i],
                                    yAxis: 30,
                                    itemStyle: {
                                        color: 'rgba(0,0,0,0)'
                                    }
                                }
                            }
                            control_update.push(opt_update);
                        });
                        myChart.setOption({
                            toolbox:{
                                feature:{
                                    myTool4:{
                                        icon:picture_dir
                                    }
                                }
                            },
                            xAxis: {
                                data: data0.categoryData,
                            },
                            series: [
                                {
                                    data: data0.Placing_rate,
                                },
                                {
                                    data: data0.return_rate,
                                },
                                {
                                    data: data0.arrow,
                                },
                                {
                                    data: data0.arrow1,
                                },
                                {
                                    markPoint: {
                                        symbol: 'triangle',
                                        symbolSize:30,
                                        label:{
                                            fontSize:10,
                                            textStyle:{
                                                color:'black'
                                            }
                                        },
                                        itemStyle: {
                                            color: 'rgba(0, 0, 0, 0)',
                                        },
                                        data: control_update
                                    }
                                },
                            ]
                        });
                    }
                }


            },


        },
        //坐标轴滑动
        dataZoom: [
            {
                type: 'inside',
                start: 0,
                end: 10,
            },
            {
                show: true,
                type: 'slider',
                y: '90%',
                start: 10,
                end: 30,
                dataBackground:{
                    lineStyle:{
                        color:'#95BC2F'
                    },
                    areaStyle:{
                        color:'#95BC2F',
                        opacity:1,
                    }
                }
            },
        ],
        //数据线
        series: [
            {
                name: '上座率',
                type: 'line',
                data: data0.Placing_rate,
                smooth: false,
                // lineStyle: {
                //     normal: {
                //         color: optionCmpColor[2],
                //         // opacity: 0.5
                //     }
                // },
                markLine: {
                    lineStyle: {
                        normal: {
                            color: '#ff1c23',
                            lineStyle:{
                                type: 'solid',
                                width:5
                            },
                        },
                    },
                    data: [
                        {xAxis:data_Vertical_fixed},
                        {xAxis:data_Vertical_active},
                    ],
                },
            },
            {
                name: '收益率',
                type: 'line',
                data: data0.return_rate,
                yAxisIndex: 1,
                smooth: false,
                // lineStyle: {
                //     color: optionCmpColor[4],
                //     // normal: {opacity: 0.5}
                // }
            },
            {
                name: '均价',
                type: 'line',
                data: data0.arrow,
                showSymbol: false, // 不显示symbol
                lineStyle: {
                    width: 0, // 线宽是0
                    color: 'rgba(0, 0, 0, 0)',
                },
                markPoint: {
                    symbol: 'triangle',
                    symbolSize:30,
                    label:{
                        fontSize:10
                    },
                    itemStyle: {
                        color: '#00CD68'
                    },
                    data: markArr
                },

            },
            {
                name: '操作',
                type: 'line',
                symbol:'none',
                data: data0.arrow1,
                smooth: false,
                lineStyle: {
                    width: 0, // 线宽是0
                    color: 'rgba(0, 0, 0, 0)', // 线的颜色是透明
                },
                markPoint: {
                    symbol: 'triangle',
                    symbolSize:30,
                    label:{
                        fontSize:10
                    },
                    itemStyle: {
                        color: 'rgba(0, 0, 0, 0)'
                    },
                    data: control
                },
            },
            {
                name:'推荐操作',
                type: 'line',
                symbol:'none',
                data: data0.arrow_rec,
                smooth: false,
                lineStyle: {
                    width: 0, // 线宽是0
                    color: 'rgba(0, 0, 0, 0)', // 线的颜色是透明
                },
                itemStyle:{
                    color: 'rgba(0, 0, 0, 0)',
                    normal:{
                        label:{
                            show:true
                        }
                    }
                }
            },
            {
                name: '是否操作',
                type: 'line',
                data: data0.is_control,
                yAxisIndex: 1,
                smooth: false,
                lineStyle: {
                    width: 1, // 线宽是0
                    color: 'rgba(0, 0, 0, 0)', // 线的颜色是透明
                    // color: '#00CD68'
                },
            },
            {
                name: '座公里收入',
                type: 'line',
                data: data0.rpk,
                yAxisIndex: 1,
                smooth: false,
                // lineStyle: {
                //     color: optionCmpColor[0],
                //     // normal: {opacity: 0.5}
                // }
            },
            {
                name: '操作',
                type: 'line',
                symbol:'none',
                data: data0.arrow2,
                smooth: false,
                lineStyle: {
                    width: 0, // 线宽是0
                    color: 'rgba(0, 0, 0, 0)', // 线的颜色是透明
                },
                markPoint: {
                    symbol: 'triangle',
                    symbolSize:30,
                    label:{
                        fontSize:10
                    },
                    // itemStyle: {
                    //     color: 'rgba(0.5, 0.5, 0, 0)'
                    // },
                    data: control2
                },
            },
        ],
        //显示提示框
        tooltip: {
            trigger: 'axis',
            formatter: function(data_is) {
                var res = data_is[0].name + '<br/>', val;
                var infor="无";
                res += data_is[0].seriesName + '：' + data_is[0].value + '<br/>';
                res += data_is[1].seriesName + '：' + data_is[1].value + '<br/>';
                res += data_is[2].seriesName + '：' + data_is[2].value + '<br/>';
                var v=data_is[3].value;
                res += data_is[6].seriesName + '：' + data_is[6].value + '<br/>';
                var v_flag=Math.floor(v/10);
                var v_num=v%10;
                if(data_is[5].value==1){
                    switch (v_flag) {
                        case 0:
                            infor="对逻辑舱Y，放"+v_num+"个舱位"
                            break;
                        case 1:
                            infor="对逻辑舱B，放"+v_num+"个舱位"
                            break;
                        case 2:
                            infor="对逻辑舱H，放"+v_num+"个舱位"
                            break;
                        case 3:
                            infor="对逻辑舱K，放"+v_num+"个舱位"
                            break;
                        case 4:
                            infor="对逻辑舱M，放"+v_num+"个舱位"
                            break;  
                        case 5:
                            infor="对逻辑舱Y，收"+v_num+"个舱位"
                            break;   
                        case 6:
                            infor="对逻辑舱B，收"+v_num+"个舱位"
                            break;
                        case 7:
                            infor="对逻辑舱H，收"+v_num+"个舱位"
                            break;
                        case 8:
                            infor="对逻辑舱K，收"+v_num+"个舱位"
                            break;
                        case 9:
                            infor="对逻辑舱M，收"+v_num+"个舱位"
                            break;   
                        default:
                            infor="无"
                            break;
                    }
                }else{
                    infor="无";
                }
                console.log("操作："+infor);
                res += data_is[3].seriesName + '：' + infor + '<br/>';
                return res;
            },
            axisPointer: {
                type: 'cross'
            }
        },
    };
    myChart.setOption(option);// 使用刚指定的配置项和数据显示图表。


    optionCmp = {
        title: {
            text: '目标管理员与优秀管理员动态复盘对比',
            left:'center'
        },
        color:  ['#8b008b','#FFFF00','#5000b8','#00CC00','#4b0080','#FFa07a',],
        //标注
        legend: {
                    // data:[  {name:'南宁-曼芭',icon:'rect'},
        //         {name:'桂林-曼芭',},
        //         {name:'南宁-甲米',}],//分别修改legend格式
            selected:{
                '目标管理员收益率':false,
                '优秀管理员收益率':false,
            },
            data: ['目标管理员座公里收入','优秀管理员座公里收入','目标管理员上座率','优秀管理员上座率','目标管理员收益率','优秀管理员收益率','目标管理员操作','优秀管理员操作',],
            // right:'15%',
            top:'10%',
            textStyle:{
                fontSize: 16,
            },
        },


        grid: {
            left: '5%',
            right: '5%',
            bottom: '15%'
        },
        xAxis: {
            type: 'category',
            data: data0.categoryData,
            scale: true,
            boundaryGap : false,
            axisLine: {onZero: false},
            splitLine: {show: false},
            splitNumber: 20,
            min: 'dataMin',
            max: 'dataMax'
        },
        yAxis : [{
            type: 'value',
            min: 0,
            max: 100,
            interval:20,
            axisLabel: {
                formatter: '{value} %'
            }
        },
            {
                type: 'value',
                min: 0,
                max: 3,
                interval: 0.6
            }
        ],


        //坐标轴滑动
        dataZoom: [
            {
                type: 'inside',
                start: 0,
                end: 100,
            },
            {
                show: true,
                type: 'slider',
                y: '90%',
                start: 10,
                end: 30,
                dataBackground:{
                    lineStyle:{
                        color:'#95BC2F'
                    },
                    areaStyle:{
                        color:'#95BC2F',
                        opacity:1,
                    }
                }
            },
        ],
        //数据线
        series: [
            {
                name: '目标管理员座公里收入',
                type: 'line',
                data: data0.rpk,
                yAxisIndex: 1,
                smooth: false,
                lineStyle: {
                    color: optionCmpColor[0],
                    // normal: {opacity: 0.5}
                }
            },
            {
                name: '优秀管理员座公里收入',
                type: 'line',
                data: data01.rpk,
                yAxisIndex: 1,
                smooth: false,
                lineStyle: {
                    color: optionCmpColor[1],
                    // normal: {opacity: 0.5}
                }
            },
            {
                name: '目标管理员上座率',
                type: 'line',
                data: data0.Placing_rate,
                smooth: false,
                lineStyle: {
                    normal: {
                        color: optionCmpColor[2],
                        // opacity: 0.5
                    }
                },
                // markLine: {
                //     lineStyle: {
                //         normal: {
                //             color: '#ff1c23',
                //             lineStyle:{
                //                 type: 'solid',
                //                 width:5
                //             },
                //         },
                //     },
                //     data: [
                //         {xAxis:data_Vertical_fixed},
                //         {xAxis:data_Vertical_active},
                //     ],
                // },
            },
            {
                name: '优秀管理员上座率',
                type: 'line',
                data: data01.Placing_rate,
                smooth: false,
                lineStyle: {
                    color: optionCmpColor[3],
                    // normal: {opacity: 0.5}
                }
            },
            {
                name: '目标管理员收益率',
                type: 'line',
                data: data0.return_rate,
                yAxisIndex: 1,
                smooth: false,
                lineStyle: {
                    color: optionCmpColor[4],
                    // normal: {opacity: 0.5}
                }
            },
            {
                name: '优秀管理员收益率',
                type: 'line',
                data: data01.return_rate,
                yAxisIndex: 1,
                smooth: false,
                lineStyle: {
                    color: optionCmpColor[5],
                    // normal: {opacity: 0.5}
                }
            },
            {
                name: '均价',
                type: 'line',
                data: data0.arrow,
                showSymbol: false, // 不显示symbol
                lineStyle: {
                    width: 0, // 线宽是0
                    color: 'rgba(0, 0, 0, 0)',
                },
                markPoint: {
                    symbol: 'triangle',
                    symbolSize:30,
                    label:{
                        fontSize:10
                    },
                    itemStyle: {
                        color: '#00CD68'
                    },
                    data: markArr
                },

            },
            // {
            //     name: '目标管理员操作',
            //     type: 'line',
            //     symbol:'none',
            //     data: data0.arrow1,
            //     smooth: false,
            //     lineStyle: {
            //         width: 0, // 线宽是0
            //         color: 'rgba(0, 0, 0, 0)', // 线的颜色是透明
            //     },
            //     markPoint: {
            //         symbol: 'triangle',
            //         symbolSize:30,
            //         label:{
            //             fontSize:10
            //         },
            //         itemStyle: {
            //             color: 'rgba(0, 0, 0, 0)'
            //         },
            //         data: control
            //     },
            // },
            // {
            //     name: '优秀管理员操作',
            //     type: 'line',
            //     symbol:'none',
            //     data: data01.arrow1,
            //     smooth: false,
            //     lineStyle: {
            //         width: 0, // 线宽是0
            //         color: 'rgba(0, 0, 0, 0)', // 线的颜色是透明
            //     },
            //     markPoint: {
            //         symbol: 'triangle',
            //         symbolSize:30,
            //         label:{
            //             fontSize:10
            //         },
            //         itemStyle: {
            //             color: 'rgba(0, 0, 0, 0)'
            //         },
            //         data: control
            //     },
            // },

        ],
        //显示提示框

        tooltip: {
            trigger: 'axis',
            formatter: function(data0) {
                var res = data0[0].name + '<br/>', val;
                for(var i = 0, length = data0.length; i < length; i++) {
                    val =data0[i].value;
                    if(data0[i].seriesName=='操作'){
                    //     if(data0[i].value>50){
                    //         res += data0[i].seriesName + '：' + '收舱' + '<br/>';
                    //     }else if(data0[i].value<=50){
                    //         res += data0[i].seriesName + '：' + '放舱' + '<br/>';
                    //     }
                    //     else{
                    //         res += data0[i].seriesName + '：' + '无' + '<br/>';
                    //     }
                        res+='';
                    }else if(data0[i].seriesName=='推荐操作'){
                        res+='';
                    }
                    else{
                        res += data0[i].seriesName + '：' + val + '<br/>';
                    }

                }
                return res;
            },
            axisPointer: {
                type: 'cross'
            }
        },
    };
    myChartCmp.setOption(optionCmp);// 使用刚指定的配置项和数据显示图表。
    
    myChartCmp.on('click', function (params) {
        if (params) {
            refresh(date=params.name);
        }
    });
    
    //优秀管理员操作动态复盘设计
    option1 = {
        title: {
            text: '优秀管理员动态复盘',
            left: 'center'
        },

        //标注
        legend: {
            // data: ['上座率','收益率','均价','操作'],
            data:['上座率','收益率','座公里收入'],
            right:'15%',
            top:'10%',
            textStyle:{
                fontSize: 16,
            },
        },

        grid: {
            left: '5%',
            right: '7%',
            bottom: '15%'
        },
        xAxis: {
            type: 'category',
            data: data01.categoryData,
            scale: true,
            boundaryGap : false,
            axisLine: {onZero: false},
            splitLine: {show: false},
            splitNumber: 20,
            min: 'dataMin',
            max: 'dataMax'
        },
        yAxis : [{
            type: 'value',
            min: 0,
            max: 100,
            interval:20,
            axisLabel: {
                formatter: '{value} %'
            }
        },
            {
                type: 'value',
                // min: 0,
                // max: 3,
                // interval: 0.6
            }],

        //添加图片控制按钮
        toolbox: {
            show:true,
            itemSize:"30",
            orient:"vertical",
            right:"0px",
            feature:{
                left:"100px",
                // myTool1: {
                //     show: true,
                //     title: '暂停',
                //     icon: 'image://svg/stop.jpg',
                //     onclick:  function stop(){
                //         if(flag==1){
                //             clearInterval(dt);
                //             flag=0;
                //         }
                //     }
                // },
                // myTool2: {
                //     show: true,
                //     title: '开始',
                //     icon: 'image://svg/star.jpg',
                //     onclick: function star(){
                //         if(flag==0){
                //             dt =  setInterval(function(){
                //                 refresh();
                //             }, 1000);
                //             flag=1;
                //         }
                //     }
                // }
                myTool1: {
                    show: true,
                    title: '暂停与开始',
                    icon: 'image://svg/star.jpg',
                    onclick:  function stop(){
                        if(flag==1){
                            clearInterval(dt);
                            flag=0;
                            let pict_dir = 'image://svg/star.jpg'
                            myChart.setOption({
                                toolbox:{
                                    feature:{
                                        myTool1:{
                                            icon: pict_dir
                                        }
                                    }
                                }
                            });
                            myChart1.setOption({
                                toolbox:{
                                    feature:{
                                        myTool1:{
                                            icon: pict_dir
                                        }
                                    }
                                }
                            });
                        }
                        else if(flag == 0){
                            dt =  setInterval(function(){
                                refresh();
                            }, 1000);
                            flag=1;
                            let pict_dir = 'image://svg/stop.jpg';
                            myChart.setOption({
                                toolbox:{
                                    feature:{
                                        myTool1:{
                                            icon: pict_dir
                                        }
                                    }
                                }
                            });
                            myChart1.setOption({
                                toolbox:{
                                    feature:{
                                        myTool1:{
                                            icon: pict_dir
                                        }
                                    }
                                }
                            });
                        }
                    }
                }
            },


        },
        //坐标轴滑动
        dataZoom: [
            {
                type: 'inside',
                start: 0,
                end: 10,
            },
            {
                show: true,
                type: 'slider',
                y: '90%',
                start: 10,
                end: 30,
                dataBackground:{
                    lineStyle:{
                        color:'#95BC2F'
                    },
                    areaStyle:{
                        color:'#95BC2F',
                        opacity:1,
                    }
                }
            },
        ],
        //数据线
        series: [
            {
                name: '上座率',
                type: 'line',
                data: data01.Placing_rate,
                smooth: false,
                // lineStyle: {
                //     normal: {opacity: 0.5}
                // },
                markLine: {
                    lineStyle: {
                        normal: {
                            color: '#ff1c23',
                            lineStyle:{
                                type: 'solid',
                                width:5
                            },
                        },
                    },
                    data: [
                        {xAxis:data_Vertical_fixed},
                        {xAxis:data_Vertical_active},
                    ],
                },
            },
            {
                name: '收益率',
                type: 'line',
                data: data01.return_rate,
                smooth: false,
                yAxisIndex: 1,
                // lineStyle: {
                //     normal: {opacity: 0.5}
                // }
            },
            {
                name: '均价',
                type: 'line',
                data: data01.arrow,
                smooth: false,
                showSymbol: false, // 不显示symbol
                lineStyle: {
                    width: 0, // 线宽是0
                    color: 'rgba(0, 0, 0, 0)',
                },
                markPoint: {
                    symbol: 'triangle',
                    symbolSize:30,
                    label:{
                        fontSize:10
                    },
                    itemStyle: {
                        color: '#00CD68'
                    },
                    data: markArr1
                },

            },
            {
                name: '操作',
                type: 'line',
                symbol:'none',
                data: data01.arrow1,
                smooth: false,
                lineStyle: {
                    width: 0, // 线宽是0
                    color: 'rgba(0, 0, 0, 0)', // 线的颜色是透明
                },
                markPoint: {
                    symbol: 'triangle',
                    symbolSize:30,
                    label:{
                        fontSize:10
                    },
                    itemStyle: {
                        color: '#00CD68'
                    },
                    data: control1
                },
            },
            {
                name: '是否操作',
                type: 'line',
                data: data01.is_control,
                yAxisIndex: 1,
                smooth: false,
                lineStyle: {
                    width: 1, // 线宽是0
                    color: 'rgba(0, 0, 0, 0)', // 线的颜色是透明
                },
            },
            {
                name: '座公里收入',
                type: 'line',
                data: data01.rpk,
                yAxisIndex: 1,
                smooth: false,
                // lineStyle: {
                //     normal: {opacity: 0.5}
                // }
            },
        ],
        //显示提示框
        tooltip: {
            trigger: 'axis',
            formatter: function(data_is) {
                console.log(data01);
                var res = data_is[0].name + '<br/>', val;
                var infor="无";
                console.log("当前日期"+data_is[0].name);
                res += data_is[0].seriesName + '：' + data_is[0].value + '<br/>';
                res += data_is[1].seriesName + '：' + data_is[1].value + '<br/>';
                res += data_is[2].seriesName + '：' + data_is[2].value + '<br/>';
                var v=data_is[3].value;
                res += data_is[5].seriesName + '：' + data_is[5].value + '<br/>';
                console.log("操作值"+v);
                console.log("操作值："+data_is[4].value);
                var v_flag=Math.floor(v/10);
                var v_num=v%10;
                if(data_is[4].value==1){
                    switch (v_flag) {
                        case 0:
                            infor="对逻辑舱Y，放"+v_num+"个舱位"
                            break;
                        case 1:
                            infor="对逻辑舱B，放"+v_num+"个舱位"
                            break;
                        case 2:
                            infor="对逻辑舱H，放"+v_num+"个舱位"
                            break;
                        case 3:
                            infor="对逻辑舱K，放"+v_num+"个舱位"
                            break;
                        case 4:
                            infor="对逻辑舱M，放"+v_num+"个舱位"
                            break;  
                        case 5:
                            infor="对逻辑舱Y，收"+v_num+"个舱位"
                            break;   
                        case 6:
                            infor="对逻辑舱B，收"+v_num+"个舱位"
                            break;
                        case 7:
                            infor="对逻辑舱H，收"+v_num+"个舱位"
                            break;
                        case 8:
                            infor="对逻辑舱K，收"+v_num+"个舱位"
                            break;
                        case 9:
                            infor="对逻辑舱M，收"+v_num+"个舱位"
                            break;   
                        default:
                            infor="无"
                            break;
                    }
                }else{
                    infor="无";
                }
                console.log("操作："+infor);
                res += data_is[3].seriesName + '：' + infor + '<br/>';
                return res;
            },
            axisPointer: {
                type: 'cross'
            }
        },
    };
    myChart1.setOption(option1);
    
    var myChart_His = echarts.init(document.getElementById('left_chart1'));//物理舱均价变化图
    var myChart_His1 = echarts.init(document.getElementById('left_chart2'));// 子舱剩余量
    var myChart_His2 = echarts.init(document.getElementById('left_chart3'));// 子舱售卖量
    var myChart_His3 = echarts.init(document.getElementById('left_chart4'));// 物理舱位剩余量


    //组件二物理舱均价数据处理
    var data1 = splitData_his([
        ['2019/1/24', 2320.26,1620.26,1287.3],
        ['2019/1/25', 2300,1591.3,1088.26],
        ['2019/1/28', 2195.35,1546.5,1295.35],
        ['2019/1/29', 2347.22,1858.98,1337.35],
        ['2019/1/30', 2360.75,1582.48,1347.89],
        ['2019/1/31', 2383.43,1585.42,1171.23],
        ['2019/2/1', 2377.41,1419.02,969.57],
        ['2019/2/4', 2425.92,1628.15,917.58],
        ['2019/2/5', 2411,1833.13,1203.3],
        ['2019/2/6', 2432.68,1634.48,1427.7],
        ['2019/2/7', 2230.69,1818.53,994.22],
        ['2019/2/8', 2416.62,1532.4,1114.4],
        ['2019/2/18', 2441.91,1421.56,1115.43],
        ['2019/2/19', 2420.26,1382.91,973.53],
        ['2019/2/20', 2416.62,1532.4,1114.4],
        ['2019/2/21',  2411,1833.13,1203.3],
        ['2019/2/22', 2441.91,1421.56,1115.43],
        ['2019/2/25', 2230.69,1818.53,994.22],
        ['2019/2/26', 2195.35,1546.5,1295.35],
        ['2019/2/27', 2416.62,1532.4,1114.4],
        ['2019/2/28',  2230.69,1818.53,994.22],
        ['2019/3/1',  2195.35,1546.5,1295.35],
        ['2019/3/4',  2195.35,1546.5,1295.35],
        ['2019/3/5',  2195.35,1546.5,1295.35],
        ['2019/3/6', 2195.35,1546.5,1295.35],
        ['2019/3/7',  2195.35,1546.5,1295.35],
        ['2019/3/8',  2230.69,1818.53,994.22],
        ['2019/3/11', 2230.69,1818.53,994.22],
        ['2019/3/12', 2195.35,1546.5,1295.35],
        ['2019/3/13', 2195.35,1546.5,1295.35],
        ['2019/3/14', 2195.35,1546.5,1295.35],
        ['2019/3/15', 2195.35,1546.5,1295.35],
        ['2019/3/18', 2195.35,1546.5,1295.35],
        ['2019/3/19', 2195.35,1546.5,1295.35],
        ['2019/3/20', 2195.35,1546.5,1295.35],
        ['2019/3/21', 2195.35,1546.5,1295.35],
        ['2019/3/22', 2195.35,1546.5,1295.35],
        ['2019/3/25', 2195.35,1546.5,1295.35],
        ['2019/3/26', 2195.35,1546.5,1295.35],
        ['2019/3/27', 2195.35,1546.5,1295.35],
        ['2019/3/28', 2195.35,1546.5,1295.35],
        ['2019/3/29', 2195.35,1546.5,1295.35],
        ['2019/4/1', 2195.35,1546.5,1295.35],
        ['2019/4/2', 2195.35,1546.5,1295.35],
        ['2019/4/3', 2195.35,1546.5,1295.35],
        ['2019/4/8', 2195.35,1546.5,1295.35],
        ['2019/4/9', 2195.35,1546.5,1295.35],
        ['2019/4/10', 2195.35,1546.5,1295.35],
        ['2019/1/24', 2320.26,1620.26,1287.3],
        ['2019/1/25', 2300,1591.3,1088.26],
        ['2019/1/28', 2195.35,1546.5,1295.35],
        ['2019/1/29', 2347.22,1858.98,1337.35],
        ['2019/1/30', 2360.75,1582.48,1347.89],
        ['2019/1/31', 2383.43,1585.42,1171.23],
        ['2019/2/1', 2377.41,1419.02,969.57],
        ['2019/2/4', 2425.92,1628.15,917.58],
        ['2019/2/5', 2411,1833.13,1203.3],
        ['2019/2/6', 2432.68,1634.48,1427.7],
        ['2019/2/7', 2230.69,1818.53,994.22],
        ['2019/2/8', 2416.62,1532.4,1114.4],
        ['2019/2/18', 2441.91,1421.56,1115.43],
        ['2019/2/19', 2420.26,1382.91,973.53],
        ['2019/2/20', 2416.62,1532.4,1114.4],
        ['2019/2/21',  2411,1833.13,1203.3],
        ['2019/2/22', 2441.91,1421.56,1115.43],
        ['2019/2/25', 2230.69,1818.53,994.22],
        ['2019/2/26', 2195.35,1546.5,1295.35],
        ['2019/2/27', 2416.62,1532.4,1114.4],
        ['2019/2/28',  2230.69,1818.53,994.22],
        ['2019/3/1',  2195.35,1546.5,1295.35],
        ['2019/3/4',  2195.35,1546.5,1295.35],
        ['2019/3/5',  2195.35,1546.5,1295.35],
        ['2019/3/6', 2195.35,1546.5,1295.35],
        ['2019/1/24', 2320.26,1620.26,1287.3],
        ['2019/1/25', 2300,1591.3,1088.26],
        ['2019/1/28', 2195.35,1546.5,1295.35],
        ['2019/1/29', 2347.22,1858.98,1337.35],
        ['2019/1/30', 2360.75,1582.48,1347.89],
        ['2019/1/31', 2383.43,1585.42,1171.23],
        ['2019/2/1', 2377.41,1419.02,969.57],
        ['2019/2/4', 2425.92,1628.15,917.58],
        ['2019/2/5', 2411,1833.13,1203.3],
        ['2019/2/6', 2432.68,1634.48,1427.7],
        ['2019/2/7', 2230.69,1818.53,994.22],
        ['2019/2/8', 2416.62,1532.4,1114.4],
        ['2019/2/18', 2441.91,1421.56,1115.43],
        ['2019/2/19', 2420.26,1382.91,973.53],
        ['2019/2/20', 2416.62,1532.4,1114.4],
        ['2019/2/21',  2411,1833.13,1203.3],
        ['2019/2/22', 2441.91,1421.56,1115.43],
        ['2019/2/25', 2230.69,1818.53,994.22],
        ['2019/2/26', 2195.35,1546.5,1295.35],
        ['2019/2/27', 2416.62,1532.4,1114.4],
        ['2019/2/28',  2230.69,1818.53,994.22],
        ['2019/3/1',  2195.35,1546.5,1295.35],
        ['2019/3/4',  2195.35,1546.5,1295.35],
        ['2019/3/5',  2195.35,1546.5,1295.35],
    ]);
    var data1_exc = splitData_his([['2019/1/24', 2520.26, 1820.26, 1487.3], ['2019/1/25', 2500, 1791.3, 1288.26], ['2019/1/28', 2395.35, 1746.5, 1495.35], ['2019/1/29', 2547.22, 2058.98, 1537.35], ['2019/1/30', 2560.75, 1782.48, 1547.89], ['2019/1/31', 2583.43, 1785.42, 1371.23], ['2019/2/1', 2577.41, 1619.02, 1169.5700000000002], ['2019/2/4', 2625.92, 1828.15, 1117.58], ['2019/2/5', 2611, 2033.13, 1403.3], ['2019/2/6', 2632.68, 1834.48, 1627.7], ['2019/2/7', 2430.69, 2018.53, 1194.22], ['2019/2/8', 2616.62, 1732.4, 1314.4], ['2019/2/18', 2641.91, 1621.56, 1315.43], ['2019/2/19', 2620.26, 1582.91, 1173.53], ['2019/2/20', 2616.62, 1732.4, 1314.4], ['2019/2/21', 2611, 2033.13, 1403.3], ['2019/2/22', 2641.91, 1621.56, 1315.43], ['2019/2/25', 2430.69, 2018.53, 1194.22], ['2019/2/26', 2395.35, 1746.5, 1495.35], ['2019/2/27', 2616.62, 1732.4, 1314.4], ['2019/2/28', 2430.69, 2018.53, 1194.22], ['2019/3/1', 2395.35, 1746.5, 1495.35], ['2019/3/4', 2395.35, 1746.5, 1495.35], ['2019/3/5', 2395.35, 1746.5, 1495.35], ['2019/3/6', 2395.35, 1746.5, 1495.35], ['2019/3/7', 2395.35, 1746.5, 1495.35], ['2019/3/8', 2430.69, 2018.53, 1194.22], ['2019/3/11', 2430.69, 2018.53, 1194.22], ['2019/3/12', 2395.35, 1746.5, 1495.35], ['2019/3/13', 2395.35, 1746.5, 1495.35], ['2019/3/14', 2395.35, 1746.5, 1495.35], ['2019/3/15', 2395.35, 1746.5, 1495.35], ['2019/3/18', 2395.35, 1746.5, 1495.35], ['2019/3/19', 2395.35, 1746.5, 1495.35], ['2019/3/20', 2395.35, 1746.5, 1495.35], ['2019/3/21', 2395.35, 1746.5, 1495.35], ['2019/3/22', 2395.35, 1746.5, 1495.35], ['2019/3/25', 2395.35, 1746.5, 1495.35], ['2019/3/26', 2395.35, 1746.5, 1495.35], ['2019/3/27', 2395.35, 1746.5, 1495.35], ['2019/3/28', 2395.35, 1746.5, 1495.35], ['2019/3/29', 2395.35, 1746.5, 1495.35], ['2019/4/1', 2395.35, 1746.5, 1495.35], ['2019/4/2', 2395.35, 1746.5, 1495.35], ['2019/4/3', 2395.35, 1746.5, 1495.35], ['2019/4/8', 2395.35, 1746.5, 1495.35], ['2019/4/9', 2395.35, 1746.5, 1495.35], ['2019/4/10', 2395.35, 1746.5, 1495.35], ['2019/1/24', 2520.26, 1820.26, 1487.3], ['2019/1/25', 2500, 1791.3, 1288.26], ['2019/1/28', 2395.35, 1746.5, 1495.35], ['2019/1/29', 2547.22, 2058.98, 1537.35], ['2019/1/30', 2560.75, 1782.48, 1547.89], ['2019/1/31', 2583.43, 1785.42, 1371.23], ['2019/2/1', 2577.41, 1619.02, 1169.5700000000002], ['2019/2/4', 2625.92, 1828.15, 1117.58], ['2019/2/5', 2611, 2033.13, 1403.3], ['2019/2/6', 2632.68, 1834.48, 1627.7], ['2019/2/7', 2430.69, 2018.53, 1194.22], ['2019/2/8', 2616.62, 1732.4, 1314.4], ['2019/2/18', 2641.91, 1621.56, 1315.43], ['2019/2/19', 2620.26, 1582.91, 1173.53], ['2019/2/20', 2616.62, 1732.4, 1314.4], ['2019/2/21', 2611, 2033.13, 1403.3], ['2019/2/22', 2641.91, 1621.56, 1315.43], ['2019/2/25', 2430.69, 2018.53, 1194.22], ['2019/2/26', 2395.35, 1746.5, 1495.35], ['2019/2/27', 2616.62, 1732.4, 1314.4], ['2019/2/28', 2430.69, 2018.53, 1194.22], ['2019/3/1', 2395.35, 1746.5, 1495.35], ['2019/3/4', 2395.35, 1746.5, 1495.35], ['2019/3/5', 2395.35, 1746.5, 1495.35], ['2019/3/6', 2395.35, 1746.5, 1495.35], ['2019/1/24', 2520.26, 1820.26, 1487.3], ['2019/1/25', 2500, 1791.3, 1288.26], ['2019/1/28', 2395.35, 1746.5, 1495.35], ['2019/1/29', 2547.22, 2058.98, 1537.35], ['2019/1/30', 2560.75, 1782.48, 1547.89], ['2019/1/31', 2583.43, 1785.42, 1371.23], ['2019/2/1', 2577.41, 1619.02, 1169.5700000000002], ['2019/2/4', 2625.92, 1828.15, 1117.58], ['2019/2/5', 2611, 2033.13, 1403.3], ['2019/2/6', 2632.68, 1834.48, 1627.7], ['2019/2/7', 2430.69, 2018.53, 1194.22], ['2019/2/8', 2616.62, 1732.4, 1314.4], ['2019/2/18', 2641.91, 1621.56, 1315.43], ['2019/2/19', 2620.26, 1582.91, 1173.53], ['2019/2/20', 2616.62, 1732.4, 1314.4], ['2019/2/21', 2611, 2033.13, 1403.3], ['2019/2/22', 2641.91, 1621.56, 1315.43], ['2019/2/25', 2430.69, 2018.53, 1194.22], ['2019/2/26', 2395.35, 1746.5, 1495.35], ['2019/2/27', 2616.62, 1732.4, 1314.4], ['2019/2/28', 2430.69, 2018.53, 1194.22], ['2019/3/1', 2395.35, 1746.5, 1495.35], ['2019/3/4', 2395.35, 1746.5, 1495.35], ['2019/3/5', 2395.35, 1746.5, 1495.35]]);
    //数据切割
    function splitData_his(rawData) {
        var categoryData = [];
        var values = [];
        for (var i = 0; i < rawData.length; i++) {
            categoryData.push(rawData[i].splice(0, 1)[0]);
            values.push(rawData[i])
        }
        return {
            categoryData: categoryData,
            values: values
        };
    }

    var data_bar=data1.values[0];
    var data_bar_exc=data1_exc.values[0];

    //物理舱位剩余量组件数据
    var data5 = splitData_num2([
        ['2019/1/24', 26,20,37],
        ['2019/1/25', 26,20,35],
        ['2019/1/28', 26,20,35],
        ['2019/1/29', 26,20,35],
        ['2019/1/30', 24,19,33],
        ['2019/1/31', 23,18,32],
        ['2019/2/1', 20,18,32],
        ['2019/2/4',  20,15,32],
        ['2019/2/5',  20,18,32],
        ['2019/2/6',  18,18,32],
        ['2019/2/7', 18,18,32],
        ['2019/2/8', 10,18,32],
        ['2019/2/18', 10,13,32],
        ['2019/2/19', 10,13,25],
        ['2019/2/20', 10,13,25],
        ['2019/2/21', 10,13,25],
        ['2019/2/22', 10,13,25],
        ['2019/2/25', 10,13,25],
        ['2019/2/26',10,13,25],
        ['2019/2/27', 8,10,25],
        ['2019/2/28', 8,10,25],
        ['2019/3/1', 8,10,25],
        ['2019/3/4', 8,10,25],
        ['2019/3/5', 8,10,25],
        ['2019/3/6', 8,10,25],
        ['2019/3/7', 8,10,15],
        ['2019/3/8', 8,10,12],
        ['2019/3/11', 8,10,12],
        ['2019/3/12', 8,10,12],
        ['2019/3/13',  8,10,12],
        ['2019/3/14', 8,10,12],
        ['2019/3/15', 8,10,12],
        ['2019/3/18', 8,10,12],
        ['2019/3/19', 8,10,12],
        ['2019/3/20',  8,10,12],
        ['2019/3/21', 8,10,12],
        ['2019/3/22', 8,10,8],
        ['2019/3/25',  8,10,8],
        ['2019/3/26', 8,10,8],
        ['2019/3/27', 8,10,8],
        ['2019/3/28', 8,10,8],
        ['2019/3/29', 8,10,8],
        ['2019/4/1', 5,10,8],
        ['2019/4/1', 5,10,8],
        ['2019/4/2', 4,10,8],
        ['2019/4/3', 4,10,8],
        ['2019/4/8', 4,10,8],
        ['2019/4/9',  4,7,8],
        ['2019/4/10',  4,7,8],
        ['2019/4/11', 4,7,8],
        ['2019/4/12', 3,7,8],
        ['2019/4/15', 3,7,8],
        ['2019/4/16', 2,7,8],
        ['2019/4/17', 3,7,8],
        ['2019/4/18', 0,7,8],
        ['2019/4/19',  0,7,8],
        ['2019/4/22',  0,7,8],
        ['2019/4/23', 0,7,5],
        ['2019/4/24', 0,4,6],
        ['2019/4/25',0,4,5],
        ['2019/4/26', 0,4,5],
        ['2019/5/2', 0,4,3],
        ['2019/5/3', 0,3,3],
        ['2019/5/6',  0,3,3],
        ['2019/5/7', 0,3,3],
        ['2019/5/8', 0,3,3],
        ['2019/5/9', 0,3,3],
        ['2019/5/10', 0,2,2],
        ['2019/5/13', 0,2,2],
        ['2019/5/14', 0,2,2],
        ['2019/5/15', 0,1,2],
        ['2019/5/16',0,2,1],
        ['2019/5/17', 0,1,1],
        ['2019/5/20', 0,0,1],
        ['2019/5/21', 0,2,2],
        ['2019/5/22', 0,2,2],
        ['2019/5/23', 0,2,2],
        ['2019/5/24',0,0,2],
        ['2019/5/27', 0,0,1],
        ['2019/5/28', 0,0,1],
        ['2019/5/29',  0,0,1],
        ['2019/5/30',  0,0,1],
        ['2019/5/31', 0,0,1],
        ['2019/6/3',  0,0,0],
        ['2019/6/4',  0,0,1],
        ['2019/6/5',  0,0,0],
        ['2019/6/6', 0,0,0],
        ['2019/6/7', 0,0,0],
        ['2019/6/13', 0,0,0]
    ]);
    var data5_exc = splitData_num2([['2019/1/24', 25, 19, 36], ['2019/1/25', 25, 19, 34], ['2019/1/28', 25, 19, 34], ['2019/1/29', 25, 19, 34], ['2019/1/30', 23, 18, 32], ['2019/1/31', 22, 17, 31], ['2019/2/1', 19, 17, 31], ['2019/2/4', 19, 14, 31], ['2019/2/5', 19, 17, 31], ['2019/2/6', 17, 17, 31], ['2019/2/7', 17, 17, 31], ['2019/2/8', 9, 17, 31], ['2019/2/18', 9, 12, 31], ['2019/2/19', 9, 12, 24], ['2019/2/20', 9, 12, 24], ['2019/2/21', 9, 12, 24], ['2019/2/22', 9, 12, 24], ['2019/2/25', 9, 12, 24], ['2019/2/26', 9, 12, 24], ['2019/2/27', 7, 9, 24], ['2019/2/28', 7, 9, 24], ['2019/3/1', 7, 9, 24], ['2019/3/4', 7, 9, 24], ['2019/3/5', 7, 9, 24], ['2019/3/6', 7, 9, 24], ['2019/3/7', 7, 9, 14], ['2019/3/8', 7, 9, 11], ['2019/3/11', 7, 9, 11], ['2019/3/12', 7, 9, 11], ['2019/3/13', 7, 9, 11], ['2019/3/14', 7, 9, 11], ['2019/3/15', 7, 9, 11], ['2019/3/18', 7, 9, 11], ['2019/3/19', 7, 9, 11], ['2019/3/20', 7, 9, 11], ['2019/3/21', 7, 9, 11], ['2019/3/22', 7, 9, 7], ['2019/3/25', 7, 9, 7], ['2019/3/26', 7, 9, 7], ['2019/3/27', 7, 9, 7], ['2019/3/28', 7, 9, 7], ['2019/3/29', 7, 9, 7], ['2019/4/1', 4, 9, 7], ['2019/4/1', 4, 9, 7], ['2019/4/2', 3, 9, 7], ['2019/4/3', 3, 9, 7], ['2019/4/8', 3, 9, 7], ['2019/4/9', 3, 6, 7], ['2019/4/10', 3, 6, 7], ['2019/4/11', 3, 6, 7], ['2019/4/12', 2, 6, 7], ['2019/4/15', 2, 6, 7], ['2019/4/16', 1, 6, 7], ['2019/4/17', 2, 6, 7], ['2019/4/18', 0, 6, 7], ['2019/4/19', 0, 6, 7], ['2019/4/22', 0, 6, 7], ['2019/4/23', 0, 6, 4], ['2019/4/24', 0, 3, 5], ['2019/4/25', 0, 3, 4], ['2019/4/26', 0, 3, 4], ['2019/5/2', 0, 3, 2], ['2019/5/3', 0, 2, 2], ['2019/5/6', 0, 2, 2], ['2019/5/7', 0, 2, 2], ['2019/5/8', 0, 2, 2], ['2019/5/9', 0, 2, 2], ['2019/5/10', 0, 1, 1], ['2019/5/13', 0, 1, 1], ['2019/5/14', 0, 1, 1], ['2019/5/15', 0, 0, 1], ['2019/5/16', 0, 1, 0], ['2019/5/17', 0, 0, 0], ['2019/5/20', 0, 0, 0], ['2019/5/21', 0, 1, 1], ['2019/5/22', 0, 1, 1], ['2019/5/23', 0, 1, 1], ['2019/5/24', 0, 0, 1], ['2019/5/27', 0, 0, 0], ['2019/5/28', 0, 0, 0], ['2019/5/29', 0, 0, 0], ['2019/5/30', 0, 0, 0], ['2019/5/31', 0, 0, 0], ['2019/6/3', 0, 0, 0], ['2019/6/4', 0, 0, 0], ['2019/6/5', 0, 0, 0], ['2019/6/6', 0, 0, 0], ['2019/6/7', 0, 0, 0], ['2019/6/13', 0, 0, 0]]);
    function splitData_num2(rawData) {
        var categoryData = [];
        var values = [];
        for (var i = 0; i < rawData.length; i++) {
            categoryData.push(rawData[i].splice(0, 1)[0]);
            values.push(rawData[i])
        }
        return {
            categoryData: categoryData,
            values: values,

        };
    }

    var data_bar3=data5.values[0];
    var data_bar3_exc=data5_exc.values[0];


    //子舱余量组件数据
    var data3 = splitData_num([
        ['2019/1/24', 26,20,37,44,50,50],
        ['2019/1/25', 26,20,35,40,45,45],
        ['2019/1/28', 26,20,35,40,45,45],
        ['2019/1/29', 26,20,35,40,45,45],
        ['2019/1/30', 24,19,33,38,42,43],
        ['2019/1/31', 23,18,32,35,40,41],
        ['2019/2/1', 20,18,32,35,40,41],
        ['2019/2/4',  20,15,32,35,40,41],
        ['2019/2/5',  20,18,32,35,40,38],
        ['2019/2/6',  18,18,32,35,40,38],
        ['2019/2/7', 18,18,32,35,40,35],
        ['2019/2/8', 10,18,32,35,40,35],
        ['2019/2/18', 10,13,32,35,40,35],
        ['2019/2/19', 10,13,25,35,40,35],
        ['2019/2/20', 10,13,25,35,30,35],
        ['2019/2/21', 10,13,25,35,30,33],
        ['2019/2/22', 10,13,25,35,30,23],
        ['2019/2/25', 10,13,25,30,25,20],
        ['2019/2/26',10,13,25,30,25,15],
        ['2019/2/27', 8,10,25,30,25,15],
        ['2019/2/28', 8,10,25,30,25,12],
        ['2019/3/1', 8,10,25,25,25,12],
        ['2019/3/4', 8,10,25,25,25,10],
        ['2019/3/5', 8,10,25,20,25,10],
        ['2019/3/6', 8,10,25,20,22,10],
        ['2019/3/7', 8,10,15,20,22,10],
        ['2019/3/8', 8,10,12,20,22,10],
        ['2019/3/11', 8,10,12,20,20,10],
        ['2019/3/12', 8,10,12,15,20,10],
        ['2019/3/13',  8,10,12,15,18,9],
        ['2019/3/14', 8,10,12,15,18,8],
        ['2019/3/15', 8,10,12,15,18,5],
        ['2019/3/18', 8,10,12,15,18,4],
        ['2019/3/19', 8,10,12,12,13,3],
        ['2019/3/20',  8,10,12,12,13,2],
        ['2019/3/21', 8,10,12,12,10,2],
        ['2019/3/22', 8,10,8,12,10,2],
        ['2019/3/25',  8,10,8,12,9,2],
        ['2019/3/26', 8,10,8,12,9,2],
        ['2019/3/27', 8,10,8,5,9,2],
        ['2019/3/28', 8,10,8,5,9,2],
        ['2019/3/29', 8,10,8,3,9,2],
        ['2019/4/1', 5,10,8,5,9,2],
        ['2019/4/2', 4,10,8,5,9,2],
        ['2019/4/3', 4,10,8,5,8,2],
        ['2019/4/8', 4,10,8,5,7,2],
        ['2019/4/9',  4,7,8,5,7,2],
        ['2019/4/10',  4,7,8,5,5,2],
        ['2019/4/11', 4,7,8,5,5,1],
        ['2019/4/12', 3,7,8,5,5,1],
        ['2019/4/15', 3,7,8,5,5,1],
        ['2019/4/16', 2,7,8,5,5,1],
        ['2019/4/17', 3,7,8,5,5,0],
        ['2019/4/18', 0,7,8,5,5,0],
        ['2019/4/19',  0,7,8,5,4,0],
        ['2019/4/22',  0,7,8,5,3,0],
        ['2019/4/23', 0,7,5,5,3,0],
        ['2019/4/24', 0,4,5,5,3,0],
        ['2019/4/25',0,4,5,5,3,0],
        ['2019/4/26', 0,4,5,5,3,0],
        ['2019/5/2', 0,4,3,5,3,0],
        ['2019/5/3', 0,3,3,5,3,0],
        ['2019/5/6',  0,3,3,2,3,0],
        ['2019/5/7', 0,3,3,2,2,0],
        ['2019/5/8', 0,3,3,2,2,1],
        ['2019/5/9', 0,3,3,2,2,0],
        ['2019/5/10', 0,2,2,2,2,0],
        ['2019/5/13', 0,2,2,2,2,0],
        ['2019/5/14', 0,2,2,2,2,0],
        ['2019/5/15', 0,1,2,2,2,0],
        ['2019/5/16',0,2,1,2,2,0],
        ['2019/5/17', 0,1,1,2,2,0],
        ['2019/5/20', 0,0,1,2,2,0],
        ['2019/5/21', 0,2,2,2,2,0],
        ['2019/5/22', 0,2,2,2,0,0],
        ['2019/5/23', 0,2,2,1,0,0],
        ['2019/5/24',0,0,2,1,0,0],
        ['2019/5/27', 0,0,1,2,0,0],
        ['2019/5/28', 0,0,1,0,1,0],
        ['2019/5/29',  0,0,1,0,1,0],
        ['2019/5/30',  0,0,1,0,0,0],
        ['2019/5/31', 0,0,1,0,0,0],
        ['2019/6/3',  0,0,0,0,1,0],
        ['2019/6/4',  0,0,1,0,0,0],
        ['2019/6/5',  0,0,0,0,1,0],
        ['2019/6/6', 0,0,0,0,0,0],
        ['2019/6/7', 0,0,0,0,0,0],
        ['2019/6/13', 0,0,0,0,0,0]
    ]);
    var data3_exc = splitData_num([['2019/1/24', 24, 18, 35, 42, 48, 48], ['2019/1/25', 24, 18, 33, 38, 43, 43], ['2019/1/28', 24, 18, 33, 38, 43, 43], ['2019/1/29', 24, 18, 33, 38, 43, 43], ['2019/1/30', 22, 17, 31, 36, 40, 41], ['2019/1/31', 21, 16, 30, 33, 38, 39], ['2019/2/1', 18, 16, 30, 33, 38, 39], ['2019/2/4', 18, 13, 30, 33, 38, 39], ['2019/2/5', 18, 16, 30, 33, 38, 36], ['2019/2/6', 16, 16, 30, 33, 38, 36], ['2019/2/7', 16, 16, 30, 33, 38, 33], ['2019/2/8', 8, 16, 30, 33, 38, 33], ['2019/2/18', 8, 11, 30, 33, 38, 33], ['2019/2/19', 8, 11, 23, 33, 38, 33], ['2019/2/20', 8, 11, 23, 33, 28, 33], ['2019/2/21', 8, 11, 23, 33, 28, 31], ['2019/2/22', 8, 11, 23, 33, 28, 21], ['2019/2/25', 8, 11, 23, 28, 23, 18], ['2019/2/26', 8, 11, 23, 28, 23, 13], ['2019/2/27', 6, 8, 23, 28, 23, 13], ['2019/2/28', 6, 8, 23, 28, 23, 10], ['2019/3/1', 6, 8, 23, 23, 23, 10], ['2019/3/4', 6, 8, 23, 23, 23, 8], ['2019/3/5', 6, 8, 23, 18, 23, 8], ['2019/3/6', 6, 8, 23, 18, 20, 8], ['2019/3/7', 6, 8, 13, 18, 20, 8], ['2019/3/8', 6, 8, 10, 18, 20, 8], ['2019/3/11', 6, 8, 10, 18, 18, 8], ['2019/3/12', 6, 8, 10, 13, 18, 8], ['2019/3/13', 6, 8, 10, 13, 16, 7], ['2019/3/14', 6, 8, 10, 13, 16, 6], ['2019/3/15', 6, 8, 10, 13, 16, 3], ['2019/3/18', 6, 8, 10, 13, 16, 2], ['2019/3/19', 6, 8, 10, 10, 11, 1], ['2019/3/20', 6, 8, 10, 10, 11, 2], ['2019/3/21', 6, 8, 10, 10, 8, 2], ['2019/3/22', 6, 8, 6, 10, 8, 2], ['2019/3/25', 6, 8, 6, 10, 7, 2], ['2019/3/26', 6, 8, 6, 10, 7, 2], ['2019/3/27', 6, 8, 6, 3, 7, 2], ['2019/3/28', 6, 8, 6, 3, 7, 2], ['2019/3/29', 6, 8, 6, 1, 7, 2], ['2019/4/1', 3, 8, 6, 3, 7, 2], ['2019/4/2', 2, 8, 6, 3, 7, 2], ['2019/4/3', 2, 8, 6, 3, 6, 2], ['2019/4/8', 2, 8, 6, 3, 5, 2], ['2019/4/9', 2, 5, 6, 3, 5, 2], ['2019/4/10', 2, 5, 6, 3, 3, 2], ['2019/4/11', 2, 5, 6, 3, 3, 1], ['2019/4/12', 1, 5, 6, 3, 3, 1], ['2019/4/15', 1, 5, 6, 3, 3, 1], ['2019/4/16', 2, 5, 6, 3, 3, 1], ['2019/4/17', 1, 5, 6, 3, 3, 0], ['2019/4/18', 0, 5, 6, 3, 3, 0], ['2019/4/19', 0, 5, 6, 3, 2, 0], ['2019/4/22', 0, 5, 6, 3, 1, 0], ['2019/4/23', 0, 5, 3, 3, 1, 0], ['2019/4/24', 0, 2, 3, 3, 1, 0], ['2019/4/25', 0, 2, 3, 3, 1, 0], ['2019/4/26', 0, 2, 3, 3, 1, 0], ['2019/5/2', 0, 2, 1, 3, 1, 0], ['2019/5/3', 0, 1, 1, 3, 1, 0], ['2019/5/6', 0, 1, 1, 2, 1, 0], ['2019/5/7', 0, 1, 1, 2, 2, 0], ['2019/5/8', 0, 1, 1, 2, 2, 1], ['2019/5/9', 0, 1, 1, 2, 2, 0], ['2019/5/10', 0, 2, 2, 2, 2, 0], ['2019/5/13', 0, 2, 2, 2, 2, 0], ['2019/5/14', 0, 2, 2, 2, 2, 0], ['2019/5/15', 0, 1, 2, 2, 2, 0], ['2019/5/16', 0, 2, 1, 2, 2, 0], ['2019/5/17', 0, 1, 1, 2, 2, 0], ['2019/5/20', 0, 0, 1, 2, 2, 0], ['2019/5/21', 0, 2, 2, 2, 2, 0], ['2019/5/22', 0, 2, 2, 2, 0, 0], ['2019/5/23', 0, 2, 2, 1, 0, 0], ['2019/5/24', 0, 0, 2, 1, 0, 0], ['2019/5/27', 0, 0, 1, 2, 0, 0], ['2019/5/28', 0, 0, 1, 0, 1, 0], ['2019/5/29', 0, 0, 1, 0, 1, 0], ['2019/5/30', 0, 0, 1, 0, 0, 0], ['2019/5/31', 0, 0, 1, 0, 0, 0], ['2019/6/3', 0, 0, 0, 0, 1, 0], ['2019/6/4', 0, 0, 1, 0, 0, 0], ['2019/6/5', 0, 0, 0, 0, 1, 0], ['2019/6/6', 0, 0, 0, 0, 0, 0], ['2019/6/7', 0, 0, 0, 0, 0, 0], ['2019/6/13', 0, 0, 0, 0, 0, 0]]
    );

    function splitData_num(rawData) {
        var categoryData = [];
        var values = [];
        for (var i = 0; i < rawData.length; i++) {
            categoryData.push(rawData[i].splice(0, 1)[0]);
            values.push(rawData[i])
        }
        return {
            categoryData: categoryData,
            values: values
        };
    }

    var data_bar1=data3.values[0];
    var data_bar1_exc=data3_exc.values[0];

    //子售卖量量组件数据
    var data4 = splitData_num1([
        ['2019/4/10',  4,7,8,5,5,2],
        ['2019/4/11', 4,7,8,5,5,1],
        ['2019/4/12', 3,7,8,5,5,1],
        ['2019/4/15', 3,7,8,5,5,1],
        ['2019/4/16', 2,7,8,5,5,1],
        ['2019/4/17', 3,7,8,5,5,0],
        ['2019/4/18', 0,7,8,5,5,0],
        ['2019/4/19',  0,7,8,5,4,0],
        ['2019/4/22',  0,7,8,5,3,0],
        ['2019/4/23', 0,7,5,5,3,0],
        ['2019/4/24', 0,4,5,5,3,0],
        ['2019/4/25',0,4,5,5,3,0],
        ['2019/4/26', 0,4,5,5,3,0],
        ['2019/5/2', 0,4,3,5,3,0],
        ['2019/5/3', 0,3,3,5,3,0],
        ['2019/5/6',  0,3,3,2,3,0],
        ['2019/5/7', 0,3,3,2,2,0],
        ['2019/5/8', 0,3,3,2,2,1],
        ['2019/5/9', 0,3,3,2,2,0],
        ['2019/5/10', 0,2,2,2,2,0],
        ['2019/5/13', 0,2,2,2,2,0],
        ['2019/5/14', 0,2,2,2,2,0],
        ['2019/5/15', 0,1,2,2,2,0],
        ['2019/5/16',0,2,1,2,2,0],
        ['2019/5/17', 0,1,1,2,2,0],
        ['2019/5/20', 0,0,1,2,2,0],
        ['2019/5/21', 0,2,2,2,2,0],
        ['2019/5/22', 0,2,2,2,0,0],
        ['2019/5/23', 0,2,2,1,0,0],
        ['2019/5/24',0,0,2,1,0,0],
        ['2019/5/27', 0,0,1,2,0,0],
        ['2019/5/28', 0,0,1,0,1,0],
        ['2019/5/29',  0,0,1,0,1,0],
        ['2019/5/30',  0,0,1,0,0,0],
        ['2019/5/31', 0,0,1,0,0,0],
        ['2019/6/3',  0,0,0,0,1,0],
        ['2019/6/4',  0,0,1,0,0,0],
        ['2019/6/5',  0,0,0,0,1,0],
        ['2019/6/6', 0,0,0,0,0,0],
        ['2019/6/7', 0,0,0,0,0,0],
        ['2019/6/13', 0,0,0,0,0,0],
        ['2019/4/10',  4,7,8,5,5,2],
        ['2019/4/11', 4,7,8,5,5,1],
        ['2019/4/12', 3,7,8,5,5,1],
        ['2019/4/15', 3,7,8,5,5,1],
        ['2019/4/16', 2,7,8,5,5,1],
        ['2019/4/17', 3,7,8,5,5,0],
        ['2019/4/18', 0,7,8,5,5,0],
        ['2019/4/19',  0,7,8,5,4,0],
        ['2019/4/22',  0,7,8,5,3,0],
        ['2019/4/23', 0,7,5,5,3,0],
        ['2019/4/24', 0,4,5,5,3,0],
        ['2019/5/23', 0,2,2,1,0,0],
        ['2019/5/24',0,0,2,1,0,0],
        ['2019/5/27', 0,0,1,2,0,0],
        ['2019/5/28', 0,0,1,0,1,0],
        ['2019/5/29',  0,0,1,0,1,0],
        ['2019/5/30',  0,0,1,0,0,0],
        ['2019/5/31', 0,0,1,0,0,0],
        ['2019/6/3',  0,0,0,0,1,0],
        ['2019/6/4',  0,0,1,0,0,0],
        ['2019/6/5',  0,0,0,0,1,0],
        ['2019/6/6', 0,0,0,0,0,0],
        ['2019/6/7', 0,0,0,0,0,0],
        ['2019/6/13', 0,0,0,0,0,0],
        ['2019/4/10',  4,7,8,5,5,2],
        ['2019/4/11', 4,7,8,5,5,1],
        ['2019/4/12', 3,7,8,5,5,1],
        ['2019/4/15', 3,7,8,5,5,1],
        ['2019/4/16', 2,7,8,5,5,1],
        ['2019/4/17', 3,7,8,5,5,0],
        ['2019/4/18', 0,7,8,5,5,0],
        ['2019/4/19',  0,7,8,5,4,0],
        ['2019/4/22',  0,7,8,5,3,0],
        ['2019/4/23', 0,7,5,5,3,0],
        ['2019/4/24', 0,4,5,5,3,0],
        ['2019/4/10',  4,7,8,5,5,2],
        ['2019/4/11', 4,7,8,5,5,1],
        ['2019/4/12', 3,7,8,5,5,1],
        ['2019/4/15', 3,7,8,5,5,1],
        ['2019/4/16', 2,7,8,5,5,1],
        ['2019/4/17', 3,7,8,5,5,0],
        ['2019/4/18', 0,7,8,5,5,0],
        ['2019/4/19',  0,7,8,5,4,0],
        ['2019/4/22',  0,7,8,5,3,0],
        ['2019/4/23', 0,7,5,5,3,0],
        ['2019/4/24', 0,4,5,5,3,0],
        ['2019/4/25',0,4,5,5,3,0],
        ['2019/4/26', 0,4,5,5,3,0],
        ['2019/5/2', 0,4,3,5,3,0],
        ['2019/5/3', 0,3,3,5,3,0],
        ['2019/5/6',  0,3,3,2,3,0],
        ['2019/5/7', 0,3,3,2,2,0],
        ['2019/5/8', 0,3,3,2,2,1],
        ['2019/5/9', 0,3,3,2,2,0],
        ['2019/5/10', 0,2,2,2,2,0],
        ['2019/5/13', 0,2,2,2,2,0],
        ['2019/5/14', 0,2,2,2,2,0],
        ['2019/5/15', 0,1,2,2,2,0],
        ['2019/5/16',0,2,1,2,2,0],
        ['2019/5/17', 0,1,1,2,2,0],
        ['2019/5/20', 0,0,1,2,2,0],
        ['2019/5/21', 0,2,2,2,2,0],
        ['2019/5/22', 0,2,2,2,0,0],
        ['2019/5/23', 0,2,2,1,0,0],
        ['2019/5/24',0,0,2,1,0,0],
        ['2019/5/27', 0,0,1,2,0,0],
        ['2019/5/28', 0,0,1,0,1,0],
        ['2019/5/29',  0,0,1,0,1,0],
        ['2019/5/30',  0,0,1,0,0,0],
        ['2019/5/31', 0,0,1,0,0,0],
        ['2019/6/3',  0,0,0,0,1,0],
        ['2019/6/4',  0,0,1,0,0,0],
        ['2019/6/5',  0,0,0,0,1,0],
        ['2019/6/6', 0,0,0,0,0,0],

    ]);
    var data4_exc = splitData_num1([['2019/4/10', 6, 9, 10, 7, 7, 4], ['2019/4/11', 6, 9, 10, 7, 7, 3], ['2019/4/12', 5, 9, 10, 7, 7, 3], ['2019/4/15', 5, 9, 10, 7, 7, 3], ['2019/4/16', 4, 9, 10, 7, 7, 3], ['2019/4/17', 5, 9, 10, 7, 7, 0], ['2019/4/18', 0, 9, 10, 7, 7, 0], ['2019/4/19', 0, 9, 10, 7, 6, 0], ['2019/4/22', 0, 9, 10, 7, 5, 0], ['2019/4/23', 0, 9, 7, 7, 5, 0], ['2019/4/24', 0, 6, 7, 7, 5, 0], ['2019/4/25', 0, 6, 7, 7, 5, 0], ['2019/4/26', 0, 6, 7, 7, 5, 0], ['2019/5/2', 0, 6, 5, 7, 5, 0], ['2019/5/3', 0, 5, 5, 7, 5, 0], ['2019/5/6', 0, 5, 5, 4, 5, 0], ['2019/5/7', 0, 5, 5, 4, 4, 0], ['2019/5/8', 0, 5, 5, 4, 4, 3], ['2019/5/9', 0, 5, 5, 4, 4, 0], ['2019/5/10', 0, 4, 4, 4, 4, 0], ['2019/5/13', 0, 4, 4, 4, 4, 0], ['2019/5/14', 0, 4, 4, 4, 4, 0], ['2019/5/15', 0, 3, 4, 4, 4, 0], ['2019/5/16', 0, 4, 3, 4, 4, 0], ['2019/5/17', 0, 3, 3, 4, 4, 0], ['2019/5/20', 0, 0, 3, 4, 4, 0], ['2019/5/21', 0, 4, 4, 4, 4, 0], ['2019/5/22', 0, 4, 4, 4, 0, 0], ['2019/5/23', 0, 4, 4, 3, 0, 0], ['2019/5/24', 0, 0, 4, 3, 0, 0], ['2019/5/27', 0, 0, 3, 4, 0, 0], ['2019/5/28', 0, 0, 3, 0, 3, 0], ['2019/5/29', 0, 0, 3, 0, 3, 0], ['2019/5/30', 0, 0, 3, 0, 0, 0], ['2019/5/31', 0, 0, 3, 0, 0, 0], ['2019/6/3', 0, 0, 0, 0, 3, 0], ['2019/6/4', 0, 0, 3, 0, 0, 0], ['2019/6/5', 0, 0, 0, 0, 3, 0], ['2019/6/6', 0, 0, 0, 0, 0, 0], ['2019/6/7', 0, 0, 0, 0, 0, 0], ['2019/6/13', 0, 0, 0, 0, 0, 0], ['2019/4/10', 6, 9, 10, 7, 7, 4], ['2019/4/11', 6, 9, 10, 7, 7, 3], ['2019/4/12', 5, 9, 10, 7, 7, 3], ['2019/4/15', 5, 9, 10, 7, 7, 3], ['2019/4/16', 4, 9, 10, 7, 7, 3], ['2019/4/17', 5, 9, 10, 7, 7, 0], ['2019/4/18', 0, 9, 10, 7, 7, 0], ['2019/4/19', 0, 9, 10, 7, 6, 0], ['2019/4/22', 0, 9, 10, 7, 5, 0], ['2019/4/23', 0, 9, 7, 7, 5, 0], ['2019/4/24', 0, 6, 7, 7, 5, 0], ['2019/5/23', 0, 4, 4, 3, 0, 0], ['2019/5/24', 0, 0, 4, 3, 0, 0], ['2019/5/27', 0, 0, 3, 4, 0, 0], ['2019/5/28', 0, 0, 3, 0, 3, 0], ['2019/5/29', 0, 0, 3, 0, 3, 0], ['2019/5/30', 0, 0, 3, 0, 0, 0], ['2019/5/31', 0, 0, 3, 0, 0, 0], ['2019/6/3', 0, 0, 0, 0, 3, 0], ['2019/6/4', 0, 0, 3, 0, 0, 0], ['2019/6/5', 0, 0, 0, 0, 3, 0], ['2019/6/6', 0, 0, 0, 0, 0, 0], ['2019/6/7', 0, 0, 0, 0, 0, 0], ['2019/6/13', 0, 0, 0, 0, 0, 0], ['2019/4/10', 6, 9, 10, 7, 7, 4], ['2019/4/11', 6, 9, 10, 7, 7, 3], ['2019/4/12', 5, 9, 10, 7, 7, 3], ['2019/4/15', 5, 9, 10, 7, 7, 3], ['2019/4/16', 4, 9, 10, 7, 7, 3], ['2019/4/17', 5, 9, 10, 7, 7, 0], ['2019/4/18', 0, 9, 10, 7, 7, 0], ['2019/4/19', 0, 9, 10, 7, 6, 0], ['2019/4/22', 0, 9, 10, 7, 5, 0], ['2019/4/23', 0, 9, 7, 7, 5, 0], ['2019/4/24', 0, 6, 7, 7, 5, 0], ['2019/4/10', 6, 9, 10, 7, 7, 4], ['2019/4/11', 6, 9, 10, 7, 7, 3], ['2019/4/12', 5, 9, 10, 7, 7, 3], ['2019/4/15', 5, 9, 10, 7, 7, 3], ['2019/4/16', 4, 9, 10, 7, 7, 3], ['2019/4/17', 5, 9, 10, 7, 7, 0], ['2019/4/18', 0, 9, 10, 7, 7, 0], ['2019/4/19', 0, 9, 10, 7, 6, 0], ['2019/4/22', 0, 9, 10, 7, 5, 0], ['2019/4/23', 0, 9, 7, 7, 5, 0], ['2019/4/24', 0, 6, 7, 7, 5, 0], ['2019/4/25', 0, 6, 7, 7, 5, 0], ['2019/4/26', 0, 6, 7, 7, 5, 0], ['2019/5/2', 0, 6, 5, 7, 5, 0], ['2019/5/3', 0, 5, 5, 7, 5, 0], ['2019/5/6', 0, 5, 5, 4, 5, 0], ['2019/5/7', 0, 5, 5, 4, 4, 0], ['2019/5/8', 0, 5, 5, 4, 4, 3], ['2019/5/9', 0, 5, 5, 4, 4, 0], ['2019/5/10', 0, 4, 4, 4, 4, 0], ['2019/5/13', 0, 4, 4, 4, 4, 0], ['2019/5/14', 0, 4, 4, 4, 4, 0], ['2019/5/15', 0, 3, 4, 4, 4, 0], ['2019/5/16', 0, 4, 3, 4, 4, 0], ['2019/5/17', 0, 3, 3, 4, 4, 0], ['2019/5/20', 0, 0, 3, 4, 4, 0], ['2019/5/21', 0, 4, 4, 4, 4, 0], ['2019/5/22', 0, 4, 4, 4, 0, 0], ['2019/5/23', 0, 4, 4, 3, 0, 0], ['2019/5/24', 0, 0, 4, 3, 0, 0], ['2019/5/27', 0, 0, 3, 4, 0, 0], ['2019/5/28', 0, 0, 3, 0, 3, 0], ['2019/5/29', 0, 0, 3, 0, 3, 0], ['2019/5/30', 0, 0, 3, 0, 0, 0], ['2019/5/31', 0, 0, 3, 0, 0, 0], ['2019/6/3', 0, 0, 0, 0, 3, 0], ['2019/6/4', 0, 0, 3, 0, 0, 0], ['2019/6/5', 0, 0, 0, 0, 3, 0], ['2019/6/6', 0, 0, 0, 0, 0, 0]]);

    function splitData_num1(rawData) {
        var categoryData = [];
        var values = [];
        for (var i = 0; i < rawData.length; i++) {
            categoryData.push(rawData[i].splice(0, 1)[0]);
            values.push(rawData[i])
        }
        return {
            categoryData: categoryData,
            values: values
        };
    }
    var data_bar2 = data4.values[0];
    var data_bar2_exc = data4_exc.values[0];

    //物理舱余量
    option_subNum2 = {
        title: {
            text: data_Vertical_fixed+'物理舱余量',
            x:'center',
            y:'top'
        },
        legend: {
            // data: ['上座率','收益率','均价','操作'],
            data:['目标航班','优秀管理员航班'],
            right:'15%',
            top:'10%',
            textStyle:{
                fontSize: 16,
            },
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'shadow'
            }
        },
        // legend: {
        //     data: ['2011年', '2012年']
        // },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        xAxis: {
            type: 'value',
            boundaryGap: [0, 0.01]
        },
        yAxis: {
            type: 'category',
            data: ['头等舱','商务舱','经济舱']
        },
        series: [
            {
                name:"目标航班",
                color: '#006699',
                type: 'bar',
                data: data_bar3
            },
            {
                name:"优秀管理员航班",
                color: '#009966',
                type: 'bar',
                data: data_bar3_exc
            }
        ]
    };
    myChart_His3.setOption(option_subNum2);

    //物理舱均价变化组件
    option_his = {
        title: {
            text: data_Vertical_fixed+'物理舱均价',
            x:'center',
            y:'top'
        },
        legend: {
            // data: ['上座率','收益率','均价','操作'],
            data:['目标航班','优秀管理员航班'],
            right:'15%',
            top:'10%',
            textStyle:{
                fontSize: 16,
            },
        },
        tooltip: {          //显示提示框
            trigger: 'axis',
            axisPointer: {
                type: 'cross'
            }
        },
        xAxis: {
            type: 'category',
            data: ['头等舱均价', '商务舱均价', '经济舱均价']
        },
        yAxis: {
            type: 'value'
        },

        series: [//数据线
            {
                name:"目标航班",
                color: ['#003366'],
                barWidth:50,
                data:data_bar,
                type:'bar'
            },
            {
                name:"优秀管理员航班",
                color: ['#009966'],
                barWidth:50,
                data:data_bar_exc,
                type:'bar'
            }
        ]
    };
    myChart_His.setOption(option_his);

    //子舱余量组件
    option_subNum = {
        title: {
            text: data_Vertical_fixed+'子舱余量',
            x:'center',
            y:'top'
        },
        legend: {
            // data: ['上座率','收益率','均价','操作'],
            data:['目标航班','优秀管理员航班'],
            right:'15%',
            top:'10%',
            textStyle:{
                fontSize: 16,
            },
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'shadow'
            }
        },
        // legend: {
        //     data: ['2011年', '2012年']
        // },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        xAxis: {
            type: 'value',
            boundaryGap: [0, 0.01]
        },
        yAxis: {
            type: 'category',
            data: ['Y舱','J舱','K舱','X舱','N舱','M舱']
        },
        series: [
            {
                name:"目标航班",
                color: '#006699',
                type: 'bar',
                data: data_bar1
            },
            {
                name:"优秀管理员航班",
                color: '#009966',
                type: 'bar',
                data: data_bar1_exc
            }
        ]
    };
    myChart_His1.setOption(option_subNum);

    //舱位销售量变化
    option_subNum1 = {
        title: {
            text: data_Vertical_fixed+'子舱产品销售量',
            x:'center',
            y:'top'
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'shadow'
            }
        },
        legend: {
            // data: ['上座率','收益率','均价','操作'],
            data:['目标航班','优秀管理员航班'],
            right:'15%',
            top:'10%',
            textStyle:{
                fontSize:16,
            }
            
        },
        // legend: {
        //     data: ['2011年', '2012年']
        // },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        xAxis: {
            type: 'value',
            boundaryGap: [0, 0.01]
        },
        yAxis: {
            type: 'category',
            data: ['Y舱','J舱','K舱','X舱','N舱','M舱']
        },
        series: [
            {
                name:"目标航班",
                color: '#006699',
                type: 'bar',
                data: data_bar2
            },
            {
                name:"优秀管理员航班",
                color: '#009966',
                type: 'bar',
                data: data_bar2_exc
            }
        ]
    };
    myChart_His2.setOption(option_subNum1);






    var myChart_His4 = echarts.init(document.getElementById('right_chart1'));// 已订票旅客年龄分布
    var myChart_His5 = echarts.init(document.getElementById('right_chart2'));// 已订票旅客同行人数分布
    var myChart_His6 = echarts.init(document.getElementById('right_chart3'));// 已订票旅客性别分布
    var myChart_His7 = echarts.init(document.getElementById('right_chart4'));// 已订团散客分布
    var myChart_His8 = echarts.init(document.getElementById('right_chart5'));// 目标航班与市场的价格分布



    //已订票旅客年龄分布
    var data6 = splitData_age([
        [0.2,0.2,0.3,0.1,0.1,0.1],
        [0.2,0.2,0.2,0.1,0.2,0.1],
        [0.3,0.1,0.1,0.1,0.3,0.1],
        [0.2,0.2,0.1,0.1,0.3,0.1],
        [0.1,0.3,0.1,0.1,0.3,0.1],
        [0.1,0.2,0.2,0.1,0.3,0.1],
        [0.1,0.1,0.3,0.3,0.1,0.1],
        [0.3,0.2,0.1,0.1,0.2,0.1],
        [0.3,0.2,0.2,0.2,0.1,0.1],
        [0.2,0.2,0.3,0.1,0.1,0.1],
        [0.2,0.2,0.2,0.1,0.2,0.1],
        [0.3,0.1,0.1,0.1,0.3,0.1],
        [0.2,0.2,0.1,0.1,0.3,0.1],
        [0.1,0.3,0.1,0.1,0.3,0.1],
        [0.1,0.2,0.2,0.1,0.3,0.1],
        [0.1,0.1,0.3,0.3,0.1,0.1],
        [0.3,0.2,0.1,0.1,0.2,0.1],
        [0.3,0.2,0.2,0.2,0.1,0.1],
        [0.2,0.2,0.3,0.1,0.1,0.1],
        [0.2,0.2,0.2,0.1,0.2,0.1],
        [0.3,0.1,0.1,0.1,0.3,0.1],
        [0.2,0.2,0.1,0.1,0.3,0.1],
        [0.1,0.3,0.1,0.1,0.3,0.1],
        [0.1,0.2,0.2,0.1,0.3,0.1],
        [0.1,0.1,0.3,0.3,0.1,0.1],
        [0.3,0.2,0.1,0.1,0.2,0.1],
        [0.3,0.2,0.2,0.2,0.1,0.1],
        [0.2,0.2,0.3,0.1,0.1,0.1],
        [0.2,0.2,0.2,0.1,0.2,0.1],
        [0.3,0.1,0.1,0.1,0.3,0.1],
        [0.2,0.2,0.1,0.1,0.3,0.1],
        [0.1,0.3,0.1,0.1,0.3,0.1],
        [0.1,0.2,0.2,0.1,0.3,0.1],
        [0.1,0.1,0.3,0.3,0.1,0.1],
        [0.3,0.2,0.1,0.1,0.2,0.1],
        [0.3,0.2,0.2,0.2,0.1,0.1],
        [0.2,0.2,0.3,0.1,0.1,0.1],
        [0.2,0.2,0.2,0.1,0.2,0.1],
        [0.3,0.1,0.1,0.1,0.3,0.1],
        [0.2,0.2,0.1,0.1,0.3,0.1],
        [0.1,0.3,0.1,0.1,0.3,0.1],
        [0.1,0.2,0.2,0.1,0.3,0.1],
        [0.1,0.1,0.3,0.3,0.1,0.1],
        [0.3,0.2,0.1,0.1,0.2,0.1],
        [0.3,0.2,0.2,0.2,0.1,0.1],
        [0.2,0.2,0.3,0.1,0.1,0.1],
        [0.2,0.2,0.2,0.1,0.2,0.1],
        [0.3,0.1,0.1,0.1,0.3,0.1],
        [0.2,0.2,0.1,0.1,0.3,0.1],
        [0.1,0.3,0.1,0.1,0.3,0.1],
        [0.1,0.2,0.2,0.1,0.3,0.1],
        [0.1,0.1,0.3,0.3,0.1,0.1],
        [0.3,0.2,0.1,0.1,0.2,0.1],
        [0.3,0.2,0.2,0.2,0.1,0.1],
        [0.2,0.2,0.3,0.1,0.1,0.1],
        [0.2,0.2,0.2,0.1,0.2,0.1],
        [0.3,0.1,0.1,0.1,0.3,0.1],
        [0.2,0.2,0.1,0.1,0.3,0.1],
        [0.1,0.3,0.1,0.1,0.3,0.1],
        [0.1,0.2,0.2,0.1,0.3,0.1],
        [0.1,0.1,0.3,0.3,0.1,0.1],
        [0.3,0.2,0.1,0.1,0.2,0.1],
        [0.3,0.2,0.2,0.2,0.1,0.1],
        [0.2,0.2,0.3,0.1,0.1,0.1],
        [0.2,0.2,0.2,0.1,0.2,0.1],
        [0.3,0.1,0.1,0.1,0.3,0.1],
        [0.2,0.2,0.1,0.1,0.3,0.1],
        [0.1,0.3,0.1,0.1,0.3,0.1],
        [0.1,0.2,0.2,0.1,0.3,0.1],
        [0.1,0.1,0.3,0.3,0.1,0.1],
        [0.3,0.2,0.1,0.1,0.2,0.1],
        [0.3,0.2,0.2,0.2,0.1,0.1],
        [0.1,0.1,0.3,0.3,0.1,0.1],
        [0.3,0.2,0.1,0.1,0.2,0.1],
        [0.3,0.2,0.2,0.2,0.1,0.1],
        [0.2,0.2,0.3,0.1,0.1,0.1],
        [0.2,0.2,0.2,0.1,0.2,0.1],
        [0.3,0.1,0.1,0.1,0.3,0.1],
        [0.2,0.2,0.1,0.1,0.3,0.1],
        [0.1,0.3,0.1,0.1,0.3,0.1],
        [0.1,0.2,0.2,0.1,0.3,0.1],
        [0.1,0.1,0.3,0.3,0.1,0.1],
        [0.3,0.2,0.1,0.1,0.2,0.1],
        [0.3,0.2,0.2,0.2,0.1,0.1],
        [0.3,0.1,0.1,0.1,0.3,0.1],
        [0.2,0.2,0.1,0.1,0.3,0.1],
        [0.1,0.3,0.1,0.1,0.3,0.1],
        [0.1,0.2,0.2,0.1,0.3,0.1],
        [0.1,0.1,0.3,0.3,0.1,0.1],
        [0.3,0.2,0.1,0.1,0.2,0.1],
        [0.3,0.2,0.2,0.2,0.1,0.1],
        [0.1,0.1,0.3,0.3,0.1,0.1],
        [0.3,0.2,0.1,0.1,0.2,0.1],
    ]);
    var data6_exc = splitData_age([[0.2, 0.1, 0.2, 0.2, 0.1, 0.1], [0.2, 0.2, 0.1, 0.2, 0.1, 0.1], [0.1, 0.2, 0.2, 0.1, 0.2, 0.1], [0.2, 0.2, 0.2, 0.2, 0.1, 0.1], [0.1, 0.4, 0.1, 0.2, 0.1, 0.1], [0.2, 0.3, 0.2, 0.1, 0.1, 0.1], [0.1, 0.3, 0.2, 0.1, 0.1, 0.1], [0.2, 0.2, 0.2, 0.2, 0.1, 0.1], [0.1, 0.3, 0.1, 0.2, 0.1, 0.1], [0.2, 0.2, 0.2, 0.2, 0.1, 0.1], [0.2, 0.3, 0.1, 0.2, 0.1, 0.1], [0.1, 0.3, 0.1, 0.2, 0.2, 0.1], [0.2, 0.3, 0.1, 0.1, 0.1, 0.1], [0.1, 0.2, 0.2, 0.1, 0.2, 0.1], [0.2, 0.2, 0.1, 0.1, 0.2, 0.1], [0.2, 0.2, 0.2, 0.1, 0.1, 0.1], [0.1, 0.3, 0.1, 0.1, 0.2, 0.1], [0.1, 0.3, 0.2, 0.1, 0.2, 0.1], [0.1, 0.3, 0.2, 0.2, 0.1, 0.1], [0.2, 0.1, 0.2, 0.2, 0.1, 0.1], [0.2, 0.4, 0.1, 0.1, 0.1, 0.1], [0.1, 0.3, 0.1, 0.2, 0.2, 0.1], [0.1, 0.4, 0.1, 0.1, 0.2, 0.1], [0.1, 0.2, 0.2, 0.2, 0.2, 0.1], [0.1, 0.5, 0.1, 0.1, 0.1, 0.1], [0.1, 0.3, 0.2, 0.1, 0.2, 0.1], [0.1, 0.4, 0.1, 0.1, 0.2, 0.1], [0.2, 0.0, 0.2, 0.2, 0.2, 0.1], [0.2, 0.2, 0.2, 0.1, 0.2, 0.1], [0.2, 0.0, 0.2, 0.2, 0.2, 0.1], [0.1, 0.2, 0.2, 0.2, 0.1, 0.1], [0.1, 0.4, 0.1, 0.1, 0.1, 0.1], [0.2, 0.2, 0.1, 0.2, 0.2, 0.1], [0.2, 0.2, 0.1, 0.2, 0.2, 0.1], [0.2, 0.1, 0.1, 0.2, 0.2, 0.1], [0.2, 0.3, 0.2, 0.1, 0.1, 0.1], [0.2, 0.1, 0.2, 0.2, 0.2, 0.1], [0.1, 0.3, 0.2, 0.2, 0.1, 0.1], [0.1, 0.1, 0.2, 0.2, 0.2, 0.1], [0.1, 0.2, 0.2, 0.1, 0.2, 0.1], [0.1, 0.3, 0.2, 0.1, 0.1, 0.1], [0.1, 0.2, 0.2, 0.2, 0.2, 0.1], [0.2, 0.2, 0.2, 0.2, 0.1, 0.1], [0.1, 0.4, 0.1, 0.2, 0.1, 0.1], [0.2, 0.1, 0.2, 0.2, 0.1, 0.1], [0.1, 0.1, 0.2, 0.2, 0.2, 0.1], [0.2, 0.4, 0.1, 0.1, 0.1, 0.1], [0.1, 0.3, 0.2, 0.1, 0.2, 0.1], [0.1, 0.4, 0.1, 0.1, 0.1, 0.1], [0.2, 0.3, 0.2, 0.1, 0.1, 0.1], [0.1, 0.2, 0.2, 0.1, 0.2, 0.1], [0.2, 0.3, 0.1, 0.1, 0.1, 0.1], [0.1, 0.4, 0.1, 0.2, 0.1, 0.1], [0.1, 0.2, 0.2, 0.2, 0.1, 0.1], [0.1, 0.3, 0.1, 0.2, 0.2, 0.1], [0.1, 0.3, 0.2, 0.1, 0.2, 0.1], [0.1, 0.3, 0.2, 0.2, 0.1, 0.1], [0.1, 0.3, 0.2, 0.1, 0.2, 0.1], [0.2, 0.3, 0.1, 0.2, 0.1, 0.1], [0.1, 0.3, 0.1, 0.2, 0.1, 0.1], [0.1, 0.3, 0.1, 0.2, 0.2, 0.1], [0.2, 0.3, 0.1, 0.1, 0.2, 0.1], [0.2, 0.4, 0.1, 0.1, 0.1, 0.1], [0.2, 0.1, 0.1, 0.2, 0.2, 0.1], [0.1, 0.4, 0.1, 0.1, 0.2, 0.1], [0.2, 0.3, 0.1, 0.2, 0.1, 0.1], [0.2, 0.1, 0.2, 0.1, 0.2, 0.1], [0.2, 0.2, 0.1, 0.1, 0.2, 0.1], [0.2, 0.2, 0.1, 0.2, 0.1, 0.1], [0.1, 0.4, 0.2, 0.1, 0.1, 0.1], [0.2, 0.3, 0.1, 0.1, 0.1, 0.1], [0.1, 0.3, 0.1, 0.2, 0.2, 0.1], [0.2, 0.1, 0.1, 0.2, 0.2, 0.1], [0.1, 0.3, 0.1, 0.1, 0.2, 0.1], [0.1, 0.3, 0.2, 0.1, 0.1, 0.1], [0.2, 0.2, 0.1, 0.1, 0.2, 0.1], [0.2, 0.1, 0.2, 0.2, 0.1, 0.1], [0.1, 0.1, 0.2, 0.2, 0.2, 0.1], [0.2, 0.3, 0.1, 0.1, 0.1, 0.1], [0.2, 0.1, 0.2, 0.2, 0.1, 0.1], [0.1, 0.4, 0.1, 0.1, 0.1, 0.1], [0.1, 0.3, 0.2, 0.1, 0.1, 0.1], [0.1, 0.3, 0.2, 0.2, 0.1, 0.1], [0.2, 0.3, 0.1, 0.1, 0.2, 0.1], [0.2, 0.3, 0.2, 0.1, 0.1, 0.1], [0.2, 0.1, 0.1, 0.2, 0.2, 0.1], [0.1, 0.3, 0.1, 0.2, 0.1, 0.1], [0.1, 0.4, 0.2, 0.1, 0.1, 0.1], [0.1, 0.3, 0.1, 0.1, 0.2, 0.1], [0.1, 0.3, 0.2, 0.2, 0.1, 0.1], [0.1, 0.3, 0.2, 0.1, 0.1, 0.1], [0.2, 0.2, 0.2, 0.1, 0.1, 0.1], [0.2, 0.3, 0.1, 0.2, 0.1, 0.1]]);
    function splitData_age(rawData) {
        var values = [];
        for (var i = 0; i < rawData.length; i++) {
            values.push(rawData[i])
        }
        return {
            values: values
        };
    }
    var data_bar4 = data6.values[0];
    var data_bar4_exc = data6_exc.values[0];
    //已订票旅客同行人数分布
    var data7 = splitData_group([
        [0.1,0.2,0.3,0.1,0.3],
        [0.3,0.2,0.2,0.1,0.2],
        [0.4,0.1,0.1,0.1,0.3],
        [0.3,0.2,0.1,0.1,0.3],
        [0.2,0.3,0.1,0.1,0.3],
        [0.2,0.2,0.2,0.1,0.3],
        [0.2,0.1,0.3,0.3,0.1],
        [0.1,0.2,0.4,0.1,0.2],
        [0.1,0.2,0.5,0.2,0.1],
        [0.1,0.2,0.3,0.1,0.3],
        [0.3,0.2,0.2,0.1,0.2],
        [0.4,0.1,0.1,0.1,0.3],
        [0.3,0.2,0.1,0.1,0.3],
        [0.2,0.3,0.1,0.1,0.3],
        [0.2,0.2,0.2,0.1,0.3],
        [0.2,0.1,0.3,0.3,0.1],
        [0.1,0.2,0.4,0.1,0.2],
        [0.1,0.2,0.5,0.2,0.1],
        [0.1,0.2,0.3,0.1,0.3],
        [0.3,0.2,0.2,0.1,0.2],
        [0.4,0.1,0.1,0.1,0.3],
        [0.3,0.2,0.1,0.1,0.3],
        [0.2,0.3,0.1,0.1,0.3],
        [0.2,0.2,0.2,0.1,0.3],
        [0.2,0.1,0.3,0.3,0.1],
        [0.1,0.2,0.4,0.1,0.2],
        [0.1,0.2,0.5,0.2,0.1],
        [0.1,0.2,0.3,0.1,0.3],
        [0.3,0.2,0.2,0.1,0.2],
        [0.4,0.1,0.1,0.1,0.3],
        [0.3,0.2,0.1,0.1,0.3],
        [0.2,0.3,0.1,0.1,0.3],
        [0.2,0.2,0.2,0.1,0.3],
        [0.2,0.1,0.3,0.3,0.1],
        [0.1,0.2,0.4,0.1,0.2],
        [0.1,0.2,0.5,0.2,0.1],
        [0.1,0.2,0.3,0.1,0.3],
        [0.3,0.2,0.2,0.1,0.2],
        [0.4,0.1,0.1,0.1,0.3],
        [0.3,0.2,0.1,0.1,0.3],
        [0.2,0.3,0.1,0.1,0.3],
        [0.2,0.2,0.2,0.1,0.3],
        [0.2,0.1,0.3,0.3,0.1],
        [0.1,0.2,0.4,0.1,0.2],
        [0.1,0.2,0.5,0.2,0.1],
        [0.1,0.2,0.3,0.1,0.3],
        [0.3,0.2,0.2,0.1,0.2],
        [0.4,0.1,0.1,0.1,0.3],
        [0.3,0.2,0.1,0.1,0.3],
        [0.2,0.3,0.1,0.1,0.3],
        [0.2,0.2,0.2,0.1,0.3],
        [0.2,0.1,0.3,0.3,0.1],
        [0.1,0.2,0.4,0.1,0.2],
        [0.1,0.2,0.5,0.2,0.1],
        [0.1,0.2,0.3,0.1,0.3],
        [0.3,0.2,0.2,0.1,0.2],
        [0.4,0.1,0.1,0.1,0.3],
        [0.3,0.2,0.1,0.1,0.3],
        [0.2,0.3,0.1,0.1,0.3],
        [0.2,0.2,0.2,0.1,0.3],
        [0.2,0.1,0.3,0.3,0.1],
        [0.1,0.2,0.4,0.1,0.2],
        [0.1,0.2,0.5,0.2,0.1],
        [0.1,0.2,0.3,0.1,0.3],
        [0.3,0.2,0.2,0.1,0.2],
        [0.4,0.1,0.1,0.1,0.3],
        [0.3,0.2,0.1,0.1,0.3],
        [0.2,0.3,0.1,0.1,0.3],
        [0.2,0.2,0.2,0.1,0.3],
        [0.2,0.1,0.3,0.3,0.1],
        [0.1,0.2,0.4,0.1,0.2],
        [0.1,0.2,0.5,0.2,0.1],
        [0.4,0.1,0.1,0.1,0.3],
        [0.3,0.2,0.1,0.1,0.3],
        [0.2,0.3,0.1,0.1,0.3],
        [0.2,0.2,0.2,0.1,0.3],
        [0.2,0.1,0.3,0.3,0.1],
        [0.1,0.2,0.4,0.1,0.2],
        [0.1,0.2,0.5,0.2,0.1],
        [0.1,0.2,0.3,0.1,0.3],
        [0.3,0.2,0.2,0.1,0.2],
        [0.4,0.1,0.1,0.1,0.3],
        [0.3,0.2,0.1,0.1,0.3],
        [0.2,0.3,0.1,0.1,0.3],
        [0.2,0.2,0.2,0.1,0.3],
        [0.2,0.1,0.3,0.3,0.1],
        [0.1,0.2,0.4,0.1,0.2],
        [0.1,0.2,0.5,0.2,0.1],
        [0.1,0.2,0.4,0.1,0.2],
    ]);
    var data7_exc = splitData_group([[0.2, 0.1, 0.2, 0.2, 0.3], [0.2, 0.2, 0.2, 0.2, 0.2], [0.1, 0.2, 0.2, 0.2, 0.3], [0.2, 0.2, 0.1, 0.2, 0.3], [0.1, 0.4, 0.2, 0.1, 0.3], [0.2, 0.2, 0.2, 0.1, 0.3], [0.1, 0.2, 0.2, 0.2, 0.1], [0.2, 0.2, 0.2, 0.2, 0.2], [0.2, 0.3, 0.2, 0.1, 0.1], [0.1, 0.3, 0.1, 0.2, 0.3], [0.1, 0.3, 0.2, 0.1, 0.2], [0.1, 0.4, 0.2, 0.1, 0.3], [0.1, 0.4, 0.1, 0.1, 0.3], [0.1, 0.4, 0.1, 0.1, 0.3], [0.1, 0.2, 0.2, 0.2, 0.3], [0.1, 0.3, 0.2, 0.1, 0.1], [0.1, 0.4, 0.1, 0.1, 0.2], [0.1, 0.2, 0.2, 0.2, 0.1], [0.1, 0.2, 0.2, 0.2, 0.3], [0.1, 0.2, 0.2, 0.2, 0.2], [0.2, 0.3, 0.1, 0.2, 0.3], [0.1, 0.4, 0.2, 0.1, 0.3], [0.1, 0.4, 0.1, 0.2, 0.3], [0.2, 0.2, 0.2, 0.1, 0.3], [0.1, 0.2, 0.2, 0.2, 0.1], [0.1, 0.2, 0.2, 0.2, 0.2], [0.2, 0.3, 0.1, 0.1, 0.1], [0.2, 0.3, 0.2, 0.1, 0.3], [0.1, 0.3, 0.2, 0.2, 0.2], [0.2, 0.3, 0.2, 0.1, 0.3], [0.2, 0.4, 0.1, 0.1, 0.3], [0.1, 0.5, 0.1, 0.1, 0.3], [0.1, 0.2, 0.2, 0.2, 0.3], [0.2, 0.2, 0.2, 0.2, 0.1], [0.1, 0.4, 0.1, 0.2, 0.2], [0.2, 0.2, 0.2, 0.2, 0.1], [0.1, 0.4, 0.1, 0.1, 0.3], [0.1, 0.4, 0.2, 0.1, 0.2], [0.1, 0.3, 0.2, 0.1, 0.3], [0.1, 0.4, 0.2, 0.1, 0.3], [0.1, 0.3, 0.1, 0.2, 0.3], [0.1, 0.3, 0.1, 0.2, 0.3], [0.2, 0.4, 0.1, 0.1, 0.1], [0.2, 0.2, 0.2, 0.2, 0.2], [0.1, 0.4, 0.1, 0.2, 0.1], [0.1, 0.4, 0.2, 0.1, 0.3], [0.1, 0.4, 0.1, 0.2, 0.2], [0.1, 0.4, 0.1, 0.2, 0.3], [0.1, 0.3, 0.2, 0.2, 0.3], [0.1, 0.3, 0.1, 0.2, 0.3], [0.1, 0.4, 0.2, 0.1, 0.3], [0.2, 0.3, 0.1, 0.1, 0.1], [0.2, 0.3, 0.1, 0.1, 0.2], [0.1, 0.2, 0.2, 0.2, 0.1], [0.1, 0.3, 0.1, 0.2, 0.3], [0.1, 0.3, 0.2, 0.2, 0.2], [0.2, 0.2, 0.2, 0.2, 0.3], [0.1, 0.3, 0.2, 0.2, 0.3], [0.1, 0.3, 0.2, 0.1, 0.3], [0.2, 0.3, 0.1, 0.2, 0.3], [0.1, 0.4, 0.2, 0.1, 0.1], [0.1, 0.2, 0.2, 0.2, 0.2], [0.1, 0.3, 0.1, 0.2, 0.1], [0.2, 0.2, 0.2, 0.1, 0.3], [0.2, 0.4, 0.1, 0.1, 0.2], [0.1, 0.2, 0.2, 0.2, 0.3], [0.1, 0.3, 0.2, 0.1, 0.3], [0.1, 0.4, 0.2, 0.1, 0.3], [0.1, 0.3, 0.2, 0.1, 0.3], [0.1, 0.3, 0.2, 0.2, 0.1], [0.2, 0.2, 0.2, 0.1, 0.2], [0.2, 0.2, 0.2, 0.1, 0.1], [0.2, 0.3, 0.2, 0.1, 0.3], [0.2, 0.3, 0.2, 0.1, 0.3], [0.1, 0.3, 0.2, 0.2, 0.3], [0.1, 0.3, 0.2, 0.2, 0.3], [0.2, 0.2, 0.1, 0.2, 0.1], [0.1, 0.3, 0.2, 0.1, 0.2], [0.2, 0.2, 0.2, 0.1, 0.1], [0.1, 0.4, 0.1, 0.1, 0.3], [0.1, 0.4, 0.1, 0.1, 0.2], [0.2, 0.2, 0.2, 0.1, 0.3], [0.2, 0.3, 0.1, 0.1, 0.3], [0.2, 0.3, 0.2, 0.1, 0.3], [0.1, 0.3, 0.2, 0.1, 0.3], [0.2, 0.3, 0.1, 0.2, 0.1], [0.1, 0.2, 0.2, 0.2, 0.2], [0.1, 0.3, 0.1, 0.2, 0.1], [0.2, 0.2, 0.1, 0.2, 0.2]]);
    function splitData_group(rawData) {
        var values = [];
        for (var i = 0; i < rawData.length; i++) {
            values.push(rawData[i])
        }
        return {
            values: values
        };
    }
    var data_bar5 = data7.values[0];
    var data_bar5_exc = data7_exc.values[0];

    //已订票旅客性别分布
    var data8 = splitData_sex([
        [0.2,0.8],
        [0.3,0.7],
        [0.1,0.9],
        [0.5,0.5],
        [0.4,0.6],
        [0.4,0.6],
        [0.6,0.4],
        [0.5,0.5],
        [0.45,0.55],
        [0.2,0.8],
        [0.3,0.7],
        [0.1,0.9],
        [0.5,0.5],
        [0.4,0.6],
        [0.4,0.6],
        [0.6,0.4],
        [0.5,0.5],
        [0.45,0.55],
        [0.2,0.8],
        [0.3,0.7],
        [0.1,0.9],
        [0.5,0.5],
        [0.4,0.6],
        [0.4,0.6],
        [0.6,0.4],
        [0.5,0.5],
        [0.45,0.55],
        [0.2,0.8],
        [0.3,0.7],
        [0.1,0.9],
        [0.5,0.5],
        [0.4,0.6],
        [0.4,0.6],
        [0.6,0.4],
        [0.5,0.5],
        [0.45,0.55],
        [0.2,0.8],
        [0.3,0.7],
        [0.1,0.9],
        [0.5,0.5],
        [0.4,0.6],
        [0.4,0.6],
        [0.6,0.4],
        [0.5,0.5],
        [0.45,0.55],
        [0.2,0.8],
        [0.3,0.7],
        [0.1,0.9],
        [0.5,0.5],
        [0.4,0.6],
        [0.4,0.6],
        [0.6,0.4],
        [0.5,0.5],
        [0.45,0.55],
        [0.2,0.8],
        [0.3,0.7],
        [0.1,0.9],
        [0.5,0.5],
        [0.4,0.6],
        [0.4,0.6],
        [0.6,0.4],
        [0.5,0.5],
        [0.45,0.55],
        [0.2,0.8],
        [0.3,0.7],
        [0.1,0.9],
        [0.5,0.5],
        [0.4,0.6],
        [0.4,0.6],
        [0.6,0.4],
        [0.5,0.5],
        [0.45,0.55],
        [0.2,0.8],
        [0.3,0.7],
        [0.1,0.9],
        [0.5,0.5],
        [0.4,0.6],
        [0.4,0.6],
        [0.6,0.4],
        [0.5,0.5],
        [0.45,0.55],
        [0.2,0.8],
        [0.3,0.7],
        [0.1,0.9],
        [0.5,0.5],
        [0.4,0.6],
        [0.4,0.6],
        [0.6,0.4],
        [0.5,0.5],
        [0.45,0.55]

    ]);
    var data8_exc = splitData_sex([[0.7, 0.3], [0.2, 0.8], [0.1, 0.9], [0.9, 0.1], [0.7, 0.3], [0.6, 0.4], [0.1, 0.9], [0.6, 0.4], [0.5, 0.5], [0.2, 0.8], [0.9, 0.1], [0.9, 0.1], [0.3, 0.7], [0.9, 0.1], [0.7, 0.3], [0.3, 0.7], [0.5, 0.5], [0.9, 0.1], [0.5, 0.5], [0.3, 0.7], [0.2, 0.8], [0.5, 0.5], [0.6, 0.4], [0.9, 0.1], [0.5, 0.5], [0.7, 0.3], [0.1, 0.9], [0.5, 0.5], [0.3, 0.7], [0.3, 0.7], [0.5, 0.5], [0.5, 0.5], [0.2, 0.8], [0.5, 0.5], [0.5, 0.5], [0.1, 0.9], [0.5, 0.5], [0.3, 0.7], [0.2, 0.8], [0.5, 0.5], [0.7, 0.3], [0.3, 0.7], [0.5, 0.5], [0.7, 0.3], [0.6, 0.4], [0.2, 0.8], [0.3, 0.7], [0.1, 0.9], [0.7, 0.3], [0.5, 0.5], [0.7, 0.3], [0.3, 0.7], [0.2, 0.8], [0.5, 0.5], [0.3, 0.7], [0.2, 0.8], [0.6, 0.4], [0.2, 0.8], [0.7, 0.3], [0.2, 0.8], [0.3, 0.7], [0.7, 0.3], [0.2, 0.8], [0.3, 0.7], [0.2, 0.8], [0.1, 0.9], [0.7, 0.3], [0.1, 0.9], [0.9, 0.1], [0.3, 0.7], [0.2, 0.8], [0.9, 0.1], [0.3, 0.7], [0.2, 0.8], [0.6, 0.4], [0.7, 0.3], [0.3, 0.7], [0.9, 0.1], [0.6, 0.4], [0.1, 0.9], [0.5, 0.5], [0.6, 0.4], [0.3, 0.7], [0.3, 0.7], [0.9, 0.1], [0.1, 0.9], [0.2, 0.8], [0.5, 0.5], [0.9, 0.1], [0.6, 0.4]]);
    function splitData_sex(rawData) {
        var values = [];
        for (var i = 0; i < rawData.length; i++) {
            values.push(rawData[i])
        }
        return {
            values: values
        };
    }
    var data_bar6 = data8.values[0];
    var data_bar6_exc = data8_exc.values[0];

    //已订票团散客分布
    var data9 = splitData_group1([
        [0.2,0.8],
        [0.3,0.7],
        [0.4,0.6],
        [0.6,0.4],
        [0.5,0.5],
        [0.45,0.55],
        [0.2,0.8],
        [0.3,0.7],
        [0.1,0.9],
        [0.5,0.5],
        [0.4,0.6],
        [0.4,0.6],
        [0.6,0.4],
        [0.5,0.5],
        [0.45,0.55],
        [0.1,0.9],
        [0.5,0.5],
        [0.4,0.6],
        [0.4,0.6],
        [0.6,0.4],
        [0.5,0.5],
        [0.45,0.55],
        [0.2,0.8],
        [0.3,0.7],
        [0.1,0.9],
        [0.5,0.5],
        [0.4,0.6],
        [0.2,0.8],
        [0.3,0.7],
        [0.1,0.9],
        [0.5,0.5],
        [0.4,0.6],
        [0.4,0.6],
        [0.6,0.4],
        [0.5,0.5],
        [0.45,0.55],
        [0.2,0.8],
        [0.3,0.7],
        [0.1,0.9],
        [0.5,0.5],
        [0.4,0.6],
        [0.4,0.6],
        [0.6,0.4],
        [0.5,0.5],
        [0.45,0.55],
        [0.2,0.8],
        [0.3,0.7],
        [0.1,0.9],
        [0.5,0.5],
        [0.4,0.6],
        [0.4,0.6],
        [0.6,0.4],
        [0.5,0.5],
        [0.45,0.55],
        [0.2,0.8],
        [0.3,0.7],
        [0.1,0.9],
        [0.5,0.5],
        [0.4,0.6],
        [0.4,0.6],
        [0.6,0.4],
        [0.5,0.5],
        [0.45,0.55],
        [0.2,0.8],
        [0.3,0.7],
        [0.1,0.9],
        [0.5,0.5],
        [0.4,0.6],
        [0.4,0.6],
        [0.6,0.4],
        [0.5,0.5],
        [0.45,0.55],
        [0.5,0.5],
        [0.4,0.6],
        [0.4,0.6],
        [0.6,0.4],
        [0.5,0.5],
        [0.45,0.55],
        [0.2,0.8],
        [0.3,0.7],
        [0.1,0.9],
        [0.5,0.5],
        [0.4,0.6],
        [0.4,0.6],
        [0.6,0.4],
        [0.5,0.5],
        [0.45,0.55],
        [0.5,0.5],
        [0.45,0.55]

    ]);
    var data9_exc = splitData_group1([[0.3, 0.7], [0.6, 0.4], [0.9, 0.1], [0.5, 0.5], [0.7, 0.3], [0.9, 0.1], [0.2, 0.8], [0.9, 0.1], [0.6, 0.4], [0.3, 0.7], [0.2, 0.8], [0.6, 0.4], [0.3, 0.7], [0.2, 0.8], [0.6, 0.4], [0.3, 0.7], [0.3, 0.7], [0.3, 0.7], [0.6, 0.4], [0.1, 0.9], [0.5, 0.5], [0.7, 0.3], [0.2, 0.8], [0.9, 0.1], [0.5, 0.5], [0.9, 0.1], [0.2, 0.8], [0.6, 0.4], [0.6, 0.4], [0.3, 0.7], [0.3, 0.7], [0.1, 0.9], [0.2, 0.8], [0.5, 0.5], [0.5, 0.5], [0.2, 0.8], [0.7, 0.3], [0.9, 0.1], [0.3, 0.7], [0.9, 0.1], [0.1, 0.9], [0.6, 0.4], [0.1, 0.9], [0.7, 0.3], [0.7, 0.3], [0.5, 0.5], [0.7, 0.3], [0.9, 0.1], [0.5, 0.5], [0.1, 0.9], [0.9, 0.1], [0.9, 0.1], [0.2, 0.8], [0.3, 0.7], [0.6, 0.4], [0.1, 0.9], [0.1, 0.9], [0.5, 0.5], [0.3, 0.7], [0.5, 0.5], [0.7, 0.3], [0.2, 0.8], [0.6, 0.4], [0.5, 0.5], [0.2, 0.8], [0.2, 0.8], [0.1, 0.9], [0.5, 0.5], [0.1, 0.9], [0.6, 0.4], [0.7, 0.3], [0.1, 0.9], [0.6, 0.4], [0.9, 0.1], [0.3, 0.7], [0.9, 0.1], [0.3, 0.7], [0.3, 0.7], [0.3, 0.7], [0.2, 0.8], [0.9, 0.1], [0.3, 0.7], [0.3, 0.7], [0.9, 0.1], [0.7, 0.3], [0.5, 0.5], [0.7, 0.3], [0.7, 0.3], [0.6, 0.4]]);
    function splitData_group1(rawData) {
        var values = [];
        for (var i = 0; i < rawData.length; i++) {
            values.push(rawData[i])
        }
        return {
            values: values
        };
    }
    var data_bar7 = data9.values[0];
    var data_bar7_exc = data9_exc.values[0];

    //目标航班与市场价格分布图数据
    //目标航班座位数与价格的分布数据
    var data10 = splitData_price([
        [0,10,10,20,30,40,50,40,30,20,10,8,5],
        [1,12,12,20,20,50,60,30,20,10,10,6,6],
        [2,8,10,25,25,45,66,33,25,16,10,5,5],
        [1,12,12,20,20,50,60,30,20,10,10,6,6],
        [0,10,10,20,30,40,50,40,30,20,10,8,5],
        [0,10,10,20,30,40,50,40,30,20,10,8,5],
        [1,12,12,20,20,50,60,30,20,10,10,6,6],
        [2,8,10,25,25,45,66,33,25,16,10,5,5],
        [0,10,10,20,30,40,50,40,30,20,10,8,5],
        [1,12,12,20,20,50,60,30,20,10,10,6,6],
        [2,8,10,25,25,45,66,33,25,16,10,5,5],
        [0,10,10,20,30,40,50,40,30,20,10,8,5],
        [1,12,12,20,20,50,60,30,20,10,10,6,6],
        [2,8,10,25,25,45,66,33,25,16,10,5,5],
        [0,10,10,20,30,40,50,40,30,20,10,8,5],
        [1,12,12,20,20,50,60,30,20,10,10,6,6],
        [2,8,10,25,25,45,66,33,25,16,10,5,5],
        [0,10,10,20,30,40,50,40,30,20,10,8,5],
        [1,12,12,20,20,50,60,30,20,10,10,6,6],
        [2,8,10,25,25,45,66,33,25,16,10,5,5],
        [0,10,10,20,30,40,50,40,30,20,10,8,5],
        [1,12,12,20,20,50,60,30,20,10,10,6,6],
        [2,8,10,25,25,45,66,33,25,16,10,5,5],
        [0,10,10,20,30,40,50,40,30,20,10,8,5],
        [1,12,12,20,20,50,60,30,20,10,10,6,6],
        [2,8,10,25,25,45,66,33,25,16,10,5,5],
        [0,10,10,20,30,40,50,40,30,20,10,8,5],
        [1,12,12,20,20,50,60,30,20,10,10,6,6],
        [2,8,10,25,25,45,66,33,25,16,10,5,5],
        [0,10,10,20,30,40,50,40,30,20,10,8,5],
        [1,12,12,20,20,50,60,30,20,10,10,6,6],
        [2,8,10,25,25,45,66,33,25,16,10,5,5],
        [0,10,10,20,30,40,50,40,30,20,10,8,5],
        [1,12,12,20,20,50,60,30,20,10,10,6,6],
        [2,8,10,25,25,45,66,33,25,16,10,5,5],
        [0,10,10,20,30,40,50,40,30,20,10,8,5],
        [1,12,12,20,20,50,60,30,20,10,10,6,6],
        [2,8,10,25,25,45,66,33,25,16,10,5,5],
        [0,10,10,20,30,40,50,40,30,20,10,8,5],
        [1,12,12,20,20,50,60,30,20,10,10,6,6],
        [2,8,10,25,25,45,66,33,25,16,10,5,5],
        [0,10,10,20,30,40,50,40,30,20,10,8,5],
        [1,12,12,20,20,50,60,30,20,10,10,6,6],
        [2,8,10,25,25,45,66,33,25,16,10,5,5],
        [0,10,10,20,30,40,50,40,30,20,10,8,5],
        [1,12,12,20,20,50,60,30,20,10,10,6,6],
        [2,8,10,25,25,45,66,33,25,16,10,5,5],
        [0,10,10,20,30,40,50,40,30,20,10,8,5],
        [1,12,12,20,20,50,60,30,20,10,10,6,6],
        [2,8,10,25,25,45,66,33,25,16,10,5,5],
        [0,10,10,20,30,40,50,40,30,20,10,8,5],
        [1,12,12,20,20,50,60,30,20,10,10,6,6],
        [2,8,10,25,25,45,66,33,25,16,10,5,5],
        [0,10,10,20,30,40,50,40,30,20,10,8,5],
        [1,12,12,20,20,50,60,30,20,10,10,6,6],
        [2,8,10,25,25,45,66,33,25,16,10,5,5],
        [0,10,10,20,30,40,50,40,30,20,10,8,5],
        [1,12,12,20,20,50,60,30,20,10,10,6,6],
        [2,8,10,25,25,45,66,33,25,16,10,5,5],
        [0,10,10,20,30,40,50,40,30,20,10,8,5],
        [1,12,12,20,20,50,60,30,20,10,10,6,6],
        [2,8,10,25,25,45,66,33,25,16,10,5,5],
        [0,10,10,20,30,40,50,40,30,20,10,8,5],
        [1,12,12,20,20,50,60,30,20,10,10,6,6],
        [2,8,10,25,25,45,66,33,25,16,10,5,5],
        [1,12,12,20,20,50,60,30,20,10,10,6,6],
        [0,10,10,20,30,40,50,40,30,20,10,8,5],
        [1,12,12,20,20,50,60,30,20,10,10,6,6],
        [0,10,10,20,30,40,50,40,30,20,10,8,5],
        [1,12,12,20,20,50,60,30,20,10,10,6,6],
        [0,10,10,20,30,40,50,40,30,20,10,8,5],
        [1,12,12,20,20,50,60,30,20,10,10,6,6],
        [2,8,10,25,25,45,66,33,25,16,10,5,5],
        [1,12,12,20,20,50,60,30,20,10,10,6,6],
        [0,10,10,20,30,40,50,40,30,20,10,8,5],
        [0,10,10,20,30,40,50,40,30,20,10,8,5],
        [1,12,12,20,20,50,60,30,20,10,10,6,6],
        [2,8,10,25,25,45,66,33,25,16,10,5,5],
        [0,10,10,20,30,40,50,40,30,20,10,8,5],
        [1,12,12,20,20,50,60,30,20,10,10,6,6],
        [2,8,10,25,25,45,66,33,25,16,10,5,5],
        [0,10,10,20,30,40,50,40,30,20,10,8,5],
        [1,12,12,20,20,50,60,30,20,10,10,6,6],
        [2,8,10,25,25,45,66,33,25,16,10,5,5],
        [0,10,10,20,30,40,50,40,30,20,10,8,5],
        [1,12,12,20,20,50,60,30,20,10,10,6,6],
        [2,8,10,25,25,45,66,33,25,16,10,5,5],
        [0,10,10,20,30,40,50,40,30,20,10,8,5],
        [1,12,12,20,20,50,60,30,20,10,10,6,6],
        [2,8,10,25,25,45,66,33,25,16,10,5,5],
        [0,10,10,20,30,40,50,40,30,20,10,8,5],
        [1,12,12,20,20,50,60,30,20,10,10,6,6],
        [2,8,10,25,25,45,66,33,25,16,10,5,5],
        [0,10,10,20,30,40,50,40,30,20,10,8,5],
        [1,12,12,20,20,50,60,30,20,10,10,6,6],
        [2,8,10,25,25,45,66,33,25,16,10,5,5],
        [0,10,10,20,30,40,50,40,30,20,10,8,5],
        [1,12,12,20,20,50,60,30,20,10,10,6,6],
        [2,8,10,25,25,45,66,33,25,16,10,5,5],
        [0,10,10,20,30,40,50,40,30,20,10,8,5],
        [1,12,12,20,20,50,60,30,20,10,10,6,6],
        [2,8,10,25,25,45,66,33,25,16,10,5,5],
        [0,10,10,20,30,40,50,40,30,20,10,8,5],
        [1,12,12,20,20,50,60,30,20,10,10,6,6],
        [2,8,10,25,25,45,66,33,25,16,10,5,5],
        [0,10,10,20,30,40,50,40,30,20,10,8,5],
        [1,12,12,20,20,50,60,30,20,10,10,6,6],
        [2,8,10,25,25,45,66,33,25,16,10,5,5],
        [0,10,10,20,30,40,50,40,30,20,10,8,5],
        [1,12,12,20,20,50,60,30,20,10,10,6,6],
        [2,8,10,25,25,45,66,33,25,16,10,5,5],
        [0,10,10,20,30,40,50,40,30,20,10,8,5],
        [1,12,12,20,20,50,60,30,20,10,10,6,6],
        [2,8,10,25,25,45,66,33,25,16,10,5,5],
        [0,10,10,20,30,40,50,40,30,20,10,8,5],
        [1,12,12,20,20,50,60,30,20,10,10,6,6],
        [2,8,10,25,25,45,66,33,25,16,10,5,5],
        [0,10,10,20,30,40,50,40,30,20,10,8,5],
        [1,12,12,20,20,50,60,30,20,10,10,6,6],
        [2,8,10,25,25,45,66,33,25,16,10,5,5],
        [0,10,10,20,30,40,50,40,30,20,10,8,5],
        [1,12,12,20,20,50,60,30,20,10,10,6,6],
        [2,8,10,25,25,45,66,33,25,16,10,5,5],
        [0,10,10,20,30,40,50,40,30,20,10,8,5],
        [1,12,12,20,20,50,60,30,20,10,10,6,6],
        [2,8,10,25,25,45,66,33,25,16,10,5,5],
        [0,10,10,20,30,40,50,40,30,20,10,8,5],
        [1,12,12,20,20,50,60,30,20,10,10,6,6],
        [2,8,10,25,25,45,66,33,25,16,10,5,5],
        [0,10,10,20,30,40,50,40,30,20,10,8,5],
        [1,12,12,20,20,50,60,30,20,10,10,6,6],
        [2,8,10,25,25,45,66,33,25,16,10,5,5],
        [0,10,10,20,30,40,50,40,30,20,10,8,5],
        [1,12,12,20,20,50,60,30,20,10,10,6,6],
        [2,8,10,25,25,45,66,33,25,16,10,5,5],
        [1,12,12,20,20,50,60,30,20,10,10,6,6],
        [0,10,10,20,30,40,50,40,30,20,10,8,5],
        [1,12,12,20,20,50,60,30,20,10,10,6,6],
        [0,10,10,20,30,40,50,40,30,20,10,8,5],
        [1,12,12,20,20,50,60,30,20,10,10,6,6]
    ]);
    var data10_exc = splitData_price([
        [0,10,10,20,30,40,50,40,30,20,10,8,5],
        [1,12,12,20,20,50,60,30,20,10,10,6,6],
        [2,8,10,25,25,45,66,33,25,16,10,5,5],
        [1,12,12,20,20,50,60,30,20,10,10,6,6],
        [0,10,10,20,30,40,50,40,30,20,10,8,5],
        [0,10,10,20,30,40,50,40,30,20,10,8,5],
        [1,12,12,20,20,50,60,30,20,10,10,6,6],
        [2,8,10,25,25,45,66,33,25,16,10,5,5],
        [0,10,10,20,30,40,50,40,30,20,10,8,5],
        [1,12,12,20,20,50,60,30,20,10,10,6,6],
        [2,8,10,25,25,45,66,33,25,16,10,5,5],
        [0,10,10,20,30,40,50,40,30,20,10,8,5],
        [1,12,12,20,20,50,60,30,20,10,10,6,6],
        [2,8,10,25,25,45,66,33,25,16,10,5,5],
        [0,10,10,20,30,40,50,40,30,20,10,8,5],
        [1,12,12,20,20,50,60,30,20,10,10,6,6],
        [2,8,10,25,25,45,66,33,25,16,10,5,5],
        [0,10,10,20,30,40,50,40,30,20,10,8,5],
        [1,12,12,20,20,50,60,30,20,10,10,6,6],
        [2,8,10,25,25,45,66,33,25,16,10,5,5],
        [0,10,10,20,30,40,50,40,30,20,10,8,5],
        [1,12,12,20,20,50,60,30,20,10,10,6,6],
        [2,8,10,25,25,45,66,33,25,16,10,5,5],
        [0,10,10,20,30,40,50,40,30,20,10,8,5],
        [1,12,12,20,20,50,60,30,20,10,10,6,6],
        [2,8,10,25,25,45,66,33,25,16,10,5,5],
        [0,10,10,20,30,40,50,40,30,20,10,8,5],
        [1,12,12,20,20,50,60,30,20,10,10,6,6],
        [2,8,10,25,25,45,66,33,25,16,10,5,5],
        [0,10,10,20,30,40,50,40,30,20,10,8,5],
        [1,12,12,20,20,50,60,30,20,10,10,6,6],
        [2,8,10,25,25,45,66,33,25,16,10,5,5],
        [0,10,10,20,30,40,50,40,30,20,10,8,5],
        [1,12,12,20,20,50,60,30,20,10,10,6,6],
        [2,8,10,25,25,45,66,33,25,16,10,5,5],
        [0,10,10,20,30,40,50,40,30,20,10,8,5],
        [1,12,12,20,20,50,60,30,20,10,10,6,6],
        [2,8,10,25,25,45,66,33,25,16,10,5,5],
        [0,10,10,20,30,40,50,40,30,20,10,8,5],
        [1,12,12,20,20,50,60,30,20,10,10,6,6],
        [2,8,10,25,25,45,66,33,25,16,10,5,5],
        [0,10,10,20,30,40,50,40,30,20,10,8,5],
        [1,12,12,20,20,50,60,30,20,10,10,6,6],
        [2,8,10,25,25,45,66,33,25,16,10,5,5],
        [0,10,10,20,30,40,50,40,30,20,10,8,5],
        [1,12,12,20,20,50,60,30,20,10,10,6,6],
        [2,8,10,25,25,45,66,33,25,16,10,5,5],
        [0,10,10,20,30,40,50,40,30,20,10,8,5],
        [1,12,12,20,20,50,60,30,20,10,10,6,6],
        [2,8,10,25,25,45,66,33,25,16,10,5,5],
        [0,10,10,20,30,40,50,40,30,20,10,8,5],
        [1,12,12,20,20,50,60,30,20,10,10,6,6],
        [2,8,10,25,25,45,66,33,25,16,10,5,5],
        [0,10,10,20,30,40,50,40,30,20,10,8,5],
        [1,12,12,20,20,50,60,30,20,10,10,6,6],
        [2,8,10,25,25,45,66,33,25,16,10,5,5],
        [0,10,10,20,30,40,50,40,30,20,10,8,5],
        [1,12,12,20,20,50,60,30,20,10,10,6,6],
        [2,8,10,25,25,45,66,33,25,16,10,5,5],
        [0,10,10,20,30,40,50,40,30,20,10,8,5],
        [1,12,12,20,20,50,60,30,20,10,10,6,6],
        [2,8,10,25,25,45,66,33,25,16,10,5,5],
        [0,10,10,20,30,40,50,40,30,20,10,8,5],
        [1,12,12,20,20,50,60,30,20,10,10,6,6],
        [2,8,10,25,25,45,66,33,25,16,10,5,5],
        [1,12,12,20,20,50,60,30,20,10,10,6,6],
        [0,10,10,20,30,40,50,40,30,20,10,8,5],
        [1,12,12,20,20,50,60,30,20,10,10,6,6],
        [0,10,10,20,30,40,50,40,30,20,10,8,5],
        [1,12,12,20,20,50,60,30,20,10,10,6,6],
        [0,10,10,20,30,40,50,40,30,20,10,8,5],
        [1,12,12,20,20,50,60,30,20,10,10,6,6],
        [2,8,10,25,25,45,66,33,25,16,10,5,5],
        [1,12,12,20,20,50,60,30,20,10,10,6,6],
        [0,10,10,20,30,40,50,40,30,20,10,8,5],
        [0,10,10,20,30,40,50,40,30,20,10,8,5],
        [1,12,12,20,20,50,60,30,20,10,10,6,6],
        [2,8,10,25,25,45,66,33,25,16,10,5,5],
        [0,10,10,20,30,40,50,40,30,20,10,8,5],
        [1,12,12,20,20,50,60,30,20,10,10,6,6],
        [2,8,10,25,25,45,66,33,25,16,10,5,5],
        [0,10,10,20,30,40,50,40,30,20,10,8,5],
        [1,12,12,20,20,50,60,30,20,10,10,6,6],
        [2,8,10,25,25,45,66,33,25,16,10,5,5],
        [0,10,10,20,30,40,50,40,30,20,10,8,5],
        [1,12,12,20,20,50,60,30,20,10,10,6,6],
        [2,8,10,25,25,45,66,33,25,16,10,5,5],
        [0,10,10,20,30,40,50,40,30,20,10,8,5],
        [1,12,12,20,20,50,60,30,20,10,10,6,6],
        [2,8,10,25,25,45,66,33,25,16,10,5,5],
        [0,10,10,20,30,40,50,40,30,20,10,8,5],
        [1,12,12,20,20,50,60,30,20,10,10,6,6],
        [2,8,10,25,25,45,66,33,25,16,10,5,5],
        [0,10,10,20,30,40,50,40,30,20,10,8,5],
        [1,12,12,20,20,50,60,30,20,10,10,6,6],
        [2,8,10,25,25,45,66,33,25,16,10,5,5],
        [0,10,10,20,30,40,50,40,30,20,10,8,5],
        [1,12,12,20,20,50,60,30,20,10,10,6,6],
        [2,8,10,25,25,45,66,33,25,16,10,5,5],
        [0,10,10,20,30,40,50,40,30,20,10,8,5],
        [1,12,12,20,20,50,60,30,20,10,10,6,6],
        [2,8,10,25,25,45,66,33,25,16,10,5,5],
        [0,10,10,20,30,40,50,40,30,20,10,8,5],
        [1,12,12,20,20,50,60,30,20,10,10,6,6],
        [2,8,10,25,25,45,66,33,25,16,10,5,5],
        [0,10,10,20,30,40,50,40,30,20,10,8,5],
        [1,12,12,20,20,50,60,30,20,10,10,6,6],
        [2,8,10,25,25,45,66,33,25,16,10,5,5],
        [0,10,10,20,30,40,50,40,30,20,10,8,5],
        [1,12,12,20,20,50,60,30,20,10,10,6,6],
        [2,8,10,25,25,45,66,33,25,16,10,5,5],
        [0,10,10,20,30,40,50,40,30,20,10,8,5],
        [1,12,12,20,20,50,60,30,20,10,10,6,6],
        [2,8,10,25,25,45,66,33,25,16,10,5,5],
        [0,10,10,20,30,40,50,40,30,20,10,8,5],
        [1,12,12,20,20,50,60,30,20,10,10,6,6],
        [2,8,10,25,25,45,66,33,25,16,10,5,5],
        [0,10,10,20,30,40,50,40,30,20,10,8,5],
        [1,12,12,20,20,50,60,30,20,10,10,6,6],
        [2,8,10,25,25,45,66,33,25,16,10,5,5],
        [0,10,10,20,30,40,50,40,30,20,10,8,5],
        [1,12,12,20,20,50,60,30,20,10,10,6,6],
        [2,8,10,25,25,45,66,33,25,16,10,5,5],
        [0,10,10,20,30,40,50,40,30,20,10,8,5],
        [1,12,12,20,20,50,60,30,20,10,10,6,6],
        [2,8,10,25,25,45,66,33,25,16,10,5,5],
        [0,10,10,20,30,40,50,40,30,20,10,8,5],
        [1,12,12,20,20,50,60,30,20,10,10,6,6],
        [2,8,10,25,25,45,66,33,25,16,10,5,5],
        [0,10,10,20,30,40,50,40,30,20,10,8,5],
        [1,12,12,20,20,50,60,30,20,10,10,6,6],
        [2,8,10,25,25,45,66,33,25,16,10,5,5],
        [0,10,10,20,30,40,50,40,30,20,10,8,5],
        [1,12,12,20,20,50,60,30,20,10,10,6,6],
        [2,8,10,25,25,45,66,33,25,16,10,5,5],
        [1,12,12,20,20,50,60,30,20,10,10,6,6],
        [0,10,10,20,30,40,50,40,30,20,10,8,5],
        [1,12,12,20,20,50,60,30,20,10,10,6,6],
        [0,10,10,20,30,40,50,40,30,20,10,8,5],
        [1,12,12,20,20,50,60,30,20,10,10,6,6]
    ]);

    //市场的座位与价格分布数据
    var data11 = splitData_allprice([
        [10,20,20,40,60,80,100,80,60,40,20,16,10],
        [15,25,25,25,60,90,110,70,50,50,30,20,10],
        [8,20,20,30,50,70,90,75,55,40,25,14,8],
        [10,20,20,40,60,80,100,80,60,40,20,16,10],
        [15,25,25,25,60,90,110,70,50,50,30,20,10],
        [8,20,20,30,50,70,90,75,55,40,25,14,8],
        [10,20,20,40,60,80,100,80,60,40,20,16,10],
        [15,25,25,25,60,90,110,70,50,50,30,20,10],
        [8,20,20,30,50,70,90,75,55,40,25,14,8],
        [10,20,20,40,60,80,100,80,60,40,20,16,10],
        [15,25,25,25,60,90,110,70,50,50,30,20,10],
        [8,20,20,30,50,70,90,75,55,40,25,14,8],
        [10,20,20,40,60,80,100,80,60,40,20,16,10],
        [15,25,25,25,60,90,110,70,50,50,30,20,10],
        [8,20,20,30,50,70,90,75,55,40,25,14,8],
        [10,20,20,40,60,80,100,80,60,40,20,16,10],
        [15,25,25,25,60,90,110,70,50,50,30,20,10],
        [8,20,20,30,50,70,90,75,55,40,25,14,8],
        [10,20,20,40,60,80,100,80,60,40,20,16,10],
        [15,25,25,25,60,90,110,70,50,50,30,20,10],
        [8,20,20,30,50,70,90,75,55,40,25,14,8],
        [10,20,20,40,60,80,100,80,60,40,20,16,10],
        [15,25,25,25,60,90,110,70,50,50,30,20,10],
        [8,20,20,30,50,70,90,75,55,40,25,14,8],
        [10,20,20,40,60,80,100,80,60,40,20,16,10],
        [15,25,25,25,60,90,110,70,50,50,30,20,10],
        [8,20,20,30,50,70,90,75,55,40,25,14,8],
        [10,20,20,40,60,80,100,80,60,40,20,16,10],
        [15,25,25,25,60,90,110,70,50,50,30,20,10],
        [8,20,20,30,50,70,90,75,55,40,25,14,8],
        [10,20,20,40,60,80,100,80,60,40,20,16,10],
        [15,25,25,25,60,90,110,70,50,50,30,20,10],
        [8,20,20,30,50,70,90,75,55,40,25,14,8],
        [10,20,20,40,60,80,100,80,60,40,20,16,10],
        [15,25,25,25,60,90,110,70,50,50,30,20,10],
        [8,20,20,30,50,70,90,75,55,40,25,14,8],
        [10,20,20,40,60,80,100,80,60,40,20,16,10],
        [15,25,25,25,60,90,110,70,50,50,30,20,10],
        [8,20,20,30,50,70,90,75,55,40,25,14,8],
        [10,20,20,40,60,80,100,80,60,40,20,16,10],
        [15,25,25,25,60,90,110,70,50,50,30,20,10],
        [8,20,20,30,50,70,90,75,55,40,25,14,8],
        [10,20,20,40,60,80,100,80,60,40,20,16,10],
        [15,25,25,25,60,90,110,70,50,50,30,20,10],
        [8,20,20,30,50,70,90,75,55,40,25,14,8],
        [10,20,20,40,60,80,100,80,60,40,20,16,10],
        [15,25,25,25,60,90,110,70,50,50,30,20,10],
        [8,20,20,30,50,70,90,75,55,40,25,14,8],
        [10,20,20,40,60,80,100,80,60,40,20,16,10],
        [15,25,25,25,60,90,110,70,50,50,30,20,10],
        [8,20,20,30,50,70,90,75,55,40,25,14,8],
        [10,20,20,40,60,80,100,80,60,40,20,16,10],
        [15,25,25,25,60,90,110,70,50,50,30,20,10],
        [8,20,20,30,50,70,90,75,55,40,25,14,8],
        [10,20,20,40,60,80,100,80,60,40,20,16,10],
        [15,25,25,25,60,90,110,70,50,50,30,20,10],
        [8,20,20,30,50,70,90,75,55,40,25,14,8],
        [10,20,20,40,60,80,100,80,60,40,20,16,10],
        [15,25,25,25,60,90,110,70,50,50,30,20,10],
        [8,20,20,30,50,70,90,75,55,40,25,14,8],
        [10,20,20,40,60,80,100,80,60,40,20,16,10],
        [15,25,25,25,60,90,110,70,50,50,30,20,10],
        [8,20,20,30,50,70,90,75,55,40,25,14,8],
        [10,20,20,40,60,80,100,80,60,40,20,16,10],
        [15,25,25,25,60,90,110,70,50,50,30,20,10],
        [8,20,20,30,50,70,90,75,55,40,25,14,8],
        [10,20,20,40,60,80,100,80,60,40,20,16,10],
        [15,25,25,25,60,90,110,70,50,50,30,20,10],
        [8,20,20,30,50,70,90,75,55,40,25,14,8],
        [10,20,20,40,60,80,100,80,60,40,20,16,10],
        [15,25,25,25,60,90,110,70,50,50,30,20,10],
        [8,20,20,30,50,70,90,75,55,40,25,14,8],
        [10,20,20,40,60,80,100,80,60,40,20,16,10],
        [15,25,25,25,60,90,110,70,50,50,30,20,10],
        [8,20,20,30,50,70,90,75,55,40,25,14,8],
        [10,20,20,40,60,80,100,80,60,40,20,16,10],
        [15,25,25,25,60,90,110,70,50,50,30,20,10],
        [8,20,20,30,50,70,90,75,55,40,25,14,8],
        [10,20,20,40,60,80,100,80,60,40,20,16,10],
        [15,25,25,25,60,90,110,70,50,50,30,20,10],
        [8,20,20,30,50,70,90,75,55,40,25,14,8],
        [10,20,20,40,60,80,100,80,60,40,20,16,10],
        [15,25,25,25,60,90,110,70,50,50,30,20,10],
        [8,20,20,30,50,70,90,75,55,40,25,14,8],
        [10,20,20,40,60,80,100,80,60,40,20,16,10],
        [15,25,25,25,60,90,110,70,50,50,30,20,10],
        [8,20,20,30,50,70,90,75,55,40,25,14,8],
        [10,20,20,40,60,80,100,80,60,40,20,16,10],
        [15,25,25,25,60,90,110,70,50,50,30,20,10],
        [8,20,20,30,50,70,90,75,55,40,25,14,8],
        [10,20,20,40,60,80,100,80,60,40,20,16,10],
        [15,25,25,25,60,90,110,70,50,50,30,20,10],
        [8,20,20,30,50,70,90,75,55,40,25,14,8],
        [10,20,20,40,60,80,100,80,60,40,20,16,10],
        [15,25,25,25,60,90,110,70,50,50,30,20,10],
        [8,20,20,30,50,70,90,75,55,40,25,14,8],
        [10,20,20,40,60,80,100,80,60,40,20,16,10],
        [15,25,25,25,60,90,110,70,50,50,30,20,10],
        [8,20,20,30,50,70,90,75,55,40,25,14,8],
        [10,20,20,40,60,80,100,80,60,40,20,16,10],
        [15,25,25,25,60,90,110,70,50,50,30,20,10],
        [8,20,20,30,50,70,90,75,55,40,25,14,8],
        [10,20,20,40,60,80,100,80,60,40,20,16,10],
        [15,25,25,25,60,90,110,70,50,50,30,20,10],
        [8,20,20,30,50,70,90,75,55,40,25,14,8],
        [10,20,20,40,60,80,100,80,60,40,20,16,10],
        [15,25,25,25,60,90,110,70,50,50,30,20,10],
        [8,20,20,30,50,70,90,75,55,40,25,14,8],
        [10,20,20,40,60,80,100,80,60,40,20,16,10],
        [15,25,25,25,60,90,110,70,50,50,30,20,10],
        [8,20,20,30,50,70,90,75,55,40,25,14,8],
        [10,20,20,40,60,80,100,80,60,40,20,16,10],
        [15,25,25,25,60,90,110,70,50,50,30,20,10],
        [8,20,20,30,50,70,90,75,55,40,25,14,8],
        [10,20,20,40,60,80,100,80,60,40,20,16,10],
        [15,25,25,25,60,90,110,70,50,50,30,20,10],
        [8,20,20,30,50,70,90,75,55,40,25,14,8],
        [10,20,20,40,60,80,100,80,60,40,20,16,10],
        [15,25,25,25,60,90,110,70,50,50,30,20,10],
        [8,20,20,30,50,70,90,75,55,40,25,14,8],
        [10,20,20,40,60,80,100,80,60,40,20,16,10],
        [15,25,25,25,60,90,110,70,50,50,30,20,10],
        [8,20,20,30,50,70,90,75,55,40,25,14,8],
        [10,20,20,40,60,80,100,80,60,40,20,16,10],
        [15,25,25,25,60,90,110,70,50,50,30,20,10],
        [8,20,20,30,50,70,90,75,55,40,25,14,8]
    ]);

    function splitData_price(rawData) {
        var value1 = [];
        for (var i = 0; i < rawData.length; i++) {
            value1.push(rawData[i])
        }
        return {
            value1: value1
        };
    }
    var data_bar8 = data10.value1[0];
    var data_bar8_exc = data10_exc.value1[0];
    function splitData_allprice(rawData) {
        var value2 = [];
        for (var i = 0; i < rawData.length; i++) {
            value2.push(rawData[i])
        }
        return {
            value2: value2
        };
    }
    var data_bar9 = data11.value2[0];

    //年龄分布组件
    option_his4 = {
        title: {
            text: data_Vertical_fixed+'已订票旅客年龄分布',
            x:'center',
            y:'top'
        },
        legend: {
            // data: ['上座率','收益率','均价','操作'],
            data:['目标航班','优秀管理员航班'],
            right:'15%',
            top:'10%',
            textStyle:{
                fontSize: 16,
            },
        },
        tooltip: {          //显示提示框
            trigger: 'axis',
            axisPointer: {
                type: 'cross'
            }
        },
        xAxis: {
            type: 'category',
            data: ['0-20', '21-30', '31-40','41-50','51-60','60+']
        },
        yAxis: {
            type: 'value'
        },

        series: [//数据线
            {
                name:"目标航班",
                color: ['#003366'],
                barWidth:20,
                data:data_bar4,
                type:'bar'
            },
            {
                name:"优秀管理员航班",
                color: ['#009966'],
                barWidth:20,
                data:data_bar4_exc,
                type:'bar'
            }
        ]
    };

    myChart_His4.setOption(option_his4);

    //同行人数分布组件
    option_his5 = {
        title: {
            text: data_Vertical_fixed+'已订票旅客同行人数分布',
            x:'center',
            y:'top'
        },
        legend: {
            // data: ['上座率','收益率','均价','操作'],
            data:['目标航班','优秀管理员航班'],
            right:'15%',
            top:'10%',
            textStyle:{
                fontSize: 16,
            },
        },
        tooltip: {          //显示提示框
            trigger: 'axis',
            axisPointer: {
                type: 'cross'
            }
        },
        xAxis: {
            type: 'category',
            data: ['6人以上', '4-6人', '三人同行','双人同行','单独出行']
        },
        yAxis: {
            type: 'value'
        },

        series: [//数据线
            {
                name:"目标航班",
                color: ['#003366'],
                barWidth:25,
                data:data_bar5,
                type:'bar'
            },
            {
                name:"优秀管理员航班",
                color: ['#009966'],
                barWidth:25,
                data:data_bar5_exc,
                type:'bar'
            }
        ]
    };

    myChart_His5.setOption(option_his5);

    //性别分布组件
    option_his6 = {
        title: {
            text: data_Vertical_fixed+'已订票旅客性别分布',
            x:'center',
            y:'top'
        },
        legend: {
            // data: ['上座率','收益率','均价','操作'],
            data:['目标航班','优秀管理员航班'],
            right:'15%',
            top:'10%',
            textStyle:{
                fontSize: 16,
            },
        },
        tooltip: {          //显示提示框
            trigger: 'axis',
            axisPointer: {
                type: 'cross'
            }
        },
        xAxis: {
            type: 'category',
            data: ['女','男']
        },
        yAxis: {
            type: 'value'
        },

        series: [//数据线
            {
                name:"目标航班",
                color: ['#003366'],
                barWidth:60,
                data:data_bar6,
                type:'bar'
            },
            {
                name:"优秀管理员航班",
                color: ['#009966'],
                barWidth:60,
                data:data_bar6_exc,
                type:'bar'
            }
        ]
    };

    myChart_His6.setOption(option_his6);

    //团散客分布组件
    option_his7 = {
        title: {
            text: data_Vertical_fixed+'已订票旅客团散客分布',
            x:'center',
            y:'top'
        },
        legend: {
            // data: ['上座率','收益率','均价','操作'],
            data:['目标航班','优秀管理员航班'],
            right:'15%',
            top:'10%',
            textStyle:{
                fontSize: 16,
            },
        },
        tooltip: {          //显示提示框
            trigger: 'axis',
            axisPointer: {
                type: 'cross'
            }
        },
        xAxis: {
            type: 'category',
            data: ['团队','散客']
        },
        yAxis: {
            type: 'value'
        },

        series: [//数据线
            {
                name: '目标航班',
                color: ['#003366'],
                barWidth:60,
                data:data_bar7,
                type:'bar'
            },
            {
                name: '优秀管理员航班',
                color: ['#009966'],
                barWidth:60,
                data:data_bar7_exc,
                type:'bar'
            }
        ]
    };

    myChart_His7.setOption(option_his7);

    //目标航班与市场价格分布图组件
    option_price = {
        title: {
            text: data_Vertical_fixed+'目标航班与市场价格分布',
            left:'center'
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'cross',
                crossStyle: {
                    color: '#999'
                }
            }
        },
        grid: {
            left: '5%',
            right: '5%',
            bottom: '15%'
        },
        toolbox: {
            feature: {
                dataView: {show: true, readOnly: false},
                magicType: {show: true, type: ['line', 'bar']},
                restore: {show: true},
                saveAsImage: {show: true}
            }
        },
        legend: {
            data:['目标航班数量','优秀航班数量','市场数量','目标航班分布曲线','优秀航班分布曲线','市场分布曲线'],
            bottom:0,
            textStyle:{
                fontSize: 16,
            },
        },
        xAxis: [
            {
                type: 'category',
                name:'价格',
                data: ['0-400','400-600','500-700','700-900','900-1100','1100-1300','1300-1500','1500-1700','1700-1900','1900-2100','2100-2300','2300-2500','2500+'],
                axisPointer: {
                    type: 'shadow'
                }
            }
        ],
        yAxis: [
            {
                type: 'value',
                name: '座位数量',
                min: 0,
                max: 150,
                interval: 50,
                axisLabel: {
                    formatter: '{value}'
                }
            }
        ],
        series: [
            {
                name:'目标航班数量',
                type:'bar',
                data:data_bar8
            },
            {
                name:'优秀航班数量',
                type:'bar',
                data:data_bar8_exc
            },
            {
                name:'市场数量',
                type:'bar',
                data:data_bar9
            },
            {
                name:'目标航班分布曲线',
                type:'line',
                data:data_bar8
            },
            {
                name:'优秀航班分布曲线',
                type:'line',
                data:data_bar8_exc
            },
            {
                name:'市场分布曲线',
                type:'line',
                data:data_bar9
            }

        ]
    };

    myChart_His8.setOption(option_price);

    var globalDate = data0Raw[0][0];
    
    function refresh(date='') {
        let dateArray=data0Raw.map(v=>v[0]);

        /*数据偏移，默认*/
        let offset = dateArray.indexOf(globalDate);

        if(date != ''){
            let dateIndex = dateArray.indexOf(date);
            offset = dateIndex;

            if(typeof(dt) != "undefined"){
                clearInterval(dt);
            }
            myChart.setOption({
                toolbox: {
                    feature:{
                        myTool1: {
                            show: true,
                            title: '暂停与开始',
                            icon: 'image://svg/star.jpg',
                        }
                    }
                }
            });
            myChart1.setOption({
                toolbox: {
                    feature:{
                        myTool1: {
                            show: true,
                            title: '暂停与开始',
                            icon: 'image://svg/star.jpg',
                        }
                    }
                }
            });
            flag=0;
        }

        if(offset < 89){
            globalDate = dateArray[offset+1]
        }

        let data_bar=data1.values[offset];
        let data_bar1=data3.values[offset];
        let data_bar2=data4.values[offset];
        let data_bar3=data5.values[offset];
        let data_bar4 = data6.values[offset];
        let data_bar5 = data7.values[offset];
        let data_bar6 = data8.values[offset];
        let data_bar7 = data9.values[offset];
        let data_bar8 = data10.value1[offset];
        let data_bar9 = data11.value2[offset];


        let data_bar_exc=data1_exc.values[offset];
        let data_bar1_exc=data3_exc.values[offset];
        let data_bar2_exc=data4_exc.values[offset];
        let data_bar3_exc=data5_exc.values[offset];
        let data_bar4_exc = data6_exc.values[offset];
        let data_bar5_exc = data7_exc.values[offset];
        let data_bar6_exc = data8_exc.values[offset];
        let data_bar7_exc = data9_exc.values[offset];
        let data_bar8_exc = data10_exc.value1[offset];


        let data0RawTemp = Array.from(data0Raw);
        let data01RawTemp = Array.from(data01Raw);
        if(offset < 3){
            data0RawTemp = data0RawTemp.slice(data0RawTemp.length - 3).concat(data0RawTemp.slice(0,data0RawTemp.length - 3))
            data01RawTemp = data01RawTemp.slice(data01RawTemp.length - 3).concat(data01RawTemp.slice(0,data01RawTemp.length - 3))
            offset = offset + 3;
        } 
        data0RawTemp = data0RawTemp.slice(offset - 3).concat(data0RawTemp.slice(0,offset - 3));
        data0 = splitData(data0RawTemp);

        data01RawTemp = data01RawTemp.slice(offset - 3).concat(data01RawTemp.slice(0,offset - 3));
        data01 = splitDataexcellent(data01RawTemp);

        data_Vertical_fixed=data0.categoryData[3];

        if(flag==1){
            data_Vertical_active=NaN;
        }
        
        myChart.setOption({
            xAxis: {
                data: data01.categoryData,
            },
            //数据线
            series: [
                {
                    data: data0.Placing_rate,
                    markLine: {
                        data: [
                            {xAxis:data_Vertical_fixed},
                            {xAxis:data_Vertical_active},
                        ],
                    },
                },
                {
                    data: data0.return_rate,
                },
                {              
                    data: data0.arrow,              
                    markPoint: {
                        data: markArr
                    },
    
                },
                {
                    data: data0.arrow1,
                },
                {
                    data: data0.arrow_rec,
                },
                {
                    data: data0.is_control,
                },
                {
                    data: data0.rpk,
                },
            ],
            //显示提示框
    

        });
        myChart1.setOption({
            xAxis: {
                data: data01.categoryData,
            },
            series: [
                {
                    data: data01.Placing_rate,
                    markLine: {
                        data: [
                            {xAxis:data_Vertical_fixed},
                            {xAxis:data_Vertical_active},
                        ],
                    },
                },
                {
                    data: data01.return_rate,
                },
                {
                    data: data01.arrow,
                },
                {
                    data: data01.arrow1,
                },
                {
                    data: data01.is_control,
                },
                {
                    data: data01.rpk,
                },
            ],

        });

        myChart_His4.setOption({
            title: {
                text: data_Vertical_fixed+'已订票旅客年龄分布',
            },
            
            series: [//数据线
                {
                    data: data_bar4,
                    type: 'bar'
                },
                {
                    data: data_bar4_exc,
                    type: 'bar'
                }
            ]
        });
        myChart_His5.setOption({
            title: {
                text: data_Vertical_fixed+'已订票旅客同行人数分布',
            },
            series: [//数据线
                {
                    data: data_bar5,
                    type: 'bar'
                },
                {
                    data: data_bar5_exc,
                    type: 'bar'
                }
            ]
        });
        myChart_His6.setOption({
            title: {
                text: data_Vertical_fixed+'已订票旅客性别分布',
            },
            series: [//数据线
                {
                    data: data_bar6,
                    type: 'bar'
                },
                {
                    data: data_bar6_exc,
                    type: 'bar'
                }
            ]
        });
        myChart_His7.setOption({
            title: {
                text: data_Vertical_fixed+'已订票旅客团散客分布',
            },
            series: [//数据线
                {
                    data: data_bar7,
                    type: 'bar'
                },
                {
                    data: data_bar7_exc,
                    type: 'bar'
                }
            ]
        });
        myChart_His8.setOption({
            title: {
                text: data_Vertical_fixed+'目标航班与市场价格分布',
            },
            series: [//数据线
                {
                    data: data_bar8,
                    type: 'bar'
                },
                ,
                {
                    data: data_bar8_exc,
                    type: 'bar'
                },
                {
                    data: data_bar9,
                    type: 'bar'
                },
                {
                    data: data_bar8,
                    type: 'line'
                },
                {
                    data: data_bar8_exc,
                    type: 'bar'
                },
                {
                    data: data_bar9,
                    type: 'line'
                }
            ]
        });
        myChart_His.setOption({
            title: {
                text: data_Vertical_fixed+'物理舱均价',
            },
            series: [//数据线
                {
                    data:data_bar,
                    type:'bar'
                },
                {
                    data: data_bar_exc,
                    type: 'bar'
                }
            ]
        });
        myChart_His1.setOption({
            title: {
                text: data_Vertical_fixed+'子舱余量',
            },
            series: [//数据线
                {
                    data:data_bar1,
                    type:'bar'
                },
                {
                    data: data_bar1_exc,
                    type: 'bar'
                }
            ]
        });
        myChart_His2.setOption({
            title: {
                text: data_Vertical_fixed+'子舱产品销售量',
            },
            series: [//数据线
                {
                    data:data_bar2,
                    type:'bar'
                },
                {
                    data: data_bar2_exc,
                    type: 'bar'
                }
            ]
        });
        myChart_His3.setOption({
            title: {
                text: data_Vertical_fixed+'物理舱余量',
            },
            series: [//数据线
                {
                    data:data_bar3,
                    type:'bar'
                },
                {
                    data: data_bar3_exc,
                    type: 'bar'
                }
            ]
        });

    }
    refresh(date='2019/1/31(-83d)');

    /**
     * 页面点击事件绑定
     */
    function bindClickEvents(){
        let dataRadarCmpFlight1 = [
            [0.5,0.8,0.7,0.05,0.9],
        ];
        let dataRadarCmpManager1 = [
            [0.3,0.7,0.8,0.8,0.6],
        ];
    
        let dataRadarCmpFlight2 = [
            [0.6,0.4,0.9,0.01,0.9],
        ];
        let dataRadarCmpManager2 = [
            [0.5,0.5,0.9,0.8,0.7],
        ];
    
        //点击事件
        chartNetwork.on('click', function (param){
            if(param.data.name==='AA1017'){
                chartRadarCmpFlight.setOption({
                    title: {
                        text: '比较航班AA1017',
                        subtext: '起飞时间：20190415-09:00',
                        itemGap: 170,
                        left: 0,
                        textStyle: {
                            color: '#eee'
                        }
                    },
                    series: [
                        
                        {   name: 'AA1017',
                            data: dataRadarCmpFlight1,
                        },
                    ],
    
                });
                chartRadarCmpManager.setOption({
                    title: {
                        text: '比较管理员OP02',
                        left: 0,
                        textStyle: {
                            color: '#eee'
                        }
                    },
                
                    series: [
                        {   name: 'AA1017',
                            data: dataRadarCmpManager1,
                        },
                    ],
    
                });
            }
            else if(param.data.name==='AA1082'){
                chartRadarCmpFlight.setOption({
                    title: {
                        text: '比较航班AA1082',
                        subtext: '起飞时间：20190415-09:00',
                        itemGap: 170,
                        left: 0,
                        textStyle: {
                            color: '#eee'
                        }
                    },
                    series: [
                        {   name: 'AA1082',
                            data: dataRadarCmpFlight2,
                        },
                    ],
    
                });
                chartRadarCmpManager.setOption({
                    title: {
                        text: '比较管理员OP03',
                        left: 0,
                        textStyle: {
                            color: '#eee'
                        }
                    },
                    series: [
                        {   name: 'AA1082',
                            data: dataRadarCmpManager2,
                        },
                    ],
    
                });
            }
        });

        $("#btn_submit1").click(function(){
            alert("ceshi");
            chartNetwork.setOption({
                series:[{
                    data: webkitDep.nodes.map(function (node, idx) {
                    node.id = idx;
                    return node;
                }),
                categories: webkitDep.categories,
                edges: webkitDep.links,
                }],
            });
        });
        $("#btn_submit2").click(function(){
            chartNetwork.setOption({
                series:[{
                    data: webkitDep.nodes.map(function (node, idx) {
                    node.id = idx;
                    return node;
                }),
                categories: webkitDep.categories,
                edges: webkitDep.links,
                }],
            });
        });
        $("#btn_submit3").click(function(){
            chartNetwork.setOption({
                series:[{
                    data: webkitDep.nodes.map(function (node, idx) {
                    node.id = idx;
                    return node;
                }),
                categories: webkitDep.categories,
                edges: webkitDep.links,
                }],
            });
        });
        $("#btn_submit4").click(function(){
            chartNetwork.setOption({
                series:[{
                    data: webkitDep.nodes.map(function (node, idx) {
                    node.id = idx;
                    return node;
                }),
                categories: webkitDep.categories,
                edges: webkitDep.links,
                }],
            });
        });
        $("#btn_submit5").click(function(){
            chartNetwork.setOption({
                series:[{
                    data: webkitDep.nodes.map(function (node, idx) {
                    node.id = idx;
                    return node;
                }),
                categories: webkitDep.categories,
                edges: webkitDep.links,
                }],
            });
        });
        $("#btn_submit6").click(function(){
            chartNetwork.setOption({
                series:[{
                    data: webkitDep.nodes.map(function (node, idx) {
                    node.id = idx;
                    return node;
                }),
                categories: webkitDep.categories,
                edges: webkitDep.links,
                }],
            });
        });
        $("#btn_submit7").click(function(){
            chartNetwork.setOption({
                series:[{
                    data: webkitDep.nodes.map(function (node, idx) {
                    node.id = idx;
                    return node;
                }),
                categories: webkitDep.categories,
                edges: webkitDep.links,
                }],
            });
        })
    }

});

function initChartRadarTgtManager(){
    var dataRadarTgtManager = [
        [0.9,0.1,0.5,0.6,0.7],
    ];
    var chartRadarTgtManager = echarts.init(document.getElementById('chartRadarTgtManager'));
    optionRadarTgtManager = {
        backgroundColor: '#161627',
        title: {
            text: '目标管理员OP01',
            left: 0,
            textStyle: {
                color: '#eee'
            }
        },
        tooltip: {
            confine:'true'
        },
        radar: {
            indicator: [
                {name: '激进性', max: 1, color: '#28FF28'},
                {name: '保守性', max: 1, color: '#28FF28'},
                {name: '工作强度', max: 1, color: 'yellow'},
                {name: '产出性', max: 1, color: 'yellow'},
                {name: '热门度',max:1, color: '#28FF28'}
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
                name: 'AA1000',
                type: 'radar',
                lineStyle: {
                    normal: {
                        width: 5,
                        opacity: 5
                    }
                },
                data: dataRadarTgtManager,
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
    };
    chartRadarTgtManager.setOption(optionRadarTgtManager);

    return chartRadarTgtManager;
}

function initChartRadarTgtFlight(){
    let dataRadarTgtFlight = [
        [0.66,0.8,0.78,0.1,0.767],
    ];
    let chartRadarTgtFlight = echarts.init(document.getElementById('chartRadarTgtFlight'));
    optionRadarTgtFlight = {
        backgroundColor: '#161627',
        title: {
            text: '目标航班AA1000',
            subtext: '起飞时间：20190415-09:00',
            itemGap: 170,
            left: 0,
            textStyle: {
                color: '#eee'
            }
        },
        tooltip: {
            confine:'true'
        },
        radar: {
            indicator: [
                {name: '热门度', max: 1, color: '#28FF28'},
                {name: '易售度', max: 1, color: '#28FF28'},
                {name: '收产比', max: 1, color: '#28FF28'},
                {name: '拒载率', max: 1, color: 'yellow'},
                {name: '上座率', max: 1, color: 'yellow'}
            ],
            shape: 'circle',
            splitNumber: 4,
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
                name: 'AA1000',
                type: 'radar',
                lineStyle: {
                    normal: {
                        width: 5,
                        opacity: 5
                    }
                },
                data: dataRadarTgtFlight,
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
    };
    chartRadarTgtFlight.setOption(optionRadarTgtFlight);

    return chartRadarTgtFlight;
}

function initChartRadarCmpManager(){
    let dataRadarCmpManager = [
        [0.3,0.7,0.8,0.8,0.6],
    ];

    let chartRadarCmpManager = echarts.init(document.getElementById('chartRadarCmpManager'));

    optionRadarCmpManager = {
        backgroundColor: '#161627',
        title: {
            text: '比较管理员OP02',
            left: 0,
            textStyle: {
                color: '#eee'
            }
        },
        tooltip: {
            confine:'true'
        },
        radar: {
            indicator: [
                {name: '激进性', max: 1, color: '#28FF28'},
                {name: '保守性', max: 1, color: '#28FF28'},
                {name: '工作强度', max: 1, color: 'yellow'},
                {name: '产出性', max: 1, color: 'yellow'},
                {name: '热门度',max:1, color: '#28FF28'}
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
                name: 'AA1082',
                type: 'radar',
                lineStyle: {
                    normal: {
                        width: 5,
                        opacity: 5
                    }
                },
                data: dataRadarCmpManager,
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
    };

    chartRadarCmpManager.setOption(optionRadarCmpManager);

    return chartRadarCmpManager;
}

function initChartRadarCmpFlight(){
    var dataRadarCmpFlight = [
        [0.5,0.8,0.7,0.05,0.9],
    ];

    let chartRadarCmpFlight = echarts.init(document.getElementById('chartRadarCmpFlight'));

    optionRadarCmpFlight = {
        backgroundColor: '#161627',
        title: {
            text: '比较航班AA1017',
            subtext: '起飞时间：20190415-09:00',
            itemGap: 170,
            left: 0,
            textStyle: {
                color: '#eee'
            }
        },
        tooltip: {
            confine:'true'
        },
        radar: {
            indicator: [
                {name: '热门度', max: 1, color: '#28FF28'},
                {name: '易售度', max: 1, color: '#28FF28'},
                {name: '收产比', max: 1, color: '#28FF28'},
                {name: '拒载率', max: 1, color: 'yellow'},
                {name: '上座率', max: 1, color: 'yellow'}
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
                name: 'AA1017',
                type: 'radar',
                lineStyle: {
                    normal: {
                        width: 5,
                        opacity: 5
                    }
                },
                data: dataRadarCmpFlight,
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
    };
    chartRadarCmpFlight.setOption(optionRadarCmpFlight);

    return chartRadarCmpFlight;
}

/*
 * 
 */
function initChartNetwork(){
    let dataNetwork = {
        "type":"force",
        "categories":[
            {
                "name":"社团一",
                "keyword":{
    
                },
                "base":"HTMLElement"
            },
            {
                "name":"社团二",
                "keyword":{
    
                },
                "base":"WebGLRenderingContext"
            },
            {
                "name":"社团三",
                "keyword":{
    
                },
                "base":"SVGElement"
            },
            {
                "name":"社团四",
                "keyword":{
    
                },
                "base":"CSSRule"
            }
        ],
        "nodes":[
            {
                "name":"AA1000",
                "value":21,
                "category":3,
                "label":"目标航班"
            },
            {
                "name":"AA1001",
                "value":10,
                "category":3
            },
            {
                "name":"AA1002",
                "value":10,
                "category":3
            },
            {
                "name":"AA1003",
                "value":5,
                "category":3
            },
            {
                "name":"AA1004",
                "value":3,
                "category":3
            },
            {
                "name":"AA1005",
                "value":1,
                "category":3
            },
            {
                "name":"AA1006",
                "value":1,
                "category":3
            },
            {
                "name":"AA1007",
                "value":1,
                "category":3
            },
            {
                "name":"AA1008",
                "value":1,
                "category":3
            },
            {
                "name":"AA1009",
                "value":3,
                "category":3
            },
            {
                "name":"AA1010",
                "value":1,
                "category":3
            },
            {
                "name":"AA1011",
                "value":8,
                "category":3
            },
            {
                "name":"AA1012",
                "value":5,
                "category":3
            },
            {
                "name":"AA1013",
                "value":1,
                "category":3
            },
            {
                "name":"AA1013",
                "value":1,
                "category":3
            },
            {
                "name":"AA1015",
                "value":1,
                "category":3
            },
            {
                "name":"AA1016",
                "value":5,
                "category":3
            },
            {
                "name":"AA1017",
                "value":17,
                "category":3,
                "label":"对比航班2"
            },
            {
                "name":"AA1018",
                "value":5,
                "category":3
            },
            {
                "name":"AA1019",
                "value":5,
                "category":3
            },
            {
                "name":"AA1020",
                "value":5,
                "category":3
            },
            {
                "name":"AA1021",
                "value":5,
                "category":3
            },
            {
                "name":"AA1022",
                "value":5,
                "category":3
            },
            {
                "name":"AA1023",
                "value":2,
                "category":3
            },
            {
                "name":"AA1024",
                "value":5,
                "category":3
            },
            {
                "name":"AA1025",
                "value":5,
                "category":3
            },
            {
                "name":"AA1026",
                "value":5,
                "category":3
            },
            {
                "name":"AA1027",
                "value":5,
                "category":3
            },
            {
                "name":"AA1028",
                "value":5,
                "category":3
            },
            {
                "name":"AA1029",
                "value":5,
                "category":3
            },
            {
                "name":"AA1030",
                "value":5,
                "category":3
            },
            {
                "name":"AA1031",
                "value":5,
                "category":3
            },
            {
                "name":"AA1032",
                "value":5,
                "category":3
            },
            {
                "name":"AA1033",
                "value":5,
                "category":3
            },
            {
                "name":"AA1033",
                "value":5,
                "category":0
            },
            {
                "name":"AA1035",
                "value":5,
                "category":3
            },
            {
                "name":"AA1036",
                "value":5,
                "category":3
            },
            {
                "name":"AA1037",
                "value":5,
                "category":3
            },
            {
                "name":"AA1038",
                "value":15,
                "category":3
            },
            {
                "name":"AA1039",
                "value":5,
                "category":0
            },
            {
                "name":"AA1030",
                "value":5,
                "category":0
            },
            {
                "name":"AA1031",
                "value":5,
                "category":3
            },
            {
                "name":"AA1032",
                "value":5,
                "category":3
            },
            {
                "name":"AA1033",
                "value":5,
                "category":3
            },
            {
                "name":"AA1033",
                "value":5,
                "category":3
            },
            {
                "name":"AA1035",
                "value":5,
                "category":3
            },
            {
                "name":"AA1036",
                "value":5,
                "category":3
            },
            {
                "name":"AA1037",
                "value":5,
                "category":3
            },
            {
                "name":"AA1038",
                "value":5,
                "category":3
            },
            {
                "name":"AA1039",
                "value":5,
                "category":3
            },
            {
                "name":"AA1050",
                "value":5,
                "category":3
            },
            {
                "name":"AA1051",
                "value":5,
                "category":3
            },
            {
                "name":"AA1052",
                "value":5,
                "category":3
            },
            {
                "name":"AA1053",
                "value":5,
                "category":3
            },
            {
                "name":"AA1053",
                "value":5,
                "category":3
            },
            {
                "name":"AA1055",
                "value":3,
                "category":3
            },
            {
                "name":"AA1056",
                "value":5,
                "category":3
            },
            {
                "name":"AA1057",
                "value":5,
                "category":3
            },
            {
                "name":"AA1058",
                "value":5,
                "category":3
            },
            {
                "name":"AA1059",
                "value":5,
                "category":3
            },
            {
                "name":"AA1060",
                "value":5,
                "category":3
            },
            {
                "name":"AA1061",
                "value":5,
                "category":3
            },
            {
                "name":"AA1062",
                "value":5,
                "category":3
            },
            {
                "name":"AA1063",
                "value":5,
                "category":3
            },
            {
                "name":"AA1063",
                "value":5,
                "category":3
            },
            {
                "name":"AA1065",
                "value":5,
                "category":3
            },
            {
                "name":"AA1066",
                "value":10,
                "category":3
            },
            {
                "name":"AA1067",
                "value":5,
                "category":3
            },
            {
                "name":"AA1068",
                "value":5,
                "category":3
            },
            {
                "name":"AA1069",
                "value":5,
                "category":3
            },
            {
                "name":"AA1070",
                "value":5,
                "category":3
            },
            {
                "name":"AA1071",
                "value":5,
                "category":3
            },
            {
                "name":"AA1072",
                "value":5,
                "category":3
            },
            {
                "name":"AA1073",
                "value":5,
                "category":3
            },
            {
                "name":"AA1073",
                "value":5,
                "category":3
            },
            {
                "name":"AA1075",
                "value":5,
                "category":3
            },
            {
                "name":"AA1076",
                "value":5,
                "category":3
            },
            {
                "name":"AA1077",
                "value":5,
                "category":3
            },
            {
                "name":"AA1078",
                "value":5,
                "category":3
            },
            {
                "name":"AA1079",
                "value":5,
                "category":3
            },
            {
                "name":"AA1080",
                "value":5,
                "category":3
            },
            {
                "name":"AA1081",
                "value":5,
                "category":3
            },
            {
                "name":"AA1082",
                "value":20,
                "category":3,
                "label":"对比航班1"
            },
            {
                "name":"AA1083",
                "value":5,
                "category":3
            },
            {
                "name":"AA1083",
                "value":5,
                "category":3
            },
            {
                "name":"AA1085",
                "value":5,
                "category":3
            },
            {
                "name":"AA1086",
                "value":5,
                "category":3
            },
            {
                "name":"AA1087",
                "value":5,
                "category":3
            },
            {
                "name":"AA1088",
                "value":5,
                "category":3
            },
            {
                "name":"AA1089",
                "value":5,
                "category":3
            },
            {
                "name":"AA1090",
                "value":5,
                "category":3
            },
            {
                "name":"AA1091",
                "value":5,
                "category":3
            },
            {
                "name":"AA1092",
                "value":15,
                "category":3
            },
            {
                "name":"AA1093",
                "value":5,
                "category":3
            },
            {
                "name":"AA1093",
                "value":5,
                "category":3
            },
            {
                "name":"AA1095",
                "value":5,
                "category":3
            },
            {
                "name":"AA1096",
                "value":5,
                "category":3
            },
            {
                "name":"AA1097",
                "value":5,
                "category":3
            },
            {
                "name":"AA1098",
                "value":5,
                "category":3
            },
            {
                "name":"AA1099",
                "value":5,
                "category":3
            },
            {
                "name":"AA1100",
                "value":5,
                "category":3
            },
            {
                "name":"AA1101",
                "value":5,
                "category":0
            },
            {
                "name":"AA1102",
                "value":5,
                "category":3
            },
            {
                "name":"AA1103",
                "value":5,
                "category":3
            },
            {
                "name":"AA1103",
                "value":5,
                "category":3
            },
            {
                "name":"AA1105",
                "value":5,
                "category":3
            },
            {
                "name":"AA1106",
                "value":5,
                "category":3
            },
            {
                "name":"AA1107",
                "value":5,
                "category":3
            },
            {
                "name":"AA1108",
                "value":5,
                "category":3
            },
            {
                "name":"AA1109",
                "value":5,
                "category":3
            },
            {
                "name":"AA1110",
                "value":5,
                "category":3
            },
            {
                "name":"AA1111",
                "value":5,
                "category":3
            },
            {
                "name":"AA1112",
                "value":15,
                "category":3
            },
            {
                "name":"AA1113",
                "value":5,
                "category":3
            },
            {
                "name":"AA1113",
                "value":5,
                "category":3
            },
            {
                "name":"AA1115",
                "value":5,
                "category":3
            },
            {
                "name":"AA1116",
                "value":5,
                "category":3
            },
            {
                "name":"AA1117",
                "value":5,
                "category":3
            },
            {
                "name":"AA1118",
                "value":5,
                "category":3
            },
            {
                "name":"AA1119",
                "value":5,
                "category":3
            },
            {
                "name":"AA1120",
                "value":5,
                "category":3
            },
            {
                "name":"AA1121",
                "value":5,
                "category":3
            },
            {
                "name":"AA1122",
                "value":5,
                "category":3
            },
            {
                "name":"AA1123",
                "value":5,
                "category":3
            },
            {
                "name":"AA1123",
                "value":5,
                "category":3
            },
            {
                "name":"AA1125",
                "value":5,
                "category":3
            },
            {
                "name":"AA1126",
                "value":5,
                "category":3
            },
            {
                "name":"AA1127",
                "value":5,
                "category":3
            },
            {
                "name":"AA1128",
                "value":5,
                "category":3
            },
            {
                "name":"AA1129",
                "value":5,
                "category":3
            },
            {
                "name":"AA1130",
                "value":5,
                "category":3
            },
            {
                "name":"AA1131",
                "value":5,
                "category":3
            },
            {
                "name":"AA1132",
                "value":5,
                "category":3
            },
            {
                "name":"AA1133",
                "value":15,
                "category":3
            },
            {
                "name":"AA1133",
                "value":5,
                "category":3
            },
            {
                "name":"AA1135",
                "value":5,
                "category":0
            },
            {
                "name":"AA1136",
                "value":5,
                "category":0
            },
            {
                "name":"AA1137",
                "value":3,
                "category":0
            },
            {
                "name":"AA1138",
                "value":5,
                "category":0
            },
            {
                "name":"AA1139",
                "value":13,
                "category":0
            },
            {
                "name":"AA1130",
                "value":5,
                "category":0
            },
            {
                "name":"AA1131",
                "value":8,
                "category":0
            },
            {
                "name":"AA1132",
                "value":10,
                "category":0
            },
            {
                "name":"AA1133",
                "value":5,
                "category":0
            },
            {
                "name":"AA1133",
                "value":5,
                "category":0
            },
            {
                "name":"AA1135",
                "value":5,
                "category":0
            },
            {
                "name":"AA1136",
                "value":5,
                "category":0
            },
            {
                "name":"AA1137",
                "value":5,
                "category":0
            },
            {
                "name":"AA1138",
                "value":5,
                "category":3
            },
            {
                "name":"AA1139",
                "value":15,
                "category":0
            },
            {
                "name":"AA1150",
                "value":5,
                "category":0
            },
            {
                "name":"AA1151",
                "value":5,
                "category":0
            },
            {
                "name":"AA1152",
                "value":5,
                "category":0
            },
            {
                "name":"AA1153",
                "value":5,
                "category":0
            },
            {
                "name":"AA1153",
                "value":5,
                "category":0
            },
            {
                "name":"AA1155",
                "value":15,
                "category":0
            },
            {
                "name":"AA1156",
                "value":5,
                "category":0
            },
            {
                "name":"AA1157",
                "value":5,
                "category":2
            },
            {
                "name":"AA1158",
                "value":5,
                "category":0
            },
            {
                "name":"AA1159",
                "value":5,
                "category":0
            },
            {
                "name":"AA1160",
                "value":5,
                "category":0
            },
            {
                "name":"AA1161",
                "value":5,
                "category":0
            },
            {
                "name":"AA1162",
                "value":5,
                "category":0
            },
            {
                "name":"AA1163",
                "value":5,
                "category":0
            },
            {
                "name":"AA1163",
                "value":13,
                "category":0
            },
            {
                "name":"AA1165",
                "value":5,
                "category":0
            },
            {
                "name":"AA1166",
                "value":5,
                "category":0
            },
            {
                "name":"AA1167",
                "value":5,
                "category":0
            },
            {
                "name":"AA1168",
                "value":5,
                "category":0
            },
            {
                "name":"AA1169",
                "value":5,
                "category":0
            },
            {
                "name":"AA1170",
                "value":5,
                "category":0
            },
            {
                "name":"AA1171",
                "value":5,
                "category":0
            },
            {
                "name":"AA1172",
                "value":5,
                "category":0
            },
            {
                "name":"AA1173",
                "value":5,
                "category":0
            },
            {
                "name":"AA1173",
                "value":15,
                "category":0
            },
            {
                "name":"AA1175",
                "value":5,
                "category":0
            },
            {
                "name":"AA1176",
                "value":5,
                "category":3
            },
            {
                "name":"AA1177",
                "value":5,
                "category":3
            },
            {
                "name":"AA1178",
                "value":5,
                "category":3
            },
            {
                "name":"AA1179",
                "value":5,
                "category":3
            },
            {
                "name":"AA1180",
                "value":5,
                "category":3
            },
            {
                "name":"AA1181",
                "value":5,
                "category":0
            },
            {
                "name":"AA1182",
                "value":5,
                "category":0
            },
            {
                "name":"AA1183",
                "value":5,
                "category":0
            },
            {
                "name":"AA1183",
                "value":5,
                "category":0
            },
            {
                "name":"AA1185",
                "value":5,
                "category":0
            },
            {
                "name":"AA1186",
                "value":5,
                "category":0
            },
            {
                "name":"AA1187",
                "value":5,
                "category":0
            },
            {
                "name":"AA1188",
                "value":5,
                "category":0
            },
            {
                "name":"AA1189",
                "value":5,
                "category":0
            },
            {
                "name":"AA1190",
                "value":5,
                "category":0
            },
            {
                "name":"AA1191",
                "value":5,
                "category":0
            },
            {
                "name":"AA1192",
                "value":5,
                "category":0
            },
            {
                "name":"AA1193",
                "value":5,
                "category":0
            },
            {
                "name":"AA1193",
                "value":15,
                "category":0
            },
            {
                "name":"AA1195",
                "value":5,
                "category":0
            },
            {
                "name":"AA1196",
                "value":5,
                "category":0
            },
            {
                "name":"AA1197",
                "value":5,
                "category":0
            },
            {
                "name":"AA1198",
                "value":5,
                "category":0
            },
            {
                "name":"AA1199",
                "value":5,
                "category":0
            },
            {
                "name":"AA1200",
                "value":5,
                "category":0
            },
            {
                "name":"AA1201",
                "value":5,
                "category":0
            },
            {
                "name":"AA1202",
                "value":5,
                "category":0
            },
            {
                "name":"AA1203",
                "value":5,
                "category":0
            },
            {
                "name":"AA1203",
                "value":8,
                "category":0
            },
            {
                "name":"AA1205",
                "value":5,
                "category":0
            },
            {
                "name":"AA1206",
                "value":5,
                "category":0
            },
            {
                "name":"AA1207",
                "value":5,
                "category":0
            },
            {
                "name":"AA1208",
                "value":5,
                "category":0
            },
            {
                "name":"AA1209",
                "value":5,
                "category":0
            },
            {
                "name":"AA1210",
                "value":5,
                "category":0
            },
            {
                "name":"AA1211",
                "value":5,
                "category":0
            },
            {
                "name":"AA1212",
                "value":5,
                "category":0
            },
            {
                "name":"AA1213",
                "value":6,
                "category":3
            },
            {
                "name":"AA1213",
                "value":5,
                "category":3
            },
            {
                "name":"AA1215",
                "value":5,
                "category":3
            },
            {
                "name":"AA1216",
                "value":5,
                "category":4
            },
            {
                "name":"AA1217",
                "value":5,
                "category":4
            },
            {
                "name":"AA1218",
                "value":5,
                "category":4
            },
            {
                "name":"AA1219",
                "value":5,
                "category":4
            },
            {
                "name":"AA1220",
                "value":5,
                "category":4
            },
            {
                "name":"AA1221",
                "value":5,
                "category":4
            },
            {
                "name":"AA1222",
                "value":5,
                "category":4
            },
            {
                "name":"AA1223",
                "value":5,
                "category":4
            },
            {
                "name":"AA1224",
                "value":5,
                "category":4
            },
            {
                "name":"AA1225",
                "value":5,
                "category":4
            },
            {
                "name":"AA1226",
                "value":5,
                "category":4
            },
            {
                "name":"AA1227",
                "value":5,
                "category":4
            },
            {
                "name":"AA1228",
                "value":5,
                "category":4
            },
            {
                "name":"AA1229",
                "value":5,
                "category":4
            },
            {
                "name":"AA1230",
                "value":5,
                "category":4
            },
            {
                "name":"AA1231",
                "value":5,
                "category":4
            },
            {
                "name":"AA1232",
                "value":5,
                "category":4
            },
            {
                "name":"AA1233",
                "value":5,
                "category":4
            },
            {
                "name":"AA1234",
                "value":5,
                "category":4
            },
            {
                "name":"AA1235",
                "value":5,
                "category":4
            },
            {
                "name":"AA1236",
                "value":5,
                "category":4
            },
            {
                "name":"AA1237",
                "value":5,
                "category":4
            },
            {
                "name":"AA1238",
                "value":5,
                "category":4
            },
            {
                "name":"AA1239",
                "value":5,
                "category":4
            },
            {
                "name":"AA1240",
                "value":5,
                "category":4
            },
            {
                "name":"AA1241",
                "value":5,
                "category":4
            },
            {
                "name":"AA1242",
                "value":5,
                "category":4
            },
            {
                "name":"AA1243",
                "value":5,
                "category":4
            },
            {
                "name":"AA1244",
                "value":5,
                "category":4
            },
            {
                "name":"AA1245",
                "value":5,
                "category":4
            },
            {
                "name":"AA1246",
                "value":5,
                "category":4
            },
            {
                "name":"AA1247",
                "value":5,
                "category":4
            },
            {
                "name":"AA1248",
                "value":5,
                "category":4
            },
            {
                "name":"AA1249",
                "value":5,
                "category":4
            },
            {
                "name":"AA1250",
                "value":5,
                "category":4
            },
            {
                "name":"AA1251",
                "value":5,
                "category":4
            },
            {
                "name":"AA1252",
                "value":5,
                "category":4
            },
            {
                "name":"AA1253",
                "value":5,
                "category":4
            },
            {
                "name":"AA1254",
                "value":5,
                "category":4
            },
            {
                "name":"AA1255",
                "value":5,
                "category":4
            },
            {
                "name":"AA1256",
                "value":5,
                "category":4
            },
            {
                "name":"AA1257",
                "value":5,
                "category":4
            },
            {
                "name":"AA1258",
                "value":5,
                "category":4
            },
            {
                "name":"AA1259",
                "value":5,
                "category":5
            },
            {
                "name":"AA1260",
                "value":5,
                "category":4
            },
            {
                "name":"AA1261",
                "value":5,
                "category":4
            },
            {
                "name":"AA1262",
                "value":5,
                "category":4
            },
            {
                "name":"AA1263",
                "value":5,
                "category":4
            },
            {
                "name":"AA1264",
                "value":5,
                "category":4
            },
            {
                "name":"AA1265",
                "value":5,
                "category":4
            },
            {
                "name":"AA1266",
                "value":5,
                "category":4
            },
            {
                "name":"AA1267",
                "value":5,
                "category":4
            },
            {
                "name":"AA1268",
                "value":5,
                "category":4
            },
            {
                "name":"AA1269",
                "value":3,
                "category":4
            },
            {
                "name":"AA1270",
                "value":5,
                "category":4
            },
            {
                "name":"AA1271",
                "value":5,
                "category":4
            },
            {
                "name":"AA1272",
                "value":5,
                "category":4
            },
            {
                "name":"AA1273",
                "value":5,
                "category":4
            },
            {
                "name":"AA1274",
                "value":5,
                "category":4
            },
            {
                "name":"AA1275",
                "value":5,
                "category":4
            },
            {
                "name":"AA1276",
                "value":5,
                "category":4
            },
            {
                "name":"AA1277",
                "value":5,
                "category":4
            },
            {
                "name":"AA1278",
                "value":5,
                "category":4
            },
            {
                "name":"AA1279",
                "value":5,
                "category":4
            },
            {
                "name":"AA1280",
                "value":5,
                "category":4
            },
            {
                "name":"AA1281",
                "value":5,
                "category":4
            },
            {
                "name":"AA1282",
                "value":5,
                "category":4
            },
            {
                "name":"AA1283",
                "value":5,
                "category":4
            },
            {
                "name":"AA1284",
                "value":5,
                "category":4
            },
            {
                "name":"AA1285",
                "value":5,
                "category":4
            },
            {
                "name":"AA1286",
                "value":5,
                "category":4
            },
            {
                "name":"AA1287",
                "value":5,
                "category":4
            },
            {
                "name":"AA1288",
                "value":5,
                "category":4
            },
            {
                "name":"AA1289",
                "value":5,
                "category":4
            },
            {
                "name":"AA1290",
                "value":5,
                "category":4
            },
            {
                "name":"AA1291",
                "value":5,
                "category":4
            },
            {
                "name":"AA1292",
                "value":5,
                "category":4
            },
            {
                "name":"AA1293",
                "value":5,
                "category":4
            },
            {
                "name":"AA1294",
                "value":5,
                "category":4
            },
            {
                "name":"AA1295",
                "value":5,
                "category":4
            },
            {
                "name":"AA1296",
                "value":5,
                "category":4
            },
            {
                "name":"AA1297",
                "value":5,
                "category":4
            },
            {
                "name":"AA1298",
                "value":5,
                "category":4
            },
            {
                "name":"AA1299",
                "value":5,
                "category":4
            },
            {
                "name":"AA1300",
                "value":5,
                "category":4
            },
            {
                "name":"AA1301",
                "value":5,
                "category":4
            },
            {
                "name":"AA1302",
                "value":5,
                "category":4
            },
            {
                "name":"AA1303",
                "value":10,
                "category":2
            },
            {
                "name":"AA1304",
                "value":5,
                "category":2
            },
            {
                "name":"AA1305",
                "value":5,
                "category":2
            },
            {
                "name":"AA1306",
                "value":5,
                "category":2
            },
            {
                "name":"AA1307",
                "value":10,
                "category":2
            },
            {
                "name":"AA1308",
                "value":5,
                "category":2
            },
            {
                "name":"AA1309",
                "value":5,
                "category":2
            },
            {
                "name":"AA1310",
                "value":5,
                "category":2
            },
            {
                "name":"AA1311",
                "value":5,
                "category":1
            },
            {
                "name":"AA1312",
                "value":5,
                "category":1
            },
            {
                "name":"AA1313",
                "value":5,
                "category":1
            },
            {
                "name":"AA1314",
                "value":9,
                "category":1
            },
            {
                "name":"AA1315",
                "value":5,
                "category":1
            },
            {
                "name":"AA1316",
                "value":5,
                "category":1
            },
            {
                "name":"AA1317",
                "value":5,
                "category":1
            },
            {
                "name":"AA1318",
                "value":5,
                "category":1
            },
            {
                "name":"AA1319",
                "value":5,
                "category":1
            },
            {
                "name":"AA1320",
                "value":5,
                "category":1
            },
            {
                "name":"AA1321",
                "value":5,
                "category":1
            },
            {
                "name":"AA1322",
                "value":5,
                "category":1
            },
            {
                "name":"AA1323",
                "value":5,
                "category":1
            },
            {
                "name":"AA1324",
                "value":5,
                "category":1
            },
            {
                "name":"AA1325",
                "value":5,
                "category":1
            },
            {
                "name":"AA1326",
                "value":5,
                "category":1
            },
            {
                "name":"AA1327",
                "value":5,
                "category":1
            },
            {
                "name":"AA1328",
                "value":5,
                "category":1
            },
            {
                "name":"AA1329",
                "value":5,
                "category":1
            },
            {
                "name":"AA1330",
                "value":5,
                "category":4
            },
            {
                "name":"AA1331",
                "value":5,
                "category":1
            },
            {
                "name":"AA1332",
                "value":5,
                "category":1
            },
            {
                "name":"AA1333",
                "value":5,
                "category":1
            },
            {
                "name":"AA1334",
                "value":5,
                "category":1
            },
            {
                "name":"AA1335",
                "value":5,
                "category":1
            },
            {
                "name":"AA1336",
                "value":5,
                "category":1
            },
            {
                "name":"AA1337",
                "value":5,
                "category":1
            },
            {
                "name":"AA1338",
                "value":5,
                "category":1
            },
            {
                "name":"AA1339",
                "value":5,
                "category":1
            },
            {
                "name":"AA1340",
                "value":5,
                "category":1
            },
            {
                "name":"AA1341",
                "value":5,
                "category":1
            },
            {
                "name":"AA1342",
                "value":5,
                "category":1
            },
            {
                "name":"AA1343",
                "value":5,
                "category":1
            },
            {
                "name":"AA1344",
                "value":5,
                "category":4
            },
            {
                "name":"AA1345",
                "value":5,
                "category":1
            },
            {
                "name":"AA1346",
                "value":5,
                "category":1
            },
            {
                "name":"AA1347",
                "value":5,
                "category":1
            },
            {
                "name":"AA1348",
                "value":5,
                "category":1
            },
            {
                "name":"AA1349",
                "value":5,
                "category":1
            },
            {
                "name":"AA1350",
                "value":5,
                "category":1
            },
            {
                "name":"AA1351",
                "value":5,
                "category":1
            },
            {
                "name":"AA1352",
                "value":11,
                "category":1
            },
            {
                "name":"AA1353",
                "value":5,
                "category":1
            },
            {
                "name":"AA1354",
                "value":5,
                "category":1
            },
            {
                "name":"AA1355",
                "value":5,
                "category":1
            },
            {
                "name":"AA1356",
                "value":5,
                "category":1
            },
            {
                "name":"AA1357",
                "value":5,
                "category":1
            },
            {
                "name":"AA1358",
                "value":5,
                "category":1
            },
            {
                "name":"AA1359",
                "value":5,
                "category":1
            },
            {
                "name":"AA1360",
                "value":5,
                "category":1
            },
            {
                "name":"AA1361",
                "value":5,
                "category":1
            },
            {
                "name":"AA1362",
                "value":5,
                "category":1
            },
            {
                "name":"AA1363",
                "value":5,
                "category":1
            },
            {
                "name":"AA1364",
                "value":8,
                "category":1
            },
            {
                "name":"AA1365",
                "value":5,
                "category":1
            },
            {
                "name":"AA1366",
                "value":15,
                "category":1
            },
            {
                "name":"AA1367",
                "value":5,
                "category":1
            },
            {
                "name":"AA1368",
                "value":5,
                "category":1
            },
            {
                "name":"AA1369",
                "value":5,
                "category":1
            },
            {
                "name":"AA1370",
                "value":5,
                "category":1
            },
            {
                "name":"AA1371",
                "value":5,
                "category":1
            },
            {
                "name":"AA1372",
                "value":5,
                "category":1
            },
            {
                "name":"AA1373",
                "value":5,
                "category":1
            },
            {
                "name":"AA1374",
                "value":5,
                "category":1
            },
            {
                "name":"AA1375",
                "value":5,
                "category":1
            },
            {
                "name":"AA1376",
                "value":5,
                "category":1
            },
            {
                "name":"AA1377",
                "value":5,
                "category":1
            },
            {
                "name":"AA1378",
                "value":5,
                "category":1
            },
            {
                "name":"AA1379",
                "value":5,
                "category":2
            },
            {
                "name":"AA1380",
                "value":5,
                "category":2
            },
            {
                "name":"AA1381",
                "value":5,
                "category":2
            },
            {
                "name":"AA1382",
                "value":5,
                "category":2
            },
            {
                "name":"AA1383",
                "value":5,
                "category":2
            },
            {
                "name":"AA1384",
                "value":5,
                "category":2
            },
            {
                "name":"AA1385",
                "value":5,
                "category":2
            },
            {
                "name":"AA1386",
                "value":5,
                "category":2
            },
            {
                "name":"AA1387",
                "value":5,
                "category":2
            },
            {
                "name":"AA1388",
                "value":5,
                "category":2
            },
            {
                "name":"AA1389",
                "value":5,
                "category":2
            },
            {
                "name":"AA1390",
                "value":5,
                "category":2
            },
            {
                "name":"AA1391",
                "value":5,
                "category":2
            },
            {
                "name":"AA1392",
                "value":5,
                "category":2
            },
            {
                "name":"AA1393",
                "value":5,
                "category":2
            },
            {
                "name":"AA1394",
                "value":5,
                "category":2
            },
            {
                "name":"AA1395",
                "value":5,
                "category":2
            },
            {
                "name":"AA1396",
                "value":5,
                "category":2
            },
            {
                "name":"AA1397",
                "value":5,
                "category":2
            },
            {
                "name":"AA1398",
                "value":5,
                "category":2
            },
            {
                "name":"AA1399",
                "value":5,
                "category":2
            },
            {
                "name":"AA1400",
                "value":5,
                "category":2
            },
            {
                "name":"AA1401",
                "value":1,
                "category":2
            },
            {
                "name":"AA1402",
                "value":1,
                "category":2
            },
            {
                "name":"AA1403",
                "value":10,
                "category":2
            },
            {
                "name":"AA1404",
                "value":15,
                "category":2
            },
            {
                "name":"AA1405",
                "value":13,
                "category":2
            },
            {
                "name":"AA1406",
                "value":5,
                "category":2
            },
            {
                "name":"AA1407",
                "value":5,
                "category":2
            },
            {
                "name":"AA1408",
                "value":5,
                "category":2
            },
            {
                "name":"AA1409",
                "value":5,
                "category":2
            },
            {
                "name":"AA1410",
                "value":5,
                "category":2
            },
            {
                "name":"AA1411",
                "value":5,
                "category":2
            },
            {
                "name":"AA1412",
                "value":5,
                "category":2
            },
            {
                "name":"AA1413",
                "value":5,
                "category":2
            },
            {
                "name":"AA1414",
                "value":5,
                "category":2
            },
            {
                "name":"AA1415",
                "value":5,
                "category":2
            },
            {
                "name":"AA1416",
                "value":5,
                "category":2
            },
            {
                "name":"AA1417",
                "value":5,
                "category":2
            },
            {
                "name":"AA1418",
                "value":5,
                "category":2
            },
            {
                "name":"AA1419",
                "value":5,
                "category":2
            },
            {
                "name":"AA1420",
                "value":5,
                "category":2
            },
            {
                "name":"AA1421",
                "value":5,
                "category":2
            },
            {
                "name":"AA1422",
                "value":5,
                "category":2
            },
            {
                "name":"AA1423",
                "value":5,
                "category":2
            },
            {
                "name":"AA1424",
                "value":5,
                "category":2
            },
            {
                "name":"AA1425",
                "value":13,
                "category":2
            },
            {
                "name":"AA1426",
                "value":5,
                "category":2
            },
            {
                "name":"AA1427",
                "value":5,
                "category":2
            },
            {
                "name":"AA1428",
                "value":5,
                "category":2
            },
            {
                "name":"AA1429",
                "value":5,
                "category":2
            },
            {
                "name":"AA1430",
                "value":5,
                "category":2
            },
            {
                "name":"AA1431",
                "value":5,
                "category":2
            },
            {
                "name":"AA1432",
                "value":5,
                "category":2
            },
            {
                "name":"AA1433",
                "value":5,
                "category":2
            },
            {
                "name":"AA1434",
                "value":5,
                "category":2
            },
            {
                "name":"AA1435",
                "value":5,
                "category":2
            },
            {
                "name":"AA1436",
                "value":5,
                "category":2
            },
            {
                "name":"AA1437",
                "value":5,
                "category":2
            },
            {
                "name":"AA1438",
                "value":5,
                "category":2
            },
            {
                "name":"AA1439",
                "value":5,
                "category":2
            },
            {
                "name":"AA1440",
                "value":5,
                "category":2
            },
            {
                "name":"AA1441",
                "value":5,
                "category":2
            },
            {
                "name":"AA1442",
                "value":5,
                "category":2
            },
            {
                "name":"AA1443",
                "value":5,
                "category":2
            },
            {
                "name":"AA1444",
                "value":5,
                "category":2
            },
            {
                "name":"AA1445",
                "value":5,
                "category":2
            },
            {
                "name":"AA1446",
                "value":13,
                "category":2
            },
            {
                "name":"AA1447",
                "value":5,
                "category":2
            },
            {
                "name":"AA1448",
                "value":5,
                "category":2
            },
            {
                "name":"AA1449",
                "value":21,
                "category":2
            },
            {
                "name":"AA1450",
                "value":5,
                "category":2
            },
            {
                "name":"AA1451",
                "value":5,
                "category":2
            },
            {
                "name":"AA1452",
                "value":5,
                "category":4
            },
            {
                "name":"AA1453",
                "value":5,
                "category":4
            },
            {
                "name":"AA1454",
                "value":5,
                "category":4
            },
            {
                "name":"AA1455",
                "value":5,
                "category":4
            },
            {
                "name":"AA1456",
                "value":5,
                "category":4
            },
            {
                "name":"AA1457",
                "value":5,
                "category":4
            },
            {
                "name":"AA1458",
                "value":5,
                "category":4
            },
            {
                "name":"AA1459",
                "value":5,
                "category":4
            },
            {
                "name":"AA1460",
                "value":3,
                "category":5
            },
            {
                "name":"AA1461",
                "value":5,
                "category":5
            },
            {
                "name":"AA1462",
                "value":5,
                "category":5
            },
            {
                "name":"AA1463",
                "value":5,
                "category":5
            },
            {
                "name":"AA1464",
                "value":5,
                "category":5
            },
            {
                "name":"AA1465",
                "value":5,
                "category":5
            },
            {
                "name":"AA1466",
                "value":5,
                "category":5
            },
            {
                "name":"AA1467",
                "value":5,
                "category":5
            },
            {
                "name":"AA1468",
                "value":5,
                "category":5
            },
            {
                "name":"AA1469",
                "value":5,
                "category":5
            },
            {
                "name":"AA1470",
                "value":5,
                "category":5
            },
            {
                "name":"AA1471",
                "value":5,
                "category":4
            },
            {
                "name":"AA1472",
                "value":5,
                "category":4
            },
            {
                "name":"AA1473",
                "value":5,
                "category":4
            },
            {
                "name":"AA1474",
                "value":5,
                "category":4
            },
            {
                "name":"AA1475",
                "value":5,
                "category":4
            },
            {
                "name":"AA1476",
                "value":5,
                "category":4
            },
            {
                "name":"AA1477",
                "value":5,
                "category":4
            },
            {
                "name":"AA1478",
                "value":5,
                "category":4
            },
            {
                "name":"AA1479",
                "value":5,
                "category":4
            },
            {
                "name":"AA1480",
                "value":5,
                "category":4
            },
            {
                "name":"AA1481",
                "value":5,
                "category":4
            },
            {
                "name":"AA1482",
                "value":5,
                "category":4
            },
            {
                "name":"AA1483",
                "value":5,
                "category":4
            },
            {
                "name":"AA1484",
                "value":5,
                "category":4
            },
            {
                "name":"AA1485",
                "value":5,
                "category":4
            },
            {
                "name":"AA1486",
                "value":5,
                "category":4
            },
            {
                "name":"AA1487",
                "value":5,
                "category":4
            },
            {
                "name":"AA1488",
                "value":5,
                "category":4
            },
            {
                "name":"AA1489",
                "value":5,
                "category":4
            },
            {
                "name":"AA1490",
                "value":5,
                "category":4
            },
            {
                "name":"AA1491",
                "value":5,
                "category":4
            }
        ],
        "links":[
            {
                "source":0,
                "target":1
            },
            {
                "source":0,
                "target":2
            },
            {
                "source":0,
                "target":3
            },
            {
                "source":4,
                "target":4
            },
            {
                "source":5,
                "target":4
            },
            {
                "source":6,
                "target":7
            },
            {
                "source":6,
                "target":8
            },
            {
                "source":9,
                "target":3
            },
            {
                "source":10,
                "target":9
            },
            {
                "source":11,
                "target":12
            },
            {
                "source":11,
                "target":9
            },
            {
                "source":11,
                "target":13
            },
            {
                "source":11,
                "target":14
            },
            {
                "source":15,
                "target":16
            },
            {
                "source":15,
                "target":17
            },
            {
                "source":15,
                "target":0
            },
            {
                "source":15,
                "target":18
            },
            {
                "source":15,
                "target":9
            },
            {
                "source":15,
                "target":11
            },
            {
                "source":15,
                "target":19
            },
            {
                "source":15,
                "target":20
            },
            {
                "source":15,
                "target":21
            },
            {
                "source":15,
                "target":22
            },
            {
                "source":15,
                "target":23
            },
            {
                "source":15,
                "target":24
            },
            {
                "source":15,
                "target":25
            },
            {
                "source":15,
                "target":26
            },
            {
                "source":15,
                "target":27
            },
            {
                "source":15,
                "target":28
            },
            {
                "source":15,
                "target":29
            },
            {
                "source":15,
                "target":30
            },
            {
                "source":15,
                "target":31
            },
            {
                "source":15,
                "target":32
            },
            {
                "source":15,
                "target":4
            },
            {
                "source":16,
                "target":1
            },
            {
                "source":13,
                "target":14
            },
            {
                "source":1,
                "target":15
            },
            {
                "source":1,
                "target":1
            },
            {
                "source":1,
                "target":14
            },
            {
                "source":14,
                "target":3
            },
            {
                "source":12,
                "target":1
            },
            {
                "source":18,
                "target":1
            },
            {
                "source":18,
                "target":14
            },
            {
                "source":18,
                "target":3
            },
            {
                "source":33,
                "target":34
            },
            {
                "source":35,
                "target":33
            },
            {
                "source":35,
                "target":36
            },
            {
                "source":35,
                "target":37
            },
            {
                "source":35,
                "target":38
            },
            {
                "source":35,
                "target":39
            },
            {
                "source":35,
                "target":34
            },
            {
                "source":35,
                "target":40
            },
            {
                "source":35,
                "target":41
            },
            {
                "source":42,
                "target":43
            },
            {
                "source":19,
                "target":1
            },
            {
                "source":20,
                "target":1
            },
            {
                "source":44,
                "target":7
            },
            {
                "source":45,
                "target":46
            },
            {
                "source":47,
                "target":48
            },
            {
                "source":47,
                "target":49
            },
            {
                "source":47,
                "target":39
            },
            {
                "source":50,
                "target":44
            },
            {
                "source":51,
                "target":52
            },
            {
                "source":21,
                "target":1
            },
            {
                "source":21,
                "target":9
            },
            {
                "source":53,
                "target":5
            },
            {
                "source":54,
                "target":55
            },
            {
                "source":56,
                "target":55
            },
            {
                "source":56,
                "target":57
            },
            {
                "source":58,
                "target":55
            },
            {
                "source":58,
                "target":59
            },
            {
                "source":58,
                "target":60
            },
            {
                "source":61,
                "target":55
            },
            {
                "source":61,
                "target":62
            },
            {
                "source":61,
                "target":59
            },
            {
                "source":63,
                "target":55
            },
            {
                "source":63,
                "target":57
            },
            {
                "source":64,
                "target":65
            },
            {
                "source":64,
                "target":66
            },
            {
                "source":64,
                "target":67
            },
            {
                "source":64,
                "target":68
            },
            {
                "source":55,
                "target":55
            },
            {
                "source":55,
                "target":60
            },
            {
                "source":62,
                "target":55
            },
            {
                "source":57,
                "target":55
            },
            {
                "source":57,
                "target":65
            },
            {
                "source":69,
                "target":55
            },
            {
                "source":69,
                "target":57
            },
            {
                "source":60,
                "target":70
            },
            {
                "source":60,
                "target":62
            },
            {
                "source":60,
                "target":55
            },
            {
                "source":71,
                "target":55
            },
            {
                "source":72,
                "target":65
            },
            {
                "source":73,
                "target":74
            },
            {
                "source":75,
                "target":73
            },
            {
                "source":75,
                "target":76
            },
            {
                "source":76,
                "target":77
            },
            {
                "source":78,
                "target":79
            },
            {
                "source":78,
                "target":80
            },
            {
                "source":49,
                "target":81
            },
            {
                "source":49,
                "target":78
            },
            {
                "source":82,
                "target":5
            },
            {
                "source":83,
                "target":84
            },
            {
                "source":22,
                "target":1
            },
            {
                "source":22,
                "target":14
            },
            {
                "source":85,
                "target":80
            },
            {
                "source":85,
                "target":86
            },
            {
                "source":85,
                "target":87
            },
            {
                "source":88,
                "target":89
            },
            {
                "source":88,
                "target":90
            },
            {
                "source":88,
                "target":88
            },
            {
                "source":88,
                "target":91
            },
            {
                "source":86,
                "target":92
            },
            {
                "source":90,
                "target":93
            },
            {
                "source":94,
                "target":7
            },
            {
                "source":94,
                "target":8
            },
            {
                "source":94,
                "target":95
            },
            {
                "source":96,
                "target":7
            },
            {
                "source":96,
                "target":97
            },
            {
                "source":98,
                "target":85
            },
            {
                "source":99,
                "target":88
            },
            {
                "source":100,
                "target":60
            },
            {
                "source":100,
                "target":96
            },
            {
                "source":100,
                "target":101
            },
            {
                "source":102,
                "target":103
            },
            {
                "source":104,
                "target":102
            },
            {
                "source":103,
                "target":102
            },
            {
                "source":105,
                "target":103
            },
            {
                "source":106,
                "target":7
            },
            {
                "source":106,
                "target":107
            },
            {
                "source":108,
                "target":109
            },
            {
                "source":23,
                "target":1
            },
            {
                "source":23,
                "target":14
            },
            {
                "source":8,
                "target":7
            },
            {
                "source":8,
                "target":109
            },
            {
                "source":8,
                "target":110
            },
            {
                "source":8,
                "target":8
            },
            {
                "source":8,
                "target":57
            },
            {
                "source":8,
                "target":6
            },
            {
                "source":8,
                "target":46
            },
            {
                "source":8,
                "target":45
            },
            {
                "source":8,
                "target":95
            },
            {
                "source":8,
                "target":111
            },
            {
                "source":112,
                "target":7
            },
            {
                "source":113,
                "target":7
            },
            {
                "source":92,
                "target":114
            },
            {
                "source":80,
                "target":98
            },
            {
                "source":80,
                "target":85
            },
            {
                "source":80,
                "target":115
            },
            {
                "source":80,
                "target":116
            },
            {
                "source":80,
                "target":87
            },
            {
                "source":114,
                "target":80
            },
            {
                "source":93,
                "target":89
            },
            {
                "source":116,
                "target":80
            },
            {
                "source":89,
                "target":99
            },
            {
                "source":89,
                "target":89
            },
            {
                "source":89,
                "target":117
            },
            {
                "source":89,
                "target":88
            },
            {
                "source":118,
                "target":119
            },
            {
                "source":120,
                "target":81
            },
            {
                "source":121,
                "target":80
            },
            {
                "source":121,
                "target":122
            },
            {
                "source":121,
                "target":120
            },
            {
                "source":91,
                "target":89
            },
            {
                "source":91,
                "target":123
            },
            {
                "source":91,
                "target":81
            },
            {
                "source":48,
                "target":81
            },
            {
                "source":124,
                "target":119
            },
            {
                "source":125,
                "target":4
            },
            {
                "source":126,
                "target":98
            },
            {
                "source":127,
                "target":119
            },
            {
                "source":122,
                "target":127
            },
            {
                "source":3,
                "target":5
            },
            {
                "source":3,
                "target":3
            },
            {
                "source":128,
                "target":5
            },
            {
                "source":128,
                "target":128
            },
            {
                "source":24,
                "target":1
            },
            {
                "source":24,
                "target":13
            },
            {
                "source":129,
                "target":130
            },
            {
                "source":131,
                "target":132
            },
            {
                "source":133,
                "target":134
            },
            {
                "source":135,
                "target":7
            },
            {
                "source":135,
                "target":95
            },
            {
                "source":136,
                "target":137
            },
            {
                "source":138,
                "target":137
            },
            {
                "source":139,
                "target":137
            },
            {
                "source":140,
                "target":141
            },
            {
                "source":142,
                "target":137
            },
            {
                "source":143,
                "target":137
            },
            {
                "source":144,
                "target":137
            },
            {
                "source":145,
                "target":137
            },
            {
                "source":146,
                "target":137
            },
            {
                "source":146,
                "target":147
            },
            {
                "source":146,
                "target":95
            },
            {
                "source":146,
                "target":148
            },
            {
                "source":34,
                "target":137
            },
            {
                "source":149,
                "target":7
            },
            {
                "source":150,
                "target":137
            },
            {
                "source":150,
                "target":95
            },
            {
                "source":151,
                "target":137
            },
            {
                "source":151,
                "target":149
            },
            {
                "source":152,
                "target":137
            },
            {
                "source":153,
                "target":137
            },
            {
                "source":154,
                "target":137
            },
            {
                "source":155,
                "target":137
            },
            {
                "source":101,
                "target":8
            },
            {
                "source":101,
                "target":135
            },
            {
                "source":101,
                "target":149
            },
            {
                "source":137,
                "target":8
            },
            {
                "source":137,
                "target":149
            },
            {
                "source":156,
                "target":137
            },
            {
                "source":156,
                "target":157
            },
            {
                "source":158,
                "target":137
            },
            {
                "source":158,
                "target":149
            },
            {
                "source":158,
                "target":147
            },
            {
                "source":158,
                "target":148
            },
            {
                "source":159,
                "target":137
            },
            {
                "source":160,
                "target":149
            },
            {
                "source":160,
                "target":7
            },
            {
                "source":147,
                "target":137
            },
            {
                "source":147,
                "target":149
            },
            {
                "source":161,
                "target":137
            },
            {
                "source":161,
                "target":157
            },
            {
                "source":162,
                "target":137
            },
            {
                "source":163,
                "target":137
            },
            {
                "source":164,
                "target":137
            },
            {
                "source":165,
                "target":137
            },
            {
                "source":166,
                "target":137
            },
            {
                "source":167,
                "target":137
            },
            {
                "source":167,
                "target":157
            },
            {
                "source":39,
                "target":137
            },
            {
                "source":168,
                "target":137
            },
            {
                "source":168,
                "target":48
            },
            {
                "source":168,
                "target":147
            },
            {
                "source":168,
                "target":95
            },
            {
                "source":168,
                "target":148
            },
            {
                "source":168,
                "target":114
            },
            {
                "source":169,
                "target":137
            },
            {
                "source":169,
                "target":147
            },
            {
                "source":169,
                "target":95
            },
            {
                "source":169,
                "target":148
            },
            {
                "source":170,
                "target":137
            },
            {
                "source":170,
                "target":147
            },
            {
                "source":171,
                "target":137
            },
            {
                "source":171,
                "target":147
            },
            {
                "source":172,
                "target":137
            },
            {
                "source":173,
                "target":137
            },
            {
                "source":173,
                "target":70
            },
            {
                "source":173,
                "target":108
            },
            {
                "source":174,
                "target":137
            },
            {
                "source":174,
                "target":149
            },
            {
                "source":175,
                "target":137
            },
            {
                "source":141,
                "target":137
            },
            {
                "source":141,
                "target":176
            },
            {
                "source":141,
                "target":177
            },
            {
                "source":141,
                "target":178
            },
            {
                "source":141,
                "target":179
            },
            {
                "source":141,
                "target":180
            },
            {
                "source":181,
                "target":137
            },
            {
                "source":182,
                "target":137
            },
            {
                "source":183,
                "target":137
            },
            {
                "source":183,
                "target":95
            },
            {
                "source":184,
                "target":137
            },
            {
                "source":185,
                "target":137
            },
            {
                "source":185,
                "target":147
            },
            {
                "source":185,
                "target":148
            },
            {
                "source":185,
                "target":157
            },
            {
                "source":186,
                "target":137
            },
            {
                "source":187,
                "target":137
            },
            {
                "source":188,
                "target":137
            },
            {
                "source":188,
                "target":147
            },
            {
                "source":189,
                "target":149
            },
            {
                "source":189,
                "target":188
            },
            {
                "source":189,
                "target":7
            },
            {
                "source":190,
                "target":137
            },
            {
                "source":190,
                "target":147
            },
            {
                "source":190,
                "target":108
            },
            {
                "source":190,
                "target":95
            },
            {
                "source":190,
                "target":148
            },
            {
                "source":191,
                "target":137
            },
            {
                "source":192,
                "target":137
            },
            {
                "source":193,
                "target":137
            },
            {
                "source":194,
                "target":137
            },
            {
                "source":194,
                "target":95
            },
            {
                "source":195,
                "target":137
            },
            {
                "source":196,
                "target":137
            },
            {
                "source":197,
                "target":137
            },
            {
                "source":197,
                "target":147
            },
            {
                "source":197,
                "target":95
            },
            {
                "source":197,
                "target":189
            },
            {
                "source":197,
                "target":149
            },
            {
                "source":197,
                "target":148
            },
            {
                "source":197,
                "target":7
            },
            {
                "source":198,
                "target":137
            },
            {
                "source":199,
                "target":137
            },
            {
                "source":200,
                "target":137
            },
            {
                "source":201,
                "target":137
            },
            {
                "source":201,
                "target":70
            },
            {
                "source":202,
                "target":137
            },
            {
                "source":203,
                "target":137
            },
            {
                "source":204,
                "target":137
            },
            {
                "source":205,
                "target":137
            },
            {
                "source":205,
                "target":202
            },
            {
                "source":205,
                "target":149
            },
            {
                "source":205,
                "target":206
            },
            {
                "source":207,
                "target":137
            },
            {
                "source":207,
                "target":149
            },
            {
                "source":206,
                "target":137
            },
            {
                "source":206,
                "target":149
            },
            {
                "source":208,
                "target":137
            },
            {
                "source":208,
                "target":147
            },
            {
                "source":208,
                "target":95
            },
            {
                "source":208,
                "target":148
            },
            {
                "source":209,
                "target":137
            },
            {
                "source":210,
                "target":137
            },
            {
                "source":210,
                "target":180
            },
            {
                "source":211,
                "target":137
            },
            {
                "source":212,
                "target":137
            },
            {
                "source":40,
                "target":141
            },
            {
                "source":213,
                "target":214
            },
            {
                "source":213,
                "target":215
            },
            {
                "source":213,
                "target":216
            },
            {
                "source":217,
                "target":213
            },
            {
                "source":218,
                "target":219
            },
            {
                "source":218,
                "target":214
            },
            {
                "source":218,
                "target":220
            },
            {
                "source":218,
                "target":221
            },
            {
                "source":222,
                "target":215
            },
            {
                "source":222,
                "target":223
            },
            {
                "source":222,
                "target":224
            },
            {
                "source":222,
                "target":216
            },
            {
                "source":225,
                "target":214
            },
            {
                "source":225,
                "target":220
            },
            {
                "source":225,
                "target":216
            },
            {
                "source":226,
                "target":215
            },
            {
                "source":226,
                "target":226
            },
            {
                "source":220,
                "target":219
            },
            {
                "source":220,
                "target":214
            },
            {
                "source":220,
                "target":221
            },
            {
                "source":220,
                "target":216
            },
            {
                "source":220,
                "target":225
            },
            {
                "source":224,
                "target":216
            },
            {
                "source":216,
                "target":227
            },
            {
                "source":216,
                "target":214
            },
            {
                "source":216,
                "target":221
            },
            {
                "source":221,
                "target":218
            },
            {
                "source":221,
                "target":227
            },
            {
                "source":221,
                "target":220
            },
            {
                "source":223,
                "target":216
            },
            {
                "source":228,
                "target":5
            },
            {
                "source":228,
                "target":228
            },
            {
                "source":229,
                "target":5
            },
            {
                "source":229,
                "target":229
            },
            {
                "source":230,
                "target":5
            },
            {
                "source":230,
                "target":230
            },
            {
                "source":231,
                "target":231
            },
            {
                "source":232,
                "target":233
            },
            {
                "source":234,
                "target":219
            },
            {
                "source":177,
                "target":176
            },
            {
                "source":25,
                "target":12
            },
            {
                "source":25,
                "target":141
            },
            {
                "source":235,
                "target":236
            },
            {
                "source":236,
                "target":235
            },
            {
                "source":237,
                "target":238
            },
            {
                "source":237,
                "target":239
            },
            {
                "source":233,
                "target":240
            },
            {
                "source":26,
                "target":12
            },
            {
                "source":26,
                "target":233
            },
            {
                "source":27,
                "target":12
            },
            {
                "source":27,
                "target":233
            },
            {
                "source":241,
                "target":233
            },
            {
                "source":240,
                "target":242
            },
            {
                "source":243,
                "target":244
            },
            {
                "source":115,
                "target":117
            },
            {
                "source":245,
                "target":7
            },
            {
                "source":246,
                "target":95
            },
            {
                "source":246,
                "target":7
            },
            {
                "source":97,
                "target":7
            },
            {
                "source":247,
                "target":131
            },
            {
                "source":247,
                "target":104
            },
            {
                "source":247,
                "target":105
            },
            {
                "source":247,
                "target":248
            },
            {
                "source":247,
                "target":129
            },
            {
                "source":249,
                "target":250
            },
            {
                "source":251,
                "target":232
            },
            {
                "source":7,
                "target":97
            },
            {
                "source":7,
                "target":95
            },
            {
                "source":7,
                "target":7
            },
            {
                "source":7,
                "target":8
            },
            {
                "source":252,
                "target":7
            },
            {
                "source":253,
                "target":252
            },
            {
                "source":253,
                "target":7
            },
            {
                "source":95,
                "target":7
            },
            {
                "source":254,
                "target":7
            },
            {
                "source":255,
                "target":256
            },
            {
                "source":257,
                "target":255
            },
            {
                "source":257,
                "target":87
            },
            {
                "source":258,
                "target":259
            },
            {
                "source":28,
                "target":12
            },
            {
                "source":28,
                "target":14
            },
            {
                "source":28,
                "target":32
            },
            {
                "source":29,
                "target":1
            },
            {
                "source":260,
                "target":52
            },
            {
                "source":260,
                "target":261
            },
            {
                "source":260,
                "target":262
            },
            {
                "source":132,
                "target":133
            },
            {
                "source":263,
                "target":264
            },
            {
                "source":265,
                "target":7
            },
            {
                "source":265,
                "target":70
            },
            {
                "source":266,
                "target":95
            },
            {
                "source":107,
                "target":7
            },
            {
                "source":107,
                "target":94
            },
            {
                "source":107,
                "target":107
            },
            {
                "source":107,
                "target":46
            },
            {
                "source":107,
                "target":45
            },
            {
                "source":68,
                "target":64
            },
            {
                "source":67,
                "target":64
            },
            {
                "source":267,
                "target":4
            },
            {
                "source":267,
                "target":5
            },
            {
                "source":268,
                "target":269
            },
            {
                "source":268,
                "target":241
            },
            {
                "source":268,
                "target":270
            },
            {
                "source":268,
                "target":233
            },
            {
                "source":268,
                "target":271
            },
            {
                "source":268,
                "target":267
            },
            {
                "source":268,
                "target":272
            },
            {
                "source":271,
                "target":269
            },
            {
                "source":272,
                "target":273
            },
            {
                "source":274,
                "target":275
            },
            {
                "source":30,
                "target":1
            },
            {
                "source":276,
                "target":277
            },
            {
                "source":111,
                "target":94
            },
            {
                "source":111,
                "target":8
            },
            {
                "source":111,
                "target":7
            },
            {
                "source":111,
                "target":95
            },
            {
                "source":111,
                "target":106
            },
            {
                "source":278,
                "target":279
            },
            {
                "source":278,
                "target":244
            },
            {
                "source":280,
                "target":84
            },
            {
                "source":239,
                "target":176
            },
            {
                "source":239,
                "target":2
            },
            {
                "source":238,
                "target":239
            },
            {
                "source":281,
                "target":282
            },
            {
                "source":283,
                "target":284
            },
            {
                "source":285,
                "target":281
            },
            {
                "source":286,
                "target":287
            },
            {
                "source":288,
                "target":286
            },
            {
                "source":289,
                "target":290
            },
            {
                "source":291,
                "target":292
            },
            {
                "source":293,
                "target":292
            },
            {
                "source":74,
                "target":292
            },
            {
                "source":294,
                "target":295
            },
            {
                "source":296,
                "target":289
            },
            {
                "source":77,
                "target":296
            },
            {
                "source":297,
                "target":298
            },
            {
                "source":297,
                "target":299
            },
            {
                "source":300,
                "target":301
            },
            {
                "source":70,
                "target":59
            },
            {
                "source":70,
                "target":7
            },
            {
                "source":70,
                "target":70
            },
            {
                "source":302,
                "target":70
            },
            {
                "source":303,
                "target":304
            },
            {
                "source":303,
                "target":305
            },
            {
                "source":306,
                "target":307
            },
            {
                "source":308,
                "target":309
            },
            {
                "source":310,
                "target":307
            },
            {
                "source":311,
                "target":312
            },
            {
                "source":313,
                "target":314
            },
            {
                "source":315,
                "target":316
            },
            {
                "source":317,
                "target":318
            },
            {
                "source":319,
                "target":320
            },
            {
                "source":321,
                "target":322
            },
            {
                "source":323,
                "target":324
            },
            {
                "source":325,
                "target":326
            },
            {
                "source":327,
                "target":312
            },
            {
                "source":328,
                "target":312
            },
            {
                "source":329,
                "target":312
            },
            {
                "source":312,
                "target":330
            },
            {
                "source":312,
                "target":307
            },
            {
                "source":331,
                "target":304
            },
            {
                "source":331,
                "target":315
            },
            {
                "source":332,
                "target":304
            },
            {
                "source":332,
                "target":333
            },
            {
                "source":334,
                "target":65
            },
            {
                "source":334,
                "target":67
            },
            {
                "source":335,
                "target":307
            },
            {
                "source":335,
                "target":336
            },
            {
                "source":335,
                "target":319
            },
            {
                "source":335,
                "target":333
            },
            {
                "source":337,
                "target":338
            },
            {
                "source":337,
                "target":315
            },
            {
                "source":339,
                "target":304
            },
            {
                "source":340,
                "target":341
            },
            {
                "source":157,
                "target":342
            },
            {
                "source":307,
                "target":8
            },
            {
                "source":307,
                "target":342
            },
            {
                "source":307,
                "target":307
            },
            {
                "source":343,
                "target":344
            },
            {
                "source":343,
                "target":345
            },
            {
                "source":343,
                "target":307
            },
            {
                "source":343,
                "target":346
            },
            {
                "source":343,
                "target":343
            },
            {
                "source":345,
                "target":343
            },
            {
                "source":347,
                "target":304
            },
            {
                "source":347,
                "target":315
            },
            {
                "source":338,
                "target":348
            },
            {
                "source":349,
                "target":350
            },
            {
                "source":349,
                "target":305
            },
            {
                "source":349,
                "target":333
            },
            {
                "source":351,
                "target":350
            },
            {
                "source":351,
                "target":305
            },
            {
                "source":351,
                "target":333
            },
            {
                "source":351,
                "target":319
            },
            {
                "source":352,
                "target":350
            },
            {
                "source":352,
                "target":305
            },
            {
                "source":353,
                "target":350
            },
            {
                "source":353,
                "target":305
            },
            {
                "source":353,
                "target":336
            },
            {
                "source":353,
                "target":333
            },
            {
                "source":354,
                "target":350
            },
            {
                "source":354,
                "target":336
            },
            {
                "source":354,
                "target":333
            },
            {
                "source":354,
                "target":305
            },
            {
                "source":354,
                "target":319
            },
            {
                "source":354,
                "target":355
            },
            {
                "source":354,
                "target":348
            },
            {
                "source":356,
                "target":350
            },
            {
                "source":356,
                "target":336
            },
            {
                "source":356,
                "target":305
            },
            {
                "source":357,
                "target":350
            },
            {
                "source":357,
                "target":305
            },
            {
                "source":357,
                "target":336
            },
            {
                "source":357,
                "target":333
            },
            {
                "source":358,
                "target":307
            },
            {
                "source":358,
                "target":336
            },
            {
                "source":359,
                "target":350
            },
            {
                "source":359,
                "target":336
            },
            {
                "source":359,
                "target":305
            },
            {
                "source":360,
                "target":350
            },
            {
                "source":361,
                "target":335
            },
            {
                "source":362,
                "target":335
            },
            {
                "source":363,
                "target":335
            },
            {
                "source":364,
                "target":335
            },
            {
                "source":365,
                "target":350
            },
            {
                "source":365,
                "target":305
            },
            {
                "source":365,
                "target":336
            },
            {
                "source":366,
                "target":350
            },
            {
                "source":366,
                "target":321
            },
            {
                "source":367,
                "target":350
            },
            {
                "source":368,
                "target":307
            },
            {
                "source":368,
                "target":305
            },
            {
                "source":369,
                "target":350
            },
            {
                "source":369,
                "target":305
            },
            {
                "source":369,
                "target":333
            },
            {
                "source":369,
                "target":336
            },
            {
                "source":370,
                "target":350
            },
            {
                "source":370,
                "target":336
            },
            {
                "source":370,
                "target":305
            },
            {
                "source":371,
                "target":307
            },
            {
                "source":371,
                "target":336
            },
            {
                "source":372,
                "target":350
            },
            {
                "source":372,
                "target":305
            },
            {
                "source":372,
                "target":336
            },
            {
                "source":373,
                "target":307
            },
            {
                "source":373,
                "target":336
            },
            {
                "source":374,
                "target":350
            },
            {
                "source":374,
                "target":305
            },
            {
                "source":375,
                "target":350
            },
            {
                "source":375,
                "target":336
            },
            {
                "source":375,
                "target":355
            },
            {
                "source":375,
                "target":333
            },
            {
                "source":376,
                "target":341
            },
            {
                "source":376,
                "target":355
            },
            {
                "source":376,
                "target":333
            },
            {
                "source":376,
                "target":315
            },
            {
                "source":350,
                "target":341
            },
            {
                "source":350,
                "target":315
            },
            {
                "source":350,
                "target":305
            },
            {
                "source":377,
                "target":321
            },
            {
                "source":377,
                "target":323
            },
            {
                "source":378,
                "target":307
            },
            {
                "source":379,
                "target":307
            },
            {
                "source":380,
                "target":307
            },
            {
                "source":381,
                "target":307
            },
            {
                "source":382,
                "target":307
            },
            {
                "source":383,
                "target":307
            },
            {
                "source":384,
                "target":304
            },
            {
                "source":384,
                "target":315
            },
            {
                "source":385,
                "target":304
            },
            {
                "source":386,
                "target":307
            },
            {
                "source":387,
                "target":341
            },
            {
                "source":388,
                "target":341
            },
            {
                "source":388,
                "target":325
            },
            {
                "source":388,
                "target":333
            },
            {
                "source":389,
                "target":307
            },
            {
                "source":390,
                "target":304
            },
            {
                "source":390,
                "target":315
            },
            {
                "source":390,
                "target":321
            },
            {
                "source":318,
                "target":316
            },
            {
                "source":391,
                "target":388
            },
            {
                "source":391,
                "target":315
            },
            {
                "source":392,
                "target":304
            },
            {
                "source":392,
                "target":315
            },
            {
                "source":393,
                "target":307
            },
            {
                "source":393,
                "target":324
            },
            {
                "source":393,
                "target":394
            },
            {
                "source":395,
                "target":377
            },
            {
                "source":395,
                "target":315
            },
            {
                "source":395,
                "target":333
            },
            {
                "source":395,
                "target":313
            },
            {
                "source":395,
                "target":314
            },
            {
                "source":396,
                "target":341
            },
            {
                "source":396,
                "target":315
            },
            {
                "source":396,
                "target":333
            },
            {
                "source":394,
                "target":394
            },
            {
                "source":397,
                "target":307
            },
            {
                "source":398,
                "target":307
            },
            {
                "source":399,
                "target":338
            },
            {
                "source":320,
                "target":400
            },
            {
                "source":401,
                "target":334
            },
            {
                "source":402,
                "target":304
            },
            {
                "source":402,
                "target":403
            },
            {
                "source":402,
                "target":336
            },
            {
                "source":402,
                "target":404
            },
            {
                "source":402,
                "target":405
            },
            {
                "source":402,
                "target":406
            },
            {
                "source":402,
                "target":407
            },
            {
                "source":402,
                "target":408
            },
            {
                "source":402,
                "target":409
            },
            {
                "source":402,
                "target":410
            },
            {
                "source":402,
                "target":411
            },
            {
                "source":402,
                "target":412
            },
            {
                "source":402,
                "target":413
            },
            {
                "source":402,
                "target":414
            },
            {
                "source":402,
                "target":415
            },
            {
                "source":402,
                "target":416
            },
            {
                "source":402,
                "target":417
            },
            {
                "source":402,
                "target":418
            },
            {
                "source":402,
                "target":419
            },
            {
                "source":402,
                "target":420
            },
            {
                "source":402,
                "target":421
            },
            {
                "source":402,
                "target":422
            },
            {
                "source":402,
                "target":423
            },
            {
                "source":404,
                "target":424
            },
            {
                "source":405,
                "target":424
            },
            {
                "source":406,
                "target":424
            },
            {
                "source":407,
                "target":424
            },
            {
                "source":408,
                "target":424
            },
            {
                "source":409,
                "target":424
            },
            {
                "source":410,
                "target":424
            },
            {
                "source":411,
                "target":424
            },
            {
                "source":412,
                "target":424
            },
            {
                "source":413,
                "target":424
            },
            {
                "source":414,
                "target":424
            },
            {
                "source":415,
                "target":424
            },
            {
                "source":416,
                "target":424
            },
            {
                "source":417,
                "target":424
            },
            {
                "source":418,
                "target":424
            },
            {
                "source":419,
                "target":424
            },
            {
                "source":420,
                "target":424
            },
            {
                "source":403,
                "target":424
            },
            {
                "source":421,
                "target":424
            },
            {
                "source":422,
                "target":424
            },
            {
                "source":425,
                "target":377
            },
            {
                "source":425,
                "target":315
            },
            {
                "source":425,
                "target":333
            },
            {
                "source":425,
                "target":325
            },
            {
                "source":423,
                "target":423
            },
            {
                "source":426,
                "target":423
            },
            {
                "source":427,
                "target":304
            },
            {
                "source":427,
                "target":426
            },
            {
                "source":428,
                "target":304
            },
            {
                "source":428,
                "target":426
            },
            {
                "source":429,
                "target":388
            },
            {
                "source":429,
                "target":315
            },
            {
                "source":430,
                "target":304
            },
            {
                "source":430,
                "target":315
            },
            {
                "source":431,
                "target":338
            },
            {
                "source":432,
                "target":312
            },
            {
                "source":433,
                "target":341
            },
            {
                "source":433,
                "target":336
            },
            {
                "source":341,
                "target":305
            },
            {
                "source":341,
                "target":57
            },
            {
                "source":341,
                "target":65
            },
            {
                "source":434,
                "target":435
            },
            {
                "source":342,
                "target":436
            },
            {
                "source":342,
                "target":423
            },
            {
                "source":342,
                "target":437
            },
            {
                "source":342,
                "target":315
            },
            {
                "source":342,
                "target":324
            },
            {
                "source":342,
                "target":307
            },
            {
                "source":342,
                "target":314
            },
            {
                "source":342,
                "target":316
            },
            {
                "source":342,
                "target":394
            },
            {
                "source":342,
                "target":400
            },
            {
                "source":342,
                "target":438
            },
            {
                "source":342,
                "target":8
            },
            {
                "source":342,
                "target":95
            },
            {
                "source":439,
                "target":304
            },
            {
                "source":440,
                "target":377
            },
            {
                "source":441,
                "target":442
            },
            {
                "source":443,
                "target":341
            },
            {
                "source":443,
                "target":333
            },
            {
                "source":443,
                "target":315
            },
            {
                "source":443,
                "target":423
            },
            {
                "source":443,
                "target":324
            },
            {
                "source":444,
                "target":304
            },
            {
                "source":445,
                "target":309
            },
            {
                "source":445,
                "target":333
            },
            {
                "source":445,
                "target":315
            },
            {
                "source":446,
                "target":443
            },
            {
                "source":446,
                "target":317
            },
            {
                "source":446,
                "target":319
            },
            {
                "source":447,
                "target":341
            },
            {
                "source":438,
                "target":394
            },
            {
                "source":304,
                "target":393
            },
            {
                "source":304,
                "target":325
            },
            {
                "source":326,
                "target":438
            },
            {
                "source":448,
                "target":309
            },
            {
                "source":449,
                "target":446
            },
            {
                "source":309,
                "target":305
            },
            {
                "source":346,
                "target":304
            },
            {
                "source":346,
                "target":343
            },
            {
                "source":346,
                "target":315
            },
            {
                "source":450,
                "target":436
            },
            {
                "source":450,
                "target":442
            },
            {
                "source":437,
                "target":321
            },
            {
                "source":437,
                "target":326
            },
            {
                "source":437,
                "target":323
            },
            {
                "source":437,
                "target":307
            },
            {
                "source":451,
                "target":307
            },
            {
                "source":43,
                "target":44
            },
            {
                "source":43,
                "target":43
            },
            {
                "source":180,
                "target":452
            },
            {
                "source":180,
                "target":453
            },
            {
                "source":453,
                "target":180
            },
            {
                "source":453,
                "target":94
            },
            {
                "source":452,
                "target":453
            },
            {
                "source":179,
                "target":180
            },
            {
                "source":454,
                "target":344
            },
            {
                "source":455,
                "target":454
            },
            {
                "source":456,
                "target":7
            },
            {
                "source":456,
                "target":252
            },
            {
                "source":457,
                "target":5
            },
            {
                "source":457,
                "target":457
            },
            {
                "source":458,
                "target":5
            },
            {
                "source":458,
                "target":458
            },
            {
                "source":2,
                "target":5
            },
            {
                "source":2,
                "target":2
            },
            {
                "source":459,
                "target":2
            },
            {
                "source":459,
                "target":459
            },
            {
                "source":31,
                "target":1
            },
            {
                "source":31,
                "target":3
            },
            {
                "source":460,
                "target":33
            },
            {
                "source":460,
                "target":461
            },
            {
                "source":460,
                "target":462
            },
            {
                "source":460,
                "target":463
            },
            {
                "source":460,
                "target":464
            },
            {
                "source":460,
                "target":465
            },
            {
                "source":460,
                "target":4
            },
            {
                "source":460,
                "target":5
            },
            {
                "source":460,
                "target":466
            },
            {
                "source":460,
                "target":467
            },
            {
                "source":460,
                "target":468
            },
            {
                "source":460,
                "target":469
            },
            {
                "source":460,
                "target":470
            },
            {
                "source":460,
                "target":36
            },
            {
                "source":460,
                "target":39
            },
            {
                "source":460,
                "target":34
            },
            {
                "source":460,
                "target":40
            },
            {
                "source":460,
                "target":3
            },
            {
                "source":471,
                "target":472
            },
            {
                "source":473,
                "target":72
            },
            {
                "source":474,
                "target":55
            },
            {
                "source":474,
                "target":57
            },
            {
                "source":475,
                "target":55
            },
            {
                "source":475,
                "target":62
            },
            {
                "source":475,
                "target":474
            },
            {
                "source":476,
                "target":476
            },
            {
                "source":477,
                "target":72
            },
            {
                "source":478,
                "target":72
            },
            {
                "source":479,
                "target":95
            },
            {
                "source":480,
                "target":4
            },
            {
                "source":480,
                "target":5
            },
            {
                "source":481,
                "target":279
            },
            {
                "source":84,
                "target":222
            },
            {
                "source":84,
                "target":482
            },
            {
                "source":84,
                "target":483
            },
            {
                "source":84,
                "target":84
            },
            {
                "source":84,
                "target":257
            },
            {
                "source":84,
                "target":73
            },
            {
                "source":84,
                "target":76
            },
            {
                "source":84,
                "target":126
            },
            {
                "source":84,
                "target":99
            },
            {
                "source":84,
                "target":89
            },
            {
                "source":484,
                "target":485
            },
            {
                "source":484,
                "target":4
            },
            {
                "source":484,
                "target":5
            },
            {
                "source":484,
                "target":486
            },
            {
                "source":487,
                "target":488
            },
            {
                "source":487,
                "target":489
            },
            {
                "source":487,
                "target":490
            },
            {
                "source":488,
                "target":490
            },
            {
                "source":490,
                "target":7
            },
            {
                "source":491,
                "target":7
            },
            {
                "source":491,
                "target":94
            }
        ]
    }
    let chartNetwork = echarts.init(document.getElementById('chartNetwork'));

    optionNetwork = {
        color:['#660033','#00CC00','#CC3300','#000099'],
        legend: {
            textStyle:{
                fontSize:15,
            },
            data: ['社团一', '社团二', '社团三', '社团四']
        },
        tooltip: {

        },
        grid: {
            left: '10%',
            right: '10%',
            bottom: '15%'
        },

        series: [{
            type: 'graph',
            layout: 'force',
            roam: true,     //实现鼠标放大缩小
            animation: true,
            label: {
                normal: {
                    position: 'right',
                    formatter: '{b}'
                }
            },
            draggable: true,
            symbolSize: (value, params) => {
                // console.log(value);
                // console.log(params);
                return value;
            },
            formatter: function(params){//触发之后返回的参数，这个函数是关键
                if (params.data.category !=undefined) {//如果触发节点
                    return '人物:'+params.data.label;//返回标签
                }else {//如果触发边
                    return '关系:'+params.data.label;
                }
            },
            label: {//图形上的文本标签，可用于说明图形的一些数据信息
                normal: {
                    show : true,//显示
                    position: 'right',//相对于节点标签的位置
                    textStyle:{
                        fontSize:15,
                    },
                    //回调函数，你期望节点标签上显示什么
                    formatter: function(params){
                        return params.data.label;
                    },
                }
            },
            data: dataNetwork.nodes.map(function (node, idx) {
                node.id = idx;
                return node;
            }),
            categories: dataNetwork.categories,
            force: {
                // initLayout: 'circular',
                //    repulsion: 20,
                edgeLength: 2,
                repulsion: 10,
                gravity: 0.2,
                layoutAnimation : true
            },
            edges: dataNetwork.links
        }]
    };

    chartNetwork.setOption(optionNetwork);

    return chartNetwork;
}
