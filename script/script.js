'use strict';
let isNumber = function(n){
    return !isNaN(parseFloat(n)) && isFinite(n);
};


const start = document.getElementById('start');
console.log (start);

const inc = document.getElementsByTagName('button')[0];
console.log(inc);

const expens = document.getElementsByTagName('button')[1];
console.log(expens);

const check = document.querySelector('#deposit-check');
console.log(check);

const incomeFields = document.querySelectorAll('.additional_income-item');
console.log(incomeFields);

const bDay = document.getElementsByClassName('result-total')[1];
console.log(bDay);

const exMonth = document.getElementsByClassName('result-total')[2];
console.log(exMonth);

const adIncome = document.getElementsByClassName('result-total')[3];
console.log(adIncome);

const adEx = document.getElementsByClassName('result-total')[4];
console.log(adEx);

const inPer = document.getElementsByClassName('result-total')[5];
console.log(inPer);

const tMonth = document.getElementsByClassName('result-total')[6];
console.log(tMonth);



const bMonth = document.querySelector('.budget_month-value');
console.log(bMonth);

const tAmount = document.querySelector('.target-amount');
console.log(tAmount);

const perSelect = document.querySelector('.period-select');
console.log(perSelect);

const periodAmount = document.querySelector('.period-amount');


const adExMas = document.querySelector('.additional_expenses-item');
console.log(adExMas);

const adExTitle = document.querySelector('div.expenses-items input');
console.log(adExTitle);

let expensesItems = document.querySelectorAll('.expenses-items');

const adInTitle = document.querySelector('div.income-items input');
console.log(adInTitle);

let incomeItem = document.querySelectorAll('.income-items');

const monthAmount = document.querySelector('.salary-amount');
console.log(monthAmount);


start.disabled = true;

let appData = {
    budgetDay: 0,
    budgetMonth: 0,
    expensesMonth: 0,
    budget:0,
    income: {},
    incomeMonth: 0,
    addIncome: [],
    expenses: {},
    addExpenses: [],
    deposit: false,
    percentDeposit:0,
    moneyDeposit:0,
    
    start: function()  {
        
        appData.budget = +monthAmount.value;


        appData.getExpenses();
        appData.getIncome();
        appData.getExpensesMonth();
        appData.getAddExpenses();
        appData.getAddIncome();
        appData.getBudget();
        appData.range();
        appData.clickSubmit();
        appData.showResult();
        // appData.getTargetMonth();
        // appData.getStatusIncome();
        // appData.getInfoDeposit();
    
        
    
        

    },
    showResult: function(){
        bMonth.value = appData.budgetMonth;
        bDay.value = Math.ceil(appData.budgetDay);
        exMonth.value = appData.expensesMonth;
        adEx.value = appData.addExpenses.join(', ');
        adIncome.value = appData.addIncome.join(', ');
        tMonth.value = Math.ceil(appData.getTargetMonth());
        inPer.value = appData.calcSavedMoney();
        perSelect.addEventListener('input', appData.start);
    },
    addExpensesBlock: function(){
        
        let cloneExpensesItem = expensesItems[0].cloneNode(true);
        expensesItems[0].parentNode.insertBefore(cloneExpensesItem, expens);
        expensesItems = document.querySelectorAll('.expenses-items');
        if(expensesItems.length === 3){
            expens.style.display = 'none';
        };
    },
    addIncomeBlock: function(){
        let cloneIncomeItem = incomeItem[0].cloneNode(true);
        incomeItem[0].parentNode.insertBefore(cloneIncomeItem, inc);
        incomeItem = document.querySelectorAll('.income-items');
        if(incomeItem.length === 3){
            inc.style.display = 'none';
        };
    },
    getExpenses: function(){
        expensesItems.forEach(function(item){
            let itemExpenses = item.querySelector('.expenses-title').value;
            let cashExpenses = item.querySelector('.expenses-amount').value;
            if(itemExpenses !== '' && cashExpenses !== ''){
                appData.expenses[itemExpenses] =  parseInt(cashExpenses);
            }
        });
    },
    getIncome: function(){
        incomeItem.forEach(function(item){
            let itemIncome = item.querySelector('.income-title').value;
            let cashIncome = item.querySelector('.income-amount').value;
            if(itemIncome !== '' && cashIncome !== ''){
                appData.income[itemIncome] = parseInt(cashIncome);
            }
        });

        for(let key in appData.income){
            appData.incomeMonth += +appData.income[key]
        }

    },
    getAddExpenses: function(){
        let addExpenses = adExMas.value.split(',');
        addExpenses.forEach(function(item){
            item = item.trim();
            if(item !== ''){
                appData.addExpenses.push(item);
            }
        })
    },
    getAddIncome: function(){
        incomeFields.forEach(function(item){
            let itemValue = item.value.trim();
            if (itemValue !== ''){
                appData.addIncome.push(itemValue);
            }
        });
    },

    getExpensesMonth: function(){
        for(let key in appData.expenses){
            appData.expensesMonth += appData.expenses[key];
        }
        
    },

    getBudget: function(){
        appData.budgetMonth = appData.budget + appData.incomeMonth - appData.expensesMonth;
        appData.budgetDay = Math.ceil(appData.budgetMonth/30);
    },

    getTargetMonth: function(){
        return tAmount.value/appData.budgetMonth;
        
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
       return appData.budgetMonth * perSelect.value; 
    },
    range:function(){

        periodAmount.innerHTML=perSelect.value;
    },
    clickSubmit:function(){
        if(monthAmount.value.length > 2) {
            start.disabled = false; 
        }

    }
};


perSelect.addEventListener('input', appData.range);

monthAmount.addEventListener('input', appData.clickSubmit);

start.addEventListener('click', appData.start); 

expens.addEventListener('click', appData.addExpensesBlock);

inc.addEventListener('click', appData.addIncomeBlock);




//for(let key in appData){
  //  console.log('Наша программа включает в себя данные: ' + appData[key])
//};

// console.log(' Общие расходы за месяц составляют: ' + appData.expensesMonth  + ' долларов');
// console.log(appData.getTargetMonth());
// console.log(appData.getStatusIncome());
// console.log(appData.percentDeposit, appData.moneyDeposit, appData.calcSavedMoney());


