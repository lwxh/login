$(function(){
    //获取数据
    // GetData(InitOperatorTable);

    //初始化时间选择组件
    timeComponent();

    // 使用仿真数据设置起点、终点和时段类型的筛选框
    fakeDataSelection();

    // 使用仿真数据设置管理员表格
    fakeDataOperatorTable();

    //绑定点击时事件
    bindClickEvents();
});

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
 * 初始化起点、终点筛选框与时间筛选框
 */
function initSelection(selectionData){
    //分发数据
    let startPoint = selectionData['startPoint'];
    let endPoint = selectionData['endPoint'];
    let timeType = selectionData['timeType'];
    //设置下拉框
    if(startPoint && startPoint.length>0){
    	$("#selectStart").select2({
    		data:startPoint
        });
    }
    if(endPoint && endPoint.length > 0){
        $("#selectEnd").select2({
    		data:endPoint
    	});
    }
    if(timeType && timeType.length > 0){
        $("#selectTime").select2({
            data:timeType
        });
    }
}

/**
 * 初始化页面 表格
 */
function InitOperatorTable(operatorTableData){

    // 分发数据
    let emps = operatorTableData['emps'];
    let emps_bad_no1 = operatorTableData['emps_bad_no1'];
    let emps_best_no1 = operatorTableData['emps_best_no1'];
    let emps_bad_no2 = operatorTableData['emps_bad_no2'];
    let emps_best_no2 = operatorTableData['emps_best_no2'];
    let emps_bad_no3 = operatorTableData['emps_bad_no3'];
    let emps_best_no3 = operatorTableData['emps_best_no3'];

    // 设置选择管理员的下拉框
    let ops=Array.from(new Set(emps.map(v=>v.operatorId)));
    ops.unshift("全部");
    $("#selectOperator").select2({
        data:ops
    });

    //初始化数据表格
    layui.use('table', function(){
        let table = layui.table;

        //第一个实例
        table.render({
            elem: '#operatorTable'
            ,page: true //开启分页
            ,limit:8
            ,limits:[8,16]
            //   ,toolbar: '#toolbarDemo'
            //   ,defaultToolbar: ['filter', 'exports', 'print']
            ,cols: [[ //表头
                {field:'index',title:'序号',type:'numbers'},
                {field: 'operatorId', title: '管理员ID', sort: true},
                {field: 'placingRate', title: '平均上座率', sort: true},
                {field: 'placingRateAvg', title: '同市场平均上座率', sort: true},
                {field: 'incomeRate', title: '平均收益率', sort: true},
                {field: 'incomeRateAvg', title: '同市场平均收益率', sort: true},
                {field: 'status', title: '绩效', align:"center", sort: true, templet:SetStatus}
            ]],
            data:emps,
            done:function(res,cur,count){
                if(count==0){
                    return;
                }
                var dom=$('div[lay-id=operatorTable]').find('.layui-table-body').find("tbody");

                dom.off('click').on('click',function(){
                    var operator = dom.find(".layui-table-hover")[0].cells[1].textContent;
                    window.location.href="./manager.html?Mid=" + operator;
                });

            }
        });

        //第二个实例
        table.render({
            elem: '#No1BestOperatorTable'
            ,page: true //开启分页
            ,limit:8
            ,limits:[8,16]
            //   ,toolbar: '#toolbarDemo'
            //   ,defaultToolbar: ['filter', 'exports', 'print']
            ,title:"优秀管理员推荐"
            ,cols: [[ //表头
                {field:'index',title:'序号',type:'numbers'},
                {field: 'operatorId', title: '管理员ID', sort: true},
                {field: 'placingRate', title: '平均上座率', sort: true},
                {field: 'placingRateAvg', title: '同市场平均上座率', sort: true},
                {field: 'incomeRate', title: '平均收益率', sort: true},
                {field: 'incomeRateAvg', title: '同市场平均收益率', sort: true},
            ]],
            data:emps_best_no1,
            done:function(res,cur,count){
                if(count==0){
                    return;
                }
                var dom=$('div[lay-id=No1BestOperatorTable]').find('.layui-table-body').find("tbody");

                dom.off('click').on('click',function(){
                    var operator = dom.find(".layui-table-hover")[0].cells[1].textContent;
                    window.location.href="./manager.html?Mid=" + operator;
                });

            }
        });

        //第三个实例
        table.render({
            elem: '#No1BadOperatorTable'
            ,page: true //开启分页
            ,limit:8
            ,limits:[8,16]
            //   ,toolbar: '#toolbarDemo'
            //   ,defaultToolbar: ['filter', 'exports', 'print']
            ,title:"预警管理员推荐"
            ,cols: [[ //表头
                {field:'index',title:'序号',type:'numbers'},
                {field: 'operatorId', title: '管理员ID', sort: true},
                {field: 'placingRate', title: '平均上座率', sort: true},
                {field: 'placingRateAvg', title: '同市场平均上座率', sort: true},
                {field: 'incomeRate', title: '平均收益率', sort: true},
                {field: 'incomeRateAvg', title: '同市场平均收益率', sort: true},
            ]],
            data:emps_bad_no1,
            done:function(res,cur,count){
                if(count==0){
                    return;
                }
                var dom=$('div[lay-id=No1BadOperatorTable]').find('.layui-table-body').find("tbody");

                dom.off('click').on('click',function(){
                    var operator = dom.find(".layui-table-hover")[0].cells[1].textContent;
                    window.location.href="./manager.html?Mid=" + operator;
                });

            }
        });

        //第四个实例
        table.render({
            elem: '#No2BestOperatorTable'
            ,page: true //开启分页
            ,limit:8
            ,limits:[8,16]
            //   ,toolbar: '#toolbarDemo'
            //   ,defaultToolbar: ['filter', 'exports', 'print']
            ,title:"优秀管理员推荐"
            ,cols: [[ //表头
                {field:'index',title:'序号',type:'numbers'},
                {field: 'operatorId', title: '管理员ID', sort: true},
                {field: 'placingRate', title: '平均上座率', sort: true},
                {field: 'placingRateAvg', title: '同市场平均上座率', sort: true},
                {field: 'incomeRate', title: '平均收益率', sort: true},
                {field: 'incomeRateAvg', title: '同市场平均收益率', sort: true},
            ]],
            data:emps_best_no2,
            done:function(res,cur,count){
                if(count==0){
                    return;
                }
                var dom=$('div[lay-id=No2BestOperatorTable]').find('.layui-table-body').find("tbody");

                dom.off('click').on('click',function(){
                    var operator = dom.find(".layui-table-hover")[0].cells[1].textContent;
                    window.location.href="./manager.html?Mid=" + operator;
                });

            }
        });

        //第五个实例
        table.render({
            elem: '#No2BadOperatorTable'
            ,page: true //开启分页
            ,limit:8
            ,limits:[8,16]
            //   ,toolbar: '#toolbarDemo'
            //   ,defaultToolbar: ['filter', 'exports', 'print']
            ,title:"预警管理员推荐"
            ,cols: [[ //表头
                {field:'index',title:'序号',type:'numbers'},
                {field: 'operatorId', title: '管理员ID', sort: true},
                {field: 'placingRate', title: '平均上座率', sort: true},
                {field: 'placingRateAvg', title: '同市场平均上座率', sort: true},
                {field: 'incomeRate', title: '平均收益率', sort: true},
                {field: 'incomeRateAvg', title: '同市场平均收益率', sort: true},
            ]],
            data:emps_bad_no2,
            done:function(res,cur,count){
                if(count==0){
                    return;
                }
                var dom=$('div[lay-id=No2BadOperatorTable]').find('.layui-table-body').find("tbody");

                dom.off('click').on('click',function(){
                    var operator = dom.find(".layui-table-hover")[0].cells[1].textContent;
                    window.location.href="./manager.html?Mid=" + operator;
                });

            }
        });

        //第六个实例
        table.render({
            elem: '#No3BestOperatorTable'
            ,page: true //开启分页
            ,limit:8
            ,limits:[8,16]
            //   ,toolbar: '#toolbarDemo'
            //   ,defaultToolbar: ['filter', 'exports', 'print']
            ,title:"优秀管理员推荐"
            ,cols: [[ //表头
                {field:'index',title:'序号',type:'numbers'},
                {field: 'operatorId', title: '管理员ID', sort: true},
                {field: 'placingRate', title: '平均上座率', sort: true},
                {field: 'placingRateAvg', title: '同市场平均上座率', sort: true},
                {field: 'incomeRate', title: '平均收益率', sort: true},
                {field: 'incomeRateAvg', title: '同市场平均收益率', sort: true},
            ]],
            data:emps_best_no3,
            done:function(res,cur,count){
                if(count==0){
                    return;
                }
                var dom=$('div[lay-id=No3BestOperatorTable]').find('.layui-table-body').find("tbody");

                dom.off('click').on('click',function(){
                    var operator = dom.find(".layui-table-hover")[0].cells[1].textContent;
                    window.location.href="./manager.html?Mid=" + operator;
                });

            }
        });

        //第七个实例
        table.render({
            elem: '#No3BadOperatorTable'
            ,page: true //开启分页
            ,limit:8
            ,limits:[8,16]
            //   ,toolbar: '#toolbarDemo'
            //   ,defaultToolbar: ['filter', 'exports', 'print']
            ,title:"预警管理员推荐"
            ,cols: [[ //表头
                {field:'index',title:'序号',type:'numbers'},
                {field: 'operatorId', title: '管理员ID', sort: true},
                {field: 'placingRate', title: '平均上座率', sort: true},
                {field: 'placingRateAvg', title: '同市场平均上座率', sort: true},
                {field: 'incomeRate', title: '平均收益率', sort: true},
                {field: 'incomeRateAvg', title: '同市场平均收益率', sort: true},
            ]],
            data:emps_bad_no3,
            done:function(res,cur,count){
                if(count==0){
                    return;
                }
                var dom=$('div[lay-id=No3BadOperatorTable]').find('.layui-table-body').find("tbody");

                dom.off('click').on('click',function(){
                    var operator = dom.find(".layui-table-hover")[0].cells[1].textContent;
                    window.location.href="./manager.html?Mid=" + operator;
                });

            }
        });



    });
}

//定时重载表格
function ReloadSearchTable(data){
    //初始化数据表格
    layui.use('table', function(){
        var table = layui.table;
        //执行重载
        table.reload('searchTable', {
            page: {
                curr: 1 //重新从第 1 页开始
            },
            data:data
        });
    })
}

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

/**
 * 根据表格状态列内容改变字体颜色
 * @param {*} data
 */
function SetStatus(data){
    let status=data.status;
    if(status=="-2"){
        return '<div class="status">偏低</div>';
    }
    else if(status=="-1"){
        return '<div class="status">一般</div>';
    }
    else if(status=="0"){
        return '<div class="status">良好</div>';
    }
    else {
        return '<div class="status">优秀</div>';
    }
}

/**
 * 为地点下拉选择框和时间类型选择框生成一组仿真数据，并使用该仿真数据初始化选择框
 */
function fakeDataSelection(){
    selectionData = {
        'startPoint': ["全部","广州","上海","北京","成都","贵阳","乌鲁木齐"],
        'endPoint': ["全部","广州","上海","北京","成都","贵阳","乌鲁木齐"],
        'timeType': ["全部","早班","午班","晚班"]
    }
    initSelection(selectionData);
}

/**
 * 生成一组仿真数据，并使用该仿真数据初始化管理员表格
 */
function fakeDataOperatorTable(){
    // 构造仿真数据
    let operatorTableData = {
        'emps': [
            {'operatorId':"OP01",'placingRate':'0.81','placingRateAvg':'0.71','incomeRate':'85%','incomeRateAvg':'75%','status':'1'},
            {'operatorId':"OP02",'placingRate':'0.69','placingRateAvg':'0.61','incomeRate':'74%','incomeRateAvg':'66%','status':'1'},
            {'operatorId':"OP09",'placingRate':'0.78','placingRateAvg':'0.72','incomeRate':'82%','incomeRateAvg':'76%','status':'1'},
            {'operatorId':"OP04",'placingRate':'0.76','placingRateAvg':'0.73','incomeRate':'80%','incomeRateAvg':'77%','status':'0'},
            {'operatorId':"OP08",'placingRate':'0.74','placingRateAvg':'0.72','incomeRate':'78%','incomeRateAvg':'76%','status':'0'},
            {'operatorId':"OP10",'placingRate':'0.81','placingRateAvg':'0.80','incomeRate':'85%','incomeRateAvg':'84%','status':'0'},
            {'operatorId':"OP03",'placingRate':'0.72','placingRateAvg':'0.73','incomeRate':'76%','incomeRateAvg':'77%','status':'-1'},
            {'operatorId':"OP11",'placingRate':'0.74','placingRateAvg':'0.75','incomeRate':'74%','incomeRateAvg':'76%','status':'-1'},
            {'operatorId':"OP06",'placingRate':'0.67','placingRateAvg':'0.70','incomeRate':'70%','incomeRateAvg':'73%','status':'-1'},
            {'operatorId':"OP07",'placingRate':'0.63','placingRateAvg':'0.67','incomeRate':'68%','incomeRateAvg':'72%','status':'-2'},
            {'operatorId':"OP05",'placingRate':'0.63','placingRateAvg':'0.68','incomeRate':'65%','incomeRateAvg':'70%','status':'-2'},
    
        ],
        'emps_bad_no1': [
            {'operatorId':"OP06",'placingRate':'0.67','placingRateAvg':'0.70','incomeRate':'70%','incomeRateAvg':'73%','status':'-1'},
            {'operatorId':"OP07",'placingRate':'0.63','placingRateAvg':'0.67','incomeRate':'68%','incomeRateAvg':'72%','status':'-2'},
            {'operatorId':"OP05",'placingRate':'0.63','placingRateAvg':'0.68','incomeRate':'65%','incomeRateAvg':'70%','status':'-2'},
        ],
        'emps_best_no1': [
            {'operatorId':"OP01",'placingRate':'0.81','placingRateAvg':'0.71','incomeRate':'85%','incomeRateAvg':'75%','status':'1'},
            {'operatorId':"OP02",'placingRate':'0.69','placingRateAvg':'0.61','incomeRate':'74%','incomeRateAvg':'66%','status':'1'},
            {'operatorId':"OP09",'placingRate':'0.78','placingRateAvg':'0.72','incomeRate':'82%','incomeRateAvg':'76%','status':'1'},
            {'operatorId':"OP04",'placingRate':'0.76','placingRateAvg':'0.73','incomeRate':'80%','incomeRateAvg':'77%','status':'0'},
        ],
        'emps_bad_no2': [
            {'operatorId':"OP12",'placingRate':'0.67','placingRateAvg':'0.70','incomeRate':'70%','incomeRateAvg':'73%','status':'-1'},
            {'operatorId':"OP15",'placingRate':'0.63','placingRateAvg':'0.67','incomeRate':'68%','incomeRateAvg':'72%','status':'-2'},
            {'operatorId':"OP14",'placingRate':'0.63','placingRateAvg':'0.68','incomeRate':'65%','incomeRateAvg':'70%','status':'-2'},
        ],
        'emps_best_no2': [
            {'operatorId':"OP16",'placingRate':'0.81','placingRateAvg':'0.71','incomeRate':'85%','incomeRateAvg':'75%','status':'1'},
            {'operatorId':"OP13",'placingRate':'0.69','placingRateAvg':'0.61','incomeRate':'74%','incomeRateAvg':'66%','status':'1'},
            {'operatorId':"OP17",'placingRate':'0.78','placingRateAvg':'0.72','incomeRate':'82%','incomeRateAvg':'76%','status':'1'},
            {'operatorId':"OP19",'placingRate':'0.76','placingRateAvg':'0.73','incomeRate':'80%','incomeRateAvg':'77%','status':'0'},
        ],
        'emps_bad_no3':[
            {'operatorId':"OP18",'placingRate':'0.67','placingRateAvg':'0.70','incomeRate':'70%','incomeRateAvg':'73%','status':'-1'},
            {'operatorId':"OP20",'placingRate':'0.63','placingRateAvg':'0.67','incomeRate':'68%','incomeRateAvg':'72%','status':'-2'},
            {'operatorId':"OP23",'placingRate':'0.63','placingRateAvg':'0.68','incomeRate':'65%','incomeRateAvg':'70%','status':'-2'},
        ],
        'emps_best_no3': [
            {'operatorId':"OP21",'placingRate':'0.81','placingRateAvg':'0.71','incomeRate':'85%','incomeRateAvg':'75%','status':'1'},
            {'operatorId':"OP22",'placingRate':'0.69','placingRateAvg':'0.61','incomeRate':'74%','incomeRateAvg':'66%','status':'1'},
            {'operatorId':"OP29",'placingRate':'0.78','placingRateAvg':'0.72','incomeRate':'82%','incomeRateAvg':'76%','status':'1'},
            {'operatorId':"OP24",'placingRate':'0.76','placingRateAvg':'0.73','incomeRate':'80%','incomeRateAvg':'77%','status':'0'},
        ]
    }
    // 初始化管理员表格
    InitOperatorTable(operatorTableData);
}

/**
 * 异步获取起点、终点和时段类型的真实数据，并用该数据初始化筛选框
 */
function getRealDataSelection(){
    $.ajax({
    	url:'/data/board/selection',
    	dataType:'json',
        type:'get',
    	success:function(res){
    		initSelection(res);
    	},
    	error:function(res){
    	}
    })
}

/**
 * 异步获取管理员表格的真实数据，并使用该数据初始化表格
 */
function getRealDataOperatorTable(){
    $.ajax({
    	url:'/data/board/operatorTable',
    	dataType:'json',
        type:'get',
        data: {
            'startPoint': $("#selectStart").val(),
            'endPoint': $("#selectEnd").val(),
            'timeType': $("#selectTime").val()
        },
    	success:function(res){
    		InitOperatorTable(res)
    	},
    	error:function(res){
    	}
    })
}