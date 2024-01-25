'use strict';

(function ($) {
    /*------------------
        Preloader
    --------------------*/
    $(window).on('load', function () {
        $(".spinner-box").fadeOut();
        $("#preloder").delay(100).fadeOut("slow");
    });

    //Humberger Menu
    $(".humberger__open").on('click', function () {
        $(".humberger__menu__wrapper").addClass("show__humberger__menu__wrapper");
        $(".humberger__menu__overlay").addClass("active");
        $("body").addClass("over_hid");
    });

    $(".humberger__menu__overlay").on('click', function () {
        $(".humberger__menu__wrapper").removeClass("show__humberger__menu__wrapper");
        $(".humberger__menu__overlay").removeClass("active");
        $("body").removeClass("over_hid");
    });

    /*------------------
        Navigation
    --------------------*/
    $(".mobile-menu").slicknav({
        prependTo: '#mobile-menu-wrap',
        allowParentLinks: true
    });
    $(".account-menu").slicknav({
        prependTo: '#account-menu-wrap',
        allowParentLinks: true
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

    /*-----------------------------
        Toast message
    -------------------------------*/
    const toastData = {
        success: {
            icon: "fa-solid fa-check",
            bg_color: "green"
        },
        warning: {
            icon: "fa-solid fa-triangle-exclamation",
            bg_color: "yellow"
        },
        info: {
            icon: "fa-solid fa-info",
            bg_color: "blue"
        },
        error: {
            icon: "fa-solid fa-xmark",
            bg_color: "red"
        },
    }

    function showToastMessage(message, data) {
        const toast = `<div class="toast-notification slide-in-slide-out">
        <div class="toast-content">
          <div class="toast-icon background-${data.bg_color} wiggle-me">
            <i class="${data.icon}"></i>
          </div>
          <div class="toast-msg limit-line line-3">${message}</div>
        </div>
        <div class="toast-progress">
          <div class="toast-progress-bar background-${data.bg_color}"></div>
        </div>
      </div>  `;
        const $toast = $(toast);
        $toast.appendTo("#toast__container");
        setTimeout(() => $toast.remove(), 2500);
    } 

    /*-----------------------------
       Add product to cart and database
   -------------------------------*/
    $(".add__to__cart").each(function (e) {
        $(this).on('click', function () {
            let $product = $(this).parent();
            while (!$product.hasClass("specific__product")) {
                $product = $product.parent();
            }
            const id = parseInt($product.data("id"));
            if (addToCartDatabase($product[0], id)) {
                addToCartPreview($product[0], id);
            }
        });
    });

    function addToCartPreview(product, id) {
        const maxSize = 4;
        const $dropdown = $(".header__cart__cart .header__cart__dropdown");
        if ($dropdown.children("li").length == maxSize) {
            $('.header__cart__cart .header__cart__dropdown .header__cart__link:last').remove();
        }
        const $cart_preview = $('.header__cart__cart .header__cart__dropdown .header__cart__link:first');
        let html = `<li class="header__cart__link">
        <div class="header__cart_product d-flex">
        <div class="w-25 header__cart_product-image"><img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT9xkHciuvOBxSg5mQ31LsJiZekGiApBgUFVA&usqp=CAU" alt="" class="image"></div>
        <div class="w-75 header__cart_product-info">
        <a href="details.html" class="limit-line line-1">Added Shoe nike 2023 brand new made in Japan</a>
        <div class="flex-between-center header__cart_product-detail">
        <span class="currency">700000</span>
        </div>
        </div>
        </div>
        </li>`;
        $(html).insertBefore($cart_preview);
        showToastMessage("Added to cart list has id: " + id, toastData["success"]);
    }
    function addToCartDatabase(product, id) {
        return true;
        // showToastMessage("Added to cart list has id: " + id, toastData["success"]);
    }

    /*-----------------------------
        Add product to favourite and database
    -------------------------------*/
    $(".add__to__favourite").each(function () {
        $(this).on('click', function () {
            if ($(this).hasClass("active")) {
                $(this).removeClass("active");
                showToastMessage("Removed from favourite products! ", toastData["info"]);
            } else {
                let $product = $(this).parent();
                while (!$product.hasClass("specific__product")) {
                    $product = $product.parent();
                }
                const id = parseInt($product.data("id"));
                if (addToFavouriteDatabase($product[0], id)) {
                    addToFavouritePreview($product[0], id);
                    $(this).addClass("active");
                    showToastMessage("Added to favourite products: " + id, toastData["success"]);
                }
            }
        });
    });

    function addToFavouritePreview(product, id) {
        const maxSize = 4;
        const $dropdown = $(".header__cart__favourite .header__cart__dropdown");
        if ($dropdown.children("li").length == maxSize) {
            $('.header__cart__favourite .header__cart__dropdown .header__cart__link:last').remove();
        }
        const $cart_preview = $('.header__cart__favourite .header__cart__dropdown .header__cart__link:first');
        let html = `<li class="header__cart__link">
        <div class="header__cart_product d-flex">
        <div class="w-25 header__cart_product-image"><img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT9xkHciuvOBxSg5mQ31LsJiZekGiApBgUFVA&usqp=CAU" alt="" class="image"></div>
        <div class="w-75 header__cart_product-info">
        <a href="details.html" class="limit-line line-1">Added Shoe nike 2023 brand new made in Japan</a>
        <div class="flex-between-center header__cart_product-detail">
        <span class="currency">700000</span>
        </div>
        </div>
        </div>
        </li>`;
        $(html).insertBefore($cart_preview);
    }
    function addToFavouriteDatabase(product, id) {
        return true;
        // showToastMessage("Added to cart list has id: " + id, toastData["success"]);
    }

    /*-----------------------------
       Add product to favourite and database
   -------------------------------*/
    function copyToClipboard(copyText) {
        const tempInput = document.createElement("textarea");
        tempInput.value = copyText;
        document.body.appendChild(tempInput);
        tempInput.select();
        document.execCommand("copy");
        document.body.removeChild(tempInput);
        showToastMessage("Code copied to clipboard!", toastData["success"]);
    }
    $(".coupon__code").each(function () {
        $(this).on("click", function () {
            copyToClipboard(this.textContent);
        })
    });

    $(".add__product__cart").each(function () {
        $(this).on("click", function () {
            let $product = $(this).parent();
            while (!$product.hasClass('shopping__cart__item')) {
                $product = $product.parent();
            }
            $product.remove();
            showToastMessage("Added this product to cart!", toastData["success"]);
            if ($('#shopping__cart__list').children().length == 0) {
                $('#shopping__cart__list').append(`<tr><td colspan="5" class="text-center"><span>There is no product here</span></td></tr>`);
            }
        });
    });

    /*---------------------
        Delete product cart, favourite
    --------------------- */
    $('.delete__product').on('click', function () {
        let $product = $(this).parent();
        while (!$product.hasClass('shopping__cart__item')) {
            $product = $product.parent();
        }
        $product.remove();
        showToastMessage("Deleted product from list!", toastData["success"]);
        if ($('#shopping__cart__list').children().length == 0) {
            $('#shopping__cart__list').append(`<tr><td colspan="5" class="text-center"><span>There is no product here</span></td></tr>`);
        }
    })
})(jQuery);