'use strict';

let money = 1000;
let income = 'разработка приложений';
let addExpenses = 'КОММУНАЛКА, ВОДА, ГАЗ';
let deposit = true;
let mission = 1000000;
let period = 6;
let budgetDay = money / 30;

console.log(typeof money);
console.log(typeof income);
console.log(typeof deposit);

console.log(addExpenses.length);
console.log('Период равен ' + period +' месяцев' );
console.log('Цель заработать '+ mission +' Долларов');
console.log(addExpenses.toLowerCase().split(','));
console.log(budgetDay);

money = +prompt('Ваш месячный доход?');
addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую');
deposit = confirm('Есть ли у вас депозит в банке?');

let expenses1 = prompt('Введите обязательную статью расходов?');
let expenses2 = prompt('Введите обязательную статью расходов?');
let amount1 = +prompt('Во сколько это обойдётся?');
let amount2 = +prompt('Во сколько это обойдётся?');
let budgetMonth = money-(amount1+amount2);
console.log('Бюджет на месяц составляет: ' + budgetMonth);

let period2 = mission/budgetMonth;
console.log('Цель будет достигнута за: '+ Math.ceil(period2) +' месяцев');

budgetDay = budgetMonth / 30;
console.log('Бюджет на день составляет: ' + Math.floor(budgetDay));

if (budgetDay > 1200){
    console.log('У вас высокий уровень дохода');
} else if (budgetDay > 600 & budgetDay < 1200){
    console.log('У вас средний уровень дохода');
}  else if (budgetDay < 600 & budgetDay > 0){
    console.log('К сожалению у вас уровень дохода ниже среднего');
}   else if (budgetDay < 0){
    console.log('Что то пошло не так');
}