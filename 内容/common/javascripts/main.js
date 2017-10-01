/**
 * Created by LiHongyao on 2017/5/17.
 */


var oPrevContent  = document.getElementsByClassName('prevContent')[0];
var oNextContent  = document.getElementsByClassName('nextContent')[0];
var oUlContent    = document.getElementsByClassName('detail-list-one')[0];
var aIdotsContent = document.getElementsByClassName('idot-item-one');

var curImgIdxContent   = 0;
var isAnimatingContent = false;

/**
 * 事件添加
 */
oPrevContent.onclick = function () {
    if(curImgIdxContent == 0 || isAnimatingContent) {return;}
    curImgIdxContent--;
    tabContent(295);
    changeIdotsContent();
}
oNextContent.onclick = function () {
    if(curImgIdxContent == oUlContent.childElementCount - 1 || isAnimatingContent) {return;}
    curImgIdxContent++;
    tabContent(-295);
    changeIdotsContent();
}

for(var i = 0; i < aIdotsContent.length; i++) {
    aIdotsContent[i].idx = i;
    aIdotsContent[i].onclick = function () {
        if(this == aIdotsContent[curImgIdxContent] || isAnimatingContent) {return;}
        var offset = -295 * (this.idx - curImgIdxContent);
        curImgIdxContent = this.idx;
        tabContent(offset);
        changeIdotsContent();
    }
}

/**
 * 函数封装
 */

function tabContent(offset) {
    isAnimatingContent = true;
    var curLeft = parseInt(getStyle(oUlContent, 'left'));
    var desLeft = curLeft + offset;

    var duration = 500;
    var interval = 20;
    var speed    = Math.ceil(offset / (duration / interval));
    var t = setInterval(function () {
        curLeft = parseInt(getStyle(oUlContent, 'left'));
        if((offset > 0 && curLeft < desLeft) || (offset < 0 && curLeft > desLeft)) {
            oUlContent.style.left = curLeft + speed + 'px';
        }else {
            clearInterval(t);
            isAnimatingContent = false;
            oUlContent.style.left = desLeft + 'px';
        }
    }, interval);
}

function changeIdotsContent() {
    for(var i = 0; i < aIdotsContent.length; i++) {
        if(aIdotsContent[i].classList.contains('active')) {
            aIdotsContent[i].classList.remove('active');
            break;
        }
    }
    aIdotsContent[curImgIdxContent].classList.add('active');
}

function getStyle(element, attr) {
    if(element.currentStyle) {
        return element.currentStyle[attr];
    }else {
        return getComputedStyle(element, null)[attr];
    }
}























