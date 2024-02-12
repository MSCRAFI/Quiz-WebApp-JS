const quizArray = [
    {
        question: 'What is the capital of China?',
        a: 'Shanghai',
        b: 'Guangzhou',
        c: 'Beijing',
        d: 'Shenzhen',
        answer: 'c',
        correctAnswer: 'Beijing'
    },
    {
        question: 'What is the only planet in our solar system that rotates clockwise?',
        a: 'Saturn',
        b: 'Mars',
        c: 'Earth',
        d: 'Venus',
        answer: 'd',
        correctAnswer: 'Venus'
    },
    {
        question: 'Which country are you visiting if you are in the Taj Mahal?',
        a: 'India',
        b: 'Bangladesh',
        c: 'Sri Lanka',
        d: 'Pakistan',
        answer: 'a',
        correctAnswer: 'India'
    },
    {
        question: 'What is the capital of Bangladesh?',
        a: 'Delhi',
        b: 'Dhaka',
        c: 'Kabul',
        d: 'Chattagram',
        answer: 'b',
        correctAnswer: 'Dhaka'
    }
];

let quizHTML = '';

function generateQuiz() {
    quizArray.forEach((item, index) => {
        quizHTML += `
        <h2>Answer the questions:-</h2>
        <label>
            <p name='question-${index + 1}'>${item.question}</p>
            <label>
                <input type="radio" name="quiz-${index}" value='a'>${item.a}
            </label>
            <label>
                <input type="radio" name="quiz-${index}" value='b'>${item.b}
            </label>
            <label>
                <input type="radio" name="quiz-${index}" value='c'>${item.c}
            </label>
            <label>
                <input type="radio" name="quiz-${index}" value='d'>${item.d}
            </label>
        </label>
        
        `;
    
    });
    quizHTML += '<p><button class="js-submit-btn">Submit</button></p>';
    
    document.querySelector('.js-quiz-content')
        .innerHTML = quizHTML;

    const submitBtn = document.querySelector('.js-submit-btn');
    if (submitBtn) {
        submitBtn.addEventListener('click', () => checkAnswers());
    
    }

}
generateQuiz();


let userAnsnwer = [];
let totalCorrectAnswer = 0;
function checkAnswers() {
    quizArray.forEach((item, index) => {
        radioElement = document.querySelector(`input[name="quiz-${index}"]:checked`);
        if (radioElement) {
            if (radioElement.value === item.answer) {
                userAnsnwer.push({
                    question: item.question,
                    answer: 'correct',
                });
                totalCorrectAnswer += 1;
            }
            else {
                userAnsnwer.push({
                    question: item.question,
                    answer: 'Wrong',
                    correctAnswer: item.correctAnswer
                });
            }
        }

    });
    afterAnswer();
}



function afterAnswer() {
    quizHTML = `
    <h1> Congratulations for successfully completing the quiz.</h1>
    <h2>You have answered ${totalCorrectAnswer} questions correctly.</h2>
    
    `;
    if (userAnsnwer.length !== totalCorrectAnswer) {
        quizHTML += `
                <h3>Here are some question you didn't answer correctly.</h3>
                `;
        userAnsnwer.forEach((item, index) => {
            if (item.answer === 'Wrong'){
                quizHTML += `
                <p>${item.question}</p>
                <button class='js-check-answer-btn' data-index='${index}'>Check Answer</button>
                <p class='js-check-answer' data-index='${index}'></p>
                `;
                
            }
            
        });
        quizHTML += `
            <button class='js-go-back'>Go Back to Asnwer Questions</button>
        `;

        document.querySelector('.js-quiz-content')
            .innerHTML = quizHTML;

        document.querySelectorAll('.js-check-answer-btn').forEach(button => {
            button.addEventListener('click', checkAnswerBtnAction);

        });

        const goBackBtn = document.querySelector('.js-go-back');
        if (goBackBtn) {
            goBackBtn.addEventListener('click', () => {
                quizHTML = '';
                totalCorrectAnswer = 0;
                userAnsnwer = [];
                generateQuiz();
            });

        }
    }
}

function checkAnswerBtnAction(event){
    const index = event.target.getAttribute('data-index');
    document.querySelector(`.js-check-answer[data-index='${index}']`).innerHTML = `${userAnsnwer[index].correctAnswer}`;
}