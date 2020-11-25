'use strict';

let money = 1000;
let income = 'разработка приложений';
let addExpenses;
let deposit = true;
let mission = 1000000;
let period = 6;
let budgetDay;
let expenses = 0;
let target = 0;
let accumulated = 0;

money = +prompt('Ваш месячный доход?');
addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую');
deposit = confirm('Есть ли у вас депозит в банке?');

let expenses1 = prompt('Введите обязательную статью расходов?');
let amount1 = +prompt('Во сколько это обойдётся?');
let expenses2 = prompt('Введите обязательную статью расходов?');
let amount2 = +prompt('Во сколько это обойдётся?');

const showTypeOf = function(){
    console.log(typeof money);
    console.log(typeof income);
    console.log(typeof deposit);
}
showTypeOf();

const getExpensesMonth = function(){
    expenses = amount1 + amount2;
    return expenses;
}
getExpensesMonth();

console.log(' Общие расходы за месяц составляют: ' + expenses + ' долларов') ;
console.log(addExpenses.toLowerCase().split(','));

const getAccumulatedMonth = function(){
    accumulated =  money - expenses;
    return accumulated;
}
getAccumulatedMonth();

let accumulatedMonth = accumulated;

const getTargetMonth = function(){
    target = mission/accumulatedMonth;
    return target;
}
getTargetMonth();

console.log('Цель будет достигнута за: '+ Math.ceil(target) +' месяца');

budgetDay = accumulatedMonth/ 30;

console.log('Бюджет на день составляет: ' + Math.floor(budgetDay) + ' долларов');

const getStatusIncome = function(){
    console.log(income);
}
getStatusIncome();