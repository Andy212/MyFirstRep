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

const reset = document.getElementById('cancel');

const expensesAmount = document.querySelector('.expenses-amount');

let inputFields = document.querySelectorAll('.data  input[type=text]');
let resultFields = document.querySelectorAll('.result  input[type=text]');

let elemsExpenses = document.querySelectorAll('.expenses-items');


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
        
        this.budget = +monthAmount.value;

        console.log(this);

        this.getExpenses();
        this.getIncome();
        this.getExpensesMonth();
        this.getAddExpenses();
        this.getAddIncome();
        this.getBudget();
        this.range();
        this.clickSubmit();
        this.disabledInput();
        this.showResult();
        
        // this.getTargetMonth();
        // this.getStatusIncome();
        // this.getInfoDeposit();
    
        
    
        

    },
    showResult: function(){
        bMonth.value = this.budgetMonth;
        bDay.value = Math.ceil(this.budgetDay);
        exMonth.value = this.expensesMonth;
        adEx.value = this.addExpenses.join(', ');
        adIncome.value = this.addIncome.join(', ');
        tMonth.value = Math.ceil(this.getTargetMonth());
        inPer.value = this.calcSavedMoney();
        perSelect.addEventListener('input', function(){
            inPer.value = appData.calcSavedMoney();
        }
        );

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
        expensesItems = document.querySelectorAll('.expenses-items');
        expensesItems.forEach(function(item){
            let itemExpenses = item.querySelector('.expenses-title').value;
            let cashExpenses = item.querySelector('.expenses-amount').value;
            if(itemExpenses !== '' && cashExpenses !== ''){
                appData.expenses[itemExpenses] =  parseInt(cashExpenses);
            }
            
        });
    },
    getIncome: function(){
        incomeItem = document.querySelectorAll('.income-items');
        incomeItem.forEach(function(item){        
            let itemIncome = item.querySelector('.income-title').value;
            let cashIncome = item.querySelector('.income-amount').value;
            if(itemIncome !== '' && cashIncome !== ''){
                appData.income[itemIncome] = parseInt(cashIncome);
                console.log(appData.income)
                
            }
            
        });

        for(let key in this.income){
            this.incomeMonth += +this.income[key]
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
        for(let key in this.expenses){
            this.expensesMonth += this.expenses[key];
        }
        
    },

    getBudget: function(){
        this.budgetMonth = this.budget + this.incomeMonth - this.expensesMonth;
        this.budgetDay = Math.ceil(this.budgetMonth/30);
    },

    getTargetMonth: function(){
        return tAmount.value/this.budgetMonth;
        
    },

    getStatusIncome: function(){
        if (this.budgetDay > 1200){
            return ('У вас высокий уровень дохода');
        } else if (this.budgetDay > 600 && this.budgetDay < 1200){
            return ('У вас средний уровень дохода');
        }  else if (this.budgetDay < 600 && this.budgetDay > 0){
            return ('К сожалению у вас уровень дохода ниже среднего');
        }   else if (this.budgetDay < 0){
            return ('Что то пошло не так');
        }
    },

    getInfoDeposit: function(){
        if(this.deposit){
            do{
            this.percentDeposit = prompt('Какой годовой процент?' , '10');
        } while(!isNumber(this.percentDeposit));

            do{
            this.moneyDeposit = prompt('Какая сумма заложена?' , 10000); 
        }while(!isNumber( this.moneyDeposit))

        }
    },
    calcSavedMoney: function(){
       return this.budgetMonth * perSelect.value; 
    },
    range:function(){

        periodAmount.innerHTML=perSelect.value;

    },
    clickSubmit:function(){
        if(monthAmount.value.length > 2) {
            start.disabled = false; 
        }

    },
    disabledInput:function(){

    for(let i = 0; i<inputFields.length; i++){
        inputFields[i].disabled = true;
    }
    },



    reset:function(){
        this.deleteFields();
        this.enabledInput();
        this.clearField(); 
        appData.clearData();
        this.rangeClear();
        
    },

    enabledInput:function(){
        inputFields = document.querySelectorAll('.data  input[type=text]');
        resultFields = document.querySelectorAll('.result  input[type=text]');
        for(let i = 0; i<inputFields.length; i++){
            inputFields[i].disabled = false;
        }
    },
    deleteFields:function(){

        let elemsExpenses = document.querySelectorAll('.expenses div.expenses-items');
        for(let i = elemsExpenses.length ; i > 1; i--){

            elemsExpenses[(i-1)].remove();    
        }
        expens.style.display = 'block';


        let elemsIncomes = document.querySelectorAll('.income div.income-items');
        for(let i = elemsIncomes.length ; i > 1; i--){

            elemsIncomes[(i-1)].remove();    
        }
        inc.style.display = 'block';

    },
    clearField:function(){
        inputFields = document.querySelectorAll('.data  input[type=text]');
        resultFields = document.querySelectorAll('.result  input[type=text]');
        for(let i = 0; i<inputFields.length; i++){
            inputFields[i].value = '';            
        };
        
        for(let i = 0; i<resultFields.length; i++){
            resultFields[i].value = '';
        };
        
    },
    clearData:function(){
            this.budgetDay = 0,
            this.budgetMonth = 0,
            this.expensesMonth = 0,
            this.budget = 0,
            this.income = {},
            this.incomeMonth = 0,
            this.addIncome = [],
            this.expenses = {},
            this.addExpenses = [],
            this.deposit = false,
            this.percentDeposit = 0,
            this.moneyDeposit = 0;

            
    },

    rangeClear:function(){
        let g = document.querySelector('.period input[type=range]');
        g.value = 1;
        periodAmount.innerHTML= g.value;
    }

};



perSelect.addEventListener('input', appData.range);

monthAmount.addEventListener('input', appData.clickSubmit);



start.addEventListener('click', function(){
    appData.start();
    start.style.display = 'none';
    cancel.style.display = 'block';
    

});

reset.addEventListener('click', function(){
    appData.reset();
    reset.style.display = 'none';
    start.style.display = 'block';


})


expens.addEventListener('click', appData.addExpensesBlock);

inc.addEventListener('click', appData.addIncomeBlock);



//for(let key in appData){
  //  console.log('Наша программа включает в себя данные: ' + appData[key])
//};

// console.log(' Общие расходы за месяц составляют: ' + this.expensesMonth  + ' долларов');
// console.log(this.getTargetMonth());
// console.log(this.getStatusIncome());
// console.log(this.percentDeposit, this.moneyDeposit, this.calcSavedMoney());


