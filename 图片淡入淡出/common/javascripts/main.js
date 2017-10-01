/**
 * Created by LiHongyao on 2017/5/11.
 */

// 获取页面元素
var oWrapOne  = document.getElementsByClassName('wrap')[0];
var oPrevOne  = document.getElementsByClassName('prevOne')[0];
var oNextOne  = document.getElementsByClassName('nextOne')[0];
var aImgsOne  = document.getElementsByClassName('imgs-box-one')[0].children;
var aIdotsOne = document.getElementsByClassName('idots-box-one')[0].children;
// 记录当前显示图片位置
var curImgIdxOne = 0;
// 记录动画执行状态
var isAnimatingOne = false;
// 定时器（自动轮播）
var timer = null;

// 显示默认图片
tab();
// 自动轮播
autoplay();


/**
 * 事件添加
 */
oPrevOne.onclick = function () {
    // 异常处理，如果当前正在执行图片过渡，则不做任何处理
    if(isAnimatingOne) {
        return;
    }
    curImgIdxOne = curImgIdxOne == 0 ? 5 : --curImgIdxOne;
    tab();
}
oNextOne.onclick = function () {
    if(isAnimatingOne) {
        return;
    }
    curImgIdxOne = curImgIdxOne == 5 ? 0 : ++curImgIdxOne;
    tab();
}

// 为下面的指示器添加事件（可点击切换）
for(var i = 0; i < aIdotsOne.length; i++) {
    aIdotsOne[i].idx = i;
    addEvent(aIdotsOne[i], 'click', function () {
        if(isAnimatingOne || this.classList.contains('active')) {
            return;
        }
        curImgIdxOne = this.idx;
        tab();
    });
}

// 为图片添加点击事件
for(var i = 0; i < aImgsOne.length; i++) {
    aImgsOne[i].idx = i;
    addEvent(aImgsOne[i], 'click', function () {
       console.log('您点击了第：`' + this.idx + '`张图片!');
    });
}

oWrapOne.onmouseenter = stop;
oWrapOne.onmouseleave = autoplay;

/**
 * 函数封装
 */
function tab() {
    isAnimatingOne = true;
    // 异常处理
    for(var i = 0; i < aImgsOne.length; i++) {
        if(aIdotsOne[i].classList.contains('active')) {
            aIdotsOne[i].classList.remove('active');
            fade(aImgsOne[i], 0);
            aImgsOne[i].style.zIndex = '0';
            break;
        }
    }
    aIdotsOne[curImgIdxOne].classList.add('active');
    fade(aImgsOne[curImgIdxOne], 100, 1000, function () {
        isAnimatingOne = false;
    });
    aImgsOne[curImgIdxOne].style.zIndex = '1';
}

/**
 * 自动播放
 */
function autoplay() {
    console.log('播放');
    timer = setInterval(function () {
        oNextOne.onclick();
    }, 5000);
}

/**
 * 停止播放
 */
function stop() {
    console.log('暂停');
    clearInterval(timer);
}

/**
 * 添加事件
 * @param element  事件对象
 * @param type     事件类型
 * @param callBack 回调函数
 */
function addEvent(element, type, callBack) {
    // 兼容IE10.0以下
    if(element.attachEvent) {
        element.attachEvent('on' + type, callBack);
    }else {
        element.addEventListener(type, callBack, false);
    }
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













