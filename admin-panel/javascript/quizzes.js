document.addEventListener("DOMContentLoaded", function () {
    const questionsTable = document.getElementById("question-table-container");
    const newQuestionButton = document.getElementById("new-question");
    const createQuestionPopup = document.querySelector(".create-question-popup");
    const closePopup = document.querySelector(".cross");
    const addNewQuestionBtn = document.getElementById("add-new-question");
    const editQuestionPopup = document.querySelector(".edit-question-popup");
    const closeEditPopup = document.querySelector(".edit-question-popup .cross");
    const updateQuestionBtn = document.getElementById("update-question");

    let allQuestions = JSON.parse(localStorage.getItem("allquestions")) || [];

    function openPopup() {
        createQuestionPopup.style.display = "block";
    }

    function closePopupFunction() {
        createQuestionPopup.style.display = "none";
        clearForm();
    }

    function closeEditPopupFunction() {
        editQuestionPopup.style.display = "none";
        clearEditForm();
    }

    function loadQuestions() {
        questionsTable.innerHTML = "";
        allQuestions.forEach((question, index) => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td class="index">${index + 1}</td>
                <td class="questions">${question.question}</td>
                <td class="icons">
                    <i class="fa-solid fa-eye view-question" data-index="${index}" style="color: #7965d8;"></i>
                    <i class="fa-solid fa-pencil edit-question" data-index="${index}" style="color: #14C099;"></i>
                    <i class="fa-solid fa-trash delete-question" data-index="${index}" style="color: red;"></i>
                </td>
            `;
            questionsTable.appendChild(row);
        });

        document.querySelectorAll(".view-question").forEach(button => {
            button.addEventListener("click", viewQuestion);
        });

        document.querySelectorAll(".edit-question").forEach(button => {
            button.addEventListener("click", editQuestion);
        });

        document.querySelectorAll(".delete-question").forEach(button => {
            button.addEventListener("click", deleteQuestion);
        });
    }

    function viewQuestion(event) {
        const index = event.target.getAttribute("data-index");
        const questionData = allQuestions[index];

        if (questionData) {
            document.getElementById("popup-question").textContent = questionData.question;
            document.getElementById("popup-option1").textContent = questionData.options[0].value;
            document.getElementById("popup-option2").textContent = questionData.options[1].value;
            document.getElementById("popup-option3").textContent = questionData.options[2].value;
            document.getElementById("popup-option4").textContent = questionData.options[3].value;
            document.getElementById("popup-correct-option").textContent = `Option ${questionData.answer}`;
            document.querySelector(".view-question-popup").style.display = "block";
        }
    }

    function closeViewPopup() {
        document.querySelector(".view-question-popup").style.display = "none";
    }

    document.querySelector(".view-question-popup .cross").addEventListener("click", closeViewPopup);
  
    function editQuestion(event) {
        const index = event.target.getAttribute("data-index");
        const questionToEdit = allQuestions[index];
    
        document.getElementById("edit-question").value = questionToEdit.question;
        document.getElementById("edit-option1").value = questionToEdit.options[0].value;
        document.getElementById("edit-option2").value = questionToEdit.options[1].value;
        document.getElementById("edit-option3").value = questionToEdit.options[2].value;
        document.getElementById("edit-option4").value = questionToEdit.options[3].value;
        document.getElementById("edit-correct-option").value = questionToEdit.answer;
    
        editQuestionPopup.style.display = "block";
    
        // Instead of updateQuestionBtn, use the Submit button
        document.getElementById("edit-btn").onclick = function () {
            updateQuestion(index);
        };
    }
    
    function updateQuestion(index) {
        const updatedQuestion = document.getElementById("edit-question").value.trim();
        const updatedOptions = [
            { id: 1, value: document.getElementById("edit-option1").value.trim() },
            { id: 2, value: document.getElementById("edit-option2").value.trim() },
            { id: 3, value: document.getElementById("edit-option3").value.trim() },
            { id: 4, value: document.getElementById("edit-option4").value.trim() }
        ];
        const updatedAnswer = parseInt(document.getElementById("edit-correct-option").value);
    
        if (!updatedQuestion || updatedOptions.some(opt => !opt.value) || updatedAnswer < 1 || updatedAnswer > 4) {
            alert("Please fill in all fields correctly.");
            return;
        }
    
        allQuestions[index] = {
            id: allQuestions[index].id,
            question: updatedQuestion,
            answer: updatedAnswer,
            options: updatedOptions
        };
    
        localStorage.setItem("allquestions", JSON.stringify(allQuestions));
        closeEditPopupFunction();
        loadQuestions();
    }
    

    function deleteQuestion(event) {
        const index = event.target.getAttribute("data-index");
        if (confirm("Are you sure you want to delete this question?")) {
            allQuestions.splice(index, 1);
            localStorage.setItem("allquestions", JSON.stringify(allQuestions));
            loadQuestions();
        }
    }

    function addNewQuestion() {
        const questionText = document.getElementById("question").value.trim();
        const option1 = document.getElementById("option1").value.trim();
        const option2 = document.getElementById("option2").value.trim();
        const option3 = document.getElementById("option3").value.trim();
        const option4 = document.getElementById("option4").value.trim();
        const correctOption = parseInt(document.getElementById("correct-option").value);

        if (!questionText || !option1 || !option2 || !option3 || !option4 || correctOption < 1 || correctOption > 4) {
            alert("Please fill in all required fields correctly.");
            return;
        }

        if (allQuestions.some(q => q.question === questionText)) {
            alert("This question already exists.");
            return;
        }

        const newQuestion = {
            id: allQuestions.length ? allQuestions[allQuestions.length - 1].id + 1 : 1,
            question: questionText,
            answer: correctOption,
            options: [
                { id: 1, value: option1 },
                { id: 2, value: option2 },
                { id: 3, value: option3 },
                { id: 4, value: option4 }
            ]
        };

        allQuestions.push(newQuestion);
        localStorage.setItem("allquestions", JSON.stringify(allQuestions));
        closePopupFunction();
        loadQuestions();
        clearForm();
    }

    newQuestionButton.addEventListener("click", openPopup);
    closePopup.addEventListener("click", closePopupFunction);
    closeEditPopup.addEventListener("click", closeEditPopupFunction);
    addNewQuestionBtn.addEventListener("click", addNewQuestion);

    loadQuestions();
});
