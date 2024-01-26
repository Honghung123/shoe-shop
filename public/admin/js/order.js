$(".order-item").on("click", async function (e) {
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
  const res = await fetch( `http://localhost:3000/orders/${orderId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  })
  const data = await res.json();
  updateOrderDetailsModal(data)
  $("#viewOrder").modal("show");
  // Modify content in modal here
});
const updateOrderDetailsModal = (data) => {
  const {order, orderLines} = data
  $('#viewOrder .order-title span').text(order.user.username);
  $('#viewOrder .order-email span').text(order.user.email);
  // $('#viewOrder .order-title span').text(order.user.address);
  // $('#viewOrder .order-title span').text(order.user.username);
}

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
