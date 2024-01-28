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
    $('.place-order-btn').on('click', async function(e){
        const senderId = $('input[type="number"][name="senderId"]').val();
        const amount = $('.total-amount').text().split(' ')[0]
        console.log("Amount", amount);
        const receiverId = 1;
        console.log("Sender", senderId, "receiver", receiverId);
        const callbackUrl = 'http://localhost:3000/orders/checkout';
        const cartLines = [];
        $('.shopping__cart__item').each(function () {
            // Get the value of the 'data-product' attribute
            let cartLineId = $(this).data('id');
    
            // Add the product ID to the array
            cartLines.push(cartLineId);
        });
        console.log("Cartline", cartLines);
    
        const res = await fetch('https://localhost:8000/transactions', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({senderId, receiverId, amount, callbackUrl, cartLines})
        })
        const data = await res.json();
        if(!res.ok){
            console.log("Something went wrong");
        
        } else{
            window.location = `https://localhost:8000/payment/process?transactionId=${data.id}&callbackUrl=${callbackUrl}`
        }
    })
})(jQuery);