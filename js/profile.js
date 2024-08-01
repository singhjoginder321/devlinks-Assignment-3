const navbarElement = document.getElementById("navbar");
const profileForm = document.getElementById("profile-form");
const profilePictureInput = document.getElementById("profile-picture");
const firstNameInput = document.getElementById("first-name");
const lastNameInput = document.getElementById("last-name");
const emailInput = document.getElementById("email");

// Load the navbar
// fetch("navbar.html")
//   .then((response) => response.text())
//   .then((data) => {
//     navbarElement.innerHTML = data;
//   })
//   .catch((error) => console.error("Error loading navbar:", error));

// Function to handle profile form submission
function handleProfileFormSubmit(event) {
  event.preventDefault();

  const profilePicture = profilePictureInput.files[0];
  const reader = new FileReader();

  reader.onload = function (event) {
    const profile = {
      picture: event.target.result,
      firstName: firstNameInput.value,
      lastName: lastNameInput.value,
      email: emailInput.value,
    };
    localStorage.setItem("profile", JSON.stringify(profile));
    alert("Profile saved!");
  };

  if (profilePicture) {
    reader.readAsDataURL(profilePicture);
  } else {
    const profile = {
      picture: null,
      firstName: firstNameInput.value,
      lastName: lastNameInput.value,
      email: emailInput.value,
    };
    localStorage.setItem("profile", JSON.stringify(profile));
    alert("Profile saved!");
  }
}

// Add event listener to profile form
profileForm.addEventListener("submit", handleProfileFormSubmit);
