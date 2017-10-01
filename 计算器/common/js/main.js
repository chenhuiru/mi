var oFirIpt=document.getElementById("firstIpt");
var oSecIpt=document.getElementById("secondIpt");
var oSelect=document.getElementById("operator");
var oResult=document.getElementById("result");
oFirIpt.oninput = function () {
    calculate(oFirIpt, oSecIpt, oSelect, function (result) {
        oResult.textContent = result;
    });
}
oSecIpt.oninput = function () {
    calculate(oFirIpt, oSecIpt, oSelect, function (result) {
        oResult.textContent = result;
    });
}
oSelect.onchange = function () {
    calculate(oFirIpt, oSecIpt, oSelect, function (result) {
        oResult.textContent = result;
    });
}