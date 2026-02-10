const API_BASE = "http://localhost:8085/api/v1";

document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("products-container");
  const sortSelect = document.getElementById("sort-by");
  let allProducts = [];
  let selectedCategory = "all";
  let selectedRating = "all";
  let sortBy = "";

  // Load products from backend
  async function loadProducts() {
    const token = localStorage.getItem("authToken");
    if (!token) {
      container.innerHTML = "<p class='text-red-500'>Please log in to view products.</p>";
      return;
    }

    try {
      const res = await fetch(`${API_BASE}/products`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      const text = await res.text();
      allProducts = text ? JSON.parse(text) : [];
      renderProducts();

    } catch (err) {
      console.error(err);
      container.innerHTML = "<p class='text-red-500'>Failed to load products.</p>";
    }
  }

  function renderProducts() {
    let filtered = [...allProducts];

    if (selectedCategory !== "all") {
      filtered = filtered.filter(p => p.category === selectedCategory);
    }

    if (selectedRating !== "all") {
      filtered = filtered.filter(p => Math.floor(p.rating || 0) >= selectedRating);
    }

    if (sortBy === "price-asc") filtered.sort((a, b) => a.price - b.price);
    else if (sortBy === "price-desc") filtered.sort((a, b) => b.price - a.price);

    container.innerHTML = filtered.length
      ? filtered.map(p => `
        <div class="product-card glass border p-4 rounded">
          ${p.imageUrl ? `<img src="${p.imageUrl}" class="w-full h-48 object-cover rounded mb-3">` : ""}
          <h3 class="font-bold text-lg">${p.name}</h3>
          <p>$${p.price}</p>
          <p>${p.description || ""}</p>
          <p class="text-yellow-400">${"⭐".repeat(Math.floor(p.rating || 0))}</p>
          <button class="add-to-basket mt-3 bg-red-600 text-white px-3 py-2 rounded" data-id="${p.id}">
            Add to basket
          </button>
        </div>
      `).join("")
      : "<p>No products found.</p>";
  }

  // Category click
  document.querySelectorAll(".category-list .filter-item").forEach(item => {
    item.addEventListener("click", () => {
      document.querySelectorAll(".category-list .filter-item").forEach(i => i.classList.remove("active"));
      item.classList.add("active");
      selectedCategory = item.dataset.category;
      renderProducts();
    });
  });

  // Rating click
  document.querySelectorAll(".rate-list .filter-item").forEach(item => {
    item.addEventListener("click", () => {
      document.querySelectorAll(".rate-list .filter-item").forEach(i => i.classList.remove("active"));
      item.classList.add("active");
      selectedRating = item.dataset.rate;
      renderProducts();
    });
  });

  // Sort
  sortSelect.addEventListener("change", e => {
    sortBy = e.target.value;
    renderProducts();
  });

  // Add to basket
  container.addEventListener("click", async e => {
    const btn = e.target.closest(".add-to-basket");
    if (!btn) return;

    const token = localStorage.getItem("authToken");
    if (!token) return alert("Please log in first");

    const productId = Number(btn.dataset.id);

    try {
      const res = await fetch(`${API_BASE}/basket/${productId}`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ productId, quantity: 1 })
      });

      if (!res.ok) throw new Error("Failed to add");

      btn.textContent = "Added";
      btn.disabled = true;

      // Update localStorage cart
      let cart = JSON.parse(localStorage.getItem("cartItems") || "[]");
      const existing = cart.find(i => Number(i.id) === productId);
      if (existing) existing.qty += 1;
      else {
        const product = allProducts.find(p => Number(p.id) === productId);
        if (product) {
          cart.push({ id: productId, qty: 1, price: product.price, name: product.name });
        } else {
          cart.push({ id: productId, qty: 1, price: 0, name: "Product" });
        }
      }
      localStorage.setItem("cartItems", JSON.stringify(cart));

      alert("Added to basket ✅");

    } catch (err) {
      console.error(err);
      alert("Failed to add to basket ❌");
    }
  });

  loadProducts();
});

