var oAccount  = document.querySelector('.account');
var oPassword = document.querySelector('.password');
var oBtn      = document.querySelector('#btn');


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
                window.event.returnValue=false;
                location.href="index.html";
            });
        }
    });
};