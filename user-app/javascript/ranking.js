function displayRankings() {
    // Local storage se quiz results aur logged-in user ka data nikal rahe hai
    const quizResults = JSON.parse(localStorage.getItem('quizResults')) || [];
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));

    // Debugging ke liye console log kar rahe hai
    console.log("Total Quiz Results:", quizResults);
    console.log("Logged-in User:", loggedInUser);

    // Validate kar rahe hai ki quizResults array hai ya nahi
    if (!Array.isArray(quizResults)) {
        console.error("Quiz results is not an array");
        return;
    }

    // Har user ka highest score nikal rahe hai aur usko sort kar rahe hai
    const sortedResults = quizResults.map(user => {
        const highestScore = user.tests.reduce((max, test) => test.score > max ? test.score : max, 0);
        return { ...user, score: highestScore }; // Highest score ko user object me add kar rahe hai
    }).sort((a, b) => b.score - a.score); // Descending order me sort kar rahe hai

    // DOM elements ko select kar rahe hai
    const firstNameEl = document.getElementById('firstName');
    const firstScoreEl = document.getElementById('first');
    const secondNameEl = document.getElementById('secondName');
    const secondScoreEl = document.getElementById('second');
    const thirdNameEl = document.getElementById('thirdName');
    const thirdScoreEl = document.getElementById('third');
    const otherUsersContainer = document.querySelector('.other-users-container');
    const rankHeading = document.getElementById('rank-heading');
    const rankDescription = document.getElementById('rank');

    // Check kar rahe hai ki required elements exist karte hai ya nahi
    if (!firstNameEl || !firstScoreEl || !otherUsersContainer) {
        console.error("Ranking elements not found in the DOM");
        return;
    }

    // Purane rankings clear kar rahe hai
    otherUsersContainer.innerHTML = '';  

    // Top 3 users ke naam aur scores display kar rahe hai
    if (sortedResults.length > 0) {
        firstNameEl.innerText = sortedResults[0].fullName || 'N/A';
        firstScoreEl.innerText = sortedResults[0].score || 0;
    }

    if (sortedResults.length > 1) {
        secondNameEl.innerText = sortedResults[1].fullName || 'N/A';
        secondScoreEl.innerText = sortedResults[1].score || 0;
    }

    if (sortedResults.length > 2) {
        thirdNameEl.innerText = sortedResults[2].fullName || 'N/A';
        thirdScoreEl.innerText = sortedResults[2].score || 0;
    }

    // Logged-in user ka rank dhoond rahe hai
    if (loggedInUser) {
        const userRank = sortedResults.findIndex(result => result.fullName === loggedInUser.fullName);

        if (userRank !== -1) {
            const userScore = sortedResults[userRank].score;

            // Rank aur score update kar rahe hai
            rankHeading.innerText = `Wow! You Rank #${userRank + 1}`;
            rankDescription.innerText = `You scored ${userScore} points`;
        }
    }

    // Rank 4 ke baad wale users ko display kar rahe hai
    sortedResults.slice(3).forEach((user, index) => {
        if (!user) return;

        const userDiv = document.createElement('div');
        userDiv.className = 'other-user';

        userDiv.innerHTML = `
            <div class="other-user-rank">#${index + 4}</div>
            <div class="other-user-name">${user.fullName || 'Unknown'}</div>
            <div class="other-user-score">${user.score || 0}</div>
        `;

        otherUsersContainer.appendChild(userDiv);
    });

    console.log("Updated Rankings:", sortedResults);
}

// Logout functionality
window.logout = function () {
    localStorage.removeItem('loggedInUser');
    window.location.href = 'index.html';
};

// Profile dropdown toggle
const profilePhoto = document.getElementById('profile-photo');
const popupContainer = document.getElementById('popup-container');

document.addEventListener('click', function (event) {
    if (!profilePhoto.contains(event.target)) {
        profilePhoto.classList.remove('active');
    }
});

// Jab page load ho tab rankings display karo
document.addEventListener('DOMContentLoaded', displayRankings);

// Profile photo click par dropdown toggle karne ka function
document.addEventListener("DOMContentLoaded", function () {
    const profileImg = document.getElementById("profile-photo");
    const popupContainer = document.getElementById("popup-container");

    // Pehle dropdown ko hide karte hai
    popupContainer.style.display = "none";

    // Profile photo click hone par dropdown show/hide karne ka logic
    profileImg.addEventListener("click", function () {
        popupContainer.style.display = popupContainer.style.display === "none" || popupContainer.style.display === "" ? "block" : "none";
    });

    // Agar user bahar click kare to dropdown band ho jaye
    window.addEventListener("click", function (event) {
        if (!profileImg.contains(event.target) && !popupContainer.contains(event.target)) {
            popupContainer.style.display = "none";
        }
    });
});

// Logout function
function logout() {
    localStorage.removeItem("loggedInUser");
    alert("You have successfully logged out.");
    window.location.href = "index.html"; // Login page par redirect karna
}