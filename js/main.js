// Define constants at the top
const navbarElement = document.getElementById("navbar");
const profileFormElement = document.getElementById("profile-form");
const profileDetailsElement = document.getElementById("profile-details");
const linksListElement = document.getElementById("links-list");
const addLinkButton = document.getElementById("add-link-btn");
const linksFormElement = document.getElementById("links-form");

let linkIndex = 0;

// Load the navbar
// fetch("navbar.html")
//   .then((response) => response.text())
//   .then((data) => {
//     navbarElement.innerHTML = data;
//   })
//   .catch((error) => console.error("Error loading navbar:", error));

// Event listener for profile form submission
profileFormElement.addEventListener("submit", function (event) {
  event.preventDefault();
  const profilePicture = document.getElementById("profile-picture").files[0];
  const profile = {
    picture: profilePicture,
    firstName: document.getElementById("first-name").value,
    lastName: document.getElementById("last-name").value,
    email: document.getElementById("email").value,
  };
  localStorage.setItem("profile", JSON.stringify(profile));
  alert("Profile saved!");
});

// Load profile details from localStorage
const profile = JSON.parse(localStorage.getItem("profile"));
if (profile) {
  const profilePicture = document.createElement("img");
  profilePicture.src = URL.createObjectURL(profile.picture);
  profileDetailsElement.appendChild(profilePicture);
  profileDetailsElement.innerHTML += `
    <p>First Name: ${profile.firstName}</p>
    <p>Last Name: ${profile.lastName}</p>
    <p>Email: ${profile.email}</p>
  `;
}

// Load links from localStorage
const links = JSON.parse(localStorage.getItem("links"));
if (links) {
  links.forEach((link) => {
    const linkItem = document.createElement("div");
    linkItem.innerHTML = `
      <p>${link.platform}: <a href="${link.link}" target="_blank">${link.link}</a></p>
    `;
    linksListElement.appendChild(linkItem);
  });
}

// Event listener for adding new links
addLinkButton.addEventListener("click", function () {
  linkIndex++;
  const newLink = document.createElement("div");
  newLink.classList.add("link");
  newLink.innerHTML = `
    <label for="platform-${linkIndex}">Platform</label>
    <select id="platform-${linkIndex}">
      <option value="github">GitHub</option>
      <option value="linkedin">LinkedIn</option>
      <option value="facebook">Facebook</option>
      <option value="youtube">YouTube</option>
      <option value="gitlab">GitLab</option>
    </select>
    <label for="link-${linkIndex}">Link</label>
    <input type="url" id="link-${linkIndex}" required>
    <button type="button" class="remove-link-btn">Remove</button>
  `;
  linksFormElement.appendChild(newLink);

  // Event listener for removing links
  newLink
    .querySelector(".remove-link-btn")
    .addEventListener("click", function () {
      linksFormElement.removeChild(newLink);
    });
});

// Event listener for links form submission
linksFormElement.addEventListener("submit", function (event) {
  event.preventDefault();
  const links = [];
  for (let i = 1; i <= linkIndex; i++) {
    const platform = document.getElementById(`platform-${i}`);
    const link = document.getElementById(`link-${i}`);
    if (platform && link) {
      links.push({
        platform: platform.value,
        link: link.value,
      });
    }
  }
  localStorage.setItem("links", JSON.stringify(links));
  alert("Links saved!");
});
