function loadCookies(){
    // 起動時にCookieを取得する
    // その取得したCookieの状態によってcheckedを切り替える
    datas = ["loyalcustomers","doma","eden1","eden2","eden3","eden4","kuro"];
    cookies = Cookies.get();
    datas.forEach(element => {
        let cookie = Cookies.get(element);
        if (cookie != undefined && cookie == 1) {
            var e = document.getElementsByName(element)[0];
            e.checked = true;
        }
    });
}

// Cookieのセット時はexpiredを日付指定したいため、各情報として上書きする
// でもCookieってドメインごとに一括で持つんじゃなかったっけ

function setCookies(){
    var cookies = new Cookies()
    var cookieStr = "";
    // expireするタイミング(=火曜日17:00)を作る
    target = new Date();
    nextTuesDayDiff = target.getDay() - 2 + 7;
    if (nextTuesDayDiff == 7) {
        // 今日が火曜日の場合、今の時間を確認する
        // 17:00前ならdiffを0に、17:00を超えていればdiffはそのまま
        if (target.getHours() < 17){
            nextTuesDayDiff = 0;
        }
    }
    target.setDate(target.getDate() + nextTuesDayDiff);
    target.setHours(17);
    target.setMinutes(0);
    target.setSeconds(0);
    target.setMilliseconds(0);
    let expireDate = target.toGMTString();
    // 状態の取得
    datas.forEach(element => {
        let e = document.getElementsByName(element)[0].checked;
        var value = 0;
        if (e){
            value = 1;
        }
        Cookies.set(element, value, { expires: target });
    });
}