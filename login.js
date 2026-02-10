document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("login-form");
  const message = document.getElementById("message");

  if (!form || !message) {
    console.error("Login form or message element not found");
    return;
  }

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    message.textContent = "";

    const username = document.getElementById("username")?.value.trim();
    const password = document.getElementById("password")?.value.trim();

    if (!username || !password) {
      message.textContent = "Please enter both username and password";
      return;
    }

    try {
      const res = await fetch("http://localhost:8085/api/v1/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ username, password })
      });

      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(errorText || "Login failed");
      }

      const data = await res.json();

      if (!data.token) {
        throw new Error("Token not received from server");
      }

      // ✅ SAVE LOGIN STATE
      localStorage.setItem("authToken", data.token);
      localStorage.setItem("loggedInUser", JSON.stringify(data.user || {}));
      localStorage.setItem("isLoggedIn", "true");

      // ✅ REDIRECT
      window.location.href = "index.html";

    } catch (err) {
      message.textContent = "Cannot connect to server";
      console.error("Login error:", err.message);
    }
  });
});
