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
    
        // Corrected calculation for correct answers
        const correctAnswers = Math.round((test.score / 1000) * test.questions.length);
    
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
    const userEmail = urlParams.get("email");
    const testIndex = parseInt(urlParams.get("testIndex"), 10);
  
    const users = JSON.parse(localStorage.getItem("quizResults")) || [];
    const user = users.find((u) => u.emailId === userEmail);
  
    if (!user) {
      document.getElementById("user-test-data").innerHTML =
        "<p>User not found!</p>";
      return;
    }
  
    // Display user's identity
    const identityDiv = document.querySelector(".identity");
    identityDiv.innerHTML = `<h2>${user.fullName} | ${user.emailId}</h2>`;
  
    const test = user.tests[testIndex];
  
    if (!test || !Array.isArray(test.questions)) {
      document.getElementById("user-test-data").innerHTML =
        "<p>No questions available for this test.</p>";
      return;
    }
  
    const testContainer = document.getElementById("user-test-data");
    testContainer.innerHTML = ""; // Ensure a fresh display
  
    // *Create Table*
    const table = document.createElement("table");
    table.classList.add("test-table");
  
    // *Create Table Header Row*
    const thead = document.createElement("thead");
    thead.innerHTML = `
      <tr id="test-header">
        <th>Test ${test.testNumber}</th>
        <th>Score: ${test.score}</th>
        <th>Time Taken: ${test.timeTaken}</th>
        <th>Test Date: ${test.dateTime}</th>
      </tr>
    `;
    table.appendChild(thead);
  
    // *Create Table Body*
    const tbody = document.createElement("tbody");
  
    // *Loop through questions to create rows*
    test.questions.forEach((questionObj, index) => {
      const isCorrect =
        parseInt(questionObj.selectedAnswer) ===
        parseInt(questionObj.correctAnswer);
  
      // Convert options array into a structured format
      const optionsArray = questionObj.options.map(({ id, value }) => ({
        id,
        text: value,
      }));
  
      const row = document.createElement("tr");
  
      // *Create Table Cell for the Question Card*
      const questionCardCell = document.createElement("td");
      questionCardCell.colSpan = 4; // Span all columns
  
      // *Create Question Card*
      const questionCard = document.createElement("div");
      questionCard.classList.add("question-card");
  
      questionCard.innerHTML = `
        <h4 class="question-title">Question ${index + 1}: ${
        questionObj.questionText
      }</h4>
        <div class="options-container">
          ${optionsArray
            .map(({ id, text }) => {
              const isSelected =
                parseInt(id) === parseInt(questionObj.selectedAnswer);
              const isCorrectOption =
                parseInt(id) === parseInt(questionObj.correctAnswer);
              const optionClass = isSelected
                ? isCorrectOption
                  ? "correct"
                  : "wrong"
                : isCorrectOption && !isSelected
                ? "correct-answer"
                : "";
  
              return `
              <div class="bind-together">
                <div style="width:90px">Option ${id}</div> 
                <div style="display:flex ; justify-content: space-between" class="option ${optionClass}">
                <div>${escapeHtml(text)}</div>
                ${optionClass === "wrong" ? '<span class="icon">✖</span>' : ""}
                ${optionClass === "correct" ? '<span class="icon">✔</span>' : ""}
                </div>
              </div>
            `;
            })
            .join("")}
        </div>
      `;
  
      // Append question card inside the table cell
      questionCardCell.appendChild(questionCard);
      row.appendChild(questionCardCell);
      tbody.appendChild(row);
    });
  
    table.appendChild(tbody);
    testContainer.appendChild(table);
  }
  
  // Utility function to prevent HTML injection
  function escapeHtml(text) {
    const div = document.createElement("div");
    div.textContent = text;
    return div.innerHTML;
  }
  