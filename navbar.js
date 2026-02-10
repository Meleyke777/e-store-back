// navbar.js
document.addEventListener("DOMContentLoaded", () => {
  const navbar = document.getElementById("navbar-placeholder");
  if (!navbar) return;

  // Insert HTML
  navbar.innerHTML = `
    <nav class="bg-gray-800 text-white p-4 flex justify-between items-center">
      <a href="index.html" class="font-bold">E-STORE</a>
      <div>
        <a href="shop.html" class="mr-4">Shop</a>
        <a href="cart.html" class="mr-4">Cart</a>
        <a href="my-products.html" class="mr-4">My Products</a>
        <button id="logout-btn" class="bg-red-600 px-2 py-1 rounded">Logout</button>
      </div>
    </nav>
  `;

  const logoutBtn = document.getElementById("logout-btn");
  logoutBtn?.addEventListener("click", () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("editProduct");
    window.location.href = "login.html";
  });

  // Cart count
  let cart = JSON.parse(localStorage.getItem("cart") || "[]");
  const cartIcon = navbar.querySelector("a[href='cart.html']");
  if (cartIcon) {
    cartIcon.innerHTML = `Cart (${cart.length})`;
  }
});

