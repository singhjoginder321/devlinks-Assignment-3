// Define constants at the top
const navbarElement = document.getElementById("navbar");
const profilePictureElement = document.getElementById("profile-picture");
const profileNameElement = document.getElementById("profile-name");
const profileEmailElement = document.getElementById("profile-email");
const linksListElement = document.getElementById("links-list");

// Load the navbar
// fetch("navbar-preveiw.html")
//   .then((response) => response.text())
//   .then((data) => {
//     navbarElement.innerHTML = data;
//   })
//   .catch((error) => console.error("Error loading navbar:", error));

// Event listener for DOMContentLoaded
document.addEventListener("DOMContentLoaded", function () {
  // Load profile details from localStorage
  const profile = JSON.parse(localStorage.getItem("profile"));
  if (profile) {
    displayProfile(profile);
  }

  // Load links from localStorage
  const links = JSON.parse(localStorage.getItem("links"));
  if (links) {
    displayLinks(links);
  }
});

/**
 * Displays the profile information on the page.
 * @param {Object} profile - The profile object containing picture, first name, last name, and email.
 */
function displayProfile(profile) {
  if (profile.picture) {
    profilePictureElement.src = profile.picture;
  }
  profileNameElement.textContent = `${profile.firstName} ${profile.lastName}`;
  profileEmailElement.textContent = profile.email;
}

/**
 * Displays the list of links on the page.
 * @param {Array} links - An array of link objects containing platform and link properties.
 */
function displayLinks(links) {
  linksListElement.innerHTML = "";
  links.forEach((link) => {
    const linkItem = document.createElement("li");
    linkItem.innerHTML = `<a href="${
      link.link
    }" class="${link.platform.toLowerCase()}" target="_blank">${
      link.platform
    }</a>`;
    console.log(`Adding link: ${link.platform} - ${link.link}`); // Debugging line
    linksListElement.appendChild(linkItem);
  });
}
