(function($){     
    /*---------------------------------
        Product Details Pic Slider - Details
    ----------------------------------*/
    $(".product__pic__slider").owlCarousel({
        loop: true, 
        items: 4,
        dots: true,
        smartSpeed: 1000,
        autoHeight: false,
        autoplay: true
    });
    /*------------------
        Single Product - Details
    --------------------*/
    $('.product__pic__slider img').on('click', function () {
        var imgurl = $(this).attr('src');
        var bigImg = $('.product__pic__item--large').attr('src');
        if (imgurl != bigImg) {
            $('.product__pic__item--large').attr({
                src: imgurl
            });
        }
    });

    let idx_pro_pic = 0;
    const $pro_pic_list = $(".product__pic__slider img");
    const numPic = $pro_pic_list.length;
    function changeProImg(amount){
        if(idx_pro_pic == amount){
            idx_pro_pic = 0;
        }
        const src = $pro_pic_list[idx_pro_pic].getAttribute("src");  
        $(".product__pic__item--large").attr("src", src);
        idx_pro_pic++;
    }
    setInterval(function () { changeProImg(numPic); }, 4000);

    // Switch tab
    $('.tab__switch').on("click", function () {
        const target = $(this).data("target");
        console.log(target);
        $(".tab-pane.active").removeClass("active");
        $(".tab__switch.active").removeClass("active");
        $(`#${target}`).addClass("active");
        $(this).addClass("active");
    });
})(jQuery);