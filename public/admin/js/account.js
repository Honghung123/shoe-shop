$(".account-item").on("click", function (e) {
  let currentElement = e.target;
  while (!currentElement.classList.contains("account-item")) {
    if (currentElement.classList.contains("btn-custom")) {
      return;
    } else {
      currentElement = currentElement.parentNode;
    }
  }
  const accId = currentElement.getAttribute("data-id");
  console.log("Account selected has id " + accId);
  $("#viewAccount").modal("show");
  // Modify content in modal here
});

$(".add-account").on("click", function (e) {
  const id = parseInt(e.target.getAttribute("data-id"));
  console.log("Add account payment for id " + id);
  $("#viewAccount").modal("hide");
  $("#addNewAccount").modal("show");
});

$(".delete-account").on("click", function (e) {
  const id = parseInt(e.target.getAttribute("data-id"));
  const editModal = $("#deleteAccount")[0];
  editModal.addEventListener("show.bs.modal", function (event) {
    const modalTitle = editModal.querySelector(".modal-title");
    const modalBodyInput = editModal.querySelector(".modal-body input");
  });
});

$(".ban-account").on("click", function (e) {
  const id = parseInt(e.target.getAttribute("data-id"));
  const editModal = $("#banAccount")[0];
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

// Upload file section
$(".upload-area").click(function () {
  $("#upload-input").trigger("click");
});

$("#upload-input").change((event) => {
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
});

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
