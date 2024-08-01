// Define constants at the top
const navbarElement = document.getElementById("navbar");
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
