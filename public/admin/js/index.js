const sideMenu = document.querySelector("aside");
const menuBtn = document.getElementById("menu-btn");
const closeBtn = document.getElementById("close-btn");

const darkMode = document.querySelector(".dark-mode");

menuBtn.addEventListener("click", () => {
  sideMenu.style.display = "block";
});

// closeBtn.addEventListener('click', () => {
//     sideMenu.style.display = 'none';
// });

darkMode.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode-variables");
  const darkModeIcon = darkMode.querySelector("span:nth-child(1)");
  if (darkModeIcon.innerHTML == "light_mode") {
    darkModeIcon.innerHTML = "dark_mode";
  } else {
    darkModeIcon.innerHTML = "light_mode";
  }
});

Orders.forEach((order) => {
  const tr = document.createElement("tr");
  const trContent = `
        <td>${order.productName}</td>
        <td>${order.productNumber}</td>
        <td>${order.paymentStatus}</td>
        <td><span class="badge ${
          order.status === "Declined"
            ? "bg-gradient-declined"
            : order.status === "Pending"
            ? "bg-gradient-pending"
            : "bg-gradient-success"
        }">${order.status}</span></td>
        <td class="primary">Details</td>
    `;
  tr.innerHTML = trContent;
  // document.querySelector("table tbody").appendChild(tr);
});
