$(document).ready(function(){
	//상단 메뉴바 구성

	$("header ul.menu li").click(function(){
		var $rel = $(this).attr("rel");
		$("html, body").stop().animate({scrollTop:$("section#" + $rel).offset().top}, 1000);
		return false;
	});





	/*fadeIn/Out 슬라이드*/
	/*#1. 자동 슬라이드 기능 구현*/
	var $slide = $("#slider .slides li");
	console.log($slide);  //배열 데이터[li.slide,  li.slide, li.slide, li.slide, li.slide]

	var currentSlide = 0;  //최초 브라우저 화면이 나올 때 슬라이드 인덱스 번호(초기값)

	setInterval(function(){
		var $pause = $("#slider").hasClass("pause");
		//마우스가 슬라이드 영역 위에 존재하면 true => 자동 슬라이드 일시 정지
		//마우스가 슬라이드 영역 위에 존재하지 않으면 false => 자동 슬라이드 작동
		if($pause == true){
			//자동 슬라이드 기능 없음
		}else{
			var $show = $("#slider .slides li.show").index();
			console.log("현재 슬라이드의 인덱스 번호 : " + $show);
			$("#slider .slides li").removeClass("show");
			$("#slider ol li").removeClass("active");
			
			if($show == $slide.length - 1){
				$("#slider .slides li").eq(0).addClass("show");
				$("#slider ol li").eq(0).addClass("active");
			}else{
				$("#slider .slides li").eq($show).next().addClass("show");
				$("#slider ol li").eq($show).next().addClass("active");
			}

		}
	}, 4000);


	//#2. 자동 슬라이드 일시 정지 기능
	$("#slider").hover(function(){
		$(this).addClass("pause");
	}, function(){
		$(this).removeClass("pause");
	});


	//#3. 양측 화살표 클릭시 각각 이전 또는 다음 이미지로 넘기기
	$("#slider .prev").click(function(){
		var $now = $("#slider .slides li.show").index();
		$("#slider .slides li").removeClass("show");
		$("#slider ol li").removeClass("active");

		if($now == 0){
			$("#slider .slides li").eq($slide.length - 1).addClass("show");
			$("#slider ol li").eq($slide.length - 1).addClass("active");
		}else{
			$("#slider .slides li").eq($now).prev().addClass("show");
			$("#slider ol li").eq($now).prev().addClass("active");
		}
		return false;
	});

	$("#slider .next").click(function(){
		var $now = $("#slider .slides li.show").index();
		$("#slider .slides li").removeClass("show");
		$("#slider ol li").removeClass("active");

		if($now == $slide.length - 1){
			$("#slider .slides li").eq(0).addClass("show");
			$("#slider ol li").eq(0).addClass("active");
		}else{
			$("#slider .slides li").eq($now).next().addClass("show");
			$("#slider ol li").eq($now).next().addClass("active");
		}
		return false;
	});

	//#4. 하단의 페이저 또는 내비게이터 클릭시 해당하는 이미지에 show라는 클래스명을 부여
	$("#slider ol li").click(function(){
		var $index = $(this).index();
		$("#slider ol li").removeClass("active");
		$(this).addClass("active");
		$("#slider .slides li").removeClass("show");
		$("#slider .slides li").eq($index).addClass("show");
	});








	///////////// 탭박스 공간 설정 /////////////////////
	//#1. 데이터가 들어갈 수 있는 배열

	//2차 배열의 패턴 = ["이미지 파일", "이미지 타이틀"]
	var tab_arr = [
		["tab_interior/interior_01.jpg", "Living Room"],
		["tab_interior/interior_02.jpg", "Rest Room"],
		["tab_interior/interior_03.jpg", "kitchen"],
		["tab_interior/interior_04.jpg", "Bed Room"],
		["tab_exterior/exterior_01.jpg", "Deco Wall"],
		["tab_exterior/exterior_02.jpg", "Garden"],
		["tab_exterior/exterior_03.jpg", "Swim Pool"],
		["tab_exterior/exterior_04.jpg", "Stair"],
		["tab_furniture/furniture_01.jpg", "Sofas"],
		["tab_furniture/furniture_02.jpg", "Bed"],
		["tab_furniture/furniture_03.jpg", "Chair"],
		["tab_furniture/furniture_04.jpg", "Desk"],
	];

	var $ca_box = `
	<div class="tab_detail">
		<div class="dark_bottom">
			<h4>title</h4>
			<a href="">detail more</a>
		</div>
	</div>
	`;

	for(i = 0; i < tab_arr.length; i++){
		$(".tab_box").append($ca_box);
	}

	$("#categories .tab_box .tab_detail").each(function(index){
		$(this).css("background-image", "url(img/"+tab_arr[index][0]+")");
		$(this).find("h4").text(tab_arr[index][1]);
	});

	/*
	인덱스번호를 따졌을 때
	interior 버튼 클릭시, 0 ~ 3 
	exterior 버튼 클릭시, 4 ~ 7
	furniture 버튼 클릭시, 8 ~ 11
	*/
	$("#categories .tab_box .tab_detail").hide();
	$("#categories .tab_box .tab_detail").eq(0).fadeIn();
	$("#categories .tab_box .tab_detail").eq(1).fadeIn();
	$("#categories .tab_box .tab_detail").eq(2).fadeIn();
	$("#categories .tab_box .tab_detail").eq(3).fadeIn();

	$("#categories .tab_btn li").click(function(){
		var $index = $(this).index(); //0,1,2
		$("#categories .tab_box .tab_detail").hide();
		$("#categories .tab_box .tab_detail").eq(4*$index).fadeIn();
		$("#categories .tab_box .tab_detail").eq(4*$index + 1).fadeIn();
		$("#categories .tab_box .tab_detail").eq(4*$index + 2).fadeIn();
		$("#categories .tab_box .tab_detail").eq(4*$index + 3).fadeIn();
		$("#categories .yellow_bg").animate({"left": (100 / 3 * $index) + "%"}, 300);
		return false;
	});


	$("#categories .tab_detail a").click(function(){
		var $index = $(this).closest(".tab_detail").index();
		console.log($index);
		$(".img_space").css("background-image", "url(img/"+tab_arr[$index][0]+")");
		$(".img_space h3").text(tab_arr[$index][1]);
		$(".dark_black").addClass("active");
		$(".popup").addClass("active");
		return false;
	});

	$(".dark_black, .popup .close").click(function(){
		$(".dark_black").removeClass("active");
		$(".popup").removeClass("active");
	});



	//#about js

	var $about_arr = [
		["bkimg0.png", "Mission", "Provide a complete service that is of the highest quality in speed, efficiency, communications and cost; and exceeds client’s expectations."],
		["bkimg1.png", "Value", "With our passion for design, creativity and imagination obsession for details and leadership, we will always strive for continuous improvement."],
		["bkimg2.png", "Vision", "To be a preferred interior design company in quality service and technologically advanced communications and to offer a complete solution to our clients’ needs."],
	];

	var $about_box = `
	<div class="cont_box">
		<div class="img_space">
			<div class="img_box"></div>
		</div>
		<div class="txt_space">
			<h4>Mission</h4>
			<p>Provide a complete service that is of the highest quality in speed, efficiency, communications and cost; and exceeds client’s expectations.</p>
		</div>
	</div>
	`;

	for(i=0; i<$about_arr.length; i++){
		$("#about .cont_part").append($about_box);
	}

	$("#about .cont_part .cont_box").each(function(index){
		$(this).find(".img_box").css("background-image", "url(./img/" + $about_arr[index][0] + ")");
		$(this).find(".txt_space h4").text($about_arr[index][1]);
		$(this).find(".txt_space p").text($about_arr[index][2]);
	});



	//#service js
	var $service_arr = [
		["services-icon-one.png", "1. Planing & Designing", "Constructor explains how you can enjoy high end flooring trends like textured wood and realistic stones with new laminate flooring."],
		["services-icon-two.png", "2. Implementation", "Professional construction services from house renovations and remodeling, green building and small scope work, like painting."],
		["services-icon-three.png", "3. Evaluation", "Our highly educated staff will make sure that your project will be finished on time and specified budget house & remodeling."]
	];

	var $service_box = `
	<div class="cont_box">
		<div class="img_space">
			<div class="img_box">
				<div class="img_dot"></div>
			</div>
		</div>
		<div class="txt_space">
			<h4>Planing & Designing</h4>
			<p>Constructor explains how you can enjoy high end flooring trends like textured wood and realistic stones with new laminate flooring.</p>
			<a href="">Detail More <span>＞</span></a>
		</div>
	</div>
	`;

	for(i=0; i<$service_arr.length; i++){
		$("#service .cont_part").append($service_box);
	}

	$("#service  .cont_part .cont_box").each(function(index){
		$(this).find(".img_box").css("background-image", "url(./img/" + $service_arr[index][0] + ")");
		$(this).find(".txt_space h4").text($service_arr[index][1]);
		$(this).find(".txt_space p").text($service_arr[index][2]);
	});
 

	//#partner js
	var $partner_arr = [
		["dark-logo-1.png", "partner1"],
		["dark-logo-2.png", "partner2"],
		["dark-logo-3.png", "partner3"],
		["dark-logo-4.png", "partner4"],
		["dark-logo-5.png", "partner5"]
	];
	var $partner_box = `
	<div class="img_box">
		<a href=""><img src="./img/dark-logo-1.png" alt="partner1"></a>
	</div>
	`;
	for(i=0; i<$partner_arr.length; i++){
		$("#partner .wrap").append($partner_box);
	};
	$("#partner .wrap .img_box").each(function(index){
		$(this).find("img").attr({"src":"./img/" + $partner_arr[index][0], "alt":$partner_arr[index][1]});
	});










});