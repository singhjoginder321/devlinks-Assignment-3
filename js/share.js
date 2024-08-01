// Define constants at the top
const navbarElement = document.getElementById("navbar");
const profilePictureElement = document.getElementById("profile-picture");
const profileNameElement = document.getElementById("profile-name");
const profileEmailElement = document.getElementById("profile-email");
const linksListElement = document.getElementById("links-list");

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

  // Set up the share link functionality
  const shareLinkElement = document.getElementById("share-link");
  if (shareLinkElement) {
    shareLinkElement.addEventListener("click", handleShareLinkClick);
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
    linksListElement.appendChild(linkItem);
  });
}

/**
 * Handles the click event for the share link.
 * @param {Event} event - The click event.
 */
function handleShareLinkClick(event) {
  event.preventDefault(); // Prevent default action of the link

  const pageUrl = window.location.href;

  if (navigator.clipboard) {
    navigator.clipboard
      .writeText(pageUrl)
      .then(() => {
        alert("Page URL has been copied to the clipboard!");
      })
      .catch((err) => {
        console.error("Could not copy text: ", err);
      });
  }
}
