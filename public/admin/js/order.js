
$(".order-item").on("click", function (e) {
    let currentElement = e.target;
    while (!currentElement.classList.contains("order-item")) {
        if (currentElement.classList.contains("btn-custom")) {
            return;
        } else {
            currentElement = currentElement.parentNode;
        }
    }
    const productId = currentElement.getAttribute("data-id");
    console.log("Product selected has id " + productId);
    $("#viewOrder").modal("show");
    // Modify content in modal here
})

$(".ship-order span").on("click", function (e) {
    const id = parseInt(e.target.getAttribute("data-id"));
    const shipModal = $('#shipOrder')[0];
    shipModal.addEventListener('show.bs.modal', function (event) {
        const modalTitle = shipModal.querySelector('.modal-title')
        const modalBodyInput = shipModal.querySelector('.modal-body input')
    })
});

$(".delete-order span").on("click", function (e) {
    const id = parseInt(e.target.getAttribute("data-id"));
    const deleteModal = $('#deleteOrder')[0];
    deleteModal.addEventListener('show.bs.modal', function (event) {
        const modalTitle = deleteModal.querySelector('.modal-title')
        const modalBodyInput = deleteModal.querySelector('.modal-body input')
    })
});