const emailLogin = $('.email-input');
const passwordLogin = $('.input.password');
const usernameRegister = $('.username-register');
const passwordRegister = $('.password-register');
const fullnameRegister = $('.fullname-register');
const emailRegister = $('.email-register');

emailLogin.blur(() => {
    const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    if (!emailLogin.val().match(emailRegex)) {
        $('.email-error').text('Invalid email');
    }
    else if (emailLogin.val().length < 12) {
        $('.email-error').text('Email must be more than 12 characters');
    }
    else {
        $('.email-error').text('');
    }
})

emailLogin.click(() => {
    $('.email-error').text('');
})

passwordLogin.blur(() => {
    if (passwordLogin.val() === '') {
        $('.password-error').text('Invalid password');
    }
    else if (passwordLogin.val().length < 4) {
        $('.password-error').text('Password must be more than 4 characters');
    }
    else {
        $('.password-error').text('');
    }
})

passwordLogin.click(() => {
    $('.password-error').text('');
})

usernameRegister.blur((e) => {
    const nameRegex = /^[a-zA-Z0-9]+$/;
    e.preventDefault();
    $.ajax({
        url: `http://localhost:3000/register/validate-field`,
        type: 'POST',
        dataType: 'json',
        data: JSON.stringify({ username: usernameRegister.val() }),
        contentType: 'application/json'
    }).done((response) => {
        if (response)
            $('.username-register-error').text('');
    })
        .catch((error) => {
            if (error)
                $('.username-register-error').text('Username already in use');
            else
                $('.username-register-error').text('');

        })
    if (!usernameRegister.val().match(nameRegex) || usernameRegister.val() === '') {
        $('.username-register-error').text('Invalid username');
    }
    else if (usernameRegister.val().length < 4) {
        $('.username-register-error').text('Username must be more than 4 characters');
    }
    else {
        $('.username-register-error').text('');
    }
})

usernameRegister.click(() => {
    $('.username-register-error').text('');
})

emailRegister.blur(async () => {
    const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    $.ajax({
        url: `http://localhost:3000/register/validate-field`,
        type: 'POST',
        dataType: 'json',
        contentType: 'application/json',
        data: JSON.stringify({ email: emailRegister.val() }),
    }).done(function (response) {
        // console.log(response);
        if (response)
            $('.email-register-error').text('');

    }).catch((error) => {
            if (error)
                $('.email-register-error').text('Email already in use');
            else
                $('.email-register-error').text('');    
        })
    // const data = await response.json();
    // console.log(data);
    if (!emailRegister.val().match(emailRegex) || emailRegister.val() === '') {
        $('.email-register-error').text('Invalid email');
    }
    else if (emailRegister.val().length < 12) {
        $('.email-register-error').text('Your email must be at least 12 characters');
    }
    else {
        $('.email-register-error').text('');
    }
})

emailRegister.click(() => {
    $('.email-register-error').text('');
})

passwordRegister.blur(() => {
    if (passwordRegister.val() === '') {
        $('.password-register-error').text('Invalid password');
    }
    else if (passwordRegister.val().length < 4) {
        $('.password-register-error').text('Your password must be at least 4 characters');
    }
    else if (passwordRegister.val().search(/(?=.*[A-Z])/) < 0) {
        $('.password-register-error').text('Your password must contain at least one upper character');
    }
    else if (passwordRegister.val().search(/[0-9]/) < 0) {
        $('.password-register-error').text('Your password must contain at least one number');
    }
    else {
        $('.password-register-error').text('');
    }
})

passwordRegister.click(() => {
    $('.password-register-error').text('');
})

fullnameRegister.blur(() => {
    const fullnameRegex = /^[a-zA-Z0-9!@#\$%\^\&*\)\(+=._-]+$/g;
    if (fullnameRegister.val() === '') {
        $('.fullname-register-error').text('Invalid fullname');
    }
    else if (fullnameRegister.val().match(fullnameRegex)) {
        $('.fullname-register-error').text('There must not be special characters in fullname');
    }
    else {
        $('.fullname-register-error').text('');
    }
})

fullnameRegister.click(() => {
    $('.fullname-register-error').text('');
})
