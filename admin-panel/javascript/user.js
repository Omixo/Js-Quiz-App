document.addEventListener("DOMContentLoaded", function () {
    if (window.location.pathname === "/admin-panel/user.html") {
        populateUserTable();
    }
});

function getUsersFromLocalStorage() {
    return JSON.parse(localStorage.getItem("quizResults")) || [];
}

function clearTable(tableBody) {
    if (tableBody) {
        tableBody.innerHTML = "";
    }
}

function createUserRow(user, index) {
    let userName = user.fullName || "N/A";
    let email = user.emailId || "N/A";
    let testsGiven = user.tests ? user.tests.length : 0;
    let latestScore = user.tests && user.tests.length > 0 ? user.tests[user.tests.length - 1].score || "-" : "-";

    return `
        <tr>
            <td>${index + 1}</td>
            <td>${userName}</td>
            <td>${email}</td>
            <td>${testsGiven}</td>
            <td>${latestScore}</td>
            <td>
                <a href="/admin-panel/user-test-details.html?email=${encodeURIComponent(user.emailId)}" 
                   style="color: blue; text-decoration: none;">View Tests</a>
            </td>
        </tr>
    `;
}

function populateUserTable() {
    const userTableBody = document.querySelector("#userTable tbody");
    if (!userTableBody) {
        console.error("Table body not found!");
        return;
    }

    const users = getUsersFromLocalStorage();
    clearTable(userTableBody);

    users.forEach((user, index) => {
        userTableBody.innerHTML += createUserRow(user, index);
    });
}

document.addEventListener("DOMContentLoaded", function () {
    if (window.location.pathname === "/admin-panel/user-test-details.html") {
        populateUserTestDetails();
    }
});

function populateUserTestDetails() {
    const urlParams = new URLSearchParams(window.location.search);
    const userEmail = urlParams.get("email");

    if (!userEmail) {
        console.error("User email missing from URL!");
        return;
    }

    const quizResults = JSON.parse(localStorage.getItem("quizResults")) || [];
    const user = quizResults.find(u => u.emailId === userEmail);

    if (!user || !user.tests || user.tests.length === 0) {
        console.error("No tests found for this user.");
        return;
    }

    const tableBody = document.querySelector("#user-test-details-table tbody");
    if (!tableBody) {
        console.error("Table body not found!");
        return;
    }

    user.tests.forEach((test, index) => {
        const row = document.createElement("tr");
        const formattedDate = new Date(test.dateTime).toLocaleDateString();
        const correctAnswers = test.questions.filter(q => q.correctAnswer === q.selectedAnswer).length;

        row.innerHTML = `
            <td>${test.testNumber}</td>
            <td>${formattedDate}</td>
            <td>${test.score}</td>
            <td>${correctAnswers}</td>
            <td>
                <a href="/admin-panel/view-test.html?email=${encodeURIComponent(userEmail)}&testIndex=${index}" 
                   style="color: blue; text-decoration: none;">View Test</a>
            </td>
        `;
        tableBody.appendChild(row);
    });
}

document.addEventListener("DOMContentLoaded", function () {
    if (window.location.pathname === "/admin-panel/view-test.html") {
        displayTestDetails();
    }
});
document.addEventListener("DOMContentLoaded", function () {
    displayTestDetails();
});

function displayTestDetails() {
    const urlParams = new URLSearchParams(window.location.search);
    const userEmail = decodeURIComponent(urlParams.get("email"));
    const testIndex = parseInt(urlParams.get("testIndex"), 10);

    const quizResults = JSON.parse(localStorage.getItem("quizResults")) || [];
    const user = quizResults.find(u => u.emailId === userEmail);
    
    if (!user || !Array.isArray(user.tests) || testIndex < 0 || testIndex >= user.tests.length) {
        console.error("Test not found!", { user, testIndex });
        return;
    }

    const test = user.tests[testIndex];

    // 🆔 Display User Identity
    document.querySelector('.identity').innerHTML = `<h2>${user.fullName} | ${user.emailId}</h2>`;

    // 🏆 Display Test Info
    document.getElementById('test-number').textContent = `Test ${test.testNumber}`;
    document.getElementById('test-score').textContent = `Score: ${test.score}`;
    document.getElementById('test-date').textContent = `Test Date: ${new Date(test.dateTime).toLocaleDateString()}`;

    // 📋 Display Test Questions
    const userTestData = document.getElementById('user-test-data');
    userTestData.innerHTML = '';

    test.questions.forEach((questionObj, index) => {
        if (!questionObj || !questionObj.questionText || !Array.isArray(questionObj.options)) {
            console.error("Invalid question data:", questionObj);
            return;
        }

        const questionDiv = document.createElement('div');
        questionDiv.className = 'question-block';
        questionDiv.innerHTML = `
            <div class="question">
                <h3>Question ${index + 1}</h3>
                <p>${questionObj.questionText}</p>
            </div>
            <div class="options">
                ${generateOptions(questionObj)}
            </div>
            <div class="answer-status">
                <p>Your Answer: ${questionObj.selectedAnswer || 'No answer selected'}</p>
                <p>Correct Answer: ${questionObj.correctAnswer || 'Not available'}</p>
                <span class="${String(questionObj.selectedAnswer) === String(questionObj.correctAnswer) ? 'correct' : 'incorrect'}">
                    ${String(questionObj.selectedAnswer) === String(questionObj.correctAnswer) ? '✅ Correct' : '❌ Incorrect'}
                </span>
            </div>
        `;
        userTestData.appendChild(questionDiv);
    });

    // 🔥 Add Click Event to Change Background Color to Violet on Click
    document.querySelectorAll('.option').forEach(option => {
        option.addEventListener('click', function () {
            this.style.backgroundColor = 'violet';
        });
    });
}

//  Generate Options with Styling
function generateOptions(questionObj) {
    if (!Array.isArray(questionObj.options)) {
        console.error("Invalid options format:", questionObj.options);
        return '<div>No options available</div>';
    }

    return questionObj.options.map((option, index) => {
        const optionText = option.value || 'Option text not available';
        const isSelected = String(questionObj.selectedAnswer) === String(option.id);
        const isCorrect = String(questionObj.correctAnswer) === String(option.id);
        
        let backgroundColor = "";
        let textColor = "";
        let borderColor = "";

        if (isSelected && !isCorrect) {
            backgroundColor = "pink"; // ❌ Incorrect -> Pink
            textColor = "red";
            borderColor = "darkred";
        } else if (isCorrect) {
            backgroundColor = "lightgreen"; // ✅ Correct -> Green
            textColor = "green";
            borderColor = "darkgreen";
        }

        return `
            <div class="option" 
                data-option-id="${option.id}" 
                style=" 
                    background-color: ${backgroundColor}; 
                    color: ${textColor}; 
                    border: 2px solid ${borderColor};
                    padding: 10px;
                    margin: 5px;
                    border-radius: 5px;
                    display: flex;
                    align-items: center;
                    cursor: pointer;
                    transition: background-color 0.3s;
                ">
                
                <span class="option-number">Option ${index + 1}</span>
                <span class="option-text" style="margin-left: 10px;">${optionText}</span>
                
                ${isSelected && !isCorrect ? '<span style="color: red; font-size: 18px; font-weight: bold; margin-left: 10px;">&#10006;</span>' : ''}
                ${isCorrect ? '<span style="color: green; font-size: 18px; font-weight: bold; margin-left: 10px;">&#10004;</span>' : ''}
            </div>
        `;
    }).join('');
}
