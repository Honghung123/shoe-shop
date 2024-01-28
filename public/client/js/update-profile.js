$('.update-profile-btn').on('click', async function(e){
    const formData = new FormData();
    const address = $('#update_address').val();
    formData.append('address', address);
    const phone = $('#update_phone').val();
    formData.append('phone', phone);
    const username = $('#update_username').val();
    formData.append('username', username);
    const selectedFile = $('#image__upload')[0].files[0];
    formData.append('image', selectedFile);
    const userId = $('input[name="userId"]').val();
    console.log("User id", userId);
    const res = await fetch(`/users/${userId}`, {
        method: 'PUT',
        headers: {
            // 'Content-type': 'application/json'
        },
        body: formData
    })
    if(res.ok){
        alert('Profile updated')
        window.location.href = '/update-profile'
    }
    // const data = await res.json();
    // console.log(data);
    
})