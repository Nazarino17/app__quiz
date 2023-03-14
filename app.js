let correctAnswer = "";
let totalQuestion = 5;
let score = 0;
let askedCoutn = 0;


let question = document.querySelector('.question__title');
let answers = document.querySelector('.answers__item');
let btn = document.querySelector('#btn-next');
let btnAgain = document.querySelector('#btn-again');
let result = document.querySelector('#result');

async function fetchLoad() {
    const promise = await fetch('https://opentdb.com/api.php?amount=1');
    const data = await promise.json();

    result.innerHTML = "";
    showQuestion(data.results[0]);
}
document.addEventListener('DOMContentLoaded', function () {
    fetchLoad();
});

function showQuestion(data) {
    correctAnswer = data.correct_answer;
    let incorrectAnswers = data.incorrect_answers;
    let optionals = incorrectAnswers;
    optionals.splice(0, 0, correctAnswer);

    question.innerHTML = `${data.question}`;

    answers.innerHTML = `
        ${optionals.map((optional, ind) => 
            `<label id="answer">
                <input value="${optional}" type="checkbox" class="item" id="item">
                <span>${optional}</span>
                <span>${ind + 1})</span>
            </label>`
        ).join('')}
   `;

    deleteList();

}


function checkAnswers() {
    let checked = document.querySelector('#answer [type="checkbox"]:checked');
    if (checked) {
        if (checked.value === correctAnswer) {
            score++;
            result.style.color = '#1bc85c';
            result.innerHTML = `<p>Correct answer</p>`;
        } else {
            result.style.color = '#cd2828';
            result.innerHTML = `<p>Incorrect answer</p>`;
        }

        checkCount();
    } else {
        result.style.color = '#cd2828';
        result.innerHTML = `<p>Please choose just one answer</p>`;
    }

}

function checkCount() {
    askedCoutn++;
    if (askedCoutn == totalQuestion) {
        result.innerHTML = `<h1>Your results <br> <span>${score}/${totalQuestion}</span></h1>`;
        document.querySelector('#result span').style = `
        color: #303030;
        font-size: 30px;
        margin: 0 auto;
        margin-top: 21px;
        `;
        document.querySelector('#result h1').style = `
        color: #303030;
        font-size: 30px;
        text-align: center;
        `;
        btnAgain.style.display = 'block';
        btn.style.display = 'none';
        document.querySelector('.main__content').hidden = true;
    } else {
        setTimeout(() => {
            fetchLoad();
        }, 500);
    }
}

function restartQuiz() {
    score = 0;
    askedCoutn = 0;
    btnAgain.style.display = 'none';
    btn.style.display = 'block';
    document.querySelector('.main__content').hidden = false;
    fetchLoad();
}

function deleteList() {
    let list = document.querySelectorAll('.list-opt div');
    for (let i = 0; i < list.length; i++) {
        list[i].style.display = "none";
    }
}

btn.addEventListener('click', checkAnswers);
btnAgain.addEventListener('click', restartQuiz);