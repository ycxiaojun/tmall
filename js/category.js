
window.onload = function(){
	var vm = new Vue({
		el:"#category",
		data:{
			productList:womenDress,
			operationList:[
				{"name":"综合","operationName":"default","isUp":false},
				{"name":"销量","operationName":"sales","isUp":false},
				{"name":"人气","operationName":"popular","isUp":false},
				{"name":"价格","operationName":"down","isUp":false},
				{"name":"价格","operationName":"up","isUp":true}
			],
			curName:"default"
		},
		filters:{
			formatMoney: function(value){
                return "￥"+Number(value).toFixed(2);
            },
            formatVolume: function(value){
            	return value+"笔";
            }
		},
		mounted:function(){
			this.$nextTick(function(){

            });
		},
		methods:{
			alertAli:function(){
				alert("模仿阿里旺旺链接！");
			},
			setStorage:function(item){
				sessionStorage.setItem("productNum",item.id);
			},
			selected:function(name){
				this.curName = name;
				this.productSort(name);
			},
			defaultSort:function(a,b){
				return a.id.split("-")[1]-b.id.split("-")[1];
			},
			salesSort:function(a,b){
				return b.volume-a.volume;
			},
			popularSort:function(a,b){
				return b.comment-a.comment;
			},
			downSort:function(a,b){
				return b.price-a.price;
			},
			upSort:function(a,b){
				return a.price-b.price;
			},
			productSort:function(name){
				switch(name){
					case "default":
					this.productList.sort(this.defaultSort);
					break;
					case "sales":
					this.productList.sort(this.salesSort);
					break;
					case "popular":
					this.productList.sort(this.popularSort);
					break;
					case "down":
					this.productList.sort(this.downSort);
					break;
					case "up":
					this.productList.sort(this.upSort);
					break;
				}
			}
		}
	})
}
