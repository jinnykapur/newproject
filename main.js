function login() {
	var email = document.getElementById("email").value;
	var password = document.getElementById("password").value;
	var rememberMe = document.getElementById("rememberMe").checked;
  
	// Perform login validation here
	// You can use AJAX to send the login data to the server and process the response
  
	// Example validation (replace with your own logic)
	if (email === "user" && password === "password") {
	  alert("Login successful!");
	  if (rememberMe) {
		// Code to remember user
	  }
	} else {
	  alert("Invalid email or password!");
	}
  }
  
  function register() {
	// Add your registration logic here
	alert("Register button clicked!");
  }
  