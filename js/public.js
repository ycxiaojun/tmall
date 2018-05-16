$("[href='#noLink']").click(function(){
	alert("模仿天猫的链接，并没有实际的跳转页面！");
})

function checkLoginModel(){
	//通过sessionStorage获取登录名或者注册名
	var loginName = sessionStorage.getItem("loginUser"),
		shoppingCart = document.getElementById("shoppingCart"),
		orderForm = document.getElementById("orderForm"),
		exitBtn = document.getElementById("exit");

	if(loginName!=null){
		document.getElementById("indexLogin").style.display = "none";
		document.getElementById("indexUserName").style.display = "block";
		document.getElementById("indexUserName").innerHTML = "Hi,"+loginName;
		document.getElementById("indexRegister").style.display = "none";
		document.getElementById("exit").style.display = "block";
		setShoppingCartNum();
	} 

	shoppingCart.addEventListener("click", shopCartCheckLogin);
	orderForm.addEventListener("click", orderFormCheckLogin);

	function shopCartCheckLogin(){
		// 通过sessionStorage值来判断是否登录了
		if(loginName == null){
			window.location.href = "tm-login.html";
		}else{
			window.location.href = "shoppingCart.html"
		} 
	}
	
	function orderFormCheckLogin(){
		// 通过sessionStorage值来判断是否登录了
		if(loginName == null){
			window.location.href = "tm-login.html";
		}else{
			alert("该功能暂时没做");
		} 
	}
	
	exitBtn.onclick = function(){
		sessionStorage.clear();
		document.getElementById("indexLogin").style.display = "block";
		document.getElementById("indexUserName").style.display = "none";
		document.getElementById("indexUserName").innerHTML = "";
		document.getElementById("indexRegister").style.display = "block";
		document.getElementById("exit").style.display = "none";
	}
}

checkLoginModel();

// 设置购物车商品数量
function setShoppingCartNum(){
    var shoppingCartNum = document.getElementById("shoppingCartNum"),
    item = localStorage.getItem("itemList");
    if(item == ""||item ==null){
        shoppingCartNum.innerHTML = "0";
    }else{
        let itemList = item.split(",");
        shoppingCartNum.innerHTML = itemList.length;
    }
} 

// 判断Array是否有indexOf方法，如果没有就扩展出此方法
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
