/**
 * Created by LiHongyao on 2017/9/27.
 */

var oAccount  = document.querySelector('#account');
var oPassword = document.querySelector('#password');
var oBtn      = document.querySelector('#btn');
var ologin = document.querySelector('#login');

ologin.onclick = function () {
    login("users", {
        "username":oAccount.value,
        "password":oPassword.value
    }, function (status) {
       if(status == 0) {
           alert('用户不存在！');
       }else if(status == 1) {
           alert("账号或密码错误！");
       }else if(status == 2) {
           alert("账号或密码为空！");
       }else if(status == 200) {
           alert("登录成功！");
           // 页面跳转....
       }
    });
};

oBtn.onclick = function () {
    // 表单验证
    var user = {
        "username": oAccount.value,
        "password": oPassword.value
    };

    determineUserIsExists("users", "username", oAccount.value, function (status) {
        if(status == 0) {
            alert("用户已经存在！");
            oAccount.value = "";
            oPassword.value = "";
        }else if(status == 1) {
            // 存储用户
            addUser("users", user, function () {
                alert("注册成功！");
                // 跳转到主页....
            });
        }
    });
};


