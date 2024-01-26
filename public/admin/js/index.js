const sideMenu = document.querySelector("aside");
const menuBtn = document.getElementById("menu-btn");
const closeBtn = document.getElementById("close-btn");

const darkMode = document.querySelector(".dark-mode");

menuBtn.addEventListener("click", () => {
  sideMenu.style.display = "block";
});

darkMode.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode-variables");
  const darkModeIcon = darkMode.querySelector("span:nth-child(1)");
  if (darkModeIcon.innerHTML == "light_mode") {
    darkModeIcon.innerHTML = "dark_mode";
  } else {
    darkModeIcon.innerHTML = "light_mode";
  }
});
