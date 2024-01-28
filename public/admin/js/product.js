/*-----------------------------
        Toast message
    -------------------------------*/
const toastData = {
  success: {
    icon: "done",
    bg_color: "green",
  },
  warning: {
    icon: "warning",
    bg_color: "yellow",
  },
  info: {
    icon: "info",
    bg_color: "blue",
  },
  error: {
    icon: "close",
    bg_color: "red",
  },
};

const PER_PAGE = 5;
$(".product-item").on("click", viewProductDetails);
async function viewProductDetails(e) {
  let currentElement = e.target;
  if (!currentElement.classList.contains("btn-custom")) {
    while (!currentElement.classList.contains("product-item")) {
      currentElement = currentElement.parentNode;
    }
    const productId = currentElement.getAttribute("data-id");
    const res = await fetch(`http://localhost:3000/products/${productId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    const { images, product, stocks } = data;
    if (res.status !== 200) {
      showToastMessage(data.message, toastData["error"]);
    } else {
      updateProductDetails(data);
    }

    $("#viewProduct").modal("show");
    // Modify content in modal here
  }
}
const stockItem = (stock) => {
  const stockElement = document.createElement("div");
  stockElement.classList.add("stockElement");
  stockElement.innerHTML = `
  <div class="product-size-stock-item">
  <p>Size: <b>${stock.size.size}</b> - Qty: <b>${stock.quantity}</b></p></div>
  `;
  return stockElement;
};
async function changePage() {
  const page = this.getAttribute("data-id");
  const limit = PER_PAGE;
  if (parseInt(page) > 0) {
    const res = await fetch(`/admin/product?page=${page}&limit=${limit}`);
    const data = await res.json();
    updateProductList(data);
  }
}
$(".product-pagination").on("click", changePage);

const updateGallery = (images) => {
  const slides = images.map((image, idx) => {
    return `<img src=${image} class="thumbnail-item" alt="Product Image" onClick="currentSlide(${idx})">`;
  });
  console.log(slides);
  const gallerySlider = document.getElementsByClassName("gallery-slider")[0];
  gallerySlider.innerHTML =
    `
  <div class="gallery-preview">
      <img src=${images[0]}>
      <span class="gallery-prev" onclick="plusSlides(-1)">&#10094;</span>
      <span class="gallery-next" onclick="plusSlides(1)">&#10095;</span>
  </div>  
  ` + slides.join("");
};
const updateStockList = (stocks) => {
  const stockView = document.getElementsByClassName("size-stock-view")[0];
  stockView.innerHTML = "";
  for (let stock of stocks) {
    stockView.appendChild(stockItem(stock));
  }
};
const updateProductDetails = (data) => {
  const { product, stocks, images } = data;
  const links = [];
  for (let image of images) {
    links.push(image.image);
  }
  updateGallery(links);
  $("#viewProduct .product-title").text(product.name);
  $("#viewProduct .product-price span").text(product.price);
  $("#viewProduct .product-brand span").text(product.brand.brand_name);
  $("#viewProduct .product-category span").text(product.category.name);
  // $('#viewProduct .product-title').text(product.name)
  updateStockList(stocks);
  $("#viewProduct .product-description span").text(product.description);
};
const productItem = (product) => {
  const productRow = document.createElement("tr");
  productRow.classList.add("product-item");
  productRow.setAttribute("data-id", product.id);
  productRow.innerHTML = `
  <tr class="product-item" data-id=${product.id}>
  <td><span>${product.id}</span></td>
  <td class="flex-center-center column-gap-3 padding-1">
      <div class="thumb">
          <img class="image-custom size-m" src=${product.image} alt="">
      </div>
  </td>
  <td>
      <span class="limit-line line-2 mlr-05">${product.name}</span>
  </td>
  <td>
      <span>${product.category.name}</span>
  </td>
  <td>
      <span class="currency">${product.price}</span>
  </td>
  <td>
      <div class="flex-center-center column-gap-2 flex-wrap-wrap product-action-responsive">
          <button class="btn-custom btn-warning edit-product" data-bs-toggle="modal"
              data-bs-target="#editProduct" data-id=${product.id}>Edit</button>
          <button class="btn-custom btn-danger delete-product" data-bs-toggle="modal"
              data-bs-target="#deleteProduct" data-id=${product.id}>Delete</button>
      </div>
  </td>
  `;
  return productRow;
};
const updateProductList = (data) => {
  const productList = document.getElementsByClassName("product-list")[0];
  productList.innerHTML = "";
  for (let i of data.products) {
    productList.appendChild(productItem(i));
  }
  const pagination = document.getElementsByClassName("pagination")[0];
  pagination.innerHTML = "";

  // Tạo nút Prev
  const prevButton = document.createElement("button");
  prevButton.setAttribute("data-id", data.currentPage - 1);
  prevButton.classList.add("prev", "pagination-account", "page-numbers");
  prevButton.textContent = "Prev";
  prevButton.addEventListener("click", changePage);
  pagination.appendChild(prevButton);

  // Tạo các nút số
  for (let i = 1; i <= data.totalPages; i++) {
    const pageNumberButton = document.createElement(
      i === parseInt(data.currentPage) ? "span" : "button"
    );
    pageNumberButton.setAttribute("data-id", i);
    pageNumberButton.classList.add("page-numbers");

    if (i === parseInt(data.currentPage)) {
      pageNumberButton.classList.add("active");
      pageNumberButton.setAttribute("aria-current", "page");
      pageNumberButton.textContent = i;
    } else {
      pageNumberButton.textContent = i;
    }
    pageNumberButton.addEventListener("click", changePage);
    pagination.appendChild(pageNumberButton);
  }

  // Tạo nút Next
  const nextButton = document.createElement("button");
  nextButton.setAttribute(
    "data-id",
    parseInt(data.currentPage) === data.totalPages
      ? 0
      : parseInt(data.currentPage) + 1
  );
  nextButton.classList.add("next", "pagination-account", "page-numbers");
  nextButton.textContent = "Next";
  nextButton.addEventListener("click", changePage);
  pagination.appendChild(nextButton);

  $(".delete-product").on("click", deleteProduct);
  $(".edit-product").on("click", editProduct);
  $(".product-item").on("click", viewProductDetails);
};
const editProduct = async (e) => {
  const id = parseInt(e.target.getAttribute("data-id"));
  localStorage.setItem("productId", id);
  const res = await fetch(`http://localhost:3000/products/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await res.json();
  if (res.status !== 200) {
    showToastMessage(data.message, toastData["error"]);
  } else {
    const { product, stocks } = data;
    localStorage.setItem("catId", product.cat_id);
    localStorage.setItem("brandId", product.brand_id);
    console.log($("#form-edit-product .product-name"));
    $("#form-edit-product .product-name").val(product.name);
    $("#form-edit-product .product-price").val(product.price);
    $("#form-edit-product .product-description").val(product.description);
    $('select[name="brandId"] option[value="' + product.brand_id + '"]').prop(
      "selected",
      true
    );
    $('select[name="catId"] option[value="' + product.cat_id + '"]').prop(
      "selected",
      true
    );
    // Add size and stock
    for (let stock of stocks) {
      const html = `<div class="product-size-stock-item">
      <input type="hidden" name="sizes" value="${stock.size.id}-${stock.quantity}" class="d-none">
      <p>Size: <b>${stock.size.size}</b> - Qty: <b>${stock.quantity}</b></p>
      <span class="material-icons-sharp" onclick="deleteStock(this)"  title="Delete"> close </span>
      </div>`;
      $("#edit-size-stock-container").append(html);
    }
  }
};

const deleteProduct = (e) => {
  const id = parseInt(e.target.getAttribute("data-id"));
  const editModal = $("#deleteProduct")[0];
  localStorage.setItem("productId", id);
  editModal.addEventListener("show.bs.modal", function (event) {});
};

$(".edit-product").on("click", editProduct);
$(".delete-product").on("click", deleteProduct);

$(".delete-product-btn").on("click", async function (e) {
  const id = localStorage.getItem("productId");
  const res = await fetch(`http://localhost:3000/products/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const { message } = await res.json();
  $("#deleteProduct").modal("hide");
  if (message.length == 0) {
    showToastMessage("Deleted product has id " + id, toastData["success"]);
  } else {
    showToastMessage(message, toastData["error"]);
  }
  const curPage = $("span.page-numbers").text();
  const refresh = await fetch(
    `/admin/product?page=${curPage}&limit=${PER_PAGE}`
  );
  const data = await refresh.json();
  updateProductList(data);
});

// ADD NEW PRODUCT
$(".form-add").on("submit", async function (e) {
  e.preventDefault(); // Prevent the default form submission behavior
  let result = checkAddAnySizeStock();
  if (!result) {
    return false;
  }
  const formData = new FormData(this); // Collect form data
  try {
    const res = await fetch("/products", {
      method: "POST",
      headers: {
        // Add any headers needed (e.g., authorization)
      },
      body: formData,
    });
    const data = await res.json();
    // Hide the modal
    $("#addNewProduct").modal("hide");
    if (res.status === 201) {
      // Product added successfully, you can handle the response if needed
      showToastMessage("Product added successfully", toastData["success"]);
      // Reload or update the product list
      const curPage = $("span.page-numbers").text();
      const refresh = await fetch(
        `/admin/product?page=${curPage}&limit=${PER_PAGE}`
      );
      const updatedData = await refresh.json();
      updateProductList(updatedData);
    } else {
      // Handle error
      showToastMessage(data.message, toastData["error"]);
    }
    this.reset();
    $(".upload-img").html("");
    $("#add-size-stock-container")
      .children(".product-size-stock-item")
      .each(function (e) {
        $(this).remove();
      });
    $(".upload-info-value").text("0");
  } catch (error) {
    // Handle error
    showToastMessage(
      "Error adding product. Please try again.",
      toastData["error"]
    );
  }
});

// UPDATE PRODUCT
$("#form-edit-product").on("submit", async function (e) {
  e.preventDefault();
  let result = checkAddAnySizeStockUpdate();
  if (!result) {
    return false;
  }
  const formData = new FormData(this); // Collect form data
  try {
    const res = await fetch("/products", {
      method: "PUT",
      headers: {
        // Add any headers needed (e.g., authorization)
      },
      body: formData,
    });
    const data = await res.json();
    // Hide the modal
    $("#editProduct").modal("hide");
    if (res.status === 201) {
      // Product added successfully, you can handle the response if needed
      showToastMessage("Product updated successfully", toastData["success"]);
      // Reload or update the product list
      const curPage = $("span.page-numbers").text();
      const refresh = await fetch(
        `/admin/product?page=${curPage}&limit=${PER_PAGE}`
      );
      const updatedData = await refresh.json();
      updateProductList(updatedData);
    } else {
      // Handle error
      showToastMessage(data.message, toastData["error"]);
    }
    this.reset();
    $(".upload-img").html("");
    $("#edit-size-stock-container")
      .children(".product-size-stock-item")
      .each(function (e) {
        $(this).remove();
      });
    $(".upload-info-value").text("0");
  } catch (error) {
    // Handle error
    showToastMessage(
      "Error updating product. Please try again.",
      toastData["error"]
    );
  }
});

// Upload file section
$(".upload-area.area-add").click(function () {
  $("#upload-input").trigger("click");
});
$(".upload-area.area-edit").click(function () {
  $("#upload-input-edit").trigger("click");
});

$("#upload-input").change(uploadAndPreview);
$("#upload-input-edit").change(uploadAndPreview);

function uploadAndPreview(event) {
  if (event.target.files) {
    let filesAmount = event.target.files.length;
    $(".upload-img").html("");
    for (let i = 0; i < filesAmount; i++) {
      let reader = new FileReader();
      const fileName = event.target.files[i].name;
      reader.onload = function (event) {
        let html = `
                    <div class = "uploaded-img" data-index="${i}">
                        <img src = "${event.target.result}">
                        <button type = "button" class = "remove-btn">X</button>
                        <label class="image-title">${fileName}</label>
                    </div>
                `;
        $(".upload-img").append(html);
      };
      reader.readAsDataURL(event.target.files[i]);
    }
    $(".upload-info-value").text(filesAmount);
  }
}

$(window).click(function (event) {
  let isChosen = false;
  let fileIdx = -1;
  if ($(event.target).hasClass("remove-btn")) {
    fileIdx = parseInt($(event.target).parent()[0].getAttribute("data-index"));
    $(event.target).parent().remove();
    isChosen = true;
  } else if ($(event.target).parent().hasClass("remove-btn")) {
    fileIdx = parseInt($(event.target).parent().getAttribute("data-index"));
    $(event.target).parent().parent().remove();
    isChosen = true;
  }
  if (isChosen && fileIdx != -1) {
    const numFiles = parseInt($(".upload-info-value").html());
    $(".upload-info-value").text(numFiles - 1);
    var fileBuffer = new DataTransfer();
    const fileUpload = $("#upload-input")[0];
    for (let i = 0; i < fileUpload.files.length; i++) {
      if (fileIdx !== i) fileBuffer.items.add(fileUpload.files[i]);
    }
    fileUpload.files = fileBuffer.files;
  }
});
// End upload files

// Gallery Slider
let slideIndex = 1;
showSlides(slideIndex);

function plusSlides(n) {
  showSlides((slideIndex += n));
}

function currentSlide(n) {
  showSlides((slideIndex = n));
}

function showSlides(n) {
  let $img_preview = $(".gallery-preview img");
  let thumbs = $(".thumbnail-item");
  if (n > thumbs.length) {
    slideIndex = 1;
  }
  if (n < 1) {
    slideIndex = thumbs.length;
  }
  for (let i = 0; i < thumbs.length; i++) {
    $(thumbs[i]).removeClass("active");
  }
  $(thumbs[slideIndex - 1]).addClass("active");
  $img_preview.attr("src", thumbs[slideIndex - 1].src);
}
// Infinite slide image
setInterval(() => {
  plusSlides(1);
}, 3000);
// End image slider

// Add stock with quantity
$("#addModal-stock-btn").on("click", function (e) {
  $(".error-msg.add_product").html("");
  $(".error-msg.add_product").hide();
  $("#addNewProduct").modal("hide");
  $("#addNewStock").data("id", "#addNewProduct");
  $("#addNewStock").modal("show");
});

$("#editModal-stock-btn").on("click", function (e) {
  $(".error-msg.edit_product").html("");
  $(".error-msg.edit_product").hide();
  $("#editProduct").modal("hide");
  $("#addNewStock").data("id", "#editProduct");
  $("#addNewStock").modal("show");
});

function checkAddAnySizeStock() {
  if (
    $("#add-size-stock-container").children(".product-size-stock-item")
      .length != 0
  ) {
    $(".error-msg.add_product").html("");
    $(".error-msg.add_product").hide();
    return true;
  } else {
    $(".error-msg.add_product").html("Please add at lease one size stock");
    $(".error-msg.add_product").show();
    return false;
  }
}

function checkAddAnySizeStockUpdate() {
  if (
    $("#edit-size-stock-container").children(".product-size-stock-item")
      .length != 0
  ) {
    $(".error-msg.edit_product").html("");
    $(".error-msg.edit_product").hide();
    return true;
  } else {
    $(".error-msg.edit_product").html("Please add at lease one size stock");
    $(".error-msg.edit_product").show();
    return false;
  }
}

$("#form-add-stock").on("submit", function (e) {
  e.preventDefault();
  const who = $("#addNewStock").data("id");
  const isAddCalled = who == "#addNewProduct";
  const sizeId = $("#stock-size").val();
  const name = $("#stock-size option:selected").text();
  const qty = $("#stock-quantity").val();
  const container = isAddCalled
    ? $("#add-size-stock-container")
    : $("#edit-size-stock-container");
  const html = `<div class="product-size-stock-item">
                          <input type="hidden" name="sizes" value="${sizeId}-${qty}" class="d-none">
                          <p>Size: <b>${name}</b> - Qty: <b>${qty}</b></p>
                          <span class="material-icons-sharp" onclick="deleteStock(this)"  title="Delete"> close </span>
                        </div>`;
  container.append(html);
  $("#addNewStock").modal("hide");
  $(who).modal("show");
  return false;
});

function deleteStock(obj) {
  $(obj).parent().remove();
}

// End add stock with quantity

function showToastMessage(message, data) {
  const toast = `<div class="toast-notification slide-in-slide-out">
        <div class="toast-content">
          <div class="toast-icon background-${data.bg_color} wiggle-me">
            <span class="material-icons-sharp"> ${data.icon} </span>
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
