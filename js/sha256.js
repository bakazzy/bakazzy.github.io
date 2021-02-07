function encode() { //  加密算法选择
    inputerror(); //输入检测
    keyerror();
    var index = document.getElementById("select1").selectedIndex;
    switch (index) {
        case 0:
            base64encode();
            break;
        case 1:
            Caesarencrypt();
            break;
        case 2:
            fence_encrypt();
            break;
    }
}

function decode() { //解密算法选择
    inputerror(); //输入检测
    var index = document.getElementById("select1").selectedIndex;
    switch (index) {
        case 0:
            base64decode();
            break;
        case 1:
            keyerror();
            Caesardecrypt();
            break;
        case 2:
            fence_decrypt();
    }
}

function keyinput() { //出现key值输入框以及加密加密
    let index = document.getElementById("select1").selectedIndex
    if (index == 1 || index == 2) {
        document.getElementById("key").style.visibility = "visible"
        document.getElementById("en").innerHTML = "加密";
        document.getElementById("de").innerHTML = "解密";
    } else {
        document.getElementById("key").style.visibility = "hidden"
        document.getElementById("en").innerHTML = "编码";
        document.getElementById("de").innerHTML = "解码";
    }
}

function clearall() { //清除输入输出
    document.getElementById("input").value = "";
    document.getElementById("output").value = "";
    document.getElementById("key").value = "";

}
//错误检测
function inputerror() {
    //恢复样式
    document.getElementById("input").style.border = "1px solid lightseagreen"
    document.getElementById("input").style.color = "black";
    var input = document.getElementById("input").value
    if (input.length == 0) {
        document.getElementById("output").innerHTML = "请输入数据！！！";
        document.getElementById("input").style.border = "2px solid red"
        document.getElementById("input").style.color = "red";
    }


}

function keyerror() //未输入key值检测
{
    document.getElementById("key").style.color = "black"
    document.getElementById("key").style.border = "1px solid lightseagreen"

    var key = document.getElementById("key").value;
    if (key.length == 0) {
        document.getElementById("key").style.color = "red";
        document.getElementById("key").style.border = "2px solid red";
    }
}




_keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";

function base64encode() {//base64编码
   

    var output = "";
    var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
    var i = 0;
    var input=document.getElementById("input").value;
    input = _utf8_encode(input);
    while (i < input.length) {
        chr1 = input.charCodeAt(i++);
        chr2 = input.charCodeAt(i++);
        chr3 = input.charCodeAt(i++);
        enc1 = chr1 >> 2;
        enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
        enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
        enc4 = chr3 & 63;
        if (isNaN(chr2)) {
            enc3 = enc4 = 64;
        } else if (isNaN(chr3)) {
            enc4 = 64;
        }
        output = output +
        _keyStr.charAt(enc1) + _keyStr.charAt(enc2) +
        _keyStr.charAt(enc3) + _keyStr.charAt(enc4);
    }
    document.getElementById("output").value=output;

}

function base64decode() {       //base64解码
    var input=document.getElementById("input").value
    var output = "";
    var chr1, chr2, chr3;
    var enc1, enc2, enc3, enc4;
    var i = 0;
    input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");
    while (i < input.length) {
        enc1 = _keyStr.indexOf(input.charAt(i++));
        enc2 = _keyStr.indexOf(input.charAt(i++));
        enc3 = _keyStr.indexOf(input.charAt(i++));
        enc4 = _keyStr.indexOf(input.charAt(i++));
        chr1 = (enc1 << 2) | (enc2 >> 4);
        chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
        chr3 = ((enc3 & 3) << 6) | enc4;
        output = output + String.fromCharCode(chr1);
        if (enc3 != 64) {
            output = output + String.fromCharCode(chr2);
        }
        if (enc4 != 64) {
            output = output + String.fromCharCode(chr3);
        }
    }
    output = _utf8_decode(output);
    document.getElementById("output").value=output;
}

function _utf8_encode(string) {
    string = string.replace(/\r\n/g,"\n");
    var utftext = "";
    for (var n = 0; n < string.length; n++) {
        var c = string.charCodeAt(n);
        if (c < 128) {
            utftext += String.fromCharCode(c);
        } else if((c > 127) && (c < 2048)) {
            utftext += String.fromCharCode((c >> 6) | 192);
            utftext += String.fromCharCode((c & 63) | 128);
        } else {
            utftext += String.fromCharCode((c >> 12) | 224);
            utftext += String.fromCharCode(((c >> 6) & 63) | 128);
            utftext += String.fromCharCode((c & 63) | 128);
        }

    }
    return utftext;
}

function _utf8_decode(utftext) {
    var string = "";
    var i = 0;
    var c = c1 = c2 = 0;
    while ( i < utftext.length ) {
        c = utftext.charCodeAt(i);
        if (c < 128) {
            string += String.fromCharCode(c);
            i++;
        } else if((c > 191) && (c < 224)) {
            c2 = utftext.charCodeAt(i+1);
            string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
            i += 2;
        } else {
            c2 = utftext.charCodeAt(i+1);
            c3 = utftext.charCodeAt(i+2);
            string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
            i += 3;
        }
    }
    return string;
}



function Caesarencrypt() {//凯撒加密
    var key = document.getElementById("key").value;
    if (key.length == 0) //不符合规则
    {
        document.getElementById("output").value = "加密失败，请检查输入和key值"
    } else {
        var plain = document.getElementById("input").value;
        var ctext = "";
        for (var i = 0; i < plain.length; i++) {
            var pcode = plain.charCodeAt(i);
            var ccode = pcode;
            if (pcode >= 65 && pcode <= 90) {
                ccode = ((pcode - 65) + key * 1) % 26 + 65;
            }
            if (pcode >= 97 && pcode <= 122) {
                ccode = ((pcode - 97) + key * 1) % 26 + 97;
            }
            ctext += String.fromCharCode(ccode);
        }

        document.getElementById("output").value = ctext;
    }
}

function Caesardecrypt() { //凯撒解密
    var key = document.getElementById("key").value;
    if (key.length == 0) {
        document.getElementById("output").value = "解密失败，请检查输入和key值"
    } else {
        var ctext = document.getElementById("input").value;
        var plain = "";
        for (var i = 0; i < ctext.length; i++) {
            var ccode = ctext.charCodeAt(i);
            var pcode = ccode;
            if (ccode >= 65 && ccode <= 90) {
                pcode = ((ccode - 65) - key * 1 + 26) % 26 + 65;
            }
            if (ccode >= 97 && ccode <= 122) {
                pcode = ((ccode - 97) - key * 1 + 26) % 26 + 97;
            }
            plain += String.fromCharCode(pcode);
        }
        document.getElementById("output").value = plain;
    }

}



//栅栏密码加解密

function fence_encrypt() {
    var input = document.getElementById("input").value; //读取输入
    var key = document.getElementById("key").value; //读取一组几个字符
    var result = "";
    if (input.length % key !== 0) //不符合规则
    {
        document.getElementById("output").value = "加密失败，请检查输入和key值"
    } else {
        var num = input.length / key; //计算一共几组
        for (var i = 1; i <= key; i++) {
            for (var j = 1; j <= num; j++) {
                result += input[i - 1 + (j - 1) * key];
            }
        }
        document.getElementById("output").value = result;
    }
}

function fence_decrypt() {
    var input = document.getElementById("input").value; //读取输入
    var key = document.getElementById("key").value; //读取一组几个字符
    var result = "";
    if (input.length % key !== 0) //不符合规则
    {
        document.getElementById("output").value = "解密失败，请检查输入和key值"
    } else {
        var num = input.length / key; //计算一共几组
        for (var i = 1; i <= num; i++) {
            for (var j = 1; j <= key; j++) {
                result += input[i - 1 + (j - 1) * num];
            }
        }
        document.getElementById("output").value = result;
    }
}