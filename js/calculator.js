// Nodes
const form = document.getElementsByClassName('calculator')[0];
const incomes = form.getElementsByClassName('text-item__input')[0];
const ranks = form.elements['rank'];
const grades = form.elements['grade'];
const radios = Array.from(form.querySelectorAll('input[type=radio]'));

const resultQuarter = form.getElementsByClassName('calculator__number')[0];
const resultYear = form.getElementsByClassName('calculator__number')[1];
const resultMonth = form.getElementsByClassName('calculator__number')[2];

// Constatn values
const RANK_MULTIPLUERS = {
    specialist: { quarter: 0.2 / 0.7, year: 0.1 / 0.7 },
    manager: { quarter: 0.2 / 0.5, year: 0.3 / 0.5 },
}
const GRADE_MULTIPLUERS = {
    'grade-e': 0,
    'grade-d': 0.7,
    'grade-c': 1,
    'grade-b': 1.15,
    'grade-a': 1.3,
}

incomes.addEventListener('keyup', caltulate);
radios.map((radio) => radio.addEventListener('change', caltulate));

//calculating function
function caltulate() {
    let income = (incomes.value.match(/\d+\.?\d*/gi) || [0]).reduce((a, b) => a + Number(b), 0);
    let rank = ranks.value;
    let grade = grades.value;
    let quarderBonus = income * RANK_MULTIPLUERS[rank].quarter * GRADE_MULTIPLUERS[grade] * 3;
    let yearlyBonus = income * RANK_MULTIPLUERS[rank].year * GRADE_MULTIPLUERS[grade] * 12;

    resultQuarter.textContent = formatNumber(quarderBonus) + ' ₽';
    resultYear.textContent = formatNumber(yearlyBonus) + ' ₽';
    resultMonth.textContent = formatNumber(income + (yearlyBonus / 12) + (quarderBonus / 3)) + ' ₽';
}

//result formating function
function formatNumber(num) {
    var parts = num.toFixed(2).split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, " ");
    return parts.join(".");
}
