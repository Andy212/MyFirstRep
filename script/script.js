'use strict';
let isNumber = function(n){
    return !isNaN(parseFloat(n)) && isFinite(n)
};

let money = 0;
let income = 'разработка приложений';
let addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую');
let deposit = confirm('Есть ли у вас депозит в банке?');
let mission = 1000000;
let period = 6;
let budgetDay;
let expenses = 0;
let target = 0;
let accumulated = 0;
let expenses1 = [];
let accumulatedMonth;
let sum2 = 0;
let sum;

let start = function()  {
    do{
        money = prompt('Ваш месячный доход?');
    }
    while (!isNumber(money));
    
}
start();

const showTypeOf = function(data){
    console.log(data, typeof (data));
}
showTypeOf(money);
showTypeOf(income);
showTypeOf(deposit);




const getExpensesMonth = function(){
    
    for(let i = 0; i<2; i++){
        expenses1[i] = prompt('Введите обязательную статью расходов?');
        
        do{
            sum = prompt('Во сколько это обойдётся?');
        }
        while (!isNumber(sum));
        sum2 += parseInt(sum);
    }
    console.log(sum2);
    return sum2;
}
let exppensesAmount = getExpensesMonth();
console.log(' Общие расходы за месяц составляют: ' + exppensesAmount + ' долларов');



const getAccumulatedMonth = function(c, d){
    accumulated =  c - d;
    return accumulated;
}
getAccumulatedMonth(money, exppensesAmount);

accumulatedMonth = accumulated;

const getTargetMonth = function(e, f){
    target = e/f;
    if(target > 0){
        return ('Цель будет достигнута за: '+ Math.ceil(target) +' месяца');
    } else if(target < 0){
        return ('Цель не будет достигнута ');
    }
    
    
}
getTargetMonth(mission, accumulatedMonth);

budgetDay = accumulatedMonth/ 30;


const getStatusIncome = function(){
    if (budgetDay > 1200){
        return ('У вас высокий уровень дохода');
    } else if (budgetDay > 600 && budgetDay < 1200){
        return ('У вас средний уровень дохода');
    }  else if (budgetDay < 600 && budgetDay > 0){
        return ('К сожалению у вас уровень дохода ниже среднего');
    }   else if (budgetDay < 0){
        return ('Что то пошло не так');
    }
};





console.log(addExpenses.toLowerCase().split(','));
console.log(getTargetMonth(mission, accumulatedMonth));
console.log('Бюджет на день составляет: ' + Math.floor(budgetDay) + ' долларов');
console.log(getStatusIncome());