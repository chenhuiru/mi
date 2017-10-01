//配件
function updateInterface(datas) {
    // 获取元素
    var oBoxItems = Array.prototype.slice.call(document.querySelectorAll('.content-surrounding .box-item'));
    var oTopBox = document.querySelector('.content-surrounding .top');
    var oBottomBox = document.querySelector('.content-surrounding .bottom');
    // 遍历元素li
    oBoxItems.forEach(function (oBoxItem, idx) {
        // 设置第1、6个的图片
        if(idx == 0 || idx == 5) {
            oBoxItem.style.background = "url('imgs/" + datas[idx] + "') no-repeat 50% 50%";
        }else if(idx == 9) {
            // 更新上方盒子
            oTopBox.querySelector('.title1').textContent = datas[idx]["top-Title"];
            oTopBox.querySelector('.price1').textContent = datas[idx]["top-price"];
            oTopBox.querySelector('img').src = "imgs/" + datas[idx]["top-imgName"];
            // 更新浏览更多模块
            oBottomBox.querySelector('.des').textContent = datas[idx]["bottom-des"];
        }else {
            // 设置图片
            oBoxItem.children[0].style.background = "url('imgs/" + datas[idx]["imgName"] + "') no-repeat 50% 50%";
            // 设置标题
            oBoxItem.children[1].textContent = datas[idx]["title"];
            // 设置价格
            oBoxItem.children[2].textContent = datas[idx]["price"];
            // 设置评论
            oBoxItem.children[3].textContent = datas[idx]["appraise"];
            // 设置tips
            oBoxItem.children[4].textContent = "";
            oBoxItem.children[4].style.background = "";
            if(datas[idx]["tips"]) {
                oBoxItem.children[4].textContent = datas[idx]["tips"];
                oBoxItem.children[4].style.backgroundColor = datas[idx]["tips"] == "新品" ? "#83c44e" : "#e53935";
            }
            // 设置滑条内容
            oBoxItem.children[5].firstElementChild.textContent = datas[idx]["appraiseDes"];
            oBoxItem.children[5].lastElementChild.textContent = datas[idx]["appraiseFrom"];

        }
    });

}


/**
 * 淡入淡出效果-封装
 * @param element   执行元素
 * @param target    目标值
 * @param duration  持续时间
 * @param completed 回调函数
 */
function fade(element, target, duration, completed) {
    // Exception handling
    if(!element || target == undefined) {
        throw 'Error：Parameter is not complete in function \'changeOpacity\'.';
    }
    // Set the default value
    duration  = duration  ? duration  : 1000;
    // Gets the current opacity
    var curOpa = getCurrentOpacity();
    // Calculating offset
    var offset   = target - curOpa;
    // Set the interval
    var interval = 30;
    // Calculating speed
    var speed    = offset > 0 ? Math.ceil(offset / (duration / interval)) : Math.floor(offset / (duration / interval));
    // Execute transition animations
    var t = setInterval(function () {
        // Update the current opacity
        curOpa = getCurrentOpacity();
        // Determine whether to reach the target
        if((offset > 0 && curOpa < target) || (offset < 0 && curOpa > target)) {
            // Frame by frame change
            element.style.opacity = (curOpa + speed) / 100
        }else { // Has completed the transition animation
            element.style.opacity = target / 100;
            clearInterval(t);
            // Invoke the callback function
            if(completed) {
                completed();
            }
        }
    }, interval);

    function getCurrentOpacity() {
        var curOpa = 0;
        // Compatible with IE browser
        if(element.currentStyle) {
            curOpa = element.currentStyle['opacity'] * 100;
        }else {
            curOpa = getComputedStyle(element, false)['opacity'] * 100;
        }
        return curOpa;
    }
}




