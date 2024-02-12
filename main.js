const quizBox = document.querySelector('.quiz-box');
const next = document.querySelector('.next');
const nextBox = document.querySelector('.btn-box');
const againBox = document.querySelector('.btn-box-again');
const again = againBox.querySelector('.again');
const h1 = document.querySelector('h1');
const h4 = document.querySelector('h4');

let counter = 0;
let correct = 0;
createQuestionAndAnswers();
dodaj();


function createQuestionAndAnswers() {
    let html = ``;
    if (counter === questions.length) {
        h1.textContent = 'FINISH';
        h4.classList.add('center')
        h4.textContent = `Correct answers: ${correct} / ${counter}`
        nextBox.style.display = 'none';
        againBox.style.display = 'block';
        next.removeEventListener('click', createQuestionAndAnswers);
    } else {
        againBox.style.display = 'none';
        questions[counter].answers.forEach((question, i) => {
            const {
                text
            } = question;
            html += `  
         <li>${text}</li>
         `.trim();
            h4.innerText = `${questions[counter].question}`
        })

    }
    quizBox.innerHTML = html;
};

function dodaj() {
    const allLi = document.querySelectorAll('li');
    allLi.forEach((li) => {
        li.addEventListener('click', checkAnswer);
    });
};

function skini() {
    const allLi = document.querySelectorAll('li');
    allLi.forEach((li) => {
        li.removeEventListener('click', checkAnswer);
    });
};

function checkAnswer() {
    const allLi = document.querySelectorAll('li');
    skini();
    let onlyTrue = questions[counter].answers.filter(tr => tr.correct);
    if (this.innerText === onlyTrue[0].text) {
        this.classList.add('correct');
        correct++;
    } else {
        this.classList.add('wrong');
        allLi.forEach((al, i) => {
            if (al.innerText === onlyTrue[0].text) {
                al.classList.add('correct');
            }
        })
    }
}


next.addEventListener('click', function () {
    counter++;
    createQuestionAndAnswers();
    if (counter !== questions.length) {
        dodaj();
    }
});
again.addEventListener('click', function () {
    counter = 0;
    createQuestionAndAnswers();
    dodaj();
    nextBox.style.display = 'block';
})