// my-products.js
document.addEventListener("DOMContentLoaded", () => {
  const tableBody = document.getElementById("table-body");
  const token = localStorage.getItem("authToken");
  if (!tableBody || !token) {
    console.error("Missing table element or auth token");
    return;
  }

  async function loadProducts() {
    try {
      const res = await fetch("http://localhost:8085/api/v1/products/my", {
        headers: { Authorization: `Bearer ${token}` },
      });

      const text = await res.text(); // read raw response
      let data;
      try { data = JSON.parse(text); } // parse JSON safely
      catch { throw new Error("Server did not return JSON"); }

      if (!Array.isArray(data)) throw new Error("Invalid products data");

      tableBody.innerHTML = ""; // clear table
      if (!data.length) {
        tableBody.innerHTML = `<tr><td colspan="7" class="text-center py-4 text-gray-500">No products</td></tr>`;
        return;
      }

      data.forEach(p => {
        const tr = document.createElement("tr");
        tr.innerHTML = `
          <td>${p.id || ""}</td>
          <td>${p.brand || ""}</td>
          <td>${p.model || ""}</td>
          <td>${p.category || ""}</td>
          <td><img src="${p.imageUrl || ""}" class="w-12 h-12 rounded"></td>
          <td>${p.price || 0} ₼</td>
          <td>
            <button onclick="deleteProduct(${p.id})" class="bg-red-600 px-2 py-1 text-white rounded">Sil</button>
          </td>
        `;
        tableBody.appendChild(tr);
      });

    } catch (err) {
      console.error("Error loading products:", err);
      tableBody.innerHTML = `<tr><td colspan="7" class="text-center py-4 text-red-500">Failed to load products</td></tr>`;
    }
  }

  window.deleteProduct = async (id) => {
    if (!confirm("Are you sure?")) return;
    try {
      await fetch(`http://localhost:8085/api/v1/products/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      loadProducts();
    } catch { alert("Failed to delete product"); }
  };

  window.editProduct = (id) => {
    localStorage.setItem("editProductId", id);
    window.location.href = "create-product.html";
  };

  loadProducts();
});



