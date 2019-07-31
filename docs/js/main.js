let HIGHEST_TOKEN_LIMIT = 450
let MIDDLE_TOKEN_LIMIT = 900

function loadCookies(){
    // 起動時にCookieを取得する
    // その取得したCookieの状態によってcheckedを切り替える
    datas = ["token_fantasy","loyalcustomers","doma","eden1","eden2","eden3","eden4","kuro"];
    cookies = Cookies.get();
    datas.forEach(element => {
        let cookie = Cookies.get(element);
        if (cookie == undefined){return;}
        let form = document.getElementsByName(element)[0]
        if (form.type == "text"){
            form.value = validate(cookie,0,HIGHEST_TOKEN_LIMIT)
        } else if (form.type == "checkbox"){
            if (cookie == 1) {
                form.checked = true;
            }    
        }
    });

    target = calcNextResetDay(new Date());
    let e = document.getElementsByName("nextUpdate")[0];
    e.textContent = "次回更新は" + dateFormat(target) + "です。";
}

function setCookies(){
    let cookies = new Cookies()
    let cookieStr = "";
    // expireするタイミング(=火曜日17:00)を作る
    target = calcNextResetDay(new Date());
    let expireDate = target.toGMTString();
    // 状態の取得
    datas.forEach(element => {
        let value = 0;
        let form = document.getElementsByName(element)[0];
        if (form != null && form.type == "text" && form.name == "token_fantasy"){
            value = validate(form.value,0,HIGHEST_TOKEN_LIMIT);
            form.value = validate(form.value,0,HIGHEST_TOKEN_LIMIT);
        } else if (form.checked){
            value = 1;
        }
        Cookies.set(element, value, { expires: target });
    });
}

function calcNextResetDay(date){
    let retDate = date;
    let nextResetDayDiff = 2 - retDate.getDay(); // リセ日は現在火曜日
    if (nextResetDayDiff < 0){
        nextResetDayDiff = nextResetDayDiff + 7;
    }
    if (nextResetDayDiff == 0){
        // 今日が火曜日の場合、今の時間を確認する
        // 17:00前ならdiffを0に、17:00を超えていればdiffはそのまま
        if (target.getHours() < 17){
            nextTuesDayDiff = 0;
        }
    }
    retDate.setDate(retDate.getDate() + nextResetDayDiff);
    retDate.setHours(17);
    retDate.setMinutes(0);
    retDate.setSeconds(0);
    retDate.setMilliseconds(0);
    return retDate;
}

function validate(value,minVal,maxVal){
    let retVal =  value;
    if (isNaN(retVal)){
        return minVal;
    }
    if (value < minVal){
        retVal = minVal;
    }
    if (value > maxVal){
        retVal = maxVal;
    }
    return retVal;
}

// dateFormat 関数の定義
function dateFormat(date) {
    let y = date.getFullYear();
    let m = date.getMonth() + 1;
    let d = date.getDate();
    let h = date.getHours();
    let mm = date.getMinutes();
    mm = ('0' + mm).slice(-2);
    // フォーマット整形済みの文字列を戻り値にする
    return y + '年' + m + '月' + d + '日 ' + h + ":"+ mm;
  }