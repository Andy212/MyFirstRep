'use strict';
let isNumber = function(n){
    return !isNaN(parseFloat(n)) && isFinite(n)
};
let money = 0;
let start = function()  {
        do{
            money = prompt('Ваш месячный доход?');
        }
        while (!isNumber(money));
        
    }
start();


let appData = {
    target: 0,
    budgetDay: 0,
    budgetMonth: 0,
    expensesMonth: 0,
    budget: money,
    income: {},
    addIncome: [],
    expenses: {},
    addExpenses: [],
    deposit: false,
    mission: 50000,
    period: 3,
    asking: function(){
        let addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую');
            appData.addExpenses = addExpenses.toLowerCase().split(',');
            appData.deposit = confirm('Есть ли у вас депозит в банке?');

        let sum = 0;
        let expenses1 =[];

            for(let i = 0; i<2; i++){
                expenses1[i] = prompt('Введите обязательную статью расходов?');
                
                do{
                    sum = +prompt('Во сколько это обойдётся?');
                }
                while (!isNumber(sum));
                appData.expenses[expenses1[i]] = sum;
            }
    },

    getExpensesMonth: function(){
        for(let key in appData.expenses){
            appData.expensesMonth += appData.expenses[key];
        }
        return appData.expensesMonth;
        
    },

    getBudget: function(){
        appData.budgetMonth = appData.budget - appData.expensesMonth;
        appData.budgetDay = Math.ceil(appData.budgetMonth/30);
    },

    getTargetMonth: function(){
        appData.target = appData.mission/appData.budgetMonth;
        if(appData.target > 0){
            return ('Цель будет достигнута за: '+ Math.ceil(appData.target) +' месяца');
        } else if(appData.target < 0){
        return ('Цель не будет достигнута ');
        }
        
        
    },

    getStatusIncome: function(){
        if (appData.budgetDay > 1200){
            return ('У вас высокий уровень дохода');
        } else if (appData.budgetDay > 600 && appData.budgetDay < 1200){
            return ('У вас средний уровень дохода');
        }  else if (appData.budgetDay < 600 && appData.budgetDay > 0){
            return ('К сожалению у вас уровень дохода ниже среднего');
        }   else if (appData.budgetDay < 0){
            return ('Что то пошло не так');
        }
    }
};
appData.asking();
appData.getBudget();


for(let key in appData){
    console.log('Наша программа включает в себя данные: ' + appData[key])
};

console.log(' Общие расходы за месяц составляют: ' + appData.getExpensesMonth() + ' долларов');
console.log(appData.getTargetMonth());
console.log(appData.getStatusIncome());