// Get elements
const profileIcon = document.querySelector(".profile-photo");
const popupContainer = document.getElementById("popup-container");
const logoutButton = document.getElementById("logout-button");

// Function to toggle popup
function togglePopup() {
    popupContainer.style.display = popupContainer.style.display === "block" ? "none" : "block";
}

// Show/hide popup when clicking profile icon
profileIcon.addEventListener("click", togglePopup);

// Hide popup when clicking outside of it
document.addEventListener("click", function (event) {
    if (!popupContainer.contains(event.target) && !profileIcon.contains(event.target)) {
        popupContainer.style.display = "none";
    }
});

// Logout function
logoutButton.addEventListener("click", function () {
    localStorage.removeItem("loggedInUser");  // Clear stored login data
    alert("You have been logged out.");

    // Redirect to index.html using window.location.replace()
    window.location.replace("/index.html");
});


document.addEventListener("DOMContentLoaded", function () {
    const menuToggle = document.getElementById("menu-toggle");
    const sideNavbar = document.getElementById("side-navbar");

    menuToggle.addEventListener("click", function () {
        sideNavbar.classList.toggle("active");
    });
});
