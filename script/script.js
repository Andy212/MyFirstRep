'use strict';
let isNumber = function(n){
    return !isNaN(parseFloat(n)) && isFinite(n);
};


let money;
let start = function()  {
        do{
            money = prompt('Ваш месячный доход?' , 20000);
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
    percentDeposit:0,
    moneyDeposit:0,
    mission: 50000,
    period: 3,
    asking: function(){

            if(confirm('Есть ли у вас дополнительный источник заработка?')){
                let itemIncome;
                let cashIncome;
                do{
                    itemIncome = prompt('Какой у вас есть дополнительный заработок?', 'Таксую');

                }while(itemIncome === undefined || itemIncome === null || itemIncome.trim() === '' ||  isNumber(itemIncome));
                

                do{
                    cashIncome = prompt('Сколько вы на этом зарабатываете?' , 10000);
                }
                while (!isNumber(cashIncome));

                appData.income[itemIncome] = cashIncome;
            }

            console.log(appData.itemIncome);

            appData.addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую').toLowerCase().split(',');

            let addExpensesStr = ' ';
            for(let i = 0; i < appData.addExpenses.length; i++){
                addExpensesStr += appData.addExpenses[i][0].toUpperCase() +  appData.addExpenses[i].slice(1) + ', ';
            }
            addExpensesStr = addExpensesStr.slice(0, addExpensesStr.length - 2);
            console.log(addExpensesStr);



            appData.deposit = confirm('Есть ли у вас депозит в банке?');

        let sum;
        let expenses1 =[];

            for(let i = 0; i<2; i++){
                do{
                expenses1[i] = prompt('Введите обязательную статью расходов?');

                }while(expenses1[i] === undefined || expenses1[i] === null || expenses1[i].trim() === '' || isNumber(expenses1[i]));

                do{
                    sum = prompt('Во сколько это обойдётся?');
                }
                while (!isNumber(sum));
                appData.expenses[expenses1[i]] = parseInt(sum);
            }
    },

    getExpensesMonth: function(){
        for(let key in appData.expenses){
            appData.expensesMonth += appData.expenses[key];
        }
        
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
    },

    getInfoDeposit: function(){
        if(appData.deposit){
            do{
            appData.percentDeposit = prompt('Какой годовой процент?' , '10');
        } while(!isNumber(appData.percentDeposit));

            do{
            appData.moneyDeposit = prompt('Какая сумма заложена?' , 10000); 
        }while(!isNumber( appData.moneyDeposit))

        }
    },
    calcSavedMoney: function(){
       return appData.budgetMonth * appData.period;
    }
};
appData.asking();
appData.getExpensesMonth();
appData.getBudget();
appData.getTargetMonth();
appData.getStatusIncome();
appData.getInfoDeposit();


//for(let key in appData){
  //  console.log('Наша программа включает в себя данные: ' + appData[key])
//};

console.log(' Общие расходы за месяц составляют: ' + appData.expensesMonth  + ' долларов');
console.log(appData.getTargetMonth());
console.log(appData.getStatusIncome());
console.log(appData.percentDeposit, appData.moneyDeposit, appData.calcSavedMoney());