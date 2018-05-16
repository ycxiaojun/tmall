window.onload = function(){
	var basketList = sessionStorage.getItem("buyList"),
		curList = sessionStorage.getItem("curBuyList"),
		buyItem = "",
		buyList = [],
		buyData = [];

	if(curList==null||curList==""){
		buyItem = basketList;
	}else{
		buyItem = curList;
	}

	(function checkStorage(){
		if(buyItem!=null&&buyItem!=""){
			getData();
		}else{
			buyData = [];
		}
	})();
	
	function formatData(arr1,arr2,el,num){
        for(let i = 0;i<arr1.length;i++){
            let a = arr1[i].split(el)[num];
            arr2.push(a);
        }
    }

	function getData(){
		buyList = buyItem.split(",");
		var buyItemIndex = [],
			buyItemAmount = [];
		formatData(buyList,buyItemIndex,"_",0);
		formatData(buyList,buyItemAmount,"_",1);
		for(let i=0;i<buyList.length;i++){
			(function(i){
				var dataIndex = buyItemIndex[i],
					dataItemAmount = buyItemAmount[i];
                buyData.push(womenDress[dataIndex]);
                buyData[i].amount = dataItemAmount;
			})(i);
		}
	}

	var vm = new Vue({
		el:"#confirm-content",
		data:{
			message:buyData,
			totalPrice:0
		},
		mounted:function(){
			var _this = this;
            this.$nextTick(function(){
            	_this.getTotalPrice();
            	console.log(_this.textarea);
            });
        },
        filters:{
            formatMoney: function(value){
                return "￥"+Number(value).toFixed(2);
            }
        },
        methods:{
        	getTotalPrice:function(){
        		var _this = this,
        			money = 0;
        		this.message.forEach(function(item,index){
        			money+=item.price*item.amount;
        		});
        		_this.totalPrice = money;
        	},
        	toPaymentPage:function(){
        		sessionStorage.setItem("totalPrice",this.totalPrice);
        		if(buyItem=curList){
        			sessionStorage.removeItem("curBuyList");
        		}else{
        			localStorage.removeItem("itemList");
        			sessionStorage.removeItem("buyList");
        		}
        		window.open("payment.html");
        	},
        	toDetails:function(item){
        		sessionStorage.setItem("productNum",item.id);
        	}
        }
	});
}