(function ($) {
    const PER_PAGE_DISCOUNT = 4;

    /*-----------------------------
        Toast message
    -------------------------------*/
    const toastData = {
        success: {
            icon: "fa-solid fa-check",
            bg_color: "green",
        },
        warning: {
            icon: "fa-solid fa-triangle-exclamation",
            bg_color: "yellow",
        },
        info: {
            icon: "fa-solid fa-info",
            bg_color: "blue",
        },
        error: {
            icon: "fa-solid fa-xmark",
            bg_color: "red",
        },
    };

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

    /*-------------------
        Deal timer with slide image
    --------------------- */
    function makeTimer() {
        const currentDate = new Date();
        let endTime = new Date(currentDate);
        endTime.setDate(currentDate.getDate() + 1);
        endTime.setHours(0, 0, 0, 0);
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

    $(".product__pagination__link").on('click', changePage);

    async function changePage() {
        const page = this.getAttribute('data-id');
        const limit = PER_PAGE_DISCOUNT;
        if (parseInt(page) > 0) {
            const response = await fetch(`/get-discount?page=${page}&limit=${limit}`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                }
            });
            const data = await response.json();
            console.log(data);
            updateListProduct(data);
        }
    }

    function updateListProduct(data) {
        const listProduct = document.getElementsByClassName('list-product-sale-page')[0];
        listProduct.innerHTML = '';
        for (let i of data.sales) {
            listProduct.appendChild(itemProduct(i));
        }
        
        
        if (data.totalPages === 0) {
            pagination.innerHTML = 'There is no product that match.';
        } else {
            const currentPage = parseInt(data.currentPage);
            const totalPages = parseInt(data.totalPages);
            const html = `<a data-id="1" style="cursor: context-menu;" class="product__pagination__link"> <i class="fa-solid fa-angles-left"></i></a>                
                <a data-id="${
                  currentPage == 1 ? 1 : currentPage - 1
                }" style="cursor: context-menu;" class="product__pagination__link ${
              currentPage == 1 ? "disabled" : ""
            }">
                  <i class="fa-solid fa-angle-left"></i></a>

                <span class="d-inline-block mx-2 fs-5">Page <b id="current_page">${currentPage}</b> of <b>${totalPages}</b></span>

                <a data-id="${
                  currentPage == totalPages ? totalPages : currentPage + 1
                }" style="cursor: context-menu;" class="product__pagination__link ${
              currentPage == totalPages ? "disabled" : ""
            }"><i class="fa-solid fa-angle-right"></i></a>
                <a data-id="${totalPages}" style="cursor: context-menu;" class="product__pagination__link"><i class="fa-solid fa-angles-right"></i></a>`;
            const pagination = $(".product__pagination")[0];
            pagination.innerHTML = html;
            $(".product__pagination__link").on("click", changePage);
        }

        $(".add__to__favourite").on("click", async function () {
            const cartIcon = $('.cart-icon').attr('data-isAuthenticated');
            if (cartIcon === 'false') {
                $('#requireLoginModal').modal('show');
            } else {
                let $product = $(this).parent();
                while (!$product.hasClass("specific__product")) {
                    $product = $product.parent();
                }
                const id = parseInt($product.data("id"));
                const result = await addToFavoriteDatabase(id)
                if (result.status) {
                    addToFavoritePreview(result.data);
                    showToastMessage("This product is added to favouvite", toastData["success"]);
                } else {
                    showToastMessage(result.message.message, toastData["error"]);
                }
            }
        });
        $(".add__to__cart").on("click", async function () {
            const cartIcon = $('.cart-icon').attr('data-isAuthenticated');
            if (cartIcon === 'false') {
                $('#requireLoginModal').modal('show');
            } else {
                let $product = $(this).parent();
                while (!$product.hasClass("specific__product")) {
                    $product = $product.parent();
                }
                const id = parseInt($product.data("id"));
                const response = await fetch(`/get-product-id`, {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ id })
                });
                const data = await response.json();
                console.log(data);
                const selectContainer = document.getElementById('stock-size-addToCart');
                selectContainer.innerHTML = '';
                selectContainer.value = data[0].size;
                const quantityContainer = document.getElementById('stock-quantity-addToCart');
                quantityContainer.max = data[0].quantity;
                for (let i of data) {
                    const option = document.createElement('option');
                    option.value = i.size;
                    option.text = i.size;
                    option.classList.add('option-size');
                    option.dataset.info = i.quantity;
                    selectContainer.appendChild(option);
                }
                $('#addToCartModal').attr('data-id', id);
                $('#addToCartModal').modal('show');
            }
        });
    }

    async function addToFavoriteDatabase(id) {
        const response = await fetch(`/favourite`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id })
        });
        const data = await response.json();
        console.log(data);
        let result = {};
        if (response.ok) {
            result.status = true;
            result.data = data;
        } else {
            result.status = false;
            result.message = data;
        }
        return result;
    }
    function addToFavoritePreview(data) {
        const maxSize = 4;
        const $dropdown = $(".header__cart__favourite .header__cart__dropdown");
        if ($dropdown.children("li").length == maxSize) {
            $(
                ".header__cart__favorite .header__cart__dropdown .header__cart__link:last"
            ).remove();
        }
        const $cart_preview = $(
            ".header__cart__favorite .header__cart__dropdown .header__cart__link:first"
        );
        let html = '';
        if (data.isSale) {
            html = `<li class="header__cart__link">
            <div class="header__cart_product d-flex">
            <div class="w-25 header__cart_product-image"><img src="${data.image}" alt="" class="image"></div>
            <div class="w-75 header__cart_product-info">
            <a href="detail?id=${data.id}" class="limit-line line-1">${data.name}</a>
            <div class="flex-between-center header__cart_product-detail">
            <span class="currency">${data.price}</span>
            </div>
            </div>
            </div>
            </li>`;
        } else {
            html = `<li class="header__cart__link">
          <div class="header__cart_product d-flex">
          <div class="w-25 header__cart_product-image"><img src="${data.image}" alt="" class="image"></div>
          <div class="w-75 header__cart_product-info">
          <a href="/detail?id=${data.id}" class="limit-line line-1">${data.name}</a>
          <div class="flex-between-center header__cart_product-detail">
          <span class="currency color__primary">${data.price_discount}</span>
          <span class="currency product__discount__oldprice mlr05">${data.price}</span>
          </div>
          </div>
          </div>
          </li>`;
        }
        $(html).insertBefore($cart_preview);
    }

    function itemProduct(e) {
        const productElement = document.createElement('div');
        productElement.classList.add('col', 'col-lg-3', 'col-md-4', 'col-sm-6');
        productElement.style.userSelect = 'none';
        productElement.innerHTML = `
            <div data-id="${e.product.id}" class="featured__item specific__product ">
                <div class="featured__item__pic">
                <img src="${e.product.image}" style="${e.product.cat_name === 'Giày cao gót' ? 'object-position: center bottom;' : ''}" class="image" alt="">
                <ul class="featured__item__pic__hover">
                    <li><span class="add__to__favourite"><i class="fa fa-heart"></i></span></li>
                    <li><span class="add__to__cart"><i class="fa fa-shopping-cart"></i></span></li>
                </ul>
                <div class="product__discount__label">
                    <div class="product__discount__background">
                    <span class="product__discount__percent">${e.percent}</span>
                    </div>
                </div>
                </div>
                <a href="/detail?id=${e.product.id}" class="featured__item__text p-3">
                <p class="limit-line line-2 mb-2">${e.product.name}</p>
                <span class="currency color__primary">${e.product.price_discount}</span>
                <span class="currency product__discount__oldprice mlr05">${e.product.price}</span>
                </a>
            </div>
        
        `
        return productElement;
    };

})(jQuery);