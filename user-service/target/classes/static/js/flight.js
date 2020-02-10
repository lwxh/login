
$(function(){
    //绑定点击时事件
    bindClickEvents();

    //初始化时间选择组件
    timeComponent();

    main();

});


/**
 * 页面点击事件绑定
 */
function bindClickEvents(){
    $("#btnSearch").click(function(){
        //查询
        queryData();
    })
}

/**
 * 初始化时间选择组件
 */
function timeComponent(){
    layui.use('laydate', function(){
        var laydate = layui.laydate;
        var endTime=moment().format('YYYY-MM-DD');
        var startTime = new Date();
        startTime.setMonth(startTime.getMonth() - 1);
        startTime = moment(startTime).format("YYYY-MM-DD");
        // var startTime='2018-04-01';
        laydate.render({
            elem: '#txtDateRange'
            ,range: '~'
            ,theme:'grid'
            ,format: 'yyyy-MM-dd'
            ,value:startTime+' ~ '+endTime
        });
    })
}


/**
 * 初始化筛选框 出发城市
 */
function initSelectionStartCity(startCity){
    if(startCity && startCity.length>0){
    	$("#selectStart").select2({
    		data: startCity
        });
    }
}

/**
 * 初始化筛选框 到达城市
 */
function initSelectionEndCity(endCity){
    if(endCity && endCity.length > 0){
        $("#selectEnd").select2({
    		data:endCity
    	});
    }
}

/**
 * 初始化筛选框 时间段
 */
function initSelectionPeriod(period){
    if(period && period.length > 0){
        $("#selectPeriod").select2({
            data: period
        });
    }
}


/**
 * 初始化筛选框 航班类
 */
function initSelectionFlightCluster(dataFlightCluster){
    let cluster = Array.from(new Set(dataFlightCluster.map(v=>v.air_id)));
    cluster.unshift("全部");
    $("#selectFlightCluster").select2({
        data:cluster
    });
}

/**
 * 表格点击事件
 */
function tableClick(dataChild,id) {
    layui.use('table', function(){
        let table = layui.table;

        table.on('tool(' + id + ')',function (obj) {
            if(obj.event === 'collapse'){
                let trObj = layui.$(this).parent('tr');  //当前行对象

                collapseTable(dataChild,trObj)
            }
            else if(obj.event === 'childCollapse'){
                window.location.href="./ThreeView.html";
            }
        });
    });
}


/**
 * 生成并显示子表
 */
function collapseTable(data,trObj) {
    //当前表格视图
    let tableView = trObj.parents('.layui-table-view');
    //当前表格标识
    let viewId = tableView.attr('lay-id'); 
    //父表宽度
    let width = tableView[0].clientWidth
    //父表单元格数
    var colspan = trObj.find('td').length;
    /* 此处存在bug 应根据数据主键获取子表数据*/
    //当前行索引
    let index = trObj.data('index'); 
    //下一tr对象
    let trObjNext = trObj.next();
    //子表id
    var childId = viewId + '-child-' + index; 

    /* 创建嵌套的子表的DOM */
    if (trObjNext.data('index') != childId) {
        //子表DOM
        let temp =  `
                    <tr data-index="vDataIndex">
                        <td colspan="vColspan">
                            <div style="height: auto; width: vWidthpx;" class="layui-table-cell">
                                <table id="vTableId"></table>
                            </div>
                        </td>
                    </tr>
                    `;
        //替换关键元素
        temp = temp.replace("vDataIndex",childId).replace("vColspan",colspan)
                    .replace("vWidth",width).replace("vTableId",childId)
        //隐藏展开行
        trObjNext = trObj.after(temp).next().hide(); 
    }

    //显示或隐藏展开行
    trObjNext.toggle();
    //隐藏trObjNext同级的兄弟中，data-index属性中包含child的兄弟
    //参考链接 https://developer.mozilla.org/zh-CN/docs/Web/CSS/Attribute_selectors
    trObjNext.siblings('[data-index*=child]').hide();
    //生成子表
    renderChildTable(data[index],childId);

}


/**
 * 生成子表
 */
function renderChildTable(data,childId) {
    layui.use('table', function(){
        var table = layui.table;
        table.render({
            elem: "#"+childId,
            limit:16,
            cols: [[ 
                {field:'index',title:'序号',event:'childCollapse', type:'numbers'},
                {field: 'departure', title: '起飞日期', event:'childCollapse',  sort: true},
                {field: 'air_id', title: '航班号',event:'childCollapse', sort: true},
                {field: 'countdown', title: '剩余销售天数',event:'childCollapse',  sort: true},
                {field: 'day_ope_num', title: '今日操作次数',event:'childCollapse',  sort: true},
                {field: 'N_ope_day', title: '未操作天数', event:'childCollapse', sort: true},
                {field: 'sit_rate', title: '上座率', event:'childCollapse', sort: true},
                {field: 'reven_rate', title: '收益率',event:'childCollapse',  sort: true},
                {field: 'sit_rate_add', title: '上座率增长率',event:'childCollapse',  align:"center", sort: true},
                {field: 'reven_rate_add', title: '收益率增长率',event:'childCollapse',  align:"center", sort: true},
                {field: 'sale_status', title: '销售状态',event:'childCollapse',  sort: true},
            ]],
            data: data,
            done:function(res){
                let body = this.elem.next();
                res.data.forEach(function (item,index) {
                    if(item.day_ope_num==0){
                        //设置字体颜色
                        body.find(".layui-table-box tbody tr[data-index='"+index+"']").css('color','red');
                    }
                });
            }
        });
    });
}


/**
 * 初始化页面 航班类
 */
function InitTableFlightCluster(data,id){
    layui.use('table', function(){
        let table = layui.table;
        //渲染表格
        table.render({
            elem: '#'+id
            //开启分页
            ,page: true
            ,limit:8
            ,limits:[8,16]
            ,cols: [[ //表头
                // {'air_id':'AA1234','dui_num':'90','hot_rate':'100%','opr_rate':'100%','reven_rate':'89%','DB_rate':'4','reven':'10%'},
                //热门程度：单位时间内的查询量占比，操作频度：平均每天操作次数，DB程度：该类航班的DB风险
                {field:'index',title:'序号',event:'collapse',type:'numbers'},
                {field: 'air_id', title: '航班类',event:'collapse', sort: true},
                {field: 'miaoshu', title: '描述信息', event:'collapse', sort: true},
                {field: 'dui_num', title: '对象数',event:'collapse', sort: true},
                {field: 'hot_rate', title: '热门程度',event:'collapse', sort: true},
                {field: 'opr_rate', title: '操作频度/d',event:'collapse', sort: true},
                {field: 'reven_rate', title: '收益率',event:'collapse', align:"center", sort: true},
                {field: 'DB_rate', title: 'DB风险',event:'collapse', sort: true},
                {field: 'reven', title: '收入占比',event:'collapse', sort: true},
                {field: 'passenger', title: '乘客属性',event:'collapse', sort: true},
            ]],
            data: data
        });
    });
}


/**
 * 初始化页面 推荐航班列表
 */
function InitTableExcellentFlight(data,id){
    //初始化数据表格
    layui.use('table', function(){
        let table = layui.table;
        //第一个实例
        table.render({
            elem: '#'+id
            ,page: true //开启分页
            ,title:"优秀航班推荐"
            ,limit:8
            ,limits:[8,16]
            ,cols: [[ //表头
                // {'air_id':'AA1234','departure':'2019-01-24 8:10','air_route':'北京-上海','ope_day':'5','sit_rate':'90%','reven_rate':'89%','reven':'2.8W'},
                {field:'index',title:'序号',type:'numbers'},
                {field: 'air_id', title: '航班类', sort: true},
                {field: 'manager', title: '管理员', sort: true},
                {field: 'departure', title: '起飞时间' ,sort: true},
                {field: 'air_route', title: '航线', sort: true},
                {field: 'ope_day', title: '操作频度/d', sort: true},
                {field: 'sit_rate', title: '上座率', sort: true},
                {field: 'sit_rate_avg', title: '同市场平均上座率', sort: true},
                {field: 'reven_rate', title: '收益率' ,align:"center", sort: true},
                {field: 'reven_rate_avg', title: '同市场平均收益率' ,align:"center", sort: true},
                {field: 'reven', title: '销售收入' ,align:"center", sort: true},
            ]],
            data: data,
            done:function(res,cur,count){
                var dom=$('div[lay-id=operatorTable_recommended]').find('.layui-table-body').find("tbody");
                dom.off('click').on('click',function(){
                    window.location.href="./ThreeView.html";
                });
            }
        });
    });
}


/**
 * 初始化页面 预警航班列表
 */
function InitTableWarningFlight(data,id){
    //初始化数据表格
    layui.use('table', function(){
        let table = layui.table;
        //第一个实例
        table.render({
            elem: '#'+id
            ,page: true //开启分页
            ,title:"优秀航班推荐"
            ,limit:8
            ,limits:[8,16]
            ,cols: [[ //表头
                // {'air_id':'AA1234','departure':'2019-01-24 8:10','air_route':'北京-上海','ope_day':'5','sit_rate':'90%','reven_rate':'89%','reven':'2.8W'},
                {field:'index',title:'序号',type:'numbers'},
                {field: 'air_id', title: '航班类', sort: true},
                {field: 'manager', title: '管理员', sort: true},
                {field: 'departure', title: '起飞时间' ,sort: true},
                {field: 'air_route', title: '航线', sort: true},
                {field: 'ope_day', title: '操作频度/d', sort: true},
                {field: 'sit_rate', title: '上座率', sort: true},
                {field: 'sit_rate_avg', title: '同市场平均上座率', sort: true},
                {field: 'reven_rate', title: '收益率' ,align:"center", sort: true},
                {field: 'reven_rate_avg', title: '同市场平均收益率' ,align:"center", sort: true},
                {field: 'reven', title: '销售收入' ,align:"center", sort: true},
            ]],
            data: data,
            done:function(res,cur,count){
                var dom=$('div[lay-id=operatorTable_recommended]').find('.layui-table-body').find("tbody");
                dom.off('click').on('click',function(){
                    window.location.href="./ThreeView.html";
                });
            }
        });
    });
}




/**
 * 根据检索条件查询数据
 */
function queryData(){
    //String startTime,String endTime, String carNum, Long status
    var timeRange=$("#txtTimeRange").val().split(' ~ ');
    var carName=$('#selectCarName option:checked').text();
    var startTime = '';
    var endTime = '';
    if(timeRange.length==0){
        startTime=timeRange[0];
        endTime=timeRange[1];
    }
    else{
        startTime='2010-01-01';
        endTime=moment().format('YYYY-MM-DD');
    }
    var carNum = carName=="全部"?'':carName;
    var status=$('#selectStatus').val().join(',');
    $.ajax({
        url:'/sdata/wAllDataSearch',
        type:'get',
        dataType:'json',
        data:{
            startTime : startTime,
            endTime : endTime,
            carNum : carNum,
            status : status
        },
        success:function(data){
            //初始化数据表格
            layui.use('table', function(){
                var table = layui.table;
                //执行重载
                table.reload('searchTable', {
                    data:data
                });
            })
        }
    })
}


/*
* 鼠标悬停于单元格时显示单元格内容
*/
function tdTitle(){
    $('th').each(function(index,element){
        $(element).attr('title',$(element).text());
    });
    $('td').each(function(index,element){
        $(element).attr('title',$(element).text());
    });
};

async function ajax(url) {
    return new Promise(function (resolve, reject) {
        if((typeof url) != "string") {
            resolve(url);
        } else {
            let ajaxSetting = {
                url: url,
                dataType:'json',
                type:'get',
                success: function (response) {
                    resolve(response);
                },
                error: function () {
                    reject("请求失败");
                }
            }
            $.ajax(ajaxSetting);
        }
    });
}

async function main() {
    //出发城市
    let startCity = ["全部","广州","上海","北京","成都","贵阳","乌鲁木齐"];
   
    //到达城市
    let endCity = ["全部","广州","上海","北京","成都","贵阳","乌鲁木齐"];
    
    //时间段
    let period = ["全部","早班","午班","晚班"];

    //预警航班数据
    let dataWarningFlight = [
        {'air_id':'AC1254','manager':'OP10','departure':'2019-01-24 8:10','air_route':'北京-上海','ope_day':'5','sit_rate':'75%','sit_rate_avg':'85%','reven_rate':'75%','reven_rate_avg':'84%','reven':'2.2W'},
        {'air_id':'AC1434','manager':'OP18','departure':'2019-01-24 8:10','air_route':'北京-广东','ope_day':'5','sit_rate':'74%','sit_rate_avg':'85%','reven_rate':'74%','reven_rate_avg':'84%','reven':'2.3W'},
        {'air_id':'AC1234','manager':'OP11','departure':'2019-01-24 8:10','air_route':'上海-北京','ope_day':'5','sit_rate':'73%','sit_rate_avg':'85%','reven_rate':'73%','reven_rate_avg':'84%','reven':'2.4W'},
        {'air_id':'AC1234','manager':'OP06','departure':'2019-01-24 8:10','air_route':'北京-上海','ope_day':'5','sit_rate':'72%','sit_rate_avg':'85%','reven_rate':'72%','reven_rate_avg':'84%','reven':'2.5W'},
        {'air_id':'AC1434','manager':'OP02','departure':'2019-01-24 8:10','air_route':'北京-南京','ope_day':'5','sit_rate':'71%','sit_rate_avg':'85%','reven_rate':'71%','reven_rate_avg':'84%','reven':'2.6W'},
        {'air_id':'AC1234','manager':'OP09','departure':'2019-01-24 8:10','air_route':'北京-上海','ope_day':'5','sit_rate':'70%','sit_rate_avg':'85%','reven_rate':'70%','reven_rate_avg':'84%','reven':'2.7W'},
    ];
    
    //优秀航班数据
    let dataExcellentFlight = [
        {'air_id':'AB1254','manager':'OP01','departure':'2019-01-24 8:10','air_route':'北京-上海','ope_day':'5','sit_rate':'95%','sit_rate_avg':'80%','reven_rate':'89%','reven_rate_avg':'80%','reven':'3.1W'},
        {'air_id':'AA1434','manager':'OP15','departure':'2019-01-25 8:20','air_route':'北京-广东','ope_day':'5','sit_rate':'94%','sit_rate_avg':'82%','reven_rate':'88%','reven_rate_avg':'81%','reven':'3.0W'},
        {'air_id':'AB1234','manager':'OP11','departure':'2019-02-25 8:10','air_route':'上海-北京','ope_day':'5','sit_rate':'93%','sit_rate_avg':'84%','reven_rate':'87%','reven_rate_avg':'82%','reven':'2.9W'},
        {'air_id':'AA1234','manager':'OP05','departure':'2019-02-24 8:10','air_route':'北京-上海','ope_day':'5','sit_rate':'92%','sit_rate_avg':'85%','reven_rate':'86%','reven_rate_avg':'83%','reven':'2.8W'},
        {'air_id':'AB1434','manager':'OP16','departure':'2019-01-24 9:10','air_route':'北京-南京','ope_day':'5','sit_rate':'91%','sit_rate_avg':'86%','reven_rate':'85%','reven_rate_avg':'84%','reven':'2.7W'},
        {'air_id':'AA1234','manager':'OP23','departure':'2019-01-24 8:10','air_route':'北京-上海','ope_day':'5','sit_rate':'90%','sit_rate_avg':'85%','reven_rate':'84%','reven_rate_avg':'84%','reven':'2.6W'},
    ];
    
    //航班类数据
    let dataFlightCluster = [
        {'air_id':'AA1234','miaoshu':'广州-上海早班时段','dui_num':'90','hot_rate':'100%','opr_rate':'10','reven_rate':'79%','DB_rate':'10%','reven':'9%',"passenger":"商务"},
        {'air_id':'AA1235','miaoshu':'广州-上海晚班时段','dui_num':'78','hot_rate':'78%','opr_rate':'9','reven_rate':'80%','DB_rate':'9%','reven':'8%',"passenger":"休闲"},
        {'air_id':'AA1236','miaoshu':'广州-上海夜间时段','dui_num':'68','hot_rate':'68%','opr_rate':'8','reven_rate':'78%','DB_rate':'8%','reven':'10%',"passenger":"商务"},
        {'air_id':'AA1237','miaoshu':'广州-上海早班时段','dui_num':'58','hot_rate':'98%','opr_rate':'6','reven_rate':'69%','DB_rate':'10%','reven':'12%',"passenger":"商务"},
        {'air_id':'AA1238','miaoshu':'广州-上海晚班时段','dui_num':'79','hot_rate':'48%','opr_rate':'4','reven_rate':'94%','DB_rate':'11%','reven':'14%',"passenger":"休闲"},
        {'air_id':'AA1239','miaoshu':'广州-上海夜间时段','dui_num':'89','hot_rate':'77%','opr_rate':'10','reven_rate':'92%','DB_rate':'1%','reven':'2%',"passenger":"商务"},
        {'air_id':'AA1240','miaoshu':'广州-上海晚班时段','dui_num':'45','hot_rate':'67%','opr_rate':'12','reven_rate':'95%','DB_rate':'2%','reven':'1%',"passenger":"休闲"},
        {'air_id':'AA1241','miaoshu':'广州-上海早班时段','dui_num':'78','hot_rate':'45%','opr_rate':'1','reven_rate':'96%','DB_rate':'5%','reven':'20%',"passenger":"商务"},
        {'air_id':'AA1242','miaoshu':'广州-上海晚班时段','dui_num':'67','hot_rate':'78%','opr_rate':'8','reven_rate':'91%','DB_rate':'4%','reven':'10%',"passenger":"商务"},
        {'air_id':'AA1243','miaoshu':'广州-上海夜间时段','dui_num':'66','hot_rate':'34%','opr_rate':'4','reven_rate':'89%','DB_rate':'10%','reven':'8%',"passenger":"休闲"},
        {'air_id':'AA1244','miaoshu':'广州-上海晚班时段','dui_num':'67','hot_rate':'78%','opr_rate':'8','reven_rate':'91%','DB_rate':'4%','reven':'10%',"passenger":"商务"},
        {'air_id':'AA1245','miaoshu':'广州-上海夜间时段','dui_num':'66','hot_rate':'34%','opr_rate':'4','reven_rate':'89%','DB_rate':'10%','reven':'8%',"passenger":"休闲"},
    ];
    
    //航班类子表数据
    let dataFlightClusterChild = [
        [
            //日期，航班号，剩余销售天数，每天操作次数，未操作天数，上座率，收益率，上座率增长率，收益率增长率，销售状态
            {'departure': "2019-03-24", 'air_id': 'AA1234', 'countdown': '-60d', 'day_ope_num': '3','N_ope_day': '0','sit_rate':'89%','reven_rate':'12','sit_rate_add':'10%','reven_rate_add':'20%','sale_status':'on'},
            {'departure': "2019-03-25", 'air_id': 'AA1234', 'countdown': '-60d', 'day_ope_num': '2','N_ope_day': '0','sit_rate':'89%','reven_rate':'12','sit_rate_add':'10%','reven_rate_add':'20%','sale_status':'on'},
            {'departure': "2019-03-26", 'air_id': 'AA1234', 'countdown': '-60d', 'day_ope_num': '0','N_ope_day': '2','sit_rate':'89%','reven_rate':'12','sit_rate_add':'10%','reven_rate_add':'20%','sale_status':'on'},
            {'departure': "2019-03-27", 'air_id': 'AA1234', 'countdown': '-60d', 'day_ope_num': '4','N_ope_day': '0','sit_rate':'89%','reven_rate':'12','sit_rate_add':'10%','reven_rate_add':'20%','sale_status':'on'},
            {'departure': "2019-03-28", 'air_id': 'AA1234', 'countdown': '-60d', 'day_ope_num': '0','N_ope_day': '1','sit_rate':'89%','reven_rate':'12','sit_rate_add':'10%','reven_rate_add':'20%','sale_status':'on'},
            {'departure': "2019-03-29", 'air_id': 'AA1234', 'countdown': '-60d', 'day_ope_num': '1','N_ope_day': '0','sit_rate':'89%','reven_rate':'12','sit_rate_add':'10%','reven_rate_add':'20%','sale_status':'on'},
            {'departure': "2019-03-30", 'air_id': 'AA1234', 'countdown': '-60d', 'day_ope_num': '0','N_ope_day': '5','sit_rate':'89%','reven_rate':'12','sit_rate_add':'10%','reven_rate_add':'20%','sale_status':'on'},
            {'departure': "2019-03-31", 'air_id': 'AA1234', 'countdown': '-60d', 'day_ope_num': '2','N_ope_day': '0','sit_rate':'89%','reven_rate':'12','sit_rate_add':'10%','reven_rate_add':'20%','sale_status':'on'},
            {'departure': "2019-04-01", 'air_id': 'AA1234', 'countdown': '-60d', 'day_ope_num': '4','N_ope_day': '0','sit_rate':'89%','reven_rate':'12','sit_rate_add':'10%','reven_rate_add':'20%','sale_status':'on'},
            {'departure': "2019-04-02", 'air_id': 'AA1234', 'countdown': '-60d', 'day_ope_num': '3','N_ope_day': '0','sit_rate':'89%','reven_rate':'12','sit_rate_add':'10%','reven_rate_add':'20%','sale_status':'on'},
            {'departure': "2019-04-03", 'air_id': 'AA1234', 'countdown': '-60d', 'day_ope_num': '0','N_ope_day': '1','sit_rate':'89%','reven_rate':'12','sit_rate_add':'10%','reven_rate_add':'20%','sale_status':'on'},
            {'departure': "2019-04-04", 'air_id': 'AA1234', 'countdown': '-60d', 'day_ope_num': '0','N_ope_day': '2','sit_rate':'89%','reven_rate':'12','sit_rate_add':'10%','reven_rate_add':'20%','sale_status':'on'},
            {'departure': "2019-04-05", 'air_id': 'AA1234', 'countdown': '-60d', 'day_ope_num': '0','N_ope_day': '1','sit_rate':'89%','reven_rate':'12','sit_rate_add':'10%','reven_rate_add':'20%','sale_status':'on'},],
        [
            //日期，航班号，剩余销售天数，每天操作次数，未操作天数，上座率，收益率，上座率增长率，收益率增长率，销售状态
            {'departure': "2019-03-24", 'air_id': 'AA1235', 'countdown': '-60d', 'day_ope_num': '3','N_ope_day': '0','sit_rate':'89%','reven_rate':'12','sit_rate_add':'10%','reven_rate_add':'20%','sale_status':'on'},
            {'departure': "2019-03-25", 'air_id': 'AA1235', 'countdown': '-60d', 'day_ope_num': '2','N_ope_day': '0','sit_rate':'89%','reven_rate':'12','sit_rate_add':'10%','reven_rate_add':'20%','sale_status':'on'},
            {'departure': "2019-03-26", 'air_id': 'AA1235', 'countdown': '-60d', 'day_ope_num': '0','N_ope_day': '2','sit_rate':'89%','reven_rate':'12','sit_rate_add':'10%','reven_rate_add':'20%','sale_status':'on'},
            {'departure': "2019-03-27", 'air_id': 'AA1235', 'countdown': '-60d', 'day_ope_num': '4','N_ope_day': '0','sit_rate':'89%','reven_rate':'12','sit_rate_add':'10%','reven_rate_add':'20%','sale_status':'on'},
            {'departure': "2019-03-28", 'air_id': 'AA1235', 'countdown': '-60d', 'day_ope_num': '0','N_ope_day': '1','sit_rate':'89%','reven_rate':'12','sit_rate_add':'10%','reven_rate_add':'20%','sale_status':'on'},
            {'departure': "2019-03-29", 'air_id': 'AA1235', 'countdown': '-60d', 'day_ope_num': '1','N_ope_day': '0','sit_rate':'89%','reven_rate':'12','sit_rate_add':'10%','reven_rate_add':'20%','sale_status':'on'},
            {'departure': "2019-03-30", 'air_id': 'AA1235', 'countdown': '-60d', 'day_ope_num': '0','N_ope_day': '5','sit_rate':'89%','reven_rate':'12','sit_rate_add':'10%','reven_rate_add':'20%','sale_status':'on'},
            {'departure': "2019-03-31", 'air_id': 'AA1235', 'countdown': '-60d', 'day_ope_num': '2','N_ope_day': '0','sit_rate':'89%','reven_rate':'12','sit_rate_add':'10%','reven_rate_add':'20%','sale_status':'on'},
            {'departure': "2019-04-01", 'air_id': 'AA1235', 'countdown': '-60d', 'day_ope_num': '4','N_ope_day': '0','sit_rate':'89%','reven_rate':'12','sit_rate_add':'10%','reven_rate_add':'20%','sale_status':'on'},
            {'departure': "2019-04-02", 'air_id': 'AA1235', 'countdown': '-60d', 'day_ope_num': '3','N_ope_day': '0','sit_rate':'89%','reven_rate':'12','sit_rate_add':'10%','reven_rate_add':'20%','sale_status':'on'},
            {'departure': "2019-04-03", 'air_id': 'AA1235', 'countdown': '-60d', 'day_ope_num': '0','N_ope_day': '1','sit_rate':'89%','reven_rate':'12','sit_rate_add':'10%','reven_rate_add':'20%','sale_status':'on'},
            {'departure': "2019-04-04", 'air_id': 'AA1235', 'countdown': '-60d', 'day_ope_num': '0','N_ope_day': '2','sit_rate':'89%','reven_rate':'12','sit_rate_add':'10%','reven_rate_add':'20%','sale_status':'on'},
            {'departure': "2019-04-05", 'air_id': 'AA1235', 'countdown': '-60d', 'day_ope_num': '0','N_ope_day': '1','sit_rate':'89%','reven_rate':'12','sit_rate_add':'10%','reven_rate_add':'20%','sale_status':'on'},],
        [
            //日期，航班号，剩余销售天数，每天操作次数，未操作天数，上座率，收益率，上座率增长率，收益率增长率，销售状态
            {'departure': "2019-03-24", 'air_id': 'AA1236', 'countdown': '-60d', 'day_ope_num': '3','N_ope_day': '0','sit_rate':'89%','reven_rate':'12','sit_rate_add':'10%','reven_rate_add':'20%','sale_status':'on'},
            {'departure': "2019-03-25", 'air_id': 'AA1236', 'countdown': '-60d', 'day_ope_num': '2','N_ope_day': '0','sit_rate':'89%','reven_rate':'12','sit_rate_add':'10%','reven_rate_add':'20%','sale_status':'on'},
            {'departure': "2019-03-26", 'air_id': 'AA1236', 'countdown': '-60d', 'day_ope_num': '0','N_ope_day': '2','sit_rate':'89%','reven_rate':'12','sit_rate_add':'10%','reven_rate_add':'20%','sale_status':'on'},
            {'departure': "2019-03-27", 'air_id': 'AA1236', 'countdown': '-60d', 'day_ope_num': '4','N_ope_day': '0','sit_rate':'89%','reven_rate':'12','sit_rate_add':'10%','reven_rate_add':'20%','sale_status':'on'},
            {'departure': "2019-03-28", 'air_id': 'AA1236', 'countdown': '-60d', 'day_ope_num': '0','N_ope_day': '1','sit_rate':'89%','reven_rate':'12','sit_rate_add':'10%','reven_rate_add':'20%','sale_status':'on'},
            {'departure': "2019-03-29", 'air_id': 'AA1236', 'countdown': '-60d', 'day_ope_num': '1','N_ope_day': '0','sit_rate':'89%','reven_rate':'12','sit_rate_add':'10%','reven_rate_add':'20%','sale_status':'on'},
            {'departure': "2019-03-30", 'air_id': 'AA1236', 'countdown': '-60d', 'day_ope_num': '0','N_ope_day': '5','sit_rate':'89%','reven_rate':'12','sit_rate_add':'10%','reven_rate_add':'20%','sale_status':'on'},
            {'departure': "2019-03-31", 'air_id': 'AA1236', 'countdown': '-60d', 'day_ope_num': '2','N_ope_day': '0','sit_rate':'89%','reven_rate':'12','sit_rate_add':'10%','reven_rate_add':'20%','sale_status':'on'},
            {'departure': "2019-04-01", 'air_id': 'AA1236', 'countdown': '-60d', 'day_ope_num': '4','N_ope_day': '0','sit_rate':'89%','reven_rate':'12','sit_rate_add':'10%','reven_rate_add':'20%','sale_status':'on'},
            {'departure': "2019-04-02", 'air_id': 'AA1236', 'countdown': '-60d', 'day_ope_num': '3','N_ope_day': '0','sit_rate':'89%','reven_rate':'12','sit_rate_add':'10%','reven_rate_add':'20%','sale_status':'on'},
            {'departure': "2019-04-03", 'air_id': 'AA1236', 'countdown': '-60d', 'day_ope_num': '0','N_ope_day': '1','sit_rate':'89%','reven_rate':'12','sit_rate_add':'10%','reven_rate_add':'20%','sale_status':'on'},
            {'departure': "2019-04-04", 'air_id': 'AA1236', 'countdown': '-60d', 'day_ope_num': '0','N_ope_day': '2','sit_rate':'89%','reven_rate':'12','sit_rate_add':'10%','reven_rate_add':'20%','sale_status':'on'},
            {'departure': "2019-04-05", 'air_id': 'AA1236', 'countdown': '-60d', 'day_ope_num': '0','N_ope_day': '1','sit_rate':'89%','reven_rate':'12','sit_rate_add':'10%','reven_rate_add':'20%','sale_status':'on'},],
        [
            //日期，航班号，剩余销售天数，每天操作次数，未操作天数，上座率，收益率，上座率增长率，收益率增长率，销售状态
            {'departure': "2019-03-24", 'air_id': 'AA1236', 'countdown': '-60d', 'day_ope_num': '3','N_ope_day': '0','sit_rate':'89%','reven_rate':'12','sit_rate_add':'10%','reven_rate_add':'20%','sale_status':'on'},
            {'departure': "2019-03-25", 'air_id': 'AA1237', 'countdown': '-60d', 'day_ope_num': '2','N_ope_day': '0','sit_rate':'89%','reven_rate':'12','sit_rate_add':'10%','reven_rate_add':'20%','sale_status':'on'},
            {'departure': "2019-03-26", 'air_id': 'AA1237', 'countdown': '-60d', 'day_ope_num': '0','N_ope_day': '2','sit_rate':'89%','reven_rate':'12','sit_rate_add':'10%','reven_rate_add':'20%','sale_status':'on'},
            {'departure': "2019-03-27", 'air_id': 'AA1237', 'countdown': '-60d', 'day_ope_num': '4','N_ope_day': '0','sit_rate':'89%','reven_rate':'12','sit_rate_add':'10%','reven_rate_add':'20%','sale_status':'on'},
            {'departure': "2019-03-28", 'air_id': 'AA1237', 'countdown': '-60d', 'day_ope_num': '0','N_ope_day': '1','sit_rate':'89%','reven_rate':'12','sit_rate_add':'10%','reven_rate_add':'20%','sale_status':'on'},
            {'departure': "2019-03-29", 'air_id': 'AA1237', 'countdown': '-60d', 'day_ope_num': '1','N_ope_day': '0','sit_rate':'89%','reven_rate':'12','sit_rate_add':'10%','reven_rate_add':'20%','sale_status':'on'},
            {'departure': "2019-03-30", 'air_id': 'AA1237', 'countdown': '-60d', 'day_ope_num': '0','N_ope_day': '5','sit_rate':'89%','reven_rate':'12','sit_rate_add':'10%','reven_rate_add':'20%','sale_status':'on'},
            {'departure': "2019-03-31", 'air_id': 'AA1237', 'countdown': '-60d', 'day_ope_num': '2','N_ope_day': '0','sit_rate':'89%','reven_rate':'12','sit_rate_add':'10%','reven_rate_add':'20%','sale_status':'on'},
            {'departure': "2019-04-01", 'air_id': 'AA1237', 'countdown': '-60d', 'day_ope_num': '4','N_ope_day': '0','sit_rate':'89%','reven_rate':'12','sit_rate_add':'10%','reven_rate_add':'20%','sale_status':'on'},
            {'departure': "2019-04-02", 'air_id': 'AA1237', 'countdown': '-60d', 'day_ope_num': '3','N_ope_day': '0','sit_rate':'89%','reven_rate':'12','sit_rate_add':'10%','reven_rate_add':'20%','sale_status':'on'},
            {'departure': "2019-04-03", 'air_id': 'AA1237', 'countdown': '-60d', 'day_ope_num': '0','N_ope_day': '1','sit_rate':'89%','reven_rate':'12','sit_rate_add':'10%','reven_rate_add':'20%','sale_status':'on'},
            {'departure': "2019-04-04", 'air_id': 'AA1237', 'countdown': '-60d', 'day_ope_num': '0','N_ope_day': '2','sit_rate':'89%','reven_rate':'12','sit_rate_add':'10%','reven_rate_add':'20%','sale_status':'on'},
            {'departure': "2019-04-05", 'air_id': 'AA1237', 'countdown': '-60d', 'day_ope_num': '0','N_ope_day': '1','sit_rate':'89%','reven_rate':'12','sit_rate_add':'10%','reven_rate_add':'20%','sale_status':'on'},],
        [
            //日期，航班号，剩余销售天数，每天操作次数，未操作天数，上座率，收益率，上座率增长率，收益率增长率，销售状态
            {'departure': "2019-03-24", 'air_id': 'AA1238', 'countdown': '-60d', 'day_ope_num': '3','N_ope_day': '0','sit_rate':'89%','reven_rate':'12','sit_rate_add':'10%','reven_rate_add':'20%','sale_status':'on'},
            {'departure': "2019-03-25", 'air_id': 'AA1238', 'countdown': '-60d', 'day_ope_num': '2','N_ope_day': '0','sit_rate':'89%','reven_rate':'12','sit_rate_add':'10%','reven_rate_add':'20%','sale_status':'on'},
            {'departure': "2019-03-26", 'air_id': 'AA1238', 'countdown': '-60d', 'day_ope_num': '0','N_ope_day': '2','sit_rate':'89%','reven_rate':'12','sit_rate_add':'10%','reven_rate_add':'20%','sale_status':'on'},
            {'departure': "2019-03-27", 'air_id': 'AA1238', 'countdown': '-60d', 'day_ope_num': '4','N_ope_day': '0','sit_rate':'89%','reven_rate':'12','sit_rate_add':'10%','reven_rate_add':'20%','sale_status':'on'},
            {'departure': "2019-03-28", 'air_id': 'AA1238', 'countdown': '-60d', 'day_ope_num': '0','N_ope_day': '1','sit_rate':'89%','reven_rate':'12','sit_rate_add':'10%','reven_rate_add':'20%','sale_status':'on'},
            {'departure': "2019-03-29", 'air_id': 'AA1238', 'countdown': '-60d', 'day_ope_num': '1','N_ope_day': '0','sit_rate':'89%','reven_rate':'12','sit_rate_add':'10%','reven_rate_add':'20%','sale_status':'on'},
            {'departure': "2019-03-30", 'air_id': 'AA1238', 'countdown': '-60d', 'day_ope_num': '0','N_ope_day': '5','sit_rate':'89%','reven_rate':'12','sit_rate_add':'10%','reven_rate_add':'20%','sale_status':'on'},
            {'departure': "2019-03-31", 'air_id': 'AA1238', 'countdown': '-60d', 'day_ope_num': '2','N_ope_day': '0','sit_rate':'89%','reven_rate':'12','sit_rate_add':'10%','reven_rate_add':'20%','sale_status':'on'},
            {'departure': "2019-04-01", 'air_id': 'AA1238', 'countdown': '-60d', 'day_ope_num': '4','N_ope_day': '0','sit_rate':'89%','reven_rate':'12','sit_rate_add':'10%','reven_rate_add':'20%','sale_status':'on'},
            {'departure': "2019-04-02", 'air_id': 'AA1238', 'countdown': '-60d', 'day_ope_num': '3','N_ope_day': '0','sit_rate':'89%','reven_rate':'12','sit_rate_add':'10%','reven_rate_add':'20%','sale_status':'on'},
            {'departure': "2019-04-03", 'air_id': 'AA1238', 'countdown': '-60d', 'day_ope_num': '0','N_ope_day': '1','sit_rate':'89%','reven_rate':'12','sit_rate_add':'10%','reven_rate_add':'20%','sale_status':'on'},
            {'departure': "2019-04-04", 'air_id': 'AA1238', 'countdown': '-60d', 'day_ope_num': '0','N_ope_day': '2','sit_rate':'89%','reven_rate':'12','sit_rate_add':'10%','reven_rate_add':'20%','sale_status':'on'},
            {'departure': "2019-04-05", 'air_id': 'AA1238', 'countdown': '-60d', 'day_ope_num': '0','N_ope_day': '1','sit_rate':'89%','reven_rate':'12','sit_rate_add':'10%','reven_rate_add':'20%','sale_status':'on'},],
        [
            //日期，航班号，剩余销售天数，每天操作次数，未操作天数，上座率，收益率，上座率增长率，收益率增长率，销售状态
            {'departure': "2019-03-24", 'air_id': 'AA1239', 'countdown': '-60d', 'day_ope_num': '3','N_ope_day': '0','sit_rate':'89%','reven_rate':'12','sit_rate_add':'10%','reven_rate_add':'20%','sale_status':'on'},
            {'departure': "2019-03-25", 'air_id': 'AA1239', 'countdown': '-60d', 'day_ope_num': '2','N_ope_day': '0','sit_rate':'89%','reven_rate':'12','sit_rate_add':'10%','reven_rate_add':'20%','sale_status':'on'},
            {'departure': "2019-03-26", 'air_id': 'AA1239', 'countdown': '-60d', 'day_ope_num': '0','N_ope_day': '2','sit_rate':'89%','reven_rate':'12','sit_rate_add':'10%','reven_rate_add':'20%','sale_status':'on'},
            {'departure': "2019-03-27", 'air_id': 'AA1239', 'countdown': '-60d', 'day_ope_num': '4','N_ope_day': '0','sit_rate':'89%','reven_rate':'12','sit_rate_add':'10%','reven_rate_add':'20%','sale_status':'on'},
            {'departure': "2019-03-28", 'air_id': 'AA1239', 'countdown': '-60d', 'day_ope_num': '0','N_ope_day': '1','sit_rate':'89%','reven_rate':'12','sit_rate_add':'10%','reven_rate_add':'20%','sale_status':'on'},
            {'departure': "2019-03-29", 'air_id': 'AA1239', 'countdown': '-60d', 'day_ope_num': '1','N_ope_day': '0','sit_rate':'89%','reven_rate':'12','sit_rate_add':'10%','reven_rate_add':'20%','sale_status':'on'},
            {'departure': "2019-03-30", 'air_id': 'AA1239', 'countdown': '-60d', 'day_ope_num': '0','N_ope_day': '5','sit_rate':'89%','reven_rate':'12','sit_rate_add':'10%','reven_rate_add':'20%','sale_status':'on'},
            {'departure': "2019-03-31", 'air_id': 'AA1239', 'countdown': '-60d', 'day_ope_num': '2','N_ope_day': '0','sit_rate':'89%','reven_rate':'12','sit_rate_add':'10%','reven_rate_add':'20%','sale_status':'on'},
            {'departure': "2019-04-01", 'air_id': 'AA1239', 'countdown': '-60d', 'day_ope_num': '4','N_ope_day': '0','sit_rate':'89%','reven_rate':'12','sit_rate_add':'10%','reven_rate_add':'20%','sale_status':'on'},
            {'departure': "2019-04-02", 'air_id': 'AA1239', 'countdown': '-60d', 'day_ope_num': '3','N_ope_day': '0','sit_rate':'89%','reven_rate':'12','sit_rate_add':'10%','reven_rate_add':'20%','sale_status':'on'},
            {'departure': "2019-04-03", 'air_id': 'AA1239', 'countdown': '-60d', 'day_ope_num': '0','N_ope_day': '1','sit_rate':'89%','reven_rate':'12','sit_rate_add':'10%','reven_rate_add':'20%','sale_status':'on'},
            {'departure': "2019-04-04", 'air_id': 'AA1239', 'countdown': '-60d', 'day_ope_num': '0','N_ope_day': '2','sit_rate':'89%','reven_rate':'12','sit_rate_add':'10%','reven_rate_add':'20%','sale_status':'on'},
            {'departure': "2019-04-05", 'air_id': 'AA1239', 'countdown': '-60d', 'day_ope_num': '0','N_ope_day': '1','sit_rate':'89%','reven_rate':'12','sit_rate_add':'10%','reven_rate_add':'20%','sale_status':'on'},],
        [
            //日期，航班号，剩余销售天数，每天操作次数，未操作天数，上座率，收益率，上座率增长率，收益率增长率，销售状态
            {'departure': "2019-03-24", 'air_id': 'AA1240', 'countdown': '-60d', 'day_ope_num': '3','N_ope_day': '0','sit_rate':'89%','reven_rate':'12','sit_rate_add':'10%','reven_rate_add':'20%','sale_status':'on'},
            {'departure': "2019-03-25", 'air_id': 'AA1240', 'countdown': '-60d', 'day_ope_num': '2','N_ope_day': '0','sit_rate':'89%','reven_rate':'12','sit_rate_add':'10%','reven_rate_add':'20%','sale_status':'on'},
            {'departure': "2019-03-26", 'air_id': 'AA1240', 'countdown': '-60d', 'day_ope_num': '0','N_ope_day': '2','sit_rate':'89%','reven_rate':'12','sit_rate_add':'10%','reven_rate_add':'20%','sale_status':'on'},
            {'departure': "2019-03-27", 'air_id': 'AA1240', 'countdown': '-60d', 'day_ope_num': '4','N_ope_day': '0','sit_rate':'89%','reven_rate':'12','sit_rate_add':'10%','reven_rate_add':'20%','sale_status':'on'},
            {'departure': "2019-03-28", 'air_id': 'AA1240', 'countdown': '-60d', 'day_ope_num': '0','N_ope_day': '1','sit_rate':'89%','reven_rate':'12','sit_rate_add':'10%','reven_rate_add':'20%','sale_status':'on'},
            {'departure': "2019-03-29", 'air_id': 'AA1240', 'countdown': '-60d', 'day_ope_num': '1','N_ope_day': '0','sit_rate':'89%','reven_rate':'12','sit_rate_add':'10%','reven_rate_add':'20%','sale_status':'on'},
            {'departure': "2019-03-30", 'air_id': 'AA1240', 'countdown': '-60d', 'day_ope_num': '0','N_ope_day': '5','sit_rate':'89%','reven_rate':'12','sit_rate_add':'10%','reven_rate_add':'20%','sale_status':'on'},
            {'departure': "2019-03-31", 'air_id': 'AA1240', 'countdown': '-60d', 'day_ope_num': '2','N_ope_day': '0','sit_rate':'89%','reven_rate':'12','sit_rate_add':'10%','reven_rate_add':'20%','sale_status':'on'},
            {'departure': "2019-04-01", 'air_id': 'AA1240', 'countdown': '-60d', 'day_ope_num': '4','N_ope_day': '0','sit_rate':'89%','reven_rate':'12','sit_rate_add':'10%','reven_rate_add':'20%','sale_status':'on'},
            {'departure': "2019-04-02", 'air_id': 'AA1240', 'countdown': '-60d', 'day_ope_num': '3','N_ope_day': '0','sit_rate':'89%','reven_rate':'12','sit_rate_add':'10%','reven_rate_add':'20%','sale_status':'on'},
            {'departure': "2019-04-03", 'air_id': 'AA1240', 'countdown': '-60d', 'day_ope_num': '0','N_ope_day': '1','sit_rate':'89%','reven_rate':'12','sit_rate_add':'10%','reven_rate_add':'20%','sale_status':'on'},
            {'departure': "2019-04-04", 'air_id': 'AA1240', 'countdown': '-60d', 'day_ope_num': '0','N_ope_day': '2','sit_rate':'89%','reven_rate':'12','sit_rate_add':'10%','reven_rate_add':'20%','sale_status':'on'},
            {'departure': "2019-04-05", 'air_id': 'AA1240', 'countdown': '-60d', 'day_ope_num': '0','N_ope_day': '1','sit_rate':'89%','reven_rate':'12','sit_rate_add':'10%','reven_rate_add':'20%','sale_status':'on'},],
        [
            //日期，航班号，剩余销售天数，每天操作次数，未操作天数，上座率，收益率，上座率增长率，收益率增长率，销售状态
            {'departure': "2019-03-24", 'air_id': 'AA1241', 'countdown': '-60d', 'day_ope_num': '3','N_ope_day': '0','sit_rate':'89%','reven_rate':'12','sit_rate_add':'10%','reven_rate_add':'20%','sale_status':'on'},
            {'departure': "2019-03-25", 'air_id': 'AA1241', 'countdown': '-60d', 'day_ope_num': '2','N_ope_day': '0','sit_rate':'89%','reven_rate':'12','sit_rate_add':'10%','reven_rate_add':'20%','sale_status':'on'},
            {'departure': "2019-03-26", 'air_id': 'AA1241', 'countdown': '-60d', 'day_ope_num': '0','N_ope_day': '2','sit_rate':'89%','reven_rate':'12','sit_rate_add':'10%','reven_rate_add':'20%','sale_status':'on'},
            {'departure': "2019-03-27", 'air_id': 'AA1241', 'countdown': '-60d', 'day_ope_num': '4','N_ope_day': '0','sit_rate':'89%','reven_rate':'12','sit_rate_add':'10%','reven_rate_add':'20%','sale_status':'on'},
            {'departure': "2019-03-28", 'air_id': 'AA1241', 'countdown': '-60d', 'day_ope_num': '0','N_ope_day': '1','sit_rate':'89%','reven_rate':'12','sit_rate_add':'10%','reven_rate_add':'20%','sale_status':'on'},
            {'departure': "2019-03-29", 'air_id': 'AA1241', 'countdown': '-60d', 'day_ope_num': '1','N_ope_day': '0','sit_rate':'89%','reven_rate':'12','sit_rate_add':'10%','reven_rate_add':'20%','sale_status':'on'},
            {'departure': "2019-03-30", 'air_id': 'AA1241', 'countdown': '-60d', 'day_ope_num': '0','N_ope_day': '5','sit_rate':'89%','reven_rate':'12','sit_rate_add':'10%','reven_rate_add':'20%','sale_status':'on'},
            {'departure': "2019-03-31", 'air_id': 'AA1241', 'countdown': '-60d', 'day_ope_num': '2','N_ope_day': '0','sit_rate':'89%','reven_rate':'12','sit_rate_add':'10%','reven_rate_add':'20%','sale_status':'on'},
            {'departure': "2019-04-01", 'air_id': 'AA1241', 'countdown': '-60d', 'day_ope_num': '4','N_ope_day': '0','sit_rate':'89%','reven_rate':'12','sit_rate_add':'10%','reven_rate_add':'20%','sale_status':'on'},
            {'departure': "2019-04-02", 'air_id': 'AA1241', 'countdown': '-60d', 'day_ope_num': '3','N_ope_day': '0','sit_rate':'89%','reven_rate':'12','sit_rate_add':'10%','reven_rate_add':'20%','sale_status':'on'},
            {'departure': "2019-04-03", 'air_id': 'AA1241', 'countdown': '-60d', 'day_ope_num': '0','N_ope_day': '1','sit_rate':'89%','reven_rate':'12','sit_rate_add':'10%','reven_rate_add':'20%','sale_status':'on'},
            {'departure': "2019-04-04", 'air_id': 'AA1241', 'countdown': '-60d', 'day_ope_num': '0','N_ope_day': '2','sit_rate':'89%','reven_rate':'12','sit_rate_add':'10%','reven_rate_add':'20%','sale_status':'on'},
            {'departure': "2019-04-05", 'air_id': 'AA1241', 'countdown': '-60d', 'day_ope_num': '0','N_ope_day': '1','sit_rate':'89%','reven_rate':'12','sit_rate_add':'10%','reven_rate_add':'20%','sale_status':'on'},],
        [
            //日期，航班号，剩余销售天数，每天操作次数，未操作天数，上座率，收益率，上座率增长率，收益率增长率，销售状态
            {'departure': "2019-03-24", 'air_id': 'AA1242', 'countdown': '-60d', 'day_ope_num': '3','N_ope_day': '0','sit_rate':'89%','reven_rate':'12','sit_rate_add':'10%','reven_rate_add':'20%','sale_status':'on'},
            {'departure': "2019-03-25", 'air_id': 'AA1242', 'countdown': '-60d', 'day_ope_num': '2','N_ope_day': '0','sit_rate':'89%','reven_rate':'12','sit_rate_add':'10%','reven_rate_add':'20%','sale_status':'on'},
            {'departure': "2019-03-26", 'air_id': 'AA1242', 'countdown': '-60d', 'day_ope_num': '0','N_ope_day': '2','sit_rate':'89%','reven_rate':'12','sit_rate_add':'10%','reven_rate_add':'20%','sale_status':'on'},
            {'departure': "2019-03-27", 'air_id': 'AA1242', 'countdown': '-60d', 'day_ope_num': '4','N_ope_day': '0','sit_rate':'89%','reven_rate':'12','sit_rate_add':'10%','reven_rate_add':'20%','sale_status':'on'},
            {'departure': "2019-03-28", 'air_id': 'AA1242', 'countdown': '-60d', 'day_ope_num': '0','N_ope_day': '1','sit_rate':'89%','reven_rate':'12','sit_rate_add':'10%','reven_rate_add':'20%','sale_status':'on'},
            {'departure': "2019-03-29", 'air_id': 'AA1242', 'countdown': '-60d', 'day_ope_num': '1','N_ope_day': '0','sit_rate':'89%','reven_rate':'12','sit_rate_add':'10%','reven_rate_add':'20%','sale_status':'on'},
            {'departure': "2019-03-30", 'air_id': 'AA1242', 'countdown': '-60d', 'day_ope_num': '0','N_ope_day': '5','sit_rate':'89%','reven_rate':'12','sit_rate_add':'10%','reven_rate_add':'20%','sale_status':'on'},
            {'departure': "2019-03-31", 'air_id': 'AA1242', 'countdown': '-60d', 'day_ope_num': '2','N_ope_day': '0','sit_rate':'89%','reven_rate':'12','sit_rate_add':'10%','reven_rate_add':'20%','sale_status':'on'},
            {'departure': "2019-04-01", 'air_id': 'AA1242', 'countdown': '-60d', 'day_ope_num': '4','N_ope_day': '0','sit_rate':'89%','reven_rate':'12','sit_rate_add':'10%','reven_rate_add':'20%','sale_status':'on'},
            {'departure': "2019-04-02", 'air_id': 'AA1242', 'countdown': '-60d', 'day_ope_num': '3','N_ope_day': '0','sit_rate':'89%','reven_rate':'12','sit_rate_add':'10%','reven_rate_add':'20%','sale_status':'on'},
            {'departure': "2019-04-03", 'air_id': 'AA1242', 'countdown': '-60d', 'day_ope_num': '0','N_ope_day': '1','sit_rate':'89%','reven_rate':'12','sit_rate_add':'10%','reven_rate_add':'20%','sale_status':'on'},
            {'departure': "2019-04-04", 'air_id': 'AA1242', 'countdown': '-60d', 'day_ope_num': '0','N_ope_day': '2','sit_rate':'89%','reven_rate':'12','sit_rate_add':'10%','reven_rate_add':'20%','sale_status':'on'},
            {'departure': "2019-04-05", 'air_id': 'AA1242', 'countdown': '-60d', 'day_ope_num': '0','N_ope_day': '1','sit_rate':'89%','reven_rate':'12','sit_rate_add':'10%','reven_rate_add':'20%','sale_status':'on'},],
        [
            //日期，航班号，剩余销售天数，每天操作次数，未操作天数，上座率，收益率，上座率增长率，收益率增长率，销售状态
            {'departure': "2019-03-24", 'air_id': 'AA1243', 'countdown': '-60d', 'day_ope_num': '3','N_ope_day': '0','sit_rate':'89%','reven_rate':'12','sit_rate_add':'10%','reven_rate_add':'20%','sale_status':'on'},
            {'departure': "2019-03-25", 'air_id': 'AA1243', 'countdown': '-60d', 'day_ope_num': '2','N_ope_day': '0','sit_rate':'89%','reven_rate':'12','sit_rate_add':'10%','reven_rate_add':'20%','sale_status':'on'},
            {'departure': "2019-03-26", 'air_id': 'AA1243', 'countdown': '-60d', 'day_ope_num': '0','N_ope_day': '2','sit_rate':'89%','reven_rate':'12','sit_rate_add':'10%','reven_rate_add':'20%','sale_status':'on'},
            {'departure': "2019-03-27", 'air_id': 'AA1243', 'countdown': '-60d', 'day_ope_num': '4','N_ope_day': '0','sit_rate':'89%','reven_rate':'12','sit_rate_add':'10%','reven_rate_add':'20%','sale_status':'on'},
            {'departure': "2019-03-28", 'air_id': 'AA1243', 'countdown': '-60d', 'day_ope_num': '0','N_ope_day': '1','sit_rate':'89%','reven_rate':'12','sit_rate_add':'10%','reven_rate_add':'20%','sale_status':'on'},
            {'departure': "2019-03-29", 'air_id': 'AA1243', 'countdown': '-60d', 'day_ope_num': '1','N_ope_day': '0','sit_rate':'89%','reven_rate':'12','sit_rate_add':'10%','reven_rate_add':'20%','sale_status':'on'},
            {'departure': "2019-03-30", 'air_id': 'AA1243', 'countdown': '-60d', 'day_ope_num': '0','N_ope_day': '5','sit_rate':'89%','reven_rate':'12','sit_rate_add':'10%','reven_rate_add':'20%','sale_status':'on'},
            {'departure': "2019-03-31", 'air_id': 'AA1243', 'countdown': '-60d', 'day_ope_num': '2','N_ope_day': '0','sit_rate':'89%','reven_rate':'12','sit_rate_add':'10%','reven_rate_add':'20%','sale_status':'on'},
            {'departure': "2019-04-01", 'air_id': 'AA1243', 'countdown': '-60d', 'day_ope_num': '4','N_ope_day': '0','sit_rate':'89%','reven_rate':'12','sit_rate_add':'10%','reven_rate_add':'20%','sale_status':'on'},
            {'departure': "2019-04-02", 'air_id': 'AA1243', 'countdown': '-60d', 'day_ope_num': '3','N_ope_day': '0','sit_rate':'89%','reven_rate':'12','sit_rate_add':'10%','reven_rate_add':'20%','sale_status':'on'},
            {'departure': "2019-04-03", 'air_id': 'AA1243', 'countdown': '-60d', 'day_ope_num': '0','N_ope_day': '1','sit_rate':'89%','reven_rate':'12','sit_rate_add':'10%','reven_rate_add':'20%','sale_status':'on'},
            {'departure': "2019-04-04", 'air_id': 'AA1243', 'countdown': '-60d', 'day_ope_num': '0','N_ope_day': '2','sit_rate':'89%','reven_rate':'12','sit_rate_add':'10%','reven_rate_add':'20%','sale_status':'on'},
            {'departure': "2019-04-05", 'air_id': 'AA1243', 'countdown': '-60d', 'day_ope_num': '0','N_ope_day': '1','sit_rate':'89%','reven_rate':'12','sit_rate_add':'10%','reven_rate_add':'20%','sale_status':'on'},],
        [
            //日期，航班号，剩余销售天数，每天操作次数，未操作天数，上座率，收益率，上座率增长率，收益率增长率，销售状态
            {'departure': "2019-03-24", 'air_id': 'AA1244', 'countdown': '-60d', 'day_ope_num': '3','N_ope_day': '0','sit_rate':'89%','reven_rate':'12','sit_rate_add':'10%','reven_rate_add':'20%','sale_status':'on'},
            {'departure': "2019-03-25", 'air_id': 'AA1244', 'countdown': '-60d', 'day_ope_num': '2','N_ope_day': '0','sit_rate':'89%','reven_rate':'12','sit_rate_add':'10%','reven_rate_add':'20%','sale_status':'on'},
            {'departure': "2019-03-26", 'air_id': 'AA1244', 'countdown': '-60d', 'day_ope_num': '0','N_ope_day': '2','sit_rate':'89%','reven_rate':'12','sit_rate_add':'10%','reven_rate_add':'20%','sale_status':'on'},
            {'departure': "2019-03-27", 'air_id': 'AA1244', 'countdown': '-60d', 'day_ope_num': '4','N_ope_day': '0','sit_rate':'89%','reven_rate':'12','sit_rate_add':'10%','reven_rate_add':'20%','sale_status':'on'},
            {'departure': "2019-03-28", 'air_id': 'AA1244', 'countdown': '-60d', 'day_ope_num': '0','N_ope_day': '1','sit_rate':'89%','reven_rate':'12','sit_rate_add':'10%','reven_rate_add':'20%','sale_status':'on'},
            {'departure': "2019-03-29", 'air_id': 'AA1244', 'countdown': '-60d', 'day_ope_num': '1','N_ope_day': '0','sit_rate':'89%','reven_rate':'12','sit_rate_add':'10%','reven_rate_add':'20%','sale_status':'on'},
            {'departure': "2019-03-30", 'air_id': 'AA1244', 'countdown': '-60d', 'day_ope_num': '0','N_ope_day': '5','sit_rate':'89%','reven_rate':'12','sit_rate_add':'10%','reven_rate_add':'20%','sale_status':'on'},
            {'departure': "2019-03-31", 'air_id': 'AA1244', 'countdown': '-60d', 'day_ope_num': '2','N_ope_day': '0','sit_rate':'89%','reven_rate':'12','sit_rate_add':'10%','reven_rate_add':'20%','sale_status':'on'},
            {'departure': "2019-04-01", 'air_id': 'AA1244', 'countdown': '-60d', 'day_ope_num': '4','N_ope_day': '0','sit_rate':'89%','reven_rate':'12','sit_rate_add':'10%','reven_rate_add':'20%','sale_status':'on'},
            {'departure': "2019-04-02", 'air_id': 'AA1244', 'countdown': '-60d', 'day_ope_num': '3','N_ope_day': '0','sit_rate':'89%','reven_rate':'12','sit_rate_add':'10%','reven_rate_add':'20%','sale_status':'on'},
            {'departure': "2019-04-03", 'air_id': 'AA1244', 'countdown': '-60d', 'day_ope_num': '0','N_ope_day': '1','sit_rate':'89%','reven_rate':'12','sit_rate_add':'10%','reven_rate_add':'20%','sale_status':'on'},
            {'departure': "2019-04-04", 'air_id': 'AA1244', 'countdown': '-60d', 'day_ope_num': '0','N_ope_day': '2','sit_rate':'89%','reven_rate':'12','sit_rate_add':'10%','reven_rate_add':'20%','sale_status':'on'},
            {'departure': "2019-04-05", 'air_id': 'AA1244', 'countdown': '-60d', 'day_ope_num': '0','N_ope_day': '1','sit_rate':'89%','reven_rate':'12','sit_rate_add':'10%','reven_rate_add':'20%','sale_status':'on'},],
        [
            //日期，航班号，剩余销售天数，每天操作次数，未操作天数，上座率，收益率，上座率增长率，收益率增长率，销售状态
            {'departure': "2019-03-24", 'air_id': 'AA1245', 'countdown': '-60d', 'day_ope_num': '3','N_ope_day': '0','sit_rate':'89%','reven_rate':'12','sit_rate_add':'10%','reven_rate_add':'20%','sale_status':'on'},
            {'departure': "2019-03-25", 'air_id': 'AA1245', 'countdown': '-60d', 'day_ope_num': '2','N_ope_day': '0','sit_rate':'89%','reven_rate':'12','sit_rate_add':'10%','reven_rate_add':'20%','sale_status':'on'},
            {'departure': "2019-03-26", 'air_id': 'AA1245', 'countdown': '-60d', 'day_ope_num': '0','N_ope_day': '2','sit_rate':'89%','reven_rate':'12','sit_rate_add':'10%','reven_rate_add':'20%','sale_status':'on'},
            {'departure': "2019-03-27", 'air_id': 'AA1245', 'countdown': '-60d', 'day_ope_num': '4','N_ope_day': '0','sit_rate':'89%','reven_rate':'12','sit_rate_add':'10%','reven_rate_add':'20%','sale_status':'on'},
            {'departure': "2019-03-28", 'air_id': 'AA1245', 'countdown': '-60d', 'day_ope_num': '0','N_ope_day': '1','sit_rate':'89%','reven_rate':'12','sit_rate_add':'10%','reven_rate_add':'20%','sale_status':'on'},
            {'departure': "2019-03-29", 'air_id': 'AA1245', 'countdown': '-60d', 'day_ope_num': '1','N_ope_day': '0','sit_rate':'89%','reven_rate':'12','sit_rate_add':'10%','reven_rate_add':'20%','sale_status':'on'},
            {'departure': "2019-03-30", 'air_id': 'AA1245', 'countdown': '-60d', 'day_ope_num': '0','N_ope_day': '5','sit_rate':'89%','reven_rate':'12','sit_rate_add':'10%','reven_rate_add':'20%','sale_status':'on'},
            {'departure': "2019-03-31", 'air_id': 'AA1245', 'countdown': '-60d', 'day_ope_num': '2','N_ope_day': '0','sit_rate':'89%','reven_rate':'12','sit_rate_add':'10%','reven_rate_add':'20%','sale_status':'on'},
            {'departure': "2019-04-01", 'air_id': 'AA1245', 'countdown': '-60d', 'day_ope_num': '4','N_ope_day': '0','sit_rate':'89%','reven_rate':'12','sit_rate_add':'10%','reven_rate_add':'20%','sale_status':'on'},
            {'departure': "2019-04-02", 'air_id': 'AA1245', 'countdown': '-60d', 'day_ope_num': '3','N_ope_day': '0','sit_rate':'89%','reven_rate':'12','sit_rate_add':'10%','reven_rate_add':'20%','sale_status':'on'},
            {'departure': "2019-04-03", 'air_id': 'AA1245', 'countdown': '-60d', 'day_ope_num': '0','N_ope_day': '1','sit_rate':'89%','reven_rate':'12','sit_rate_add':'10%','reven_rate_add':'20%','sale_status':'on'},
            {'departure': "2019-04-04", 'air_id': 'AA1245', 'countdown': '-60d', 'day_ope_num': '0','N_ope_day': '2','sit_rate':'89%','reven_rate':'12','sit_rate_add':'10%','reven_rate_add':'20%','sale_status':'on'},
            {'departure': "2019-04-05", 'air_id': 'AA1245', 'countdown': '-60d', 'day_ope_num': '0','N_ope_day': '1','sit_rate':'89%','reven_rate':'12','sit_rate_add':'10%','reven_rate_add':'20%','sale_status':'on'},]
    ];

    try {
        let p0 = ajax(startCity);
        let p1 = ajax(endCity);
        let p2 = ajax(period);
        let p3 = ajax(dataWarningFlight);
        let p4 = ajax(dataExcellentFlight);
        let p5 = ajax(dataFlightCluster);
        let p6 = ajax(dataFlightClusterChild);
        let values = await Promise.all([p0,p1,p2,p3,p4,p5,p6]);
        startCity = values[0];
        endCity = values[1];
        period = values[2];
        dataWarningFlight = values[3];
        dataExcellentFlight = values[4];
        dataFlightCluster = values[5];
        dataFlightClusterChild = values[6];

        //初始化筛选框 出发城市
        initSelectionStartCity(startCity);
        //初始化筛选框 到达城市
        initSelectionEndCity(endCity);
        //初始化筛选框 时间段
        initSelectionPeriod(period);
        //根据航班类数据 初始化航班类筛选框
        initSelectionFlightCluster(dataFlightCluster);


        //根据航班类数据 初始化航班类表
        InitTableFlightCluster(dataFlightCluster,'tableFlightCluster');
        //tableFlightCluster表格点击事件设定
        tableClick(dataFlightClusterChild,'tableFlightCluster');

        //根据航班类数据 初始化优秀航班表
        InitTableExcellentFlight(dataExcellentFlight,'tableExcellentFlight');

        //根据航班类数据 初始化预警航班表
        InitTableWarningFlight(dataWarningFlight,'tableWarningFlight');


    } catch (ex) {
        console.log(ex);
    }
}
