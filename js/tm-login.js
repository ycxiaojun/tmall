function noLinks(){
	alert("该模块暂时还没有做，(*^__^*) 嘻嘻……")
}

//用户框获得焦点的隐藏提醒
function outFocus_1() {
    document.getElementById("remind_1").innerHTML = "";
}

//密码框获得焦点的隐藏提醒
function outFocus_2() {
    document.getElementById("remind_2").innerHTML = "";
}

//若输入框为空，显示提醒
function submitTest() {
	var username = document.getElementById("username").value,
	pwd = document.getElementById("pwd").value;

    if (!username && !pwd) { //用户框value值和密码框value值都为空
        document.getElementById("remind_1").innerHTML = "请输入用户名！";
        document.getElementById("remind_2").innerHTML = "请输入密码！";
        return false; //只有返回true表单才会提交
    } else if (!username) { //用户框value值为空
        document.getElementById("remind_1").innerHTML = "请输入用户名！";
        return false;
    } else if (!pwd) { //密码框value值为空
        document.getElementById("remind_2").innerHTML = "请输入密码！";
        return false;
    } else{
    	checkUserAndPwd();
    }
}

function checkUserAndPwd(){

    var username = document.getElementById("username").value, //获取username
        password = document.getElementById("pwd").value; //获取密码

    //判断localStorage是否为null
    if(localStorage.getItem("userNameList")==null){
        document.getElementById("remind_2").innerHTML = "用户名或密码错误！"; //如果localStorage为null，就显示用户名或密码错误！
    }else{
        //把localStorage的字符串数据转换成数组
        var userList = localStorage.getItem("userNameList").split(","),
            pwdList = localStorage.getItem("userPwdList").split(",");
    }

    // 先判断Array是否有indexOf方法，如果没有就扩展出此方法
    if (!Array.indexOf) {
        Array.prototype.indexOf = function (obj) {
            for (var i = 0; i < this.length; i++) {
                if (this[i] == obj) {
                    return i;
                }
            }
            return -1;
        }
    }

    var checkUserName = userList.indexOf(username),
        checkUserPassword = pwdList.indexOf(password);

    if(checkUserName!==-1 && checkUserName == checkUserPassword){
        window.location.href = "index.html";
        sessionStorage.setItem("loginUser",username);
    }else{
        document.getElementById("remind_2").innerHTML = "用户名或密码错误！";
    }
}