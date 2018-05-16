
var errRemind = document.getElementById("errRemind"),
    errRemindVisibility = document.getElementById("errRemind").style.visibility,
    userList = [],
    pwdList = [],
    num;

(function enter(){
    let pwd_2 = document.getElementById("pwd_2");
    pwd_2.onkeydown = function(){
        if(event.keyCode == 13){
            checkValue();
        }
    }
})();

// 验证value值是否为空
function checkValue(){

    //获取表单当中的value值
    var registerUserName = document.getElementById("username").value,
        pwd_1 = document.getElementById("pwd_1").value,
        pwd_2 = document.getElementById("pwd_2").value;

    if (!registerUserName && !pwd_1 && !pwd_2){
        alert("请输入登陆名与登陆密码！");
    } else if(!registerUserName){
        alert("请输入登陆名！");
    } else if(!pwd_1){
        alert("请输入登陆密码！");
    } else if(!pwd_2){
        alert("请再次输入登陆密码！");
    } else{
        checkUser();
    }
}

//验证用户名是否已经注册
function checkUser(){
    var registerUserName = document.getElementById("username").value,
        checkUserName = localStorage.getItem("registerUser");
    if(registerUserName == checkUserName){
        alert("此登录名已被注册！");
    }else{
        setUser();
    }
}

function setUser(){

    var registerUserName = document.getElementById("username").value,
        pwd_1 = document.getElementById("pwd_1").value;

    if(localStorage.getItem("userNameList")&&localStorage.getItem("userPwdList")){

        userList = localStorage.getItem("userNameList").split(",");
        pwdList = localStorage.getItem("userPwdList").split(",");

        userList.push(registerUserName);
        pwdList.push(pwd_1);

        localStorage.setItem("userNameList",userList.join());
        localStorage.setItem("userPwdList",pwdList.join());

    }else{
        userList.push(registerUserName);
        pwdList.push(pwd_1);

        localStorage.setItem("userNameList",userList.join());
        localStorage.setItem("userPwdList",pwdList.join());
    }
    checkPwd(); 
}

//密码是否合法
function checkPwd() { 
    var pwd_1 = document.getElementById("pwd_1").value,
        regs = /^[a-zA-Z0-9_\u4e00-\u9fa5] + $ /; 
    if (pwd_1.length < 6 || pwd_1.length > 18 || regs.test(pwd_1)) { 
        errRemind.innerHTML = "密码格式非法，密码由6-18位字符组成，可包含字母、数字和标点符号";
        errRemindVisibility = "visible";
    } else { 
        errRemind.innerHTML = "";
        errRemindVisibility = "hidden";
        checkTwoPwd();
    }  
}

//验证两次输入的密码是否一致
function checkTwoPwd(){
    var pwd_1 = document.getElementById("pwd_1").value,
    pwd_2 = document.getElementById("pwd_2").value;
    if (pwd_1 != pwd_2){
        errRemind.innerHTML = "两次输入密码不一致，请重新输入！";
        errRemindVisibility = "visible";
        return false;
    } else{
        errRemind.innerHTML = "";
        errRemindVisibility = "hidden";
        alert("注册成功！")
        window.location.href = "tm-login.html";
    }
}