document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("create-product-form");
  const message = document.getElementById("message");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const product = {
      name: document.getElementById("name").value.trim(),
      price: parseFloat(document.getElementById("price").value),
      description: document.getElementById("description").value.trim(),
      imageUrl: document.getElementById("imageUrl").value.trim(),
      category: document.getElementById("category").value,
      rating: parseFloat(document.getElementById("rating").value || 0)
    };

    try {
      const token = localStorage.getItem("authToken");
      if (!token) {
        message.textContent = "❌ You must be logged in to create a product.";
        message.className = "text-red-500";
        return;
      }

      const res = await fetch("http://localhost:8085/api/v1/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(product)
      });

      if (!res.ok) throw new Error(`Server responded with ${res.status}`);

      message.textContent = "✅ Product created!";
      message.className = "text-green-500";

      form.reset();

      // Notify Shop page to refresh
      localStorage.setItem("refreshShop", Date.now());
      // Go to shop page after success
      window.location.href = "shop.html";
    } catch (err) {
      console.error(err);
      message.textContent = "❌ Failed to create product. Check backend/CORS!";
      message.className = "text-red-500";
    }
  });
});
























