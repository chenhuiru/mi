function judgeValue(firValue, secValue) {
    if(!firValue || !secValue || isNaN(firValue) || isNaN(secValue)) {
        return false;
    }
    return true;
}

function calculate(firIpt, secIpt, select,callBack) {
    if(!judgeValue(firIpt.value,secIpt.value)){
        return;
    }
    var firValue=parseInt(firIpt.value);
    var secValue=parseInt(secIpt.value);
    var operator=select.options[select.selectedIndex].textContent;

    var result=0;
    switch(operator) {
        case '+': {
            result=firValue+secValue;
        }
            break;
        case '-': {
            result=firValue-secValue;
        }
            break;
        case 'x': {
            result=firValue*secValue;
        }
            break;
        case '÷': {
            result = firValue / secValue;
        }
            break;
    }
    if(callBack) {
        callBack(result);
    }
}