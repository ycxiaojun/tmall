window.onload = function () {

    var dataNum = sessionStorage.getItem("productNum"),
        detailsTitle = document.getElementById("details-title"),
        tmPrice = document.getElementById("tm-price"),
        saleCount = document.getElementById("saleCount"),
        commentCount = document.getElementById("commentCount"),
        reviewsCount = document.getElementById("reviewsCount"),
        smallImg = document.getElementById("small-img"),
        bigImg = document.getElementById("big-img"),
        attrul = document.getElementById("attrul"),
        descriptionImg = document.getElementById("description");

    function setDetails(){
        tmPrice.innerHTML = womenDress[dataNum-1].price;
        detailsTitle.innerHTML = womenDress[dataNum-1].title;
        saleCount.innerHTML = womenDress[dataNum-1].volume;
        commentCount.innerHTML = womenDress[dataNum-1].comment;
        reviewsCount.innerHTML = womenDress[dataNum-1].comment;
        smallImg.src = "images/product/womenDress/" + womenDress[dataNum-1].img;
        bigImg.src =  "images/product/womenDress/" + womenDress[dataNum-1].img;
        var parameterLists = womenDress[0].parameter;
        for(let i = 0 ; i < parameterLists.length ; i++){
            let li = document.createElement("li"),
                html = parameterLists[i];
            li.innerHTML = html;
            attrul.appendChild(li);
        }
        var descripeImg = womenDress[0].descripeImg;
        for(let i = 0 ; i < descripeImg.length ; i++){
            let img = document.createElement("img");
            img.src = "images/product/womenDress/" + descripeImg[i];
            descriptionImg.appendChild(img);
        }
    }
    setDetails();

    //放大镜特效

    var objGallery = document.getElementById("tb-gallery"),
        objSmallBox = document.getElementById("small-box"),
        objMark = document.getElementById("mark"),
        objFloatBox = document.getElementById("float-box"),
        objBigBox = document.getElementById("big-box"),
        objBigBoxImage = objBigBox.getElementsByTagName("img")[0];

    objMark.onmouseover = function () {
        objFloatBox.style.display = "block"
        objBigBox.style.display = "block"
    }

    objMark.onmouseout = function () {
        objFloatBox.style.display = "none"
        objBigBox.style.display = "none"
    }

    objMark.onmousemove = function (ev) {

        var _event = ev || window.event;  //兼容多个浏览器的event参数模式

        var left = _event.pageX - objGallery.offsetLeft - objFloatBox.offsetWidth/2;

        var top = _event.pageY - objGallery.offsetTop - objFloatBox.offsetHeight/2;

        var floatRangeX = objGallery.offsetWidth - objFloatBox.offsetWidth;

        var floatRangeY = objGallery.offsetHeight - objFloatBox.offsetHeight; 
        
        //设置边界处理，防止移出小图片
        if(left < 0){
            left = 0;      
        }else if(left > floatRangeX){
            left = floatRangeX;
        }

        if(top < 0){
            top = 0;      
        }else if(top > floatRangeY){
            top = floatRangeY;
        } 

        //赋值
        objFloatBox.style.left = left + 'px';
        objFloatBox.style.top = top + 'px';    
        //大图跟着移动
        var sl = left * objBigBox.offsetWidth / objFloatBox.offsetWidth;
        var st = top * objBigBox.offsetHeight / objFloatBox.offsetHeight;
        objBigBox.scrollTop = st;
        objBigBox.scrollLeft = sl;
    }

    //评论模块

    function review(){

        var reviews = document.getElementById("reviews"),
            btn = document.getElementById("reviewsBtn"),
            loginName = sessionStorage.getItem("loginUser");

        btn.onclick = function(){
            reply();
        }

        textarea.onkeydown = function(){
            if(event.keyCode == 13){
                reply();
            }
        }
        

        //删除当前节点
        // function remove(node) {
        //     node.parentNode.removeChild(node);
        // }

        //创建回复评论内容
        function createReply(){
            //获取评论框
            var textarea = document.getElementById("textarea");
            //创建新的评论div
            var div = document.createElement("div");
            //赋类名
            div.className = "reviewsItem";
            //创建每条评论的innerHTML结构，每次只替换textarea的输入内容和 当前发送时间
            var html = '<div class="reviewsDesc">'+
                            '<div class="reviewsText">'+textarea.value+'</div>'+
                            '<div class="reviewsDate">'+getTime()+'</div>'+
                        '</div>'+
                        '<div class="reviewsUser">'+loginName+
                        '<div>';
            //插入到新建的评论div
            div.innerHTML = html;
            //把新评论插入到评论列表
            reviews.appendChild(div);
        }

        //获取当前回复时间
        function getTime(){
            let time = new Date(),
                month = time.getMonth() + 1,
                date = time.getDate(),
                hour = time.getHours(),
                min = time.getMinutes();
            return month + "-" + date + '&nbsp&nbsp' + hour + ":" + min;
        }

        //获取输入内容的长度
        textarea.onkeyup = function(){
            var len = this.value.length,
                num = document.getElementById("reviewsNum");
            num.innerHTML = len + "/100";
        }

        function reply(){
            var len = textarea.value.length;
            if(len == 0){
                alert("请输入内容！");
            } else if(len > 100){
                alert("输入内容长度超过限制！");
            }else{
                createReply();
                textarea.value = "";
            }
        }
    }
    review();

    var li1 = document.getElementById("tb-li1"),
        li2 = document.getElementById("tb-li2"),
        li1Span = li1.children[0],
        li2Span = li2.children[0],
        attributes = document.getElementById("attributes"),
        description = document.getElementById("description"),
        reviews = document.getElementById("reviews"),
        reviewsArea = document.getElementById("reviewsArea");

    li1.onclick = function(){
        li1.className += "selectli";
        li1Span.className += "selectSpan";
        li2.className = "";
        li2Span.className = "";
        attributes.style.display = "block";
        description.style.display = "block";
        reviews.style.display = "none";
        reviewsArea.style.display = "none";
    }

    li2.onclick = function(){
        li2.className += "selectli";
        li2Span.className += "selectSpan";
        li1.className = "";
        li1Span.className = "";
        attributes.style.display = "none";
        description.style.display = "none";
        reviews.style.display = "block";
        reviewsArea.style.display = "block";
    }

    //购物车模块

        //获取输入框
    var productAmount = document.getElementById("productAmount"),
        //获取增加和减少按钮元素
        increaseAmount = document.getElementById("increaseAmount"),
        decreaseAmount = document.getElementById("decreaseAmount"),
        //获取value值
        amountNum = Number(productAmount.value),
        linkBasket = document.getElementById("link-basket"),
        shoppingCartNum = document.getElementById("shoppingCartNum"),
        closeIco = document.getElementsByClassName("close-ico")[0],
        loginModal = document.getElementById("login-modal"),
        linkBuy = document.getElementById("link-buy");

    //键盘按键松开后用正则限制输入格式
    productAmount.onkeyup = function(){
        //只能输入大于零的正整数
        if(this.value.length==1){
            this.value=this.value.replace(/[^1-9]/g,'')
        }else{
            this.value=this.value.replace(/\D/g,'')
        }
    }
    //粘贴文本用正则限制输入格式
    productAmount.onafterpaste = function(){
        if(this.value.length==1){
            this.value=this.value.replace(/[^1-9]/g,'')
        }else{
            this.value=this.value.replace(/\D/g,'')
        }
    }
    //当输入框有输入改变的时候，获取改变后的value值，再执行changeAmountNum函数
    productAmount.onchange = function(){

        let currenNum = Number(productAmount.value);

        changeAmountNum(currenNum);
    }
    //增加和减少输入框的value值
    function changeAmountNum(num){
        increaseAmount.onclick =  function(){
            num += 1;
            productAmount.value = num;
        }

        decreaseAmount.onclick =  function(){
            if(num == "1"){
                productAmount.value = 1;
            }else{
                num -= 1;
                productAmount.value =num;
            }
        }
    }

    changeAmountNum(amountNum);

    function removeEmptyArrayEle(arr){    
        for(var i = 0; i < arr.length; i++) {
            if(arr[i] == "") {
                arr.splice(i,1);
                i = i - 1; 
            }
        }
        return arr;
    }

    //点击加入购物车按钮
    linkBasket.onclick = function(){
        //获取名为“loginUser”的sessionStorage
        let loginName = sessionStorage.getItem("loginUser");
        //判断是否已经登陆
        if(loginName == null){
            //没有登陆，弹出登陆模块
            loginModal.style.display = "block";
        }else{
            //以登陆，继续执行代码
            addProductCart();
        }

        function addProductCart(){
            //获取名为“itemList”的sessionStorage
            var item = localStorage.getItem("itemList");
            //判断是否存在itemList
            //itemList为null，该账户的购物车为空
            if(item==null){
                console.log("null");
                let itemList = [],
                    originalAmount = 0,
                    itemIndex = null;
                removeEmptyArrayEle(itemList);
                addItem(itemList,originalAmount,itemIndex);
            }else{
                let itemList = item.split(",");
                removeEmptyArrayEle(itemList);
                let checkItemList = [];

                for(var i = 0;i<itemList.length;i++){
                    let a = itemList[i].split("_")[0];
                    checkItemList.push(a);
                }

                console.log(checkItemList);
                console.log(dataNum);
                let checkItemNameIndex = checkItemList.indexOf(dataNum-1);

                if(checkItemNameIndex == -1){
                    let originalAmount = 0;
                    itemIndex = null;
                    addItem(itemList,originalAmount,itemIndex);
                }else{
                    let originalAmount = Number(itemList[checkItemNameIndex].split("_")[1]);
                    itemIndex = checkItemNameIndex;
                    addItem(itemList,originalAmount,itemIndex);
                }
            }
        }

        function addItem(arr,originalAmount,itemIndex){
            let currentAmount = Number(productAmount.value),
                amount = currentAmount + originalAmount;
                itemName = (Number(dataNum)-1) + "_" + amount;
            if(itemIndex == null){
                arr.push(itemName);
            }else{
                arr[itemIndex]=itemName;
            }
            localStorage.setItem("itemList",arr);
            shoppingCartNum.innerHTML = arr.length;
        }

    }
    
    closeIco.onclick = function(){
        loginModal.style.display = "none";
    }

    linkBuy.onclick = function(){
        //获取名为“loginUser”的sessionStorage
        let loginName = sessionStorage.getItem("loginUser");
        //判断是否已经登陆
        if(loginName == null){
            //没有登陆，弹出登陆模块
            loginModal.style.display = "block";
        }else{
            //以登陆，继续执行代码
            tobuy();
        }
        function tobuy(){
            var buyAmount = document.getElementById("productAmount").value,
                curBuyList =(Number(dataNum)-1)+"_"+buyAmount;
            sessionStorage.setItem("curBuyList",curBuyList);
            window.location.href = "confirm.html";
        }
    }

}
