(function ($) {
    /*-------------------
        Quantity change
    --------------------- */
    $('.pro-qty > .qtybtn').on('click', async function () {
        let oldValue = $(this).parent().find('input').val();
        let newVal = 1;
        if ($(this).hasClass('increase')) {
            newVal = parseInt(oldValue) + 1;
        } else if (oldValue > 1) {
            newVal = parseInt(oldValue) - 1;
        }
        let $element = $(this).parent();
        while (!$element.hasClass("shopping__cart__item")) {
            $element = $element.parent();
        }
        const cartLineId = $($element).data('id');
        const productId = $($element).data('product');
        const sizeId = $($element).data('size');
        const response = await fetch(`/carts/update`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ newVal, cartLineId, productId, sizeId })
        });
        if (response.ok) {
            $(this).parent().find('input').val(newVal);
            let $product = $(this).parent().parent();
            while (!$product.hasClass('shopping__cart__item')) {
                $product = $product.parent();
            }
            const price = $product[0].querySelector(".shopping__cart__price .currency").innerText;
            const total = newVal * price;
            $product[0].querySelector(".shopping__cart__total .currency").innerText = `${total}`;
        }
    });

    /*---------------------
        Delete product cart
    --------------------- */
    // $('.delete__product').on('click', function() {
    //     let $product = $(this).parent();
    //     while(!$product.hasClass('shopping__cart__item')) {
    //         $product = $product.parent();
    //     }
    //     $product.remove();
    //     console.log('haha');
    //     if($('#shopping__cart__list').children().length == 0){
    //         $('#shopping__cart__list').append(`<tr><td colspan="5" class="text-center"><span>Your cart is empty</span></td></tr>`);
    //     }

    // })
})(jQuery);