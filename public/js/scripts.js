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
    quizHTML += `
    <div class='border-b-2 border-blue-800 mb-4'>
        <h2 class='text-2xl text-black font-medium'>Answer the questions:-</h2>
    </div>
    `;
    quizArray.forEach((item, index) => {
        quizHTML += `
        <label>
            <p name='question-${index + 1}' class='text-xl font-semibold my-2 box-border'>${index + 1}. ${item.question}</p>
            <label class='mr-10 font-semibold text-blue-800 cursor-pointer border-transparent border hover:border-blue-800 rounded checked:bg-black' for='quiz-${index}'>
                <input type="radio" name="quiz-${index}" value='a' id='quiz-${index}'> ${item.a}
            </label>
            <label class='mr-10 font-semibold text-blue-800 cursor-pointer border-transparent border hover:border-blue-800 rounded checked:bg-black' for='quiz-${index}'>
                <input type="radio" name="quiz-${index}" value='b' id='quiz-${index}'> ${item.b}
            </label>
            <label class='mr-10 font-semibold text-blue-800 cursor-pointer border-transparent border hover:border-blue-800 rounded checked:bg-black' for='quiz-${index}'>
                <input type="radio" name="quiz-${index}" value='c' id='quiz-${index}'> ${item.c}
            </label>
            <label class='mr-10 font-semibold text-blue-800 cursor-pointer border-transparent border hover:border-blue-800 rounded checked:bg-black' for='quiz-${index}'>
                <input type="radio" name="quiz-${index}" value='d' id='quiz-${index}'> ${item.d}
            </label>
        </label>
        
        `;
    
    });
    quizHTML += '<p><button class="js-submit-btn bg-blue-800 text-white mt-4 w-20 rounded-full hover:bg-blue-900">Submit</button></p>';
    
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
    <div class='border-b-2 border-blue-800 mb-4 box-border'>
        <h1 class='text-2xl text-black font-medium'> Congratulations for successfully completing the quiz.
        </h1>
    </div>
    <h2 class='text-xl font-semibold my-2 box-border'>You have answered ${totalCorrectAnswer} questions correctly.</h2>
    
    `;
    if (userAnsnwer.length !== totalCorrectAnswer) {
        quizHTML += `
                <h3 class='text-xl font-medium my-2 box-border'>Here are some question you didn't answer correctly.</h3>
                `;
        userAnsnwer.forEach((item, index) => {
            if (item.answer === 'Wrong'){
                quizHTML += `
                <p class='text-xl font-semibold my-2 box-border'>${index + 1}. ${item.question}</p>
                <button class='js-check-answer-btn bg-green-600 text-white rounded w-40 hover:bg-green-800' data-index='${index}'>Check Answer</button>
                <span class='js-check-answer font-bold text-red-600 whitespace-normal' data-index='${index}'></span>
                `;
                
            }
            
        });
        quizHTML += `
            <button class='js-go-back block bg-blue-700 hover:bg-blue-800 text-white min-w-40 w-2/4 mt-2 rounded box-border'>Go Back to Asnwer Questions</button>
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