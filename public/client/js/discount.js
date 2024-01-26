(function ($) {
    const PER_PAGE_DISCOUNT = 4;
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

        const pagination = document.getElementsByClassName('product__pagination')[0];
        pagination.innerHTML = '';

        if (data.totalPages === 0) {
            pagination.innerHTML = 'There is no product that match.';
        } else {
            const prevButton = document.createElement("a");
            prevButton.setAttribute("data-id", parseInt(data.currentPage) - 1);
            prevButton.style.cursor = 'context-menu';
            prevButton.style.marginLeft = '0.39rem';
            prevButton.style.marginRight = '0.39rem';
            prevButton.classList.add("product__pagination__link");
            if (parseInt(data.currentPage) === 1) {
                prevButton.classList.add('disabled');
            }
            prevButton.innerHTML = '<i class="fa-solid fa-long-arrow-left"></i>';
            prevButton.addEventListener('click', changePage);
            pagination.appendChild(prevButton);

            for (let i = 1; i <= data.totalPages; i++) {
                const pageButton = document.createElement("a");
                pageButton.setAttribute("data-id", i);
                pageButton.style.cursor = 'context-menu';
                pageButton.style.marginLeft = '0.39rem';
                pageButton.style.marginRight = '0.39rem';
                pageButton.classList.add("product__pagination__link");
                if (i === parseInt(data.currentPage)) {
                    pageButton.classList.add('active');
                }
                pageButton.innerHTML = i;
                pageButton.addEventListener('click', changePage);
                pagination.appendChild(pageButton);
            }

            const nextButton = document.createElement("a");
            nextButton.setAttribute("data-id", parseInt(data.currentPage) === data.totalPages ? 0 : parseInt(data.currentPage) + 1);
            nextButton.style.cursor = 'context-menu';
            nextButton.style.marginLeft = '0.39rem';
            nextButton.style.marginRight = '0.39rem';
            nextButton.classList.add("product__pagination__link");
            if (parseInt(data.currentPage) === data.totalPages) {
                nextButton.classList.add('disabled');
            }
            nextButton.innerHTML = '<i class="fa-solid fa-long-arrow-right"></i>';
            nextButton.addEventListener('click', changePage);
            pagination.appendChild(nextButton);
        }

        // $(".add__to__favourite").on("click", banAccount);
        // $(".add__to__cart").on("click", deleteAccount);
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