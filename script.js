document.addEventListener("DOMContentLoaded", function () {
  const loginForm = document.getElementById("loginForm");
  if (loginForm) {
    loginForm.addEventListener("submit", function (e) {
      e.preventDefault();
      const username = document.getElementById("username").value;
      const password = document.getElementById("password").value;

      // This is a very basic check. In a real application, you'd validate against a backend.
      if (username === "admin" && password === "password") {
        window.location.href = "main.html";
      } else {
        alert("Invalid username or password");
      }
    });
  }
});
