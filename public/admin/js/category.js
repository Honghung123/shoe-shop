// $(".category-item").on("click", function (e) {
//   let currentElement = e.target;
//   if (!currentElement.classList.contains("btn-custom")) {
//     while (!currentElement.classList.contains("category-item")) {
//       currentElement = currentElement.parentNode;
//     }
//     const productId = currentElement.getAttribute("data-id");
//     console.log("Product selected has id " + productId);
//     $("#viewProduct").modal("show");
//     // Modify content in modal here
//   }
// });

$(".edit-category").on("click", function (e) {
  const id = parseInt(e.target.getAttribute("data-id"));
  console.log("Edit Category has id " + id);
  const editModal = $("#editCategory")[0];
  editModal.addEventListener("show.bs.modal", function (event) {
    // If necessary, you could initiate an AJAX request here
    // and then do the updating in a callback.
    //
    // Update the modal's content.
    const modalTitle = editModal.querySelector(".modal-title");
    const modalBodyInput = editModal.querySelector(".modal-body input");
  });
});

$(".delete-category").on("click", function (e) {
  const id = parseInt(e.target.getAttribute("data-id"));
  const editModal = $("#deleteCategory")[0];
  editModal.addEventListener("show.bs.modal", function (event) {
    const modalTitle = editModal.querySelector(".modal-title");
    const modalBodyInput = editModal.querySelector(".modal-body input");
  });
});

$(".error-msg").each((idx, error) => {
  if ($(error).html() != "") {
    $(error).show();
  } else {
    $(error).hide();
  }
});

