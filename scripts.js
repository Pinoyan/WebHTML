function handleLogin(event) {
  event.preventDefault();
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  if (username === "Admin" && password === "administrator") {
    document.getElementById("login-form").classList.add("hidden");
    const popup = document.getElementById("popup");
    popup.style.display = "block";
    setTimeout(() => {
      popup.classList.add("show");
    }, 10);
  } else {
    alert("Invalid credentials");
  }
}

function closePopup() {
  const popup = document.getElementById('popup');
  popup.style.display = 'none'; // Hide the popup
}

function togglePasswordVisibility() {
  const passwordField = document.getElementById("password");
  const passwordIcon = document.getElementById("password-icon");

  if (passwordField.type === "password") {
    passwordField.type = "text";
    passwordIcon.classList.add("hide");
    setTimeout(() => {
      passwordIcon.src = "assets/visibility.svg";
      passwordIcon.classList.remove("hide");
    }, 100);
  } else {
    passwordField.type = "password";
    passwordIcon.classList.add("hide");
    setTimeout(() => {
      passwordIcon.src = "assets/visibility_off.svg";
      passwordIcon.classList.remove("hide");
    }, 100);
  }
}

function saveText() {
  const text = document.getElementById("text-input").value;
  let jsonData;

  try {
    jsonData = JSON.parse(text); // Parse the input text as JSON
  } catch (error) {
    alert("Invalid JSON format: " + error.message);
    return;
  }

  fetch("/save-text", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(jsonData), // Send the JSON object
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.success) {
        alert("Text saved successfully!");
        const popup = document.getElementById("popup");
        popup.classList.remove("show");
        setTimeout(() => {
          popup.style.display = "none";
        }, 500); // match the animation duration
      } else {
        alert("Failed to save text.");
      }
    })
    .catch((error) => console.error("Error:", error));
}
