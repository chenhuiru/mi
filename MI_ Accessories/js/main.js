/**
 * Created by LiHongyao on 2017/9/25.
 */


(function main() {
    // 获取dom元素
    var aLis = Array.prototype.slice.call(document.querySelectorAll(".menu-list li"));

    // 获取数据
    GET("js/datas.json", function (response) {
        // 设置默认数据
        updateInterface(response["infos"][0]);
        // 交互设计
        aLis.forEach(function (oLi, idx) {
            oLi.idx = idx;
            oLi.onmouseenter = function () {
                for(var i = 0; i < aLis.length; i++) {
                    if(aLis[i].classList.contains('tab-active')) {
                        aLis[i].classList.remove('tab-active');
                        break;
                    }
                }
                this.classList.add('tab-active');
                updateInterface(response["infos"][this.idx]);
            }
        });
    }, function (fail) {});
}())
































