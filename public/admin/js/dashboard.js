const sideMenu = document.querySelector("aside");
const menuBtn = document.getElementById("menu-btn");
const closeBtn = document.getElementById("close-btn");


menuBtn.addEventListener("click", () => {
  sideMenu.style.display = "block";
});

// closeBtn.addEventListener('click', () => {
  //     sideMenu.style.display = 'none';
  // });

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

