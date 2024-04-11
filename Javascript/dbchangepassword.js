document.getElementById("changePasswordForm").addEventListener("submit", function(event) {
    event.preventDefault(); 
    var currentPassword = document.getElementById("currentPassword").value;
    var newPassword = document.getElementById("newPassword").value;
    var confirmNewPassword = document.getElementById("confirmNewPassword").value;

   
    if (newPassword !== confirmNewPassword) {
        document.getElementById("passwordMatchError").textContent = "Passwords do not match";
        return; 
    } else {
        document.getElementById("passwordMatchError").textContent = ""; 
    }

  
    var formData = new FormData();
    formData.append("current_password", currentPassword);
    formData.append("new_password", newPassword);

    
    fetch("http://172.20.94.28:4100/api/rest/change-password", {
        method: "PUT",
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        if (data.error) {
            
            document.getElementById("passwordMatchError").textContent = data.error;
        } else {
            
            alert("Password changed successfully");
        }
    })
    .catch(error => {
        console.error("Error:", error);
        document.getElementById("passwordMatchError").textContent = "Server error";
    });
});



var passwordToggles = document.querySelectorAll('.password-toggle');
passwordToggles.forEach(function(toggle) {
toggle.addEventListener('click', function() {
var passwordField = toggle.parentElement.querySelector('.form-control');
if (passwordField.type === 'password') {
    passwordField.type = 'text';
    toggle.classList.remove('fa-eye-slash');
    toggle.classList.add('fa-eye');
} else {
    passwordField.type = 'password';
    toggle.classList.remove('fa-eye');
    toggle.classList.add('fa-eye-slash');
}
});
});