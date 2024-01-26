'use strict';

(function ($) {
    /*-----------------------
        Categories Slider
    ------------------------*/
    $(".categories__slider").owlCarousel({
        loop: true,
        margin: 0,
        items: 5,
        dots: false,
        nav: true,
        navText: ["<span class='fa fa-angle-left'><span/>", "<span class='fa fa-angle-right'><span/>"],
        animateOut: 'fadeOut',
        animateIn: 'fadeIn',
        smartSpeed: 1200,
        autoHeight: true,
        autoplay: true,
        responsive: {
            0: {
                items: 2,
            },

            480: {
                items: 3,
            },

            768: {
                items: 4,
            },

            992: {
                items: 5,
            }
        }
    });


    $('.hero__categories__all').on('click', function () {
        $('.hero__categories ul').slideToggle(400);
    });

    /*--------------------------
        Latest Product Slider
    ----------------------------*/
    $(".latest-product__slider").owlCarousel({
        loop: true,
        margin: 0,
        items: 1,
        dots: false,
        nav: true,
        navText: ["<span class='fa fa-angle-left'><span/>", "<span class='fa fa-angle-right'><span/>"],
        smartSpeed: 1200,
        autoHeight: false,
        autoplay: true
    });

    /*-----------------------------
        Product Discount Slider
    -------------------------------*/
    $(".product__discount__slider").owlCarousel({
        loop: true,
        margin: 0,
        items: 4,
        dots: true,
        smartSpeed: 1200,
        autoHeight: false,
        autoplay: true,
        responsive: {

            320: {
                items: 1,
            },

            480: {
                items: 2,
            },

            768: {
                items: 3,
            },

            992: {
                items: 4,
            }
        }
    });
    
    /*-------------------
        Deal timer with slide image
    --------------------- */
    function makeTimer() {
        let endTime = new Date("29 January 2024 00:00:00 GMT+07:00");
        endTime = (Date.parse(endTime) / 1000);
        let now = new Date();
        now = (Date.parse(now) / 1000);
        let timeLeft = endTime - now;
        let days = Math.floor(timeLeft / 86400);
        let hours = Math.floor((timeLeft - (days * 86400)) / 3600);
        let minutes = Math.floor((timeLeft - (days * 86400) - (hours * 3600)) / 60);
        let seconds = Math.floor((timeLeft - (days * 86400) - (hours * 3600) - (minutes * 60)));
        if (hours < "10") { hours = "0" + hours; }
        if (minutes < "10") { minutes = "0" + minutes; }
        if (seconds < "10") { seconds = "0" + seconds; }
        $("#days").html(days + "<span>Days</span>");
        $("#hours").html(hours + "<span>Hours</span>");
        $("#minutes").html(minutes + "<span>Minutes</span>");
        $("#seconds").html(seconds + "<span>Seconds</span>");
    }
    setInterval(function () { makeTimer(); }, 1000);

    const $dealImages = $(".dealing-list img");
    const numDeal = $dealImages.length;
    let idx = 0;
    function changeDeal(amount){
        if(idx == amount){
            idx = 0;
        }
        const src = $dealImages[idx].getAttribute("src");
        const id = $dealImages[idx].getAttribute("data-id");
        const category = $dealImages[idx].getAttribute("data-category");
        const title = $dealImages[idx].getAttribute("data-title");
        const price = $dealImages[idx].getAttribute("data-price");
        const priceOld = $dealImages[idx].getAttribute("data-price-old");
        $(".dealing-title").text(title);
        $(".dealing-price .currency").text(price);
        $(".dealing-price-old .currency").text(priceOld);
        $(".dealing-image").attr("src", src);
        $(".btn-href-sale-week").attr("href", `/detail?id=${id}`);
        if (category === 'Giày cao gót') {
            $(".dealing-image").css("object-position", "center bottom");;
        } else {
            $(".dealing-image").css("object-position", "");;
        }
        idx++;
    }
    setInterval(function () { changeDeal(numDeal); }, 3000);

})(jQuery);