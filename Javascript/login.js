document.getElementById("loginForm").addEventListener("submit", function(event) {
    event.preventDefault(); 
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;
  
    var formData = new FormData();
    formData.append("username", username);
    formData.append("password", password);
  
    fetch("http://172.20.94.28:4100/api/rest/login/teacher", {
      method: "PUT",
      body: formData
    })
    .then(response => response.json())
    .then(data => {
      if (data.error) {
        if (data.error === "Invalid username") {
          document.getElementById("usernameerrorMessage").textContent = "Invalid username";
        } else if (data.error === "successMessage") {
          document.getElementById("passworderrorMessage").textContent = "Invalid password.";
        } else {
          document.getElementById("errorMessage").textContent = data.error;  
        }
      } else {
       document.getElementById("successMessage").textContent = "Login successful, welcome!";
        
        setTimeout(() => window.location.href = "dashboard.html", 9000);  
        localStorage.setItem("token", data.token);
        window.location.href = "dashboard.html";
      }
    })
    .catch(error => {
      console.error("Error:", error);
      document.getElementById("errorMessage").textContent = "Server error";
    });
  });
  
  
  document.getElementById("togglePassword").addEventListener("click", function() {
      var passwordField = document.getElementById("password");
      var icon = document.getElementById("togglePassword");
      if (passwordField.type === "password") {
          passwordField.type = "text";
          icon.classList.remove("fa-eye-slash");
          icon.classList.add("fa-eye");
      } else {
          passwordField.type = "password";
          icon.classList.remove("fa-eye");
          icon.classList.add("fa-eye-slash");
      }
  });