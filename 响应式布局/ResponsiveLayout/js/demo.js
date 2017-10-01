// 获取所有的组标题
var groupTitles = Array.prototype.slice.call(document.querySelectorAll('.group-item>h1'));
// 添加点击事件
groupTitles.forEach(function (h1) {
    h1.flag=false;
    h1.onclick = function () {

        // alert(`展开：${this.textContent}`);
        h1.flag=!h1.flag;
        this.parentElement.style.height = h1.flag?'auto':'55px';
        if(h1.flag==true){
            this.propertyIsEnumerable.classList.add('rotate')
        }else{
            this.propertyIsEnumerable.classList.remove('rotate')
        }
    }
});


