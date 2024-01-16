
$(".product-item").on("click", function (e) {
    let currentElement = e.target;
    if (!currentElement.classList.contains("btn-custom")) {
        while (!currentElement.classList.contains("product-item")) {
            currentElement = currentElement.parentNode;
        };
        const productId = currentElement.getAttribute("data-id");
        console.log("Product selected has id " + productId);
        $("#viewProduct").modal("show");
        // Modify content in modal here
    }
})

$(".edit-product").on("click", function (e) {
    const id = parseInt(e.target.getAttribute("data-id"));
    console.log("Edit Product has id " + id);
    const editModal = $('#editProduct')[0];
    editModal.addEventListener('show.bs.modal', function (event) { 
        // If necessary, you could initiate an AJAX request here
        // and then do the updating in a callback.
        //
        // Update the modal's content.
        const modalTitle = editModal.querySelector('.modal-title')
        const modalBodyInput = editModal.querySelector('.modal-body input') 
    })
});

$(".delete-product").on("click", function (e) {
    const id = parseInt(e.target.getAttribute("data-id"));  
    const editModal = $('#deleteProduct')[0];
    editModal.addEventListener('show.bs.modal', function (event) {  
        const modalTitle = editModal.querySelector('.modal-title')
        const modalBodyInput = editModal.querySelector('.modal-body input') 
    })
});

$(".error-msg").each((idx, error) => {
    if($(error).html() != "" ){
        $(error).show();
    }else{
        $(error).hide();
    }
})


// Upload file section 
$(".upload-area").click(function () {
    $('#upload-input').trigger('click');
});

$('#upload-input').change(event => {
    if (event.target.files) { 
        let filesAmount = event.target.files.length;
        $('.upload-img').html(""); 
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
            }
            reader.readAsDataURL(event.target.files[i]);
        }
        $('.upload-info-value').text(filesAmount);
    }
});

$(window).click(function (event) {
    let isChosen = false;
    let fileIdx = -1;
    if ($(event.target).hasClass('remove-btn')) { 
        fileIdx = parseInt($(event.target).parent()[0].getAttribute('data-index'));
        $(event.target).parent().remove();
        isChosen = true;
    } else if ($(event.target).parent().hasClass('remove-btn')) {
        fileIdx = parseInt($(event.target).parent().getAttribute('data-index'));
        $(event.target).parent().parent().remove();
        isChosen = true;
    }
    if(isChosen && fileIdx != -1){
        const numFiles = parseInt($(".upload-info-value").html())
        $('.upload-info-value').text(numFiles - 1);
        var fileBuffer = new DataTransfer();
        const fileUpload = $("#upload-input")[0]; 
        for (let i = 0; i < fileUpload.files.length; i++) { 
            if (fileIdx !== i)
                fileBuffer.items.add(fileUpload.files[i]);
        }
        fileUpload.files = fileBuffer.files;
    }
})
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
  $img_preview.attr('src', thumbs[slideIndex - 1].src);
}
// Infinite slide image
setInterval(() => {
    plusSlides(1);
}, 3000);
// End image slider