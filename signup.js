document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("signupForm");
  const message = document.getElementById("message");

  if (!form || !message) {
    console.error("Form or message element missing");
    return;
  }

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const username = document.getElementById("signup-username").value.trim();
    const name = document.getElementById("signup-name").value.trim();
    const surname = document.getElementById("signup-surname").value.trim();
    const email = document.getElementById("signup-email").value.trim();
    const password = document.getElementById("signup-password").value;

    if (!username || !name || !surname || !email || !password) {
      showMessage("All fields are required", "text-red-400");
      return;
    }

    try {
      const res = await fetch("http://localhost:3000/api/v1/users/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username,
          name,
          surname,
          email,
          password
        })
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Signup failed");
      }

      // 🔥 SAVE TOKEN (THIS WAS MISSING)
      localStorage.setItem("token", data.token);

      showMessage("Signup successful! Redirecting...", "text-green-400");

      // ✅ GO STRAIGHT TO PROFILE
      setTimeout(() => {
        window.location.href = "profile.html";
      }, 800);

    } catch (err) {
      console.error("FETCH ERROR:", err);
      showMessage(err.message || "Cannot connect to server", "text-red-400");
    }
  });

  function showMessage(text, className) {
    message.textContent = text;
    message.className = `text-center text-sm ${className}`;
  }
});
