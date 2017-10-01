var oItemBottom1=document.querySelector(".item-bottom-box");
var oBefour=document.querySelector(".befour");
var oAfter=document.querySelector(".after");
var curImgIdxBo=1;
var isAnimatingBo=false;
var _timerBo=null;


main();

function main() {

    // 1、获取DOM元素
    var aVideos     = Array.prototype.slice.call(document.querySelectorAll('.video-item'));
    var aA          = Array.prototype.slice.call(document.querySelectorAll('.figure a'));
    var aTitles     = Array.prototype.slice.call(document.querySelectorAll('h3.title'));
    var aDescs      = Array.prototype.slice.call(document.querySelectorAll('p.desc'));

    var oClose      = document.querySelector('.video-close');
    var oVideoMask  = document.querySelector('.video-mask');
    var oVideoTitle = document.querySelector('.video-title');
    var oVideoShow  = document.querySelector('.video-show');
    var oVideoPlay  = document.querySelector('.video-play');
    var oVideo      = document.querySelector('video');

    // 2、请求数据
    GET("js/datas.json", function (response) {
        var datas = response["infos"];
        aVideos.forEach(function (video, idx) {
            aA[idx].firstElementChild.src = "imgs/" + datas[idx]["imgName"];
            aA[idx].setAttribute("data-bgimg", datas[idx]["bgImgName"]);
            aTitles[idx].textContent = datas[idx]["title"];
            aDescs[idx].textContent = datas[idx]["subTitle"];
        });
    }, function (errorStatus) {

    });

    // 3、点击链接显示视频窗口
    aA.forEach(function (a, idx) {
        a.idx = idx;
        addEvent(a, "click", function () {
            oVideoTitle.textContent = aTitles[this.idx].textContent;
            oVideoShow.style.background = "url(imgs/" + this.getAttribute('data-bgimg') + ") no-repeat 50% 50%";
            oVideo.src = this.getAttribute("data-video");
            oVideoMask.style.display = "block";
        });
    });

    // 关闭视频窗口
    addEvent(oClose, "click", function () {
        oVideo.pause();
        oVideo.style.display = "none";
        oVideoPlay.style.display = "block";
        oVideoMask.style.display = "none";

    });
    addEvent(oVideoShow, "click", function () {
        oVideoPlay.style.display = "none";
        oVideo.style.display = "block";
        oVideo.play();
    });








    //配件
    // 获取dom元素
    var aLis = Array.prototype.slice.call(document.querySelectorAll(".content-surrounding .menu-list li"));

 // 获取数据
    GET("js/datasss.json", function (response) {
        // 设置默认数据
        updateInterface(response["infos"][0]);
        // 交互设计
        console.log();
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









    //淡入淡出
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



    //小明星单品轮播
    oBefour.onclick=function () {
        if(isAnimatingBo){
            return;
        }
        if(curImgIdxBo==1){
            curImgIdxBo=2;
        }else {
            curImgIdxBo--;
        }
        tab1(1200);
    }
    oAfter.onclick=function () {
        if(isAnimatingBo){
            return;
        }
        if(curImgIdxBo==2){
            curImgIdxBo=1;
        }else {
            curImgIdxBo++;
        }
        tab1(-1200);
    }


    /**
     *
     * 图片轮播
     */
    // autoPlayBo();
    function tab1(offset) {
        isAnimatingBo = true;

        var duration = 1000, // 持续时间
            interval = 15, // 每一帧持续的时间（控制流畅度）
            frames   = duration / interval ,// 获取帧数
            speed    = Math.ceil(offset / frames), // 每一帧位移的距离
            curLeft  = parseInt(getStyle(oItemBottom1, "left")),
            desLeft = curLeft + offset;
        var t = setInterval(function () {
            // 更新当前值
            curLeft  = parseInt(getStyle(oItemBottom1, "left"));
            // 帧动画条件
            // offset > 0 && curLeft < desLeft
            // offset < 0 && curLeft > desLeft
            if((offset > 0 && curLeft < desLeft) || (offset < 0 && curLeft > desLeft)) {
                oItemBottom1.style.left = curLeft + speed + 'px';
            }else {
                // 停止动画
                clearInterval(t);
                isAnimatingBo = false;
                // 更新位置
                oItemBottom1.style.left = desLeft + 'px';

                // 无限切换
                if(parseInt(getStyle(oItemBottom1, "left")) < -2400) {
                    oItemBottom1.style.left = '-1200px';
                }else if(parseInt(getStyle(oItemBottom1, "left")) > -1200) {
                    oItemBottom1.style.left = '-2400px';
                }
            }
        }, interval);

    }

    function getStyle(el, attr) {
        // 兼容ie
        if(el.currentStyle) {
            return el.currentStyle[attr];
        }else {
            // null -> undefined
            return getComputedStyle(el, null)[attr];
        }
    }
    // function autoPlayBo() {
    //     _timerBo = setInterval(function () {
    //         oAfter.onclick();
    //     }, 3000);
    // }


    function stop() {
        clearInterval(_timerBo);
    }




// 回到顶部
    var oBackToTopBtn = document.getElementsByClassName('rocket-btn')[0];
    var offset = 0;

    /**
     * 事件添加
     */
// 窗口滚动，获取Y轴滚动部分的偏移
    window.addEventListener( 'scroll', function () {
        offset = document.body.scrollTop || document.documentElement.scrollTop;
        oBackToTopBtn.style.display = offset > 1000 ? 'block' : 'none';
    }, false);

    oBackToTopBtn.addEventListener('click', function () {
        var duration = 1000;
        var interval = 20;
        var speed    = Math.ceil(offset / (duration / interval));
        var t = setInterval(function () {
            if(offset > 0) {
                document.body.scrollTop = document.documentElement.scrollTop = offset - speed;
            }else {
                clearInterval(t);
                document.body.scrollTop = document.documentElement.scrollTop = 0;
            }
        }, interval);


    }, false);




}



















