
(function ($) {
  PER_PAGE_PRODUCT = 6;
  localStorage.removeItem('price');
  localStorage.removeItem('category');
  localStorage.removeItem('brand');
  localStorage.removeItem('sortby');
  localStorage.removeItem('search');

  const categories = document.querySelectorAll('.filter-product-category');
  for (let i of categories) {
    if (i.checked) {
      localStorage.setItem('category', i.value);
    }
  }
  const search = document.getElementById('input-search');
  console.log(search.value);
  if (search.value && search.value !== '') {
    localStorage.setItem('search', search.value);
  }

  $(".hero__categories__all").on("click", function () {
    const a = this.parentNode.querySelector('ul');
    $(a).slideToggle(400);
  });

  $(".brand-dropdown").on("click", function () {
    $(".sidebar__item__brand ul").slideToggle(400);
  });
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

  /*--------------------------
        Select - shopping
    ----------------------------*/
  // $("select").niceSelect();

  $(".product__pagination__link").on('click', changePage);

  async function changePage() {
    const page = this.getAttribute('data-id');
    const limit = PER_PAGE_PRODUCT;
    if (parseInt(page) > 0) {
      const response = await fetch(`/get-product?page=${page}&limit=${limit}`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(postFilter())
      });
      const data = await response.json();
      updateListProduct(data);
    }
  }

  function updateListProduct(data) {
    const listProduct = document.getElementsByClassName('list-product-shopping-page')[0];
    listProduct.innerHTML = '';
    for (let i of data.products) {
      listProduct.appendChild(itemProduct(i));
    }

    
    if (data.totalPages === 0) {
      pagination.innerHTML = 'There is no product that match.';
    } else {
      const currentPage = parseInt(data.currentPage);
      const totalPages = parseInt(data.totalPages);
      const html = `<a data-id="1" style="cursor: context-menu;" class="product__pagination__link"> <i class="fa-solid fa-angles-left"></i></a>                
                <a data-id="${currentPage == 1? 1 : currentPage - 1}" style="cursor: context-menu;" class="product__pagination__link ${currentPage == 1 ? 'disabled' : ''}">
                  <i class="fa-solid fa-angle-left"></i></a>

                <span class="d-inline-block mx-2 fs-5">Page <b id="current_page">${currentPage}</b> of <b>${totalPages}</b></span>

                <a data-id="${currentPage == totalPages ? totalPages : currentPage + 1}" style="cursor: context-menu;" class="product__pagination__link ${currentPage == totalPages ? 'disabled' : ''}"><i class="fa-solid fa-angle-right"></i></a>
                <a data-id="${totalPages}" style="cursor: context-menu;" class="product__pagination__link"><i class="fa-solid fa-angles-right"></i></a>`;
      const pagination = $('.product__pagination')[0];
      pagination.innerHTML = html;
      $(".product__pagination__link").on('click', changePage);
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

  function itemProduct(product) {
    const productElement = document.createElement('div');
    productElement.classList.add('col-lg-4');
    productElement.classList.add('col-md-6');
    productElement.classList.add('col-sm-6');
    productElement.style.userSelect = 'none';
    if (product.isSale) {
      productElement.innerHTML = `
            <div data-id="${product.id}" class="featured__item specific__product ">
              <div class="featured__item__pic">
                <img src="${product.image}" style="${product.cat_name === 'Giày cao gót' ? 'object-position: center bottom;' : ''}" class="image" alt="">
                <ul class="featured__item__pic__hover">
                  <li><span class="add__to__favourite"><i class="fa fa-heart"></i></span></li>
                  <li><span class="add__to__cart"><i class="fa fa-shopping-cart"></i></span></li>
                </ul>
                <div class="product__discount__label">
                  <div class="product__discount__background">
                    <span class="product__discount__percent">${product.percent}</span>
                  </div>
                </div>
              </div>
              <a href="/detail?id=${product.id}" class="featured__item__text p-3">
                <p class="limit-line line-2 mb-2">${product.name}</p>
                <span class="currency color__primary">${product.price * (100 - product.percent) / 100}</span>
                <span class="currency product__discount__oldprice mlr05">${product.price}</span>
              </a>
            </div>
      
      `
    } else {
      productElement.innerHTML = `
          <div data-id="${product.id}" class="featured__item specific__product">
            <div class="featured__item__pic">
              <img src="${product.image}" class="image" style="${product.cat_name === 'Giày cao gót' ? 'object-position: center bottom;' : ''}" alt="">
              <ul class="featured__item__pic__hover">
                <li><span class="add__to__favourite"><i class="fa fa-heart"></i></span></li>
                <li><span class="add__to__cart"><i class="fa fa-shopping-cart"></i></span></li>
              </ul>
            </div>
            <a href="/detail?id=${product.id}" class="featured__item__text p-3">
              <p class="limit-line line-2 mb-2">${product.name}</p>
              <h5 class="currency">${product.price}</h5>
            </a>
          </div>
  
      `
    }
    return productElement;
  };

  $('.filer-product').on('change', onChangeFilter);

  function onChangeFilter(e) {
    let condition = localStorage.getItem(e.target.name);
    if (condition !== null) {
      condition = condition.split(",").map(Number);
      if (e.target.checked) {
        condition.push(e.target.value);
        localStorage.setItem(e.target.name, condition);
      } else {
        let indexToRemove = condition.indexOf(parseInt(e.target.value));

        if (indexToRemove !== -1) {
          condition.splice(indexToRemove, 1);
        }
        localStorage.removeItem(e.target.name);
        if (condition.length > 0) {
          localStorage.setItem(e.target.name, condition);
        }
      }
    } else {
      condition = [];
      condition.push(e.target.value);
      localStorage.setItem(e.target.name, condition);
    }
    getData_Sort_Filter();
  }

  $('.filer-product-price').on('change', onChangeFilterPrice);

  function onChangeFilterPrice(e) {
    let price = localStorage.getItem('price');
    if (price !== null) {
      price = price.split(",").map(Number);
      if (e.target.name === 'price-from') {
        price[0] = e.target.value;
      } else {
        price[1] = e.target.value;
      }
      localStorage.setItem('price', price);
    } else {
      price = [0, 10000000];
      if (e.target.name === 'price-from') {
        price[0] = e.target.value;
      } else {
        price[1] = e.target.value;
      }
      localStorage.setItem('price', price);
    }
    getData_Sort_Filter();
  }

  $('.sort-product').on('change', onChangeSort);

  function onChangeSort(e) {
    localStorage.setItem('sortby', e.target.value);
    getData_Sort_Filter();
  }

  function postFilter() {
    const price = localStorage.getItem('price');
    const brand = localStorage.getItem('brand');
    const category = localStorage.getItem('category');
    const sortby = localStorage.getItem('sortby');
    const search = localStorage.getItem('search');
    const data = {};
    if (price !== null) {
      data.price = price.split(",").map(Number);
    }
    if (brand !== null) {
      data.brand = brand.split(",").map(Number);
    }
    if (category !== null) {
      data.category = category.split(",").map(Number);
    }
    if (sortby !== null) {
      data.sortby = sortby;
    }
    if (search !== null && search !== '') {
      data.search = search;
    }
    return data;
  }

  async function getData_Sort_Filter() {
    const page = 1;
    const limit = PER_PAGE_PRODUCT;
    if (parseInt(page) > 0) {
      const response = await fetch(`/get-product?page=${page}&limit=${limit}`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(postFilter())
      });
      const data = await response.json();
      updateListProduct(data);
    }
  }

})(jQuery);
