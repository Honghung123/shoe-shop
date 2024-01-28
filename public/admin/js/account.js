const PER_PAGE = 4;

$(".account-item").on("click", viewAccount);
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

async function viewAccount(e) {
  let currentElement = e.target;
  while (!currentElement.classList.contains("account-item")) {
    if (currentElement.classList.contains("btn-custom")) {
      return;
    } else {
      currentElement = currentElement.parentNode;
    }
  }
  const accId = currentElement.getAttribute("data-id");
  const response = await fetch(`/admin/account-get/${accId}`);
  const data = await response.json();
  updateViewAccount(data);
  $("#viewAccount").modal("show");
  // Modify content in modal here
}

function updateViewAccount(data) {
  $("#viewAccount-username").html(data.username);
  $("#viewAccount-id").html(data.id);
  $("#viewAccount-email").html(data.email);
  $("#viewAccount-status").html(data.locked ? "Banned" : "Active");
  $("#viewAccount-address").html(data.address || "No information");
  $("#viewAccount-phone").html(data.phone || "No information");
  $("#viewAccount-role").html(data.role);
  $("#viewAccount-avatar").attr(
    "src",
    data.avatar || "https://bootdey.com/img/Content/avatar/avatar1.png"
  );
}

$(".product-pagination").on("click", changePage);

async function changePage() {
  const page = parseInt(this.getAttribute("data-id"));
  const limit = PER_PAGE;
  if (parseInt(page) > 0) {
    const response = await fetch(`/admin/account?page=${page}&limit=${limit}`);
    const data = await response.json();
    updateListAccount(data);
  }
}

function updateListAccount(data) {
  const listAccount = document.getElementsByClassName("account-list")[0];
  listAccount.innerHTML = ""; 
  for (let i of data.users) {
    listAccount.appendChild(itemAccount(i));
  }
  $(".ban-account").on("click", banAccount);
  $(".delete-account").on("click", deleteAccount);

  const currentPage = parseInt(data.currentPage);
  const totalPages = data.totalPages; 
  const html = `<button data-id="1" class="prev product-pagination page-numbers" id="first_page"><span class="material-icons-sharp"> first_page
            </span></button>
        <button data-id="${currentPage > 1 ? currentPage - 1 : 1}"
            class="prev product-pagination page-numbers" id="prev_page"><span class="material-icons-sharp"> keyboard_arrow_left
            </span></button>
        <button class="product-pagination-current-page page-numbers no_hover"> 
            <span class="pagination_page" data-id="">Page <b id="current_page">
                    ${currentPage}
                </b> of <b>${totalPages}</b></span>
        </button>
        
        <button data-id="${
          currentPage < totalPages ? currentPage + 1 : totalPages
        }"
            class="next product-pagination page-numbers"><span class="material-icons-sharp" id="next_page"> keyboard_arrow_right
            </span></button>
        <button data-id="${totalPages}" class="next product-pagination page-numbers" id="last_page"><span
                class="material-icons-sharp"> last_page </span></i> </button>`;
  const pagination = $(".pagination")[0];
  pagination.innerHTML = html;
  $(".product-pagination").on("click", changePage);
}

function itemAccount(user) {
  // Tạo một đối tượng tr
  const userRow = document.createElement("tr");
  userRow.classList.add("account-item");
  userRow.setAttribute("data-id", user.id);

  // Gắn HTML vào bên trong thẻ tr
  userRow.innerHTML = `
      <td><span>${user.id}</span></td>
        <td class="flex-start-center column-gap-3 padding-1 mlr-1">
            <div class="thumb">
                <img class="avatar size-35" src="${
                  user.avatar ||
                  "https://bootdey.com/img/Content/avatar/avatar1.png"
                }" alt="">
            </div>
            <div>
                <h5 class="text-start">${user.username}</h5>
            </div>
        </td>
        <td class="position-relative">
            <span class="position-center">${
              user.role == 'admin' ? "Admin" : "Customer"
            }</span>
        </td>
        <td class="position-relative">
            <span class="position-center">${
              user.locked ? "Banned" : "Active"
            }</span>
        </td>
        <td>
            <div class="flex-center-center column-gap-3 flex-wrap-wrap mt-2">
                <button class="btn-custom p-0 delete-account text-danger">
                    <span class="material-icons-sharp deleted" data-bs-toggle="modal" data-bs-target="#deleteAccount" data-id="${
                      user.id
                    }">
                        delete </span>
                </button>
                <button class="btn-custom p-0 ban-account ${
                  user.locked ? "text-success" : "text-danger"
                }">
                    <span class="material-icons-sharp banned" data-bs-toggle="modal" data-bs-target="#banAccount" data-id="${
                      user.id
                    }">
                        block </span>
                </button>
            </div>
      </td>

  `;
  // Gắn sự kiện click cho dòng
  userRow.addEventListener("click", viewAccount);
  return userRow;
}

$("#form-add-account").on("submit", async function (event) {
  event.preventDefault();
  $("#messageAddAccount").removeClass("text-warning text-danger text-success");
  $("#messageAddAccount").addClass("text-warning");
  $("#messageAddAccount")
    .html(`<h5><div class="spinner-border text-secondary" role="status"> 
      </div> Data is being processed, please wait..</h5>`);
  const formData = new FormData(event.target);

  const response = await fetch("/admin/account/add", {
    method: "POST",
    body: formData,
  });
  const data = await response.json();
  $("#messageAddAccount").removeClass("text-warning text-danger text-success");
  if (data.status === "fail") {
    $("#messageAddAccount")
      .addClass("text-danger")
      .html(`<h5>${data.message}</h5>`);
      showToastMessage(data.message, toastData['error']);
    } else {
      $("#messageAddAccount").addClass("text-success").html(`<h5>${data.message}</h5>`); 
      event.target.reset(); 
      $("#addNewUser").modal("hide");
      $("#messageAddAccount").html(``); 
      $(".upload-img").html("");
      showToastMessage(data.message, toastData['success']);
      const curPage = $("#current_page").text();
      const refresh = await fetch(
        `/admin/account?page=${curPage}&limit=${PER_PAGE}`
      );
      const datas = await refresh.json();
      updateListAccount(datas);
  }
  return false;
});

$(".delete-account").on("click", deleteAccount);

function deleteAccount(e) {
  const id = parseInt(e.target.getAttribute("data-id"));
  localStorage.setItem("deleteAccId", id);
  // const editModal = $("#deleteAccount")[0];
  // editModal.addEventListener("show.bs.modal", function (event) {
  //   const modalTitle = editModal.querySelector(".modal-title");
  //   const modalBodyInput = editModal.querySelector(".modal-body input");
  // });
}

$("#btn-delete-account").on("click", async function () {
  const id = localStorage.getItem("deleteAccId");
  console.log(id);
  const response = await fetch(`/admin/account-delete`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ id }),
  });
  if (!response.ok) {
    const data = await response.json();
    console.log(data);
    if (data.message === "Cannot delete admin") {
      showToastMessage("Cannot delete admin", toastData["error"]);
    }
  } else {
    showToastMessage("Deleted");
    const curPage = $("#current_page").text();
    const refresh = await fetch(
      `/admin/account?page=${curPage}&limit=${PER_PAGE}`
    );
    const data = await refresh.json();
    updateListAccount(data);
  }
  localStorage.removeItem("deleteAccId");
});

$(".ban-account").on("click", banAccount); 

async function banAccount(e) {
  const id = parseInt(e.target.getAttribute("data-id"));
  localStorage.setItem("banAccId", id);
  const response = await fetch(`/admin/account-get/${id}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();

  $("#title-ban-model").html(data.locked ? "Unban account" : "Ban account");
  $("#body-ban-model").html(
    data.locked
      ? "Are you sure you want to unban this account?"
      : "Are you sure you want to ban this account?"
  );
  $("#btn-ban-account").html(data.locked ? "Unban" : "Ban");
  $("#btn-ban-account").removeClass("text-danger text-success");
  $("#btn-ban-account").addClass(data.locked ? "btn-danger" : "btn-success");
  // if (data.locked) { 
  //   showToastMessage("Banned this account", toastData['success']);
  // } else {
  //   showToastMessage("Unbanned this account", toastData['success']);
  // }
  // const editModal = $("#banAccount")[0];
  // editModal.addEventListener("show.bs.modal", function (event) {
  //   const modalTitle = editModal.querySelector(".modal-title");
  //   const modalBodyInput = editModal.querySelector(".modal-body input");
  // });
  
}

$("#btn-ban-account").on("click", async function () {
  const id = localStorage.getItem("banAccId");
  const response = await fetch(`/admin/account-ban`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ id }),
  });
  if (!response.ok) {
    const data = await response.json(); 
    showToastMessage(data.message, toastData["error"]);
  } else {
    const curPage = $("span.page-numbers").text();
    const refresh = await fetch(
      `/admin/account?page=${curPage}&limit=${PER_PAGE}`
    );
    const data = await refresh.json();
    updateListAccount(data);
    showToastMessage(`${$("#title-ban-model").html()} successfully!`, toastData["success"]);
  }
  localStorage.removeItem("banAccId");
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
