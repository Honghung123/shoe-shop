
(function ($) {
  /*------------------
        Preloader
    --------------------*/
  $(window).on("load", function () {
    $(".spinner-box").fadeOut();
    $("#preloder").delay(100).fadeOut("slow");
  });

  //Humberger Menu
  $(".humberger__open").on("click", function () {
    $(".humberger__menu__wrapper").addClass("show__humberger__menu__wrapper");
    $(".humberger__menu__overlay").addClass("active");
    $("body").addClass("over_hid");
  });

  $(".humberger__menu__overlay").on("click", function () {
    $(".humberger__menu__wrapper").removeClass(
      "show__humberger__menu__wrapper"
    );
    $(".humberger__menu__overlay").removeClass("active");
    $("body").removeClass("over_hid");
  });

  /*------------------
        Navigation
    --------------------*/
  $(".mobile-menu").slicknav({
    prependTo: "#mobile-menu-wrap",
    allowParentLinks: true,
  });
  $(".account-menu").slicknav({
    prependTo: "#account-menu-wrap",
    allowParentLinks: true,
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
      },
    },
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

  /*-----------------------------
       Add product to cart and database
   -------------------------------*/
  $(".add__to__cart").on('click', async function () {
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


  $('#btn-add-to-cart').on("click", async function () {
    $('#addToCartModal').modal('hide');
    const id = $('#addToCartModal').attr('data-id');
    const size = $('#stock-size-addToCart').val();
    const stock = $('#stock-quantity-addToCart').val();
    const result = await addToCartDatabase(id, size, stock)
    if (result.status) {
      addToCartPreview(result.data);
      showToastMessage("This product is added to the cart", toastData["success"]);
    } else {
      showToastMessage(result.message.message, toastData["error"]);
    }
    // $('.flag-delete').remove();
    // if ($("#shopping__cart__list").children().length == 0) {
    //   $("#shopping__cart__list").append(
    //     `<tr><td colspan="5" class="text-center"><span>There is no product here</span></td></tr>`
    //   );
    // }
  });

  function addToCartPreview(data) {
    const maxSize = 4;
    const $dropdown = $(".header__cart__cart .header__cart__dropdown");
    if ($dropdown.children("li").length == maxSize) {
      $(
        ".header__cart__cart .header__cart__dropdown .header__cart__link:last"
      ).remove();
    }
    const $cart_preview = $(
      ".header__cart__cart .header__cart__dropdown .header__cart__link:first"
    );
    let html = '';
    if (data.isSale) {
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
    } else {
      html = `<li class="header__cart__link">
          <div class="header__cart_product d-flex">
          <div class="w-25 header__cart_product-image"><img src="${data.image}" alt="" class="image"></div>
          <div class="w-75 header__cart_product-info">
          <a href="/detail?id=${data.id}" class="limit-line line-1">${data.name}</a>
          <div class="flex-between-center header__cart_product-detail">
          <span class="currency">${data.price}</span>
          </div>
          </div>
          </div>
          </li>`;
    }
    $(html).insertBefore($cart_preview);
  }
  async function addToCartDatabase(id, size, quantity) {
    const response = await fetch(`/carts`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id, size, quantity })
    });
    const data = await response.json();
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

  /*-----------------------------
        Add product to favorite and database
    -------------------------------*/
  $(".add__to__favourite").on('click', async function () {
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

  /*-----------------------------
       Add product to favorite and database
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
    });
  });

  $(".add__product__cart").each(function () {
    $(this).on("click", async function () {
      let $product = $(this).parent();
      while (!$product.hasClass("shopping__cart__item")) {
        $product = $product.parent();
      }
      $($product).addClass('flag-delete');
      const id = parseInt($product.data("product"));
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
    });
  });

  /*---------------------
        Delete product cart, favorite
    --------------------- */
  $(".delete__product").on("click", async function () {
    const check = $(this).data('check');
    let $product = $(this).parent();
    while (!$product.hasClass("shopping__cart__item")) {
      $product = $product.parent();
    }
    const productId = $($product).data('id');
    const response = await fetch(`/${check === 'cart' ? 'carts' : 'favourite'}/delete`, {
      method: "DELETE",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ productId })
    });
    const data = await response.json();
    console.log(data);
    $product.remove();
    showToastMessage("Deleted product from list!", toastData["success"]);
    if ($("#shopping__cart__list").children().length == 0) {
      $("#shopping__cart__list").append(
        `<tr><td colspan="5" class="text-center"><span>There is no product here</span></td></tr>`
      );
    }
  });

  /*---------------------
      Preview image upload for update account
    --------------------- */
  $("#image__upload").change((event) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      const reader = new FileReader();

      reader.onload = function (e) {
        $("#user-avatar img").attr("src", e.target.result);
      };

      reader.readAsDataURL(file);
    }
  });

  const inputElement = document.getElementById('input-search');

  const handleInputChange = _.debounce(async () => {
    const query = inputElement.value;
    if (query !== '') {
      const response = await fetch(`/search`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query })
      });
      const data = await response.json();
      console.log(data);
    }
  }, 1000);

  inputElement.addEventListener('input', handleInputChange);

  inputElement.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
      event.preventDefault();
      window.location.href = `/shop?search=${inputElement.value}`;
    }
  });

  $('#btn-search').on('click', () => {
    console.log(inputElement.value);
    window.location.href = `/shop?search=${inputElement.value}`;
  })

  $('.cart-icon').on('click', function () {
    const cartIcon = $('.cart-icon').attr('data-isAuthenticated');
    if (cartIcon === 'false') {
      $('#requireLoginModal').modal('show');

    }
  })
  $('.favorite-icon').on('click', function () {
    const cartIcon = $('.favorite-icon').attr('data-isAuthenticated');
    if (cartIcon === 'false') {
      $('#requireLoginModal').modal('show');
    }
  })

  $('#cancel-order-btn-client').on('click', async function (e) {
    const id = $(this).data('id');
    console.log(id);
    const response = await fetch(`/orders/${id}`, {
      method: "PUT",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ orderId: id, status: 'canceled' })
    });
    if (response.ok) {
      showToastMessage("Cancel successfully", toastData["success"]);
      $('#status-order').html('canceled');
      $('#status-order').removeClass('bg-success bg-danger bg-warning bg-primary');
      $('#status-order').addClass('bg-danger');
      $('#btn-order').html('');
    } else {
      showToastMessage("Cancel fail", toastData["error"]);
    }
  })

  $('#confirm-order-btn-client').on('click', async function (e) {
    const id = $(this).data('id');
    console.log(id);
    const response = await fetch(`/orders/${id}`, {
      method: "PUT",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ orderId: id, status: 'completed' })
    });
    if (response.ok) {
      showToastMessage("Received successfully", toastData["success"]);
      $('#status-order').html('received');
      $('#status-order').removeClass('bg-success bg-danger bg-warning bg-primary');
      $('#status-order').addClass('bg-success');
      $('#btn-order').html('');
      $('#completed-status').addClass('completed');
    } else {
      showToastMessage("Received fail", toastData["error"]);
    }
  })
})(jQuery);
