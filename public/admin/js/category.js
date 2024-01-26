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


const PER_PAGE = 8;
$(".edit-category").on("click", function (e) {
  const id = parseInt(e.target.getAttribute("data-id"));
  console.log("Edit Category has id " + id);
  const editModal = $("#editCategory")[0];
  editModal.addEventListener("show.bs.modal", function (event) {
    // If necessary, you could initiate an AJAX request here
    // and then do the updating in a callback.
    
    // Update the modal's content.
    const modalTitle = editModal.querySelector(".modal-title");
    const modalBodyInput = editModal.querySelector(".modal-body input");
  });
  
});
$('.add-category').on('click', async function(e){
  const name = $('.cat-name').val();
  const res = await fetch(`http://localhost:3000/categories`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({name})
  }); 
  const data = await res.json();
  if(res.status !== 201){
    alert(data.message)
  } else{
    const curPage = $('span.page-numbers').text();
    const refresh = await fetch(`/admin/category?page=${curPage}&limit=${PER_PAGE}`);
    const data = await refresh.json();
    updateCategoryList(data);
    $("#addNewCategory").modal("hide");
    $('.cat-name').val('')
  }
})
//Validate category name
$('.cat-name').on('blur', async function (e) {
  const name = $('.cat-name').val();
  console.log('Cat name input', name);
  const res = await fetch(`http://localhost:3000/categories/validate-name`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({name})
  });
  const {message} = await res.json();
  $('.error-msg').text(message);
  const error = $('.error-msg');
  console.log(error);
  
})
$('.edit-cat-name').on('blur', async function (e) {
  console.log("One blur");
  const name = $('.edit-cat-name').val();
  console.log('Cat name input', name);
  const res = await fetch(`http://localhost:3000/categories/validate-name`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({name})
  });
  console.log("After request");
  const {message} = await res.json();
  console.log(message, "message");
  $('.error-msg').text(message);
  
  
})

async function changePage() {
  const page = this.getAttribute('data-id');
  const limit = PER_PAGE
  if (parseInt(page) > 0) {
    const res = await fetch(`/admin/category?page=${page}&limit=${limit}`);
   
    console.log("Page", page);
    const data = await res.json();
    console.log(data);
    updateCategoryList(data)
  }
};

$('.cat-pagination').on('click', changePage)



$(".delete-category").on("click", function (e) {
  const id = parseInt(e.target.getAttribute("data-id"));
  const editModal = $("#deleteCategory")[0];
  editModal.addEventListener("show.bs.modal", function (event) {
    const modalTitle = editModal.querySelector(".modal-title");
    const modalBodyInput = editModal.querySelector(".modal-body input");
  });
});

function updateCategoryList(data) {
  const listAccount = document.getElementsByClassName('category-list')[0];
  listAccount.innerHTML = '';
  for (let i of data.categories) {
    console.log(i);
    listAccount.appendChild(itemCat(i));
  }
  const pagination = document.getElementsByClassName('pagination')[0];
  pagination.innerHTML = '';

  // Tạo nút Prev
  const prevButton = document.createElement("button");
  prevButton.setAttribute("data-id", data.currentPage - 1);
  prevButton.classList.add("prev", "pagination-account", "page-numbers");
  prevButton.textContent = "Prev";
  prevButton.addEventListener('click', changePage);
  pagination.appendChild(prevButton);

  // Tạo các nút số
  for (let i = 1; i <= data.totalPages; i++) {
    const pageNumberButton = document.createElement(i === parseInt(data.currentPage) ? "span" : "button");
    pageNumberButton.setAttribute("data-id", i);
    pageNumberButton.classList.add("page-numbers");

    if (i === parseInt(data.currentPage)) {
      pageNumberButton.classList.add("active");
      pageNumberButton.setAttribute("aria-current", "page");
      pageNumberButton.textContent = i;
    } else {
      pageNumberButton.textContent = i;
    }
    pageNumberButton.addEventListener('click', changePage);
    pagination.appendChild(pageNumberButton);
  }

  // Tạo nút Next
  const nextButton = document.createElement("button");
  nextButton.setAttribute("data-id", parseInt(data.currentPage) === data.totalPages ? 0 : parseInt(data.currentPage) + 1);
  nextButton.classList.add("next", "pagination-account", "page-numbers");
  nextButton.textContent = "Next";
  nextButton.addEventListener('click', changePage);
  pagination.appendChild(nextButton);

  $(".edit-category").on("click", editCat);
  $(".delete-category").on("click", deleteCat);
}

const editCat = (e) => {
  console.log("Saving to local storage");
  const id = parseInt(e.target.getAttribute("data-id"));
  const name = e.target.getAttribute("data-cat-name")
  $('.edit-cat-name').val(name)
  console.log(e.target);
  localStorage.setItem('idCatToEdit', id);
  localStorage.setItem('catName', name)
}
const deleteCat = (e) => {
  
}
$(".edit-category").on("click", editCat);
$(".delete-category").on("click", deleteCat);
$('.update-category').on('click', async function(e) {
  const id = localStorage.getItem('idCatToEdit');
  const name = $('.edit-cat-name').val();
  
  console.log("Cat name to update", name, id);
  const res = await fetch(`http://localhost:3000/categories/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({id, name})
  })
  const data = await res.json();
  if(res.status !== 200){
    alert(data.message)
  } else{
    const curPage = $('span.page-numbers').text();
    const refresh = await fetch(`/admin/category?page=${curPage}&limit=${PER_PAGE}`);
    const data = await refresh.json();
    
    updateCategoryList(data);
    $("#editCategory").modal("hide");
    $('.edit-cat-name').val('')
  }
  localStorage.removeItem('idCatToUpdate')
  localStorage.removeItem('catName')
  
})
const itemCat = (category) => {
  // Tạo một đối tượng tr
  const catRow = document.createElement("tr");
  catRow.classList.add("category-item");
  catRow.setAttribute("data-id", category.id);

  // Gắn HTML vào bên trong thẻ tr
  catRow.innerHTML = `
  <td><span>${category.id}</span></td>
  <td><span>${category.id}</span></td>
  <td>
      <span>${category.name}</span>
  </td>
  <td>
      <span class="">3</span>
  </td>
  <td>
      <div class="flex-center-center column-gap-2 flex-wrap-wrap">
          <button class="btn-custom btn-warning edit-category" data-bs-toggle="modal" data-bs-target="#editCategory"
              data-id=${category.id} data-cat-name= '${category.name}'>Edit</button>
          <button class="btn-custom btn-danger delete-category" data-bs-toggle="modal" data-bs-target="#deleteCategory"
              data-id='${category.id}'>Delete</button>
      </div>
  </td>

  `

  // Gắn sự kiện click cho dòng
  return catRow;
}




$(".error-msg").each((idx, error) => {
  if ($(error).html() != "") {
    $(error).show();
  } else {
    $(error).hide();
  }
});
