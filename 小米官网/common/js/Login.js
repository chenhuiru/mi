
main();
function main() {
    var oClick1=document.getElementsByClassName("click1")[0];
    var oClick2=document.getElementsByClassName("click2")[0];
    var oshow1=document.getElementsByClassName("middle-right-center1")[0];
    var oshow2=document.getElementsByClassName("middle-right-center2")[0];
    oClick1.onclick=function () {
        oClick1.style.color="#F56600";
        oshow1.style.display="block";
        oshow2.style.display="none";
        oClick2.style.color="#d3d3d3";
    }


    oClick2.onclick=function () {
        oClick2.style.color="#F56600";
        oshow2.style.display="block";
        oshow1.style.display="none";
        oClick1.style.color="#d3d3d3";
    }

    var oAccount  = document.querySelector('#account');
    var oPassword = document.querySelector('#password');
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
                window.event.returnValue=false;
                location.href="index.html";
            }
        });
    };
}