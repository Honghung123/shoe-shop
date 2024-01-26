$(function () {
  $(window).on("load", function () {
    $(".spinner-box").fadeOut();
    $("#preloader").delay(200).fadeOut("slow");
  });

  $("#menu-btn").on("click", function () {
    const sideMenu = $("aside.my-aside")[0];
    const status = sideMenu.style.display;
    if (status == "block") {
      sideMenu.style.display = "none";
      $(this).children("span").html("menu");
    } else {
      sideMenu.style.display = "block";
      $(this).children("span").html("close");
    }
  });

  const darkMode = document.querySelector(".dark-mode");
  darkMode.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode-variables");
    const darkModeIcon = darkMode.querySelector("span:nth-child(1)");
    if (darkModeIcon.innerHTML == "light_mode") {
      darkModeIcon.innerHTML = "dark_mode";
    } else {
      darkModeIcon.innerHTML = "light_mode";
    }
  });

  // Text typing animation
  $(".text-typing-animation").each(function (e, e) {
    const text = $(e).html(); 
    let startIdx = 0;
    let reverseTyping = false;

    function typingText() {
      if (startIdx < text.length && !reverseTyping) {
        $(e).html(text.slice(0, startIdx + 1));
        startIdx++;
      } else if (startIdx >= 1 && reverseTyping) {
        $(e).html(text.slice(0, startIdx));
        startIdx--;
      } else {
        reverseTyping = !reverseTyping;
      }
      const speedVal = 40;
      const typingSpeed = reverseTyping ? speedVal : speedVal * 4; // Adjust typing and reversing speed here
      setTimeout(typingText, typingSpeed);
    }
    typingText();
  });

});
