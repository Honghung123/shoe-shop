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

    $(".add__to__favourite").on("click", function () {
      const cartIcon = $('#cart-icon').attr('data-isAuthenticated');
      if (cartIcon === 'false') {
        $('#requireLoginModal').modal('show');
      } else {
        $('#addToCartModal').modal('show');
      }
    });
    $(".add__to__cart").on("click", function () {
      const cartIcon = $('#cart-icon').attr('data-isAuthenticated');
      if (cartIcon === 'false') {
        $('#requireLoginModal').modal('show');
      } else {
        $('#addToCartModal').modal('show');
      }
    });
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
    console.log(postFilter());
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
