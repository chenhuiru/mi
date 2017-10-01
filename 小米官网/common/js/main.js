/**
 * Created by LiHongyao on 2017/4/18.
 */
var oWrap = $('#wrapMain');
var datas = jsonData;
var isAnimating = false;
var oUl = addElement(oWrap, "ul", {"class":"content-list clearFix"});

// 遍历数数，根据数据条数创建节点
datas.forEach(function(data, idx) {

    // 1、布局外层节点
    var oLi = addElement(oUl, "li", {"class":"content-item fl"}, "",`border-top: 1px solid ${data["bgcolor"]}; color: ${data["bgcolor"]}`);
    var oCategory = addElement(oLi, "h3", {}, data["category"]);
    var oCarouselWrap = addElement(oLi, "div", {"class": "carousel-wrap"});

    var width = data["infos"].length * parseInt(getStyle(oWrap, 'width'));
    var oItemList = addElement(oCarouselWrap, "ul", {"class":"item-list"}, "", `width: ${width}px`);
    var oIdots    = addElement(oCarouselWrap, "ul", {"class":"idots", "idx":0});

    // 2、遍历内层数组数据，布局内层节点
    data["infos"].forEach(function(info, idx){
        var oItemLi = addElement(oItemList, "li");
        addElement(oItemLi, "a", {"class":"title", "href":"javascript:;"}, info["title"]);
        addElement(oItemLi, "a", {"class":"subtitle", "href":"javascript:;"}, info["subTitle"]);
        // 处理价格显示区域
        var oPrice = addElement(oItemLi, "a", {"class":"price", "href":"javascript:;"}, info["price"]);
        if(idx == data["infos"].length - 1) {
            oPrice.style.cssText = `border:  1px solid ${data["bgcolor"]}; color: ${data["bgcolor"]}; padding: 5px 10px;`;
            addEvent(oPrice, 'mouseenter', function () {
                oPrice.style.backgroundColor = data['bgcolor'];
                oPrice.style.color = `#fff`;
            });
            addEvent(oPrice, 'mouseout', function () {
                oPrice.style.cssText = `border:  1px solid ${data["bgcolor"]}; color: ${data["bgcolor"]}; padding: 5px 10px;`;
            });
        }
        addElement(oItemLi, "a", {"class":"img", "href":"javascript:;"}, "", `background: url("imgs/${info["imgName"]}") no-repeat center;`);
        // 添加小圆点
        var oIdot = addElement(oIdots, "li");
        oIdot.idx = idx;
        addEvent(oIdot, 'click', function () {
            var curIdx = this.parentElement.getAttribute('idx');
            var desIdx = this.idx;
            var offset = -parseInt(getStyle(this.parentElement.parentElement, 'width')) * (desIdx - curIdx);
            this.parentElement.setAttribute('idx', desIdx);
            tab(oItemList, offset, this.parentElement);
        });
        if(idx == 0) {
            addClass(oIdot, "selected");
        }
    });

    // 创建左右按钮
    var oBtnBox = addElement(oCarouselWrap, "div", {"class": "btns"});
    var oPrev = addElement(oBtnBox, "span", {"class":"btn prev"});
    var oNext = addElement(oBtnBox, "span", {"class":"btn next"});
    addEvent(oPrev, "click", function() {
        if(isAnimating) {return;}
        var oItemList = this.parentElement.parentElement.firstElementChild;
        tab(oItemList, 295, oIdots, '--');
    });
    addEvent(oNext, "click", function () {
        if(isAnimating) {return;}
        var oItemList = this.parentNode.parentNode.firstElementChild;
        tab(oItemList, -295, oIdots, '++');

    });
});

function tab(target, offset, idots, flag) {
    var maxOffset = -295 * (target.children.length - 1);
    var minOffset = 0;
    var curOffset = parseInt(getStyle(target, 'left'));
    // 异常处理
    if((offset > 0 && curOffset == 0) || (offset < 0 && curOffset == maxOffset) ) {
        return;
    }
    if(flag) {
        var curImgIdx = parseInt(idots.getAttribute("idx"));
        flag == '++' ? ++curImgIdx : --curImgIdx
        idots.setAttribute("idx", curImgIdx.toString());
    }

    var duration = 300;
    var interval = 15;
    var speed    = Math.ceil(offset / (duration / interval));
    var desOffset = parseInt(getStyle(target, "left")) + offset;

    var t = setInterval(function() {
        isAnimating = true;
        var curOffset = parseInt(getStyle(target, "left"));
        if((offset < 0 && curOffset > desOffset) || (offset > 0 && curOffset < desOffset)) {
            target.style.left = curOffset + speed + "px";
        }else {
            isAnimating = false;
            target.style.left = desOffset + "px";
            clearInterval(t);
        }
    }, interval);
    changeIdots(idots);
}

function changeIdots(target) {
    var curImgIdx = target.getAttribute('idx');
    var aIdot = target.children;
    for(let i = 0; i < aIdot.length; i++) {
        if(aIdot[i].classList.contains('selected')) {
            aIdot[i].classList.remove('selected');
            break;
        }
    }
    addClass(target.children[curImgIdx], "selected");
}