const allquestions = [
    {
        id: 1,
        question: "Which iconic role did Al Pacino play in the 1972 film 'The Godfather'?",
        options: [
            { id: 1, value: "Vito Corleone" },
            { id: 2, value: "Michael Corleone" },
            { id: 3, value: "Sonny Corleone" },
            { id: 4, value: "Tom Hagen" }
        ],
        answer: 2
    },
    {
        id: 2,
        question: "What phrase did Al Pacino famously say as Tony Montana in 'Scarface'?",
        options: [
            { id: 1, value: "'Say hello to my little friend!'" },
            { id: 2, value: "'Keep your friends close, but your enemies closer.'" },
            { id: 3, value: "'I'm gonna make him an offer he can't refuse.'" },
            { id: 4, value: "'Hoo-ah!'" }
        ],
        answer: 1
    },
    {
        id: 3,
        question: "Which film featured Al Pacino as a blind retired Army officer?",
        options: [
            { id: 1, value: "Heat" },
            { id: 2, value: "Scent of a Woman" },
            { id: 3, value: "Carlito's Way" },
            { id: 4, value: "The Insider" }
        ],
        answer: 2
    },
    {
        id: 4,
        question: "In which movie did Al Pacino play a detective hunting down a serial killer?",
        options: [
            { id: 1, value: "Insomnia" },
            { id: 2, value: "The Devil's Advocate" },
            { id: 3, value: "Sea of Love" },
            { id: 4, value: "Righteous Kill" }
        ],
        answer: 3
    },
    {
        id: 5,
        question: "What was the name of Al Pacino's character in 'Heat'?",
        options: [
            { id: 1, value: "Vincent Hanna" },
            { id: 2, value: "Neil McCauley" },
            { id: 3, value: "Frank Serpico" },
            { id: 4, value: "Lt. Col. Frank Slade" }
        ],
        answer: 1
    },
    {
        id: 6,
        question: "Which role earned Al Pacino his first Academy Award?",
        options: [
            { id: 1, value: "Michael Corleone in 'The Godfather'" },
            { id: 2, value: "Tony Montana in 'Scarface'" },
            { id: 3, value: "Frank Serpico in 'Serpico'" },
            { id: 4, value: "Lt. Col. Frank Slade in 'Scent of a Woman'" }
        ],
        answer: 4
    },
    {
        id: 7,
        question: "What famous line did Al Pacino deliver in 'The Godfather Part II'?",
        options: [
            { id: 1, value: "'Keep your friends close, but your enemies closer.'" },
            { id: 2, value: "'I'm gonna make him an offer he can't refuse.'" },
            { id: 3, value: "'Just when I thought I was out, they pull me back in.'" },
            { id: 4, value: "'Hoo-ah!'" }
        ],
        answer: 1
    },
    {
        id: 8,
        question: "In which movie did Al Pacino play a lawyer who sold his soul to the devil?",
        options: [
            { id: 1, value: "The Devil's Advocate" },
            { id: 2, value: "Carlito's Way" },
            { id: 3, value: "Glengarry Glen Ross" },
            { id: 4, value: "Dog Day Afternoon" }
        ],
        answer: 1
    },
    {
        id: 9,
        question: "What was the name of Al Pacino's character in 'Dog Day Afternoon'?",
        options: [
            { id: 1, value: "Sonny Wortzik" },
            { id: 2, value: "Frank Serpico" },
            { id: 3, value: "Tony Montana" },
            { id: 4, value: "Vincent Hanna" }
        ],
        answer: 1
    },
    {
        id: 10,
        question: "Which film featured Al Pacino as a Cuban drug lord?",
        options: [
            { id: 1, value: "Scarface" },
            { id: 2, value: "Carlito's Way" },
            { id: 3, value: "The Godfather" },
            { id: 4, value: "Heat" }
        ],
        answer: 1
    },
    {
        id: 11,
        question: "What was the name of Al Pacino's character in 'Serpico'?",
        options: [
            { id: 1, value: "Frank Serpico" },
            { id: 2, value: "Vincent Hanna" },
            { id: 3, value: "Tony Montana" },
            { id: 4, value: "Michael Corleone" }
        ],
        answer: 1
    },
    {
        id: 12,
        question: "Which movie featured Al Pacino as a retired boxer?",
        options: [
            { id: 1, value: "The Irishman" },
            { id: 2, value: "Carlito's Way" },
            { id: 3, value: "The Humbling" },
            { id: 4, value: "Manglehorn" }
        ],
        answer: 3
    },
    {
        id: 13,
        question: "What was the name of Al Pacino's character in 'The Irishman'?",
        options: [
            { id: 1, value: "Jimmy Hoffa" },
            { id: 2, value: "Frank Sheeran" },
            { id: 3, value: "Russell Bufalino" },
            { id: 4, value: "Tony Pro" }
        ],
        answer: 1
    },
    {
        id: 14,
        question: "Which film featured Al Pacino as a corrupt cop?",
        options: [
            { id: 1, value: "Serpico" },
            { id: 2, value: "Heat" },
            { id: 3, value: "Righteous Kill" },
            { id: 4, value: "Insomnia" }
        ],
        answer: 3
    },
    {
        id: 15,
        question: "What was the name of Al Pacino's character in 'Glengarry Glen Ross'?",
        options: [
            { id: 1, value: "Ricky Roma" },
            { id: 2, value: "Shelley Levene" },
            { id: 3, value: "John Williamson" },
            { id: 4, value: "Dave Moss" }
        ],
        answer: 1
    },
    {
        id: 16,
        question: "Which movie featured Al Pacino as a bank robber?",
        options: [
            { id: 1, value: "Dog Day Afternoon" },
            { id: 2, value: "Heat" },
            { id: 3, value: "Carlito's Way" },
            { id: 4, value: "Scarface" }
        ],
        answer: 1
    },
    {
        id: 17,
        question: "What was the name of Al Pacino's character in 'The Insider'?",
        options: [
            { id: 1, value: "Lowell Bergman" },
            { id: 2, value: "Jeffrey Wigand" },
            { id: 3, value: "Clayton Townes" },
            { id: 4, value: "Frank Serpico" }
        ],
        answer: 1
    },
    {
        id: 18,
        question: "Which film featured Al Pacino as a mafia boss?",
        options: [
            { id: 1, value: "The Godfather" },
            { id: 2, value: "Carlito's Way" },
            { id: 3, value: "Scarface" },
            { id: 4, value: "Heat" }
        ],
        answer: 1
    },
    {
        id: 19,
        question: "What was the name of Al Pacino's character in 'The Devil's Advocate'?",
        options: [
            { id: 1, value: "John Milton" },
            { id: 2, value: "Kevin Lomax" },
            { id: 3, value: "Eddie Barzoon" },
            { id: 4, value: "Alexander Cullen" }
        ],
        answer: 1
    },
    {
        id: 20,
        question: "Which movie featured Al Pacino as a retired cop seeking revenge?",
        options: [
            { id: 1, value: "Righteous Kill" },
            { id: 2, value: "Heat" },
            { id: 3, value: "Insomnia" },
            { id: 4, value: "Sea of Love" }
        ],
        answer: 1
    }
];
// Function to shuffle the questions and select 10 random ones
function getRandomQuestions(allquestions, numQuestions) {
    return allquestions.sort(() => 0.5 - Math.random()).slice(0, numQuestions);
}

// Store questions in localStorage if not already stored
if (!localStorage.getItem("allquestions")) {
    localStorage.setItem("allquestions", JSON.stringify(allquestions));
}

// Quiz State
let currentQuestionIndex = 0;
let answers = JSON.parse(localStorage.getItem("quizAnswers")) || [];
const startTime = Date.now();
const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser")) || {};
const userEmail = loggedInUser.emailId;
const randomQuestions = getRandomQuestions(allquestions, 10);

// Load a question
function loadQuestion() {
    const questionNumberElement = document.getElementById("question-number");
    const questionTextElement = document.getElementById("question-text");
    const optionsContainer = document.getElementById("options-container");
    const progressBar = document.getElementById("progress-bar");
    const nextButton = document.getElementById("next-button");
    const submitButton = document.getElementById("submit-button");
    const previousButton = document.getElementById("previous-button");

    const currentQuestion = randomQuestions[currentQuestionIndex];

    let extraMessage = currentQuestionIndex === 8 ? " - Last 2 questions remaining!" :
                       currentQuestionIndex === 9 ? " - This is your last question!" : "";

    questionNumberElement.innerText = `Question ${currentQuestionIndex + 1} of ${randomQuestions.length}${extraMessage}`;
    questionTextElement.innerText = `${currentQuestionIndex + 1}) ${currentQuestion.question}`;
    optionsContainer.innerHTML = "";

    if (currentQuestion.options && currentQuestion.options.length > 0) {
        currentQuestion.options.forEach((option, index) => {
            const optionElement = document.createElement("div");
            optionElement.className = "option";
            optionElement.innerHTML = `
                <label>
                    <input type="radio" name="answer" value="${option.id}" onclick="selectAnswer(event)">
                    ${index + 1}) ${option.value}
                </label>
            `;
            optionsContainer.appendChild(optionElement);
        });

        const previousAnswer = answers[currentQuestionIndex];
        if (previousAnswer) {
            const selectedInput = document.querySelector(`input[name="answer"][value="${previousAnswer.selectedAnswerId}"]`);
            if (selectedInput) {
                selectedInput.checked = true;
                selectedInput.parentElement.style.backgroundColor = '#F3BD00';
            }
        }
    } else {
        optionsContainer.innerHTML = "<p style='color:red;'>No options available for this question.</p>";
    }

    progressBar.style.width = `${((currentQuestionIndex + 1) / randomQuestions.length) * 100}%`;

    nextButton.style.display = currentQuestionIndex === 9 ? "none" : "block";
    submitButton.style.display = currentQuestionIndex === 9 ? "block" : "none";
    previousButton.disabled = currentQuestionIndex === 0;
}

// Handle answer selection
function selectAnswer(event) {
    document.querySelectorAll('input[name="answer"]').forEach(option => {
        option.parentElement.style.backgroundColor = '';
    });

    event.target.parentElement.style.backgroundColor = '#F3BD00';

    answers[currentQuestionIndex] = {
        questionId: randomQuestions[currentQuestionIndex].id,
        selectedAnswerId: event.target.value
    };

    localStorage.setItem("quizAnswers", JSON.stringify(answers));
}

// Move to next question
function nextQuestion() {
    if (!document.querySelector('input[name="answer"]:checked')) {
        alert("Please select an answer!");
        return;
    }
    currentQuestionIndex++;
    loadQuestion();
}

// Move to previous question
function previousQuestion() {
    if (currentQuestionIndex > 0) {
        currentQuestionIndex--;
        loadQuestion();
    }
}

// Submit answers and store in quizResults with multiple attempts under the same user
function submitAnswers() {
    let score = 0;
    let quizResults = JSON.parse(localStorage.getItem('quizResults')) || [];

    let timeTaken = Math.floor((Date.now() - startTime) / 1000); // Time in seconds
    let minutes = Math.floor(timeTaken / 60);
    let seconds = timeTaken % 60;
    let formattedTime = `${minutes}m ${seconds}s`;

    // Find existing user data
    let userRecord = quizResults.find(user => user.emailId === userEmail);
    if (!userRecord) {
        userRecord = {
            emailId: userEmail,
            fullName: loggedInUser.fullName,
            tests: []
        };
        quizResults.push(userRecord);
    }

    // Prepare answered questions with full details
    let answeredQuestions = randomQuestions.map((question, index) => {
        const userAnswer = answers[index] ? answers[index].selectedAnswerId : null;
        const isCorrect = userAnswer == question.answer;
        if (isCorrect) score += 100;

        return {
            questionId: question.id,
            questionText: question.question,
            options: question.options,
            correctAnswer: question.answer,
            selectedAnswer: userAnswer,
           
        };
    });

    // Store the new test under the same user
    userRecord.tests.push({
        testNumber: userRecord.tests.length + 1,
        dateTime: new Date().toLocaleString(),
        timeTaken: formattedTime,
        score: score,
        questions: answeredQuestions
    });

    localStorage.setItem("quizResults", JSON.stringify(quizResults));
    localStorage.removeItem("quizAnswers");
    window.location.href = "ranking.html";
}

// Initialize the quiz
loadQuestion();
