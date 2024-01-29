(function ($) {
  // LOGIN Validation
  const emailLogin = $(".email-login");
  const passwordLogin = $(".password-login");

  async function checkEmailIsExist(email) {
    try {
      const response = await fetch(
        `https://localhost:3000/login/validate-email`,
        {
          method: "post",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email: email }),
        }
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      return data;
    } catch (err) {
      console.error("Error:", err);
      return {};
    }
  }

  async function checkUsernameIsExist(username) {
    try {
      const response = await fetch(
        `https://localhost:3000/login/validate-username`,
        {
          method: "post",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username: username }),
        }
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      return data;
    } catch (err) {
      console.error("Error:", err);
      return {};
    }
  }

  async function checkEmailAndPass(email, password) {
    try {
      const response = await fetch(
        `https://localhost:3000/login/validate-account`,
        {
          method: "post",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email: email, password: password }),
        }
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      return data;
    } catch (err) {
      console.error("Error:", err);
      return {};
    }
  }

  emailLogin.on("blur", validateEmailLogin);
  async function validateEmailLogin() {
    const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    const email = emailLogin.val().trim();
    if (email.length == 0) {
      $(".error.email-login-error").text("Email must not be empty");
      return false;
    } else if (!email.match(emailRegex)) {
      $(".error.email-login-error").text("Invalid email");
      return false;
    } else {
      const result = await checkEmailIsExist(email);
      if (result.user) {
        $(".error.email-login-error").text("");
        return true;
      } else {
        $(".error.email-login-error").text("Email does not exist!");
        return false;
      }
    }
  }

  emailLogin.on("focus", () => {
    $(".error.email-login-error").text("");
  });

  passwordLogin.on("blur", validatePassLogin);
  function validatePassLogin() {
    const value = passwordLogin.val().trim();
    if (value.length == 0) {
      $(".error.password-login-error").text("Password must not be empty");
      return false;
    } else if (value.length < 4) {
      $(".error.password-login-error").text(
        "Password must be more than 4 characters"
      );
      return false;
    } else {
      $(".error.password-login-error").text("");
      return true;
    }
  }

  passwordLogin.on("focus", () => {
    $(".error.password-login-error").text("");
  });

  $("#form-login").on("submit", async function (e) {
    e.preventDefault();
    let result = true;
    result &&= await validateEmailLogin();
    result &&= validatePassLogin();
    if (result) {
      $("#login-button")
        .html(`<span>Processing...</span><div class="spinner-border text-light" role="status" style="zoom: 0.8;">
</div>`);
      const email = emailLogin.val().trim();
      const pass = passwordLogin.val().trim();
      result = await checkEmailAndPass(email, pass);
      if (result.status) {
        this.submit();
      } else {
        $(".error.password-login-error").text(result.message);
        $("#login-button").html("Login");
      }
    }
    return false;
  });

  // REGISTER Validation
  const usernameRegister = $(".username-register");
  const passwordRegister = $(".password-register");
  const fullnameRegister = $(".fullname-register");
  const emailRegister = $(".email-register");
  const phoneRegister = $(".phone-register");

  usernameRegister.on("blur", validateUsernameRegister);
  async function validateUsernameRegister() {
    const nameRegex = /^[a-zA-Z0-9]+$/;
    const username = usernameRegister.val().trim();
    if (username.length == 0) {
      $(".username-register-error").text("Username must not be empty");
      return false;
    } else if (usernameRegister.val().length < 4) {
      $(".username-register-error").text(
        "Username must be more than 4 characters"
      );
      return false;
    } else if (!usernameRegister.val().match(nameRegex)) {
      $(".username-register-error").text(
        "Username only contain letters and numbers"
      );
      return false;
    } else {
      const result = await checkUsernameIsExist(username);
      if (result.user) {
        $(".username-register-error").text("Username has already existed");
        return false;
      } else {
        $(".username-register-error").text("");
        return true;
      }
    }
  }

  usernameRegister.on("focus", () => {
    $(".username-register-error").text("");
  });

  emailRegister.on("blur", validateEmailRegister);
  async function validateEmailRegister() {
    const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    const email = emailRegister.val().trim();
    if (email.length == 0) {
      $(".error.email-register-error").text("Email must not be empty");
      return false;
    } else if (!email.match(emailRegex)) {
      $(".error.email-register-error").text("Invalid email");
      return false;
    } else {
      const result = await checkEmailIsExist(email);
      console.log(result.user);
      if (result.user) {
        $(".error.email-register-error").text("Email has already existed!");
        return false;
      } else {
        $(".error.email-register-error").text("");
        return true;
      }
    }
  }

  emailRegister.on("focus", () => {
    $(".error.email-register-error").text("");
  });

  passwordRegister.on("blur", validatePassRegister);
  function validatePassRegister() {
    const value = passwordRegister.val().trim();
    if (value.length == 0) {
      $(".error.password-register-error").text("Password must not be empty");
      return false;
    } else if (value.length < 4) {
      $(".error.password-register-error").text(
        "Password must be more than 4 characters"
      );
      return false;
    } else {
      $(".error.password-register-error").text("");
      return true;
    }
  }

  passwordRegister.on("focus", () => {
    $(".error.password-register-error").text("");
  });

  fullnameRegister.on("blur", validateFullnameRegister);
  function validateFullnameRegister() {
    const fullname = fullnameRegister.val().trim();
    const fullnameRegex = /^[a-zA-Z]+(\s[a-zA-Z]+)+$/g;
    if (fullname.length == 0) {
      $(".fullname-register-error").text("Full name must not be empty");
      return false;
    } else if (!fullname.match(fullnameRegex)) {
      $(".fullname-register-error").text(
        "Full name must have at least two words and does not have any special characters or numbers"
      );
      return false;
    } else {
      $(".fullname-register-error").text("");
      return true;
    }
  }

  fullnameRegister.on("focus", () => {
    $(".fullname-register-error").text("");
  });

  $("#form-register").on("submit", async function (e) {
    e.preventDefault();
    let result = true;
    result &&= await validateUsernameRegister();
    result &&= validateFullnameRegister();
    result &&= validatePassRegister(); 
    result &&= await validateEmailRegister();
    if (result) {
      $("#register-button")
        .html(`<span>Processing...</span><div class="spinner-border text-light" role="status" style="zoom: 0.8;">
</div>`);
      this.submit();
    }
    return false;
  });
})(jQuery);
