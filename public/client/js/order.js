$('#cancel-order-btn-client').on('click', async function (e) {
    const id = $(this).data('id');
    console.log(id);
    // const response = await fetch(`/orders/${}`, {
    //     method: "POST",
    //     headers: {
    //         'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify({  })
    // });
    // const data = await response.json();
    // console.log(data);
})