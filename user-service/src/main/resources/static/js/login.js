$(function () {
    $("#login").click(function () {
        var username=$("#username").val();
        var password=$("#password").val();
        $.ajax({
           // cache: true,
            type: "post",
            url: "/user/login",
           // contentType: "application/json;charset=UTF-8",
            dataType: "json",
            data: {
                "username":username ,
                "password" : password
            },
        //   async: false,
             error: function (request) {
                 console.log("Connection error");
             },
            success: function (data) {
                //save token
                localStorage.setItem("token",data.jwt);
                location.href='http://localhost:9090/Board'

            }
        });
    });
    //     $('#login').click(function () {
    //         $.ajax({
    //             url: "http://localhost:9090/user/login",
    //             data: {data: "data"},
    //             type: "POST",
    //             dataType: "json",
    //             async: false,
    //             cache: false,
    //             success: function (data, headers) {
    //                 console.log(data);
    //                 console.log(headers);//一般是在这里拿，要看后端是煮面封装的
    //                 document.getElementById('login').action = "./Board.html";
    //             },
    //             error: function (data) {
    //                 console.log(data);
    //             }
    //         });
    //     });
});
// function setTokenToCookie(value) {
//     var Days = 1; //此 cookie 将被保存 30 天
//     var exp = new Date();
//     exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000);
//     document.cookie = "my_token =" + escape(value) + ";expires=" + exp.toGMTString();
// }
//
//
// function getCookie(name) {
//     var cookieValue = "啥也没有！！";
//     if (document.cookie && document.cookie !== '') {
//         var cookies = document.cookie.split(';');
//         for (var i = 0; i < cookies.length; i++) {
//             var cookie = $.trim(cookies[i]);
//             if (cookie.substring(0, name.length + 1) === (name + '=')) {
//                 cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
//                 break;
//             }
//         }
//     }
//     return cookieValue;
// }
//


// if(document.getElementById("root").checked){
//     document.getElementById('login').action = "./Board.html";
// }
// if(document.getElementById("admin").checked){
//     document.getElementById('login').action = "./manager.html?Mid=OP01"
// }

// $('#login').click(function() {
//     if ($('#username')[0].value == "admin"){
//         document.getElementById('login').action = "./Board.html"
//     } else {
//         document.getElementById('login').action = "./manager.html?Mid=OP01"
//     };
// });
