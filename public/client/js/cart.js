(function ($) {
    /*-------------------
        Quantity change
    --------------------- */ 
    $('.pro-qty > .qtybtn').on('click', function () {
        let oldValue = $(this).parent().find('input').val(); 
        let newVal = 1;
        if ($(this).hasClass('increase')) {
            newVal = parseInt(oldValue) + 1;
            $(this).parent().find('input').val(newVal);
        } else if (oldValue > 1) {
            newVal = parseInt(oldValue) - 1;
            $(this).parent().find('input').val(newVal);
        }
        let $product = $(this).parent().parent();
        while(!$product.hasClass('shopping__cart__item')) {
            $product = $product.parent();
        } 
        const price = $product[0].querySelector(".shopping__cart__price .currency").innerText;
        const total = newVal*price;
        $product[0].querySelector(".shopping__cart__total .currency").innerText = `${total}`;
    });

    /*---------------------
        Delete product cart
    --------------------- */ 
    $('.delete__product').on('click', function() {
        let $product = $(this).parent();
        while(!$product.hasClass('shopping__cart__item')) {
            $product = $product.parent();
        }
        $product.remove();
        console.log($('#shopping__cart__list').children().length)
        if($('#shopping__cart__list').children().length == 0){
            $('#shopping__cart__list').append(`<tr><td colspan="5" class="text-center"><span>Your cart is empty</span></td></tr>`);
        }
        
    })
})(jQuery);