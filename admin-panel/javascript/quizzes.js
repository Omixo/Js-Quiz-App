/*********************************** Routing *******************************/

document.addEventListener("DOMContentLoaded", function () {
    // for every page
    if  (window.location.pathname === '/admin-panel/quizzes.html') {
      displayAllQuestions();
    }
  });
  
  function checkRequiredFields(prefix = "") {
    var question = document.getElementById(prefix + "question").value;
    var option1 = document.getElementById(prefix + "option1").value;
    var option2 = document.getElementById(prefix + "option2").value;
    var option3 = document.getElementById(prefix + "option3").value;
    var option4 = document.getElementById(prefix + "option4").value;
  
    if (!question || !option1 || !option2 || !option3 || !option4) {
      alert("Please fill all required fields");
      return false;
    }
    return true;
  }
  
  function loadQuestions() {
    let questions = JSON.parse(localStorage.getItem("allquestions"));
    console.log("Loaded Questions from LocalStorage:", questions); // Debugging

    return questions || [];
  }
  
  function saveQuestions(question) {
    // let questions = JSON.parse(localStorage.getItem("allquestions")) || [];
    loadQuestions();
    questions.push(question);
    localStorage.setItem("allquestions", JSON.stringify(questions));
  }
  /*********************************** Display Questions ************************************/
  
  function displayAllQuestions() {
    let questions = loadQuestions();
    console.log("Loaded Questions:", questions); // Debugging log
    let tableBody = document.getElementById("question-table-container");

    tableBody.innerHTML = ""; // Clear existing content
  
    questions.forEach((question, index) => {  
      let row = document.createElement("tr");
  
      row.innerHTML = `
            <td style = "text-align:center">${index + 1}</td>
            <td>${(question.question)}</td>
            <td>
                <i class="fa fa-eye view-icon" data-id="${question.id}" style="color:blue"></i>
                <i class="fa fa-pencil edit-icon" data-id="${question.id}" style="color:green"></i>
                <i class="fa fa-trash delete-icon" data-id="${question.id}" style="color:red"></i>
            </td>
        `;
  
      tableBody.appendChild(row);
    });
  
    attachViewListeners();
    attachEditListeners();
    attachDeleteListeners();
  }
  
  function attachViewListeners() {
    document.querySelectorAll(".view-icon").forEach((eyeButton) => {
      eyeButton.addEventListener("click", function () {
        let questionId = this.dataset.id; 
        showQuestionPopup(questionId);
      });
    });
  }
  
  
  function showQuestionPopup(questionId) {
    let questions = JSON.parse(localStorage.getItem("allquestions")) || [];
    console.log("Loaded Questions from Local Storage:", questions); // Debugging

    // Find the question by ID
    let questionData = questions.find(q => q.id === parseInt(questionId));
    console.log("Looking for Question ID:", questionId);
    console.log("Question Found:", questionData);

    if (!questionData) {
        console.error("Question not found for ID:", questionId);
        return; // Exit if no question found
    }

    document.getElementById("popup-question").textContent = questionData.question;
    console.log("Question Text Set:", questionData.question);

    if (!Array.isArray(questionData.options) || questionData.options.length < 4) {
        console.error("Options data is missing or incorrect:", questionData.options);
        return; // Exit if options are not in correct format
    }

    document.getElementById("popup-option1").innerHTML = questionData.options[0].value;
    document.getElementById("popup-option2").innerHTML = questionData.options[1].value;
    document.getElementById("popup-option3").innerHTML = questionData.options[2].value;
    document.getElementById("popup-option4").innerHTML = questionData.options[3].value;

    console.log("Options Set:", questionData.options.map(o => o.value));

    // Fix: Use .find() to get the correct answer
    let correctOption = questionData.options.find(opt => opt.id === questionData.answer);
    console.log("Correct Answer:", correctOption);

    document.getElementById("popup-correct-option").innerHTML = correctOption ? correctOption.value : "N/A";

    // Show the popup
    document.querySelector(".view-question-popup").style.display = "block";
    console.log("Popup Displayed!");
}


  function closePopup() {
    document.querySelector(".view-question-popup").style.display = "none";
  }
  // Adding event listener to close the popup when "X" is clicked
  document.querySelector(".cross-question-popup").addEventListener("click", closePopup);
  
  
  // ******************************* Edit Questions ********************************//
  
  let editingQuestionId = null;
  
  function editQuestion() {
    if (!checkRequiredFields("edit-")) return;
  
    let questions = loadQuestions();
  
    let question = document.getElementById("edit-question").value;
    let option1 = document.getElementById("edit-option1").value;
    let option2 = document.getElementById("edit-option2").value;
    let option3 = document.getElementById("edit-option3").value;
    let option4 = document.getElementById("edit-option4").value;
    let correctAnswer = parseInt(document.getElementById("edit-correct-option").value);
  
    var questionIndex = questions.findIndex(q => q.id === parseInt(editingQuestionId));
    
    if (questionIndex !== -1) {
      questions[questionIndex] = {
        // id: editingQuestionId,
        id: parseInt(editingQuestionId),
        question: question,
        options: [
          { id: 1, value: option1 },
          { id: 2, value: option2 },
          { id: 3, value: option3 },
          { id: 4, value: option4 },
        ],
        answer: correctAnswer
      };
      
      localStorage.setItem("allquestions", JSON.stringify(questions));
      alert("Question updated successfully!");
      
      document.querySelector(".edit-question-popup").style.display = "none";
      
      displayAllQuestions(); // Refresh the table instead of reloading the page
    } else {
      alert("Error: Question not found!");
    }
  }
  
  function attachEditListeners() {
    document.querySelectorAll(".edit-icon").forEach((editButton) => {
      editButton.addEventListener("click", function () {
        let questionId = parseInt(this.dataset.id);
        showEditQuestionPopup(questionId);
      });
    });
  }
  
  function showEditQuestionPopup(questionId) {
    let questions = JSON.parse(localStorage.getItem("allquestions"))|| [];
  
    let questionData = questions.find(q => q.id === parseInt(questionId));
  
    editingQuestionId = parseInt(questionId); // Store the question being edited
  
    if (questionData) {
      document.getElementById("edit-question").value = questionData.question;
      document.getElementById("edit-option1").value = questionData.options[0].value;
      document.getElementById("edit-option2").value = questionData.options[1].value;
      document.getElementById("edit-option3").value = questionData.options[2].value;
      document.getElementById("edit-option4").value = questionData.options[3].value;
  
      const selectElement = document.getElementById("edit-correct-option");
      selectElement.innerHTML = "";
  
      questionData.options.forEach((option, index) => {
        const optionElement = document.createElement("option");
        optionElement.value = option.id;
        optionElement.text = option.value;
        selectElement.appendChild(optionElement);
      });
  
  
      // selectElement.selectedIndex = parseInt(questionData.answer) - 1;
      selectElement.value = questionData.answer;
  
  
      document.querySelector(".edit-question-popup").style.display = "block";
    }
  }
  function closeEditPopup() {
    document.querySelector(".edit-question-popup").style.display = "none";
  }
  document.querySelector(".crossed").addEventListener("click", closeEditPopup);
  
  /******************************* Delete Question ********************************/
  
  let deletingQuestionId = null; 
  
  // Function to show the delete popup
  function showDeleteQuestionPopup(questionId) {
    console.log("Question ID for deletion: ", questionId); // Debugging
    let popup = document.querySelector(".deletion-popup"); 
    deletingQuestionId = parseInt(questionId); 
      popup.style.display = "flex"; 
  }
  
  // Function to hide the delete popup
  function cancelDeletion() {
    let popup = document.querySelector(".deletion-popup"); 
    if (popup) {
      console.log("Canceling deletion, hiding popup"); // Debugging
      popup.style.display = "none"; 
      
    }
  }
  
  // Function to delete the question
  function deleteQuestion() {
    console.log("Deleting question with ID: ", deletingQuestionId); // Debugging
    let questions = loadQuestions(); 
    let questionIndex = questions.findIndex(q => q.id === parseInt(deletingQuestionId));
  
    if (questionIndex !== -1) {
      questions.splice(questionIndex, 1); // Remove the question from the array
      localStorage.setItem("allquestions", JSON.stringify(questions)); 
      alert("Question deleted successfully!");
  
      cancelDeletion(); 
      displayAllQuestions(); 
    } else {
      alert("Error: Question not found!"); 
    }
  }
  
  // Function to attach delete event listeners to delete icons
  function attachDeleteListeners() {
    console.log("Attaching delete listeners"); // Debugging
    document.querySelectorAll(".delete-icon").forEach((deleteButton) => {
      deleteButton.addEventListener("click", function () {
        let questionId = parseInt(this.dataset.id); 
        console.log("Delete button clicked for question ID: ", questionId); // Debugging
        showDeleteQuestionPopup(questionId); 
      });
    });
  }
  
  // Attach the delete listener to the cancel button inside the popup
  document.querySelector("#cancel").addEventListener("click", cancelDeletion);
  
  
  
  
  // ******************************* Create new Question ********************************//
  
  function showCreateQuestionPopup(){
    document.querySelector(".create-question-popup").style.display="block";
  }
  
  function addNewQuestion() {
  
    
  
    let questions = loadQuestions();
    let questionText = document.getElementById("question").value;
    let option1 = document.getElementById("option1").value;
    let option2 = document.getElementById("option2").value;
    let option3 = document.getElementById("option3").value;
    let option4 = document.getElementById("option4").value;
    let correctAnswer = parseInt(document.getElementById("correct-option").value);
  
    let newId = questions.length > 0 ? Math.max(...questions.map(q => q.id)) + 1 : 1;
  
    let newQuestion = {
      id: newId,
      question: questionText,
      options: [
        { id: 1, value: option1 },
        { id: 2, value: option2 },
        { id: 3, value: option3 },
        { id: 4, value: option4 },
      ],
      answer: correctAnswer
    };
    
  
    questions.push(newQuestion);
    if (!checkRequiredFields()) return;
    localStorage.setItem("allquestions", JSON.stringify(questions));
  
    alert("Question inserted successfully!");
    closeCreateQuestionPopup();
    displayAllQuestions(); // Refresh the question list
  }
  
  function closeCreateQuestionPopup() {
    document.querySelector(".create-question-popup").style.display = "none";
  
    // Clear input fields after closing the popup
    document.getElementById("question").value = "";
    document.getElementById("option1").value = "";
    document.getElementById("option2").value = "";
    document.getElementById("option3").value = "";
    document.getElementById("option4").value = "";
    document.getElementById("correct-option").value = "1"; // Reset to default
  }
  
  // Attach event listener for closing popup
  document.querySelector(".cross-create-question").addEventListener("click", closeCreateQuestionPopup)
  document.getElementById("new-question").addEventListener("click" , showCreateQuestionPopup)

//   function escapeHtml(text) {
//     return str.replace(/</g, "&lt;").replace(/>/g, "&gt;");
//   }