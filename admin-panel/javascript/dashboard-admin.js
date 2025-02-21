document.addEventListener("DOMContentLoaded", function () {
    const menuToggle = document.getElementById("menu-toggle");
    const sideNavbar = document.getElementById("side-navbar");

    menuToggle.addEventListener("click", function () {
        sideNavbar.classList.toggle("hidden"); // Toggle visibility
        menuToggle.classList.toggle("rotate"); // Rotate icon
    });
});

// Get elements
const profileIcon = document.querySelector(".profile-photo");
const popupContainer = document.getElementById("popup-container");
const logoutButton = document.getElementById("logout-button");

document.addEventListener("DOMContentLoaded", function () {
    const menuToggle = document.getElementById("menu-toggle");
    const menuIcon = menuToggle.querySelector("i");
    const sideNavbar = document.getElementById("side-navbar");

    function toggleMenu() {
        const isHidden = sideNavbar.style.transform === "translateX(-100%)";

        // Sidebar Slide & Bounce Animation
        sideNavbar.style.transform = isHidden ? "translateX(0)" : "translateX(-100%)";
        sideNavbar.style.transition = "transform 0.5s cubic-bezier(0.68, -0.55, 0.27, 1.55)";

        // Icon Animation: Rotate, Flash, Scale
        if (isHidden) {
            menuIcon.style.transform = "rotate(360deg) scale(1.5)";
            menuIcon.style.transition = "transform 0.4s ease-in-out";
            menuIcon.style.color = "#F3BD00";  // Lightbulb Yellow 🟡
            menuIcon.classList.replace("fa-bars", "fa-lightbulb");  // Lightbulb Icon 💡
        } else {
            menuIcon.style.transform = "rotate(-360deg) scale(1)";
            menuIcon.style.color = "#333";  // Default Color
            menuIcon.classList.replace("fa-lightbulb", "fa-bars");  // Back to bars
        }
    }

    menuToggle.addEventListener("click", toggleMenu);
});


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
    window.location.replace("/index.html");
});
