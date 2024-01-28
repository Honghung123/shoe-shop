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
$(".edit-category").on("click", function (e) {
  // const catName = e.target.querySelector("td:nth-child(3) span").text();
  // console.log(catName);
  const editModal = $("#editCategory")[0];
  editModal.addEventListener("show.bs.modal", function (event) {
    // $(".cat-name-update").val(catName);
  });
});

$(".add-categorys").on("click", async function (e) {
  const result = await validateCategoryName();
  if (!result) {
    return false;
  }
  const name = $(".cat-name-input").val();
  const res = await fetch(`http://localhost:3000/categories`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name }),
  });
  const data = await res.json();
  $("#addNewCategory").modal("hide");
  $(".cat-name-input").val("");
  if (!data.newCategory) {
    showToastMessage("errror", toastData["error"]);
  } else {
    showToastMessage("Added successfully", toastData["success"]);
    const curPage = $("span.page-numbers").text();
    const refresh = await fetch(
      `/admin/category?page=${curPage}&limit=${PER_PAGE}`
    );
    const data = await refresh.json();
    updateCategoryList(data);
  }
});

//Validate category name
$(".cat-name-input").on("blur", validateCategoryName);
async function validateCategoryName(e) {
  const name = $(".cat-name-input").val();
  const res = await fetch(`http://localhost:3000/categories/validate-name`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name }),
  });
  const { message } = await res.json();
  if (message.length != 0) {
    $(".error-msg.add-categorys").text(message);
    return false;
  } else {
    $(".error-msg.add-categorys").text("");
    return true;
  }
}
$(".cat-name-input").on("focus", () => {
  $(".error-msg.add-categorys").text("");
});

$(".edit-cat-name").on("blur", validateCategoryNameUpdate);
async function validateCategoryNameUpdate(e) {
  const name = $(".edit-cat-name").val();
  const res = await fetch(`http://localhost:3000/categories/validate-name`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name }),
  });
  const { message } = await res.json();
  if (message.length != 0) {
    $(".error-msg.update-categorys").text(message);
    return false;
  } else {
    $(".error-msg.update-categorys").text("");
    return true;
  }
}
$(".edit-cat-name").on("focus", () => {
  $(".error-msg.update-categorys").text("");
});

async function changePage() {
  const page = this.getAttribute("data-id");
  const limit = PER_PAGE;
  if (parseInt(page) > 0) {
    const res = await fetch(`/admin/category?page=${page}&limit=${limit}`);
    const data = await res.json();
    updateCategoryList(data);
  }
}

$(".cat-pagination").on("click", changePage);

$(".delete-category").on("click", deleteCat);
function deleteCat(e) {
  const id = parseInt(e.target.getAttribute("data-id"));
  $("#form-delete").attr("data-id", id);
  $("#deleteCategory").modal("show");
} 

function updateCategoryList(data) {
  const listAccount = document.getElementsByClassName("category-list")[0];
  listAccount.innerHTML = "";
  let index = 1;
  for (let i of data.categories) {
    listAccount.appendChild(itemCat(i, index));
    index++;
  }

  $(".edit-category").on("click", editCat);
  $(".delete-category").on("click", deleteCat);

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

const editCat = (e) => {
  const id = parseInt(e.target.getAttribute("data-id"));
  const name = e.target.getAttribute("data-cat-name");
  $(".edit-cat-name").val(name);
  localStorage.setItem("idCatToEdit", id);
  localStorage.setItem("catName", name);
};
$(".edit-category").on("click", editCat);
$(".update-category").on("click", async function (e) {
  const result = await validateCategoryNameUpdate();
  if (!result) {
    return false;
  }
  const id = localStorage.getItem("idCatToEdit");
  const name = $(".edit-cat-name").val();
  const res = await fetch(`http://localhost:3000/categories/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ id, name }),
  });
  const data = await res.json();
  $("#editCategory").modal("hide");
  $(".edit-cat-name").val("");
  if (res.status !== 200) {
    showToastMessage(data.message, toastData["error"]);
  } else {
    showToastMessage("Updated successfully", toastData["success"]);
    const curPage = $("span.page-numbers").text();
    const refresh = await fetch(
      `/admin/category?page=${curPage}&limit=${PER_PAGE}`
    );
    const data = await refresh.json();
    updateCategoryList(data);
  }
  localStorage.removeItem("idCatToUpdate");
  localStorage.removeItem("catName");
});

$("#form-delete").on("submit", async function (e) {
  e.preventDefault();
  const id = parseInt(e.target.getAttribute("data-id")); 
  const res = await fetch(`http://localhost:3000/categories/${id}`, {
    method: "delete",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ id }),
  });
  const data = await res.json();
  $("#deleteCategory").modal("hide");
  if (data.message.length == 0) {
    showToastMessage(`Deleted category has id: ${id}`, toastData["success"]);
    const curPage = $("span.page-numbers").text();
    const refresh = await fetch(
      `/admin/category?page=${curPage}&limit=${PER_PAGE}`
    );
    const data = await refresh.json();
    updateCategoryList(data);
  } else {
    showToastMessage(data.message, toastData["error"]);
  }
});

const itemCat = (category, idx) => {
  // Tạo một đối tượng tr
  const catRow = document.createElement("tr");
  catRow.classList.add("category-item");
  catRow.setAttribute("data-id", category.id);

  // Gắn HTML vào bên trong thẻ tr
  catRow.innerHTML = `
  <td><span>${idx}</span></td>
  <td><span>${category.id}</span></td>
  <td>
      <span>${category.name}</span>
  </td> 
  <td>
      <div class="flex-center-center column-gap-2 flex-wrap-wrap">
          <button class="btn-custom btn-warning edit-category" data-bs-toggle="modal" data-bs-target="#editCategory"
              data-id=${category.id} data-cat-name= '${category.name}'>Edit</button>
          <button class="btn-custom btn-danger delete-category" data-bs-toggle="modal" data-bs-target="#deleteCategory"
              data-id='${category.id}'>Delete</button>
      </div>
  </td>

  `;

  // Gắn sự kiện click cho dòng
  return catRow;
};

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
