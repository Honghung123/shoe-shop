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

const PER_PAGE = 3;
async function viewOrderDetails(e) {
  let currentElement = e.target;
  while (!currentElement.classList.contains("order-item")) {
    if (currentElement.classList.contains("btn-custom")) {
      return;
    } else {
      currentElement = currentElement.parentNode;
    }
  }
  console.log(currentElement);
  const orderId = currentElement.getAttribute("data-id");
  console.log("Order selected has id " + orderId);
  const res = await fetch(`http://localhost:3000/orders/${orderId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await res.json();
  updateOrderDetailsModal(data);
  $("#viewOrder").modal("show");
}
$(".order-item").on("click", viewOrderDetails);

const updateOrderDetailsModal = (data) => {
  const { order, orderLines } = data;
  $("#viewOrder .order-title span").text(order.user.username);
  $("#viewOrder .order-email span").text(order.user.email);
  updateOrderLines(orderLines);
  $("#viewOrder .total-amount").text(order.total);
  $("#viewOrder .discount-amount").text(0);
  $("#viewOrder .final-amount").text(order.total);
  // $('#viewOrder .order-email address').text(order.user.email);
  // $('#viewOrder .order-title span').text(order.user.address);
  // $('#viewOrder .order-title span').text(order.user.username);
};
const updateOrderLines = (orderLines) => {
  const orderLinesList = document.getElementsByClassName("order-lines")[0];
  orderLinesList.innerHTML = "";
  for (let orderLine of orderLines) {
    orderLinesList.appendChild(orderLineItem(orderLine));
  }
};
const orderLineItem = (orderLine) => {
  const orderLineRow = document.createElement("tr");
  orderLineRow.classList.add("order-line");
  orderLineRow.setAttribute("data-id", orderLine.id);
  orderLineRow.innerHTML = `
  <td><span>1</span></td>
  <td class="flex-center-center column-gap-3 padding-1">
    <div class="thumb">
      <img class="image-custom size-m" src=${orderLine.product.image}
        alt="">
    </div>
  </td>
  <td>
    <span class="limit-line line-3">${orderLine.product.name}</span>
  </td>
  <td>
    <span class="">${orderLine.quantity}</span>
  </td>
  <td>
    <span class="currency">${orderLine.product.price}</span>
  </td>
  <td>
    <span class="currency">${orderLine.total}</span>
  </td>
  `;
  console.log(orderLineRow);
  return orderLineRow;
};
const orderItem = (order) => {
  const orderRow = document.createElement("tr");
  orderRow.classList.add("order-item");
  orderRow.setAttribute("data-id", order.id);
  orderRow.innerHTML = `
  <td><span>${order.id}</span></td>
  <td class="">
      <span>${order.user.username}</span>
  </td>
  <td>
      <span>${order.created_at}</span>
  </td>
  <td class="position-relative">
      <span class="order-status position-center delivering">${order.status}</span>
  </td>
  <td>
      <span class="currency">${order.total}</span>
  </td>
  <td>
      <div class="flex-center-center column-gap-custom flex-wrap-wrap mt-2 update-action-responsive ">
          <button class="btn-custom order-action p-0 ship-order">
              <span class="material-icons-sharp shipping" data-bs-toggle="modal" data-bs-target="#shipOrder"
                  data-id=${order.id}> local_shipping </span>
          </button>
          <button class="btn-custom order-action p-0 cancel-order">
              <span class="material-icons-sharp canceled" data-bs-toggle="modal" data-bs-target="#cancelOrder"
                  data-id=${order.id}> block </span>
          </button>
      </div>
  </td>
  `;

  console.log(orderRow);
  return orderRow;
};
const cancelOrder = (e) => {
  const id = parseInt(e.target.getAttribute("data-id"));
  console.log("Order id", id);
  console.log(e.target);
  localStorage.setItem("orderId", id);
};
$(".cancel-order-btn").on("click", async function (e) {
  const orderId = localStorage.getItem("orderId");
  console.log("Order id for fethc", orderId);
  const res = await fetch(`http://localhost:3000/orders/${orderId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ orderId, status: "canceled" }),
  });
  const data = await res.json();
  $("#cancelOrder").modal("hide");
  if (res.status === 200) {
    showToastMessage("Canceled order", toastData['success'])
    const curPage = $("span.page-numbers").text();
    const refresh = await fetch(
      `/admin/order?page=${curPage}&limit=${PER_PAGE}`
    );
    const data = await refresh.json();
    updateOrderList(data);
  } else {
    showToastMessage(data.message, toastData['error']);
  }
  localStorage.removeItem("orderId");
});
const shipOrder = (e) => {
  const id = parseInt(e.target.getAttribute("data-id"));
  console.log("Order id", id);
  localStorage.setItem("shipOrderId", id);
};
$(".ship-order-btn").on("click", async function (e) {
  const orderId = localStorage.getItem("shipOrderId");
  console.log("Order id for fethc", orderId);
  const res = await fetch(`http://localhost:3000/orders/${orderId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ orderId, status: "delivering" }),
  });
  const data = await res.json();
  $("#shipOrder").modal("hide");
  if (res.status === 200) {
    showToastMessage("Shipped order successfully", toastData['success'])
    const curPage = $("span.page-numbers").text();
    const refresh = await fetch(
      `/admin/order?page=${curPage}&limit=${PER_PAGE}`
    );
    const data = await refresh.json();
    updateOrderList(data);
  } else {
    toastData(data.message, toastData['error']);
  }
  localStorage.removeItem("shipOrderId");
});

function updateOrderList(data) {
  const orderList = document.getElementsByClassName("order-list")[0];
  orderList.innerHTML = "";
  for (let i of data.orders) {
    console.log(i);
    orderList.appendChild(orderItem(i));
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

  $(".ship-order").on("click", shipOrder);
  $(".cancel-order").on("click", cancelOrder);
  $(".order-item").on("click", viewOrderDetails);
}
$(".cancel-order").on("click", cancelOrder);
$(".ship-order").on("click", shipOrder);

async function changePage() {
  const page = this.getAttribute("data-id");
  const limit = PER_PAGE;
  if (parseInt(page) > 0) {
    const res = await fetch(`/admin/order?page=${page}&limit=${limit}`);
    console.log("Page", page);
    const data = await res.json();
    console.log(data);
    updateOrderList(data);
  }
}
$(".order-pagination").on("click", changePage);

$(".ship-order span").on("click", function (e) {
  const id = parseInt(e.target.getAttribute("data-id"));
  const shipModal = $("#shipOrder")[0];
  shipModal.addEventListener("show.bs.modal", function (event) {
    const modalTitle = shipModal.querySelector(".modal-title");
    const modalBodyInput = shipModal.querySelector(".modal-body input");
  });
});

$(".delete-order span").on("click", function (e) {
  const id = parseInt(e.target.getAttribute("data-id"));
  const deleteModal = $("#deleteOrder")[0];
  deleteModal.addEventListener("show.bs.modal", function (event) {
    const modalTitle = deleteModal.querySelector(".modal-title");
    const modalBodyInput = deleteModal.querySelector(".modal-body input");
  });
});

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
