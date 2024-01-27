// REGISTER Validation
const pincodeRegister = $(".pincode-register");
const repincodeRegister = $(".repincode-register");

pincodeRegister.on("blur", validatePincodeRegister);
function validatePincodeRegister() {
  const nameRegex = /^\d{6}$/;
  const pincode = pincodeRegister.val().trim();
  if (pincode.length == 0) {
    $(".pincode-register-error").text("Pin code must not be empty");
    return false;
  } else if (pincode.length != 6) {
    $(".pincode-register-error").text("Pin code must have exact 6 digits");
    return false;
  } else if (!pincode.match(nameRegex)) {
    $(".pincode-register-error").text("Pin code only contain digits");
    return false;
  } else {
    $(".pincode-register-error").text("");
    return true;
  }
}

pincodeRegister.on("focus", () => {
  $(".pincode-register-error").text("");
});

repincodeRegister.on("blur", validateRepincodeRegister);
function validateRepincodeRegister() {
  const repincodeRegex = /^\d{6}$/;
  const repincode = repincodeRegister.val().trim();
  if (repincode.length == 0) {
    $(".error.repincode-register-error").text("Pin code must not be empty");
    return false;
  } else if (repincode.length != 6) {
    $(".error.repincode-register-error").text("Pin code must have exact 6 digits");
    return false;
  } else if (!repincode.match(repincodeRegex)) {
    $(".error.repincode-register-error").text("Pin code only contain digits");
    return false;
  } else if (repincode != pincodeRegister.val().trim()) {
    $(".error.repincode-register-error").text("Re-Pin code does not match");
    return false;
  } else {
    $(".error.repincode-register-error").text("");
    return true;
  }
}

repincodeRegister.on("focus", () => {
  $(".error.repincode-register-error").text("");
});

$("#form-register").on("submit", function (e) {
  e.preventDefault();
  let result = true;
  result &&= validatePincodeRegister(); 
  result &&= validateRepincodeRegister(); 
  if (result == true) {
    this.submit();
  }
  return false;
});


