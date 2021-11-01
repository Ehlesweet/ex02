$(document).ready(function(){

    /*페이드인/아웃 슬라이드*/

    /*
    
    순서 
    1. 자동슬라이드 구현
    2. 양 옆 버튼 구현
    3. 네비게이터 구현
    4. 네비게이터 명령어를 위의 1,2에 같이 넣어줌.     
    
    */


    //#1. 자동 슬라이드 기능 구현
    var $slide = $("#slider .slides .slide");
    console.log($slide); //배열데이터 [li.slide.show, li.slide, li.slide, li.slide, li.slide, prevObject: S.fn.init(1)] ->5개

    var currentSlide = 0; //최초 브라우저 화면에서 나온 슬라이드 인덱스 번호(초기값)

    function progress(){ //#5. 하단 게이지바
        $("#slider .progress_bar").addClass("active");
    };
    progress();

    setInterval(function(){
        var $pause = $("#slider").hasClass("pause");
        //console.log($pause); 
        //마우스오버는 true -> 자동슬라이드 일시정지
        //마우스 아웃은 false -> 자동슬라이스 재작동

        if($pause == true){
            //자동슬라이드 내부 조정 없음   
        }else{
            var $show = $("#slider .slides .slide.show").index();
            console.log($show);
            $("#slider .slides .slide").removeClass("show");
            $("#slider ol li").removeClass("active");

            if($show == $slide.length -1){ //4
                $("#slider .slides .slide").eq(0).addClass("show");
                $("#slider ol li").eq(0).addClass("active");
            }else{
                $("#slider .slides .slide").eq($show).next().addClass("show");
                $("#slider ol li").eq($show).next().addClass("active");
            }
            $("#slider .progress_bar").removeClass("active");
            setTimeout(function(){
                progress();
            },500);//#5. 하단 게이지바
            
        }          
    }, 4000); //4초 간격으로 무한 반복 시행 

          
    
    //#2. 마우스 오버 시 자동슬라이드 일시정지 기능

    $("#slider").hover(function(){ //마우스가 영억 내로 진입했을 때
        $(this).addClass("pause"); //pause라는 클랙스명이 존재한다면 자동 슬라이드 기능을 일시정지 시킨다. 라는 명제를 세움
    }, function(){ //마우스가 영역 밖으로 이탈했을 때
        $(this).removeClass("pause"); //pause라는 클래스명이 존재하지 않는다면 슬라이드 기능을 복구시킨다. 
    });


    //#3. 양측 화살표 클릭 시 각각 이전 또는 다음 이미지로 넘기기 
    //prev 버튼
    $("#slider .prev").click(function(){
        var $now = $("#slider .slides .slide.show").index(); //현재 표시되는 슬라이더의 인덱스값 추출
        $("#slider .slides .slide").removeClass("show");
        $("#slider ol li").removeClass("active");
        
        if($now == 0){
            $("#slider .slides .slide").eq($slide.length -1).addClass("show");
            $("#slider ol li").eq($slide.length -1).addClass("active");
        }else{
            $("#slider .slides .slide").eq($now).prev().addClass("show");
            $("#slider ol li").eq($now).prev().addClass("active");
        }
        $("#slider .progress_bar").removeClass("active");
        setTimeout(function(){
            progress();
        },500);
        return false; //클릭 이벤트에 의한 새로고침 막기
    });
    //next 버튼
    $("#slider .next").click(function(){
        var $now = $("#slider .slides .slide.show").index(); //현재 표시되는 슬라이더의 인덱스값 추출
        $("#slider .slides .slide").removeClass("show");
        $("#slider ol li").removeClass("active");

        if($now == $slide.length -1){
            $("#slider .slides .slide").eq(0).addClass("show"); //인덱스0은 언제나 있으므로 eq(0)으로 잡아줌
            $("#slider ol li").eq(0).addClass("active");
        }else{
            $("#slider .slides .slide").eq($now).next().addClass("show");
            $("#slider ol li").eq($now).next().addClass("active");
        }      
        $("#slider .progress_bar").removeClass("active");
        setTimeout(function(){
            progress();
        },500); 
        return false;
    });


    //#4. 하단의 슬라이드 네비게이터를 클릭 시 해당하는 이미지에 show라는 클래스명을 부여
    $("#slider ol li").click(function(){
        var $index = $(this).index(); //현재 인덱스번호 추출
        $("#slider ol li").removeClass("active");
        $(this).addClass("active");
        $("#slider .slides .slide").removeClass("show");
        $("#slider .slides .slide").eq($index).addClass("show");

        $("#slider .progress_bar").removeClass("active");
        setTimeout(function(){
            progress(); //콜백, 이전에 선언된 함수문을 실행해라.
        },500);
    });

    $("#slider .title .main_title").addClass("active");

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
                <h4>Title</h4>
                <a href="">Detail more</a>
            </div>
        </div>     
    `;

    for(i = 0; i < tab_arr.length; i++){
        $(".tab_box").append($ca_box);
    }

    $("#categories .tab_box .tab_detail").each(function(index){
        $(this).css("background-image","url(./img/"+tab_arr[index][0]+")");
        $(this).find("h4").text(tab_arr[index][1]);
    });

    /*
    인덱스 번호를 따졌을 때
    interior 버튼(인덱스번호 0번)을 클릭했을 때, 0~3 
    Exterior 버튼(인덱스번호 1번)을 클릭했을 때, 4~7 
    Furniture 버튼(인덱스번호 2번)을 클릭했을 때, 8~11 

    좀 어렵지만 꼭 외워보자!!!!
    */

    $("#categories .tab_box .tab_detail").eq(3).nextAll().hide(); // 3번인덱스 이후 모든 형제를 display:none; 
    $("#categories .tab_btn li").click(function(){
        var $index = $(this).index();
        console.log($index);
        $("#categories .tab_box .tab_detail").fadeIn();
        $("#categories .tab_box .tab_detail").eq(4*$index).prevAll().hide();
        $("#categories .tab_box .tab_detail").eq(4*($index+1) -1).nextAll().hide();

        $("#categories .yellow_bg").animate({"left" : (100 / 3 * $index) + "%"}, 300); //탭박스 배경색깔 움직이기. % 꼭 넣어줘야함.

        return false;
    });


    //-----------------------------------
    //#about 부분
    var about_arr = [
        ["bkimg0.png", "Mission", "Provide a complete service that is of the highest quality in speed, efficiency, communications and cost, and exceeds client’s expectations."],
        ["bkimg1.png", "Value", "With our passion for design, creativity and imagination obsession for details and leadership, we will always strive for continuous improvement."],
        ["bkimg2.png", "Vision", "To be a preferred interior design company in quality service and technologically advanced communications and to offer a complete solution to our clients’ needs."],
    ];

    var $about_box = `
        <div class="cont_box">
            <div class="img_space">
                <div class="img_box"></div>
            </div>
            <div class="txt_box">
                <h4>Mission</h4>
                <p>Provide a complete service that is of the highest quality in speed, efficiency, communications and cost; and exceeds client’s expectations.</p>
            </div>
        </div>    
    `;

    for(i = 0; i < about_arr.length; i++){
        $("#about .cont_part").append($about_box);
    }

    $("#about .cont_part .cont_box").each(function(index){
        $(this).find(".img_box").css("background-image", "url(./img/"+about_arr[index][0]+")");
        $(this).find(".txt_box h4").text(about_arr[index][1]);
        $(this).find(".txt_box p").text(about_arr[index][2]);
    });


    //------------------------
    //Service JS

    var service_arr = [
        ["services-icon-one.png","1. Planing & Designing", "Constructor explains how you can enjoy high end flooring trends like textured wood and realistic stones with new laminate flooring."],
        ["services-icon-two.png","2. Implementation","Professional construction services from house renovations and remodeling, green building and small scope work, like painting."],
        ["services-icon-three.png","3. Evaluation","Our highly educated staff will make sure that your project will be finished on time and specified budget house & remodeling."],
    ];

    var $service_box = `
        <div class="cont_box">
            <div class="img_space">
                <div class="img_box">
                    <div class="img_dot"></div>
                </div>
            </div>
            <div class="txt_space">
                <h4>1. Planing & Designing</h4>
                <p>Constructor explains how you can enjoy high end flooring trends like textured wood and realistic stones with new laminate flooring.</p>
                <a href="">Detail More<span>＞</span></a>
            </div>
        </div>    
    `;
    
    for(i = 0; i < service_arr.length; i++){
        $("#service .cont_part").append($service_box);
    }

    $("#service .cont_part .cont_box").each(function(index){
        $(this).find(".img_box").css("background-image","url(./img/"+service_arr[index][0]+")");
        $(this).find(".txt_space h4").text(service_arr[index][1]);
        $(this).find(".txt_space p").text(service_arr[index][2]);
    });


    //------------------
    //Partner JS
    var part_arr = [
        ["dark-logo-1.png","HOME ENERGY"],
        ["dark-logo-2.png","home and comport"],
        ["dark-logo-3.png","space cube"],
        ["dark-logo-4.png","plexxi"],
        ["dark-logo-5.png","the dance studio"],
    ];

    var $part_box = `
        <div class="img_box">
            <a href="">
            <img src="./img/dark-logo-1.png" alt="HOME ENERGY">
            </a>
        </div>
    `;

    for(i = 0; i < part_arr.length; i++){
        $("#partner .wrap").append($part_box);
    }

    $("#partner .wrap .img_box").each(function(index){
		$(this).find("img").attr({"src":"./img/"+part_arr[index][0], "alt":part_arr[index][1]});
	});


    /*팝업창 열기*/
    $("#categories .tab_box .tab_detail a").click(function(){
        var $i = $(this).closest(".tab_detail").index(); //배열데이터의 인덱스번호 추출
        console.log($i); //클릭한 곳의 최초 분기점의 인덱스 번호를 가져온다.
        $(".img_space").css("background-image","url(./img/"+tab_arr[$i][0]+")");
        $(".img_space h3").text(tab_arr[$i][1]);
        
        $(".dark_black").addClass("active");
        $(".pop_up").addClass("active");
        $("body").addClass("active");

        return false;
    });

    $(".dark_black, .pop_up .close").click(function(){
        $(".dark_black").removeClass("active");
        $(".pop_up").removeClass("active");
        $("body").removeClass("active");

    });






});