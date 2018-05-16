window.onload = function(){
    var item = localStorage.getItem("itemList"),
        itemList = [],
        cartData = [];
    (function checkStorage(){
        if(item!=null&&item!=""){
            getData();
        }else{
            cartData=[];
        }
    })();

    function formatData(arr1,arr2,el,num){
        for(let i = 0;i<arr1.length;i++){
            let a = arr1[i].split(el)[num];
            arr2.push(a);
        }
    }

    function getData(){
        itemList = item.split(",");
        var itemNum = [],
            itemAmountNum = [];
        formatData(itemList,itemAmountNum,"_",1);
        formatData(itemList,itemNum,"_",0);
        for(let i=0;i<itemList.length;i++){
            (function(i){
                var dataNum = itemNum[i];
                cartData.push(womenDress[dataNum]);
                cartData[i].amount = itemAmountNum[i];
            })(i);
        }
    }

    var vm = new Vue({
        el:"#cart",
        data:{
            totalMoney:0,
            message:cartData,
            storageList:itemList,
            selectAllFlag:false,
            selectNum:0,
            totalPrice:0,
            delFlag:false,
            curProduct:'',
            selectedNum:0,
            btn:true
        },
        filters:{
            formatMoney: function(value){
                return "￥"+Number(value).toFixed(2);
            }
        },
        mounted:function(){
            this.$nextTick(function(){

            });
        },
        methods:{
            changeNum:function(product,way){
                if(way>0){
                    product.amount++;
                }else{
                    product.amount--;
                    if(product.amount<1){
                        product.amount=1;
                    }
                }
                this.countTotalPrice();        
            },
            selectProduct:function(item){
                var _this=this;
                if(typeof item.select == 'undefined'){
                    Vue.set(item,"select",true);
                }else{
                    item.select = !item.select;
                }
                this.countTotalPrice();
                this.selectProductNum();
                this.checkAllNum();
                this.checkBtn();
            },
            checkBtn:function(){
                for(var i=0;i<this.message.length;i++){
                    if(this.message[i].select){
                        this.btn=false;
                        break;
                    }else{
                        this.btn=true;
                    }
                }
            },
            checkAllNum:function(){
                this.selectedNum=0;
                for(var i=0;i<this.message.length;i++){
                    if(this.message[i].select){
                        this.selectedNum++;
                    }
                }
                if(this.selectedNum==this.message.length){
                    this.selectAllFlag = true;
                }else{
                    this.selectAllFlag = false;
                }
            },
            selectAll:function(){
                this.selectAllFlag = !this.selectAllFlag;
                var _this = this;
                this.message.forEach(function(item,index){
                    if(typeof item.select == 'undefined'){
                        _this.$set(item,"select",_this.selectAllFlag);
                    }else{
                        item.select = _this.selectAllFlag;
                    }
                });
                this.countTotalPrice();
                this.selectProductNum();
                this.checkBtn();
            },
            countTotalPrice:function(){
                var _this = this;
                _this.totalPrice = 0;
                this.message.forEach(function(item,index){
                    if(item.select){
                        _this.totalPrice += item.price*item.amount;
                    }
                });
            },
            selectProductNum:function(){
                var _this = this;
                _this.selectNum = 0;
                this.message.forEach(function(item,index){
                   if(item.select){
                        _this.selectNum++;
                   }
                });
            },
            delConfirm:function(item){
                this.delFlag=true;
                this.curProduct = item;
            },
            delProduct:function(){
                var index = this.message.indexOf(this.curProduct);
                this.message.splice(index,1);
                this.delFlag=false;
                this.storageList.splice(index,1);
                this.renewStorage();
            },
            renewStorage:function(){
                var _this=this;
                localStorage.removeItem("itemList");
                localStorage.setItem("itemList",_this.storageList);
            },
            toOrderPage:function(){
                var buyList=[];
                for(var i=0;i<this.message.length;i++){
                    if(this.message[i].select){
                        let num = Number(this.message[i].id)-1;
                        buyList.push(num+"_"+this.message[i].amount);
                    }
                }
                sessionStorage.setItem("buyList",buyList);
                window.open("confirm.html");
            },
            toDetails:function(item){
                sessionStorage.setItem("productNum",item.id);
            }
        }
    });

}