$(function(){
	var i = 0;

	//鼠标移入停止自动轮播
	$('.mb-stop').hover(
		function(){
			clearInterval(p);
		},
		function(){
			banner();
		}
	);
	
	//设置自动轮播间隔
	function banner(){
		p = setInterval(function(){
			i++;
			if (i>5) {
				i=0;
			}
			selectimg(i);
		},3000);
	};

	//轮播图片选择
	function selectimg(i){
		$('.ban-bg-'+i).stop(true,true).animate({"opacity":"1","z-index":"1","display":"block"},600);
		$('.ban-bg-'+i).siblings('div').animate({"opacity":"0","z-index":"0","display":"none"},600);
		$('.ban-btn>li').eq(i).addClass('select').siblings('li').removeClass('select');
	};
	
	$('.ban-btn>li').eq(0).addClass('select');
	$('.ban-btn>li').each(function(index){
		$(this).mouseover(function(){
			i = index;
			$('.ban-bg-'+index).stop(true,true).animate({"opacity":"1","z-index":"1","display":"block"},600);
			$('.ban-bg-'+index).siblings('div').animate({"opacity":"0","z-index":"0","display":"none"},600);
			$('.ban-btn>li').eq(i).addClass('select').siblings('li').removeClass('select');
		});
	});
	
	banner();
	
});
	
$(function(){
	var pro_i = 0;
	$('.two-grid-body').hover(
		function(){
			clearInterval(pro_p);
		},
		function(){
			pro_banner();
		}
	);
	function pro_banner(){
		pro_p = setInterval(function(){
			pro_i++;
			if (pro_i>1) {
				pro_i=0;
			}
			selectimg(pro_i);
		},3000);
	};
	function selectimg(pro_i){
		$('.tgb-body-'+pro_i).stop(true,true).animate({"opacity":"1","z-index":"1","display":"block"},100);
		$('.tgb-body-'+pro_i).siblings('div').animate({"opacity":"0","z-index":"0","display":"none"},100);
		$('.tgb-head>li').eq(pro_i).addClass('active').siblings('li').removeClass('active');
	};
	$('.tgb-head>li').eq(0).addClass('active');
	$('.tgb-head>li').each(function(index){
		$(this).mouseover(function(){
			pro_i = index;
			$('.tgb-body-'+index).stop(true,true).animate({"opacity":"1","z-index":"1","display":"block"},100);
			$('.tgb-body-'+index).siblings('div').animate({"opacity":"0","z-index":"0","display":"none"},100);
			$('.tgb-head>li').eq(pro_i).addClass('active').siblings('li').removeClass('active');
		});
	});
	pro_banner();
});

$("[href='#noLink']").click(function(){
	alert("模仿天猫的链接，并没有实际的跳转页面！");
})

window.onload = function(){
	var productList = document.getElementsByClassName("one-grid-price"),
		guessList = document.getElementsByClassName("gbl-item-img"),
		productNormalList = document.getElementsByClassName("product-normal"),
		lazyBox = document.getElementsByClassName("product-normal");

	for(var i=0;i<productList.length;i++){
		(function(i){
			productList[i].onclick = function(){
				let num = productList[i].getAttribute("data-id");
				sessionStorage.setItem("productNum",num);
				window.open("details.html");
			}
		})(i);
	}
	for(var i=0;i<guessList.length;i++){
		(function(i){
			guessList[i].onclick = function(){
				let num = guessList[i].getAttribute("data-id");
				sessionStorage.setItem("productNum",num);
				window.open("details.html");
			}
		})(i);
	}
}

$(function() {
    $("img.lazy").lazyload({
    });
});
