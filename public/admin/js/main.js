  
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
const element = $('.text-typing-animation')[0];
const text = element.innerText;
let startIdx = 0;
let reverseTyping = false;

function typingText() { 
  if (startIdx < text.length && !reverseTyping) {
    element.innerText = text.slice(0, startIdx + 1);
    startIdx++;
  } else if (startIdx >= 0 && reverseTyping) {
    element.innerText = text.slice(0, startIdx);
    startIdx--;
  } else {
    reverseTyping = !reverseTyping;
  }
  const speedVal = 40;
  const typingSpeed = reverseTyping ? speedVal : speedVal*4; // Adjust typing and reversing speed here
  setTimeout(typingText, typingSpeed);
}
typingText();