$('.place-order-btn').on('click', async function(e){
    const senderId = $('input[type="number"][name="senderId"]').val();
    const amount = 5000;
    const receiverId = 2;
    const callbackUrl = 'http://localhost:3000/orders/checkout';
    const cartLines = [1,2,3]
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
    // window.location.href = 'https://localhost:8000/payment/process'
})