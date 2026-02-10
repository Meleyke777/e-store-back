// cart.js
const API_BASE = "http://localhost:8085/api/v1";

document.addEventListener("DOMContentLoaded", () => {
  const cartItemsEl = document.getElementById("cart-items");
  const subtotalEl = document.getElementById("subtotal");
  const totalEl = document.getElementById("total");

  // Sync cart to localStorage for checkout page
  function syncCartToLocalStorage() {
    const rows = Array.from(cartItemsEl.querySelectorAll("tr[data-product-id]"));
    const cartData = rows.map(row => ({
      id: row.dataset.productId,
      name: row.querySelector("span").textContent,
      qty: parseInt(row.querySelector(".qty-span").textContent, 10),
      price: parseFloat(row.querySelector(".price-span").textContent)
    }));

    const subtotal = cartData.reduce((sum, item) => sum + item.price * item.qty, 0);
    localStorage.setItem("cartItems", JSON.stringify(cartData));
    localStorage.setItem("cartSubtotal", subtotal.toFixed(2));
  }

  // Update totals in the UI
  function updateTotals() {
    let subtotal = 0;
    cartItemsEl.querySelectorAll("tr[data-product-id]").forEach(row => {
      const price = parseFloat(row.querySelector(".price-span").textContent) || 0;
      const qty = parseInt(row.querySelector(".qty-span").textContent, 10) || 0;
      const rowTotal = price * qty;
      row.querySelector(".row-total").textContent = `${rowTotal.toFixed(2)} ₼`;
      subtotal += rowTotal;
    });

    subtotalEl.textContent = `${subtotal.toFixed(2)} ₼`;
    totalEl.textContent = `${subtotal.toFixed(2)} ₼`;
    syncCartToLocalStorage();
  }

  // Load cart items from backend
  async function loadCart() {
    const token = localStorage.getItem("authToken");
    if (!token) {
      cartItemsEl.innerHTML = `<tr><td colspan="5" class="text-center py-4 text-red-500">Please log in</td></tr>`;
      return;
    }

    try {
      const res = await fetch(`${API_BASE}/basket`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      const text = await res.text();
      const items = text ? JSON.parse(text) : [];

      if (!Array.isArray(items) || items.length === 0) {
        cartItemsEl.innerHTML = `<tr><td colspan="5" class="text-center py-4 text-gray-500">Cart is empty</td></tr>`;
        updateTotals();
        return;
      }

      cartItemsEl.innerHTML = items.map(item => `
        <tr data-product-id="${item.productId}">
          <td class="py-3 px-4">
            <div class="flex items-center gap-3">
              ${item.imageUrl ? `<img src="${item.imageUrl}" class="w-12 h-12 object-cover rounded" />` : ""}
              <span>${item.brand || "Product"}</span>
            </div>
          </td>
          <td class="py-3 px-4">
            <span class="price-span">${item.price}</span> ₼
          </td>
          <td class="py-3 px-4">
            <div class="inline-flex items-center gap-2">
              <button class="quantity-btn dec-btn">-</button>
              <span class="qty-span">${item.quantity}</span>
              <button class="quantity-btn inc-btn">+</button>
            </div>
          </td>
          <td class="py-3 px-4 row-total">${(item.price * item.quantity).toFixed(2)} ₼</td>
          <td class="py-3 px-4"><button class="remove-btn text-red-500">Remove</button></td>
        </tr>
      `).join("");

      updateTotals();

    } catch (err) {
      console.error("Load error:", err);
      cartItemsEl.innerHTML = `<tr><td colspan="5" class="text-center py-4 text-red-500">Failed to load cart</td></tr>`;
    }
  }

  // Handle increment, decrement, remove
  cartItemsEl.addEventListener("click", async e => {
    const btn = e.target.closest("button");
    if (!btn) return;

    const tr = btn.closest("tr");
    const productId = tr.dataset.productId;
    const qtySpan = tr.querySelector(".qty-span");
    let qty = parseInt(qtySpan.textContent, 10);
    const token = localStorage.getItem("authToken");

    try {
      if (btn.classList.contains("inc-btn")) {
        // Increment backend
        await fetch(`${API_BASE}/basket/${productId}`, {
          method: "POST",
          headers: { 
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ quantity: 1 })
        });
        qtySpan.textContent = qty + 1;

      } else if (btn.classList.contains("dec-btn")) {
        if (qty > 1) {
          await fetch(`${API_BASE}/basket/${productId}/decrement`, {
            method: "POST",
            headers: { Authorization: `Bearer ${token}` }
          }).catch(() => {}); // if backend doesn't support, just update UI
          qtySpan.textContent = qty - 1;
        } else {
          await fetch(`${API_BASE}/basket/${productId}`, { method: "DELETE", headers: { Authorization: `Bearer ${token}` } });
          tr.remove();
        }

      } else if (btn.classList.contains("remove-btn")) {
        await fetch(`${API_BASE}/basket/${productId}`, { method: "DELETE", headers: { Authorization: `Bearer ${token}` } });
        tr.remove();
      }

      updateTotals();
    } catch (err) {
      console.error(err);
      alert("Action failed ❌");
    }
  });

  loadCart();
});

