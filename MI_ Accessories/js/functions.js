/**
 * Created by LiHongyao on 2017/9/25.
 */


function updateInterface(datas) {
    // 获取元素
    var oBoxItems = Array.prototype.slice.call(document.querySelectorAll('.box-item'));
    var oTopBox = document.querySelector('.top');
    var oBottomBox = document.querySelector('.bottom');
    // 遍历元素li
    oBoxItems.forEach(function (oBoxItem, idx) {
        // 设置第1、6个的图片
        if(idx == 0 || idx == 5) {
            oBoxItem.style.background = "url('imgs/" + datas[idx] + "') no-repeat 50% 50%";
        }else if(idx == 9) {
            // 更新上方盒子
            oTopBox.querySelector('.title').textContent = datas[idx]["top-Title"];
            oTopBox.querySelector('.price').textContent = datas[idx]["top-price"];
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














