'use strict';
const isNumber = (n) =>{ !isNaN(parseFloat(n)) && isFinite(n);
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

const adInTitle = document.querySelector('div.income-items input');
console.log(adInTitle);

const monthAmount = document.querySelector('.salary-amount');
console.log(monthAmount);

const reset = document.getElementById('cancel');

const expensesAmount = document.querySelector('.expenses-amount');

let inputFields = document.querySelectorAll('.data  input[type=text]');
let resultFields = document.querySelectorAll('.result  input[type=text]');

let elemsExpenses = document.querySelectorAll('.expenses-items');

let expensesItems = document.querySelectorAll('.expenses-items');
let incomeItem = document.querySelectorAll('.income-items');

start.disabled = true;


class AppData {
    constructor(){
    this.budgetDay = 0;
    this.budgetMonth = 0;
    this.expensesMonth = 0;
    this.budget = 0;
    this.income = {};
    this.incomeMonth = 0;
    this.addIncome = [];
    this.expenses = {};
    this.addExpenses = [];
    this.deposit = false;
    this.percentDeposit = 0;
    this.moneyDeposit = 0;
    }

    start() {
        
        this.budget = +monthAmount.value;
    
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
        
    }

    showResult(){

        bMonth.value = this.budgetMonth;
        bDay.value = Math.ceil(this.budgetDay);
        exMonth.value = this.expensesMonth;
        adEx.value = this.addExpenses.join(', ');
        adIncome.value = this.addIncome.join(', ');
        tMonth.value = Math.ceil(this.getTargetMonth());
        inPer.value = this.calcSavedMoney();
        perSelect.addEventListener('input', ()=>{
        inPer.value = this.calcSavedMoney();
        }
        );
    
    }

    addExpensesBlock() {
        
        const cloneExpensesItem = expensesItems[0].cloneNode(true);
        expensesItems[0].parentNode.insertBefore(cloneExpensesItem, expens);
        expensesItems = document.querySelectorAll('.expenses-items');
        if(expensesItems.length === 3){
            expens.style.display = 'none';
        };
    }

    
    addIncomeBlock() {
        const cloneIncomeItem = incomeItem[0].cloneNode(true);
        incomeItem[0].parentNode.insertBefore(cloneIncomeItem, inc);
        incomeItem = document.querySelectorAll('.income-items');
        if(incomeItem.length === 3){
            inc.style.display = 'none';
        };
    }

    getExpenses() {
    
        expensesItems = document.querySelectorAll('.expenses-items');
        expensesItems.forEach((item) => {
            const itemExpenses = item.querySelector('.expenses-title').value;
            const cashExpenses = item.querySelector('.expenses-amount').value;
            if(itemExpenses !== '' && cashExpenses !== ''){
                this.expenses[itemExpenses] =  parseInt(cashExpenses);
            }
            
        });
    }

    getIncome() {

        incomeItem = document.querySelectorAll('.income-items');
        incomeItem.forEach((item) => {        
            const itemIncome = item.querySelector('.income-title').value;
            const cashIncome = item.querySelector('.income-amount').value;
            if(itemIncome !== '' && cashIncome !== ''){
                this.income[itemIncome] = parseInt(cashIncome);
                
            }
            
        });
    
        for(const key in this.income){
            this.incomeMonth += +this.income[key]
        }
    
    }

    getAddExpenses() {
        const addExpenses = adExMas.value.split(',');
        const _this = this;
        addExpenses.forEach((item)=>{
            item = item.trim();
            if(item !== ''){
                _this.addExpenses.push(item);
            }
        })
    }

    getAddIncome() {
        const _this = this;
        incomeFields.forEach(function(item){
            const itemValue = item.value.trim();
            if (itemValue !== ''){
                _this.addIncome.push(itemValue);
            }
        });
    }

    getExpensesMonth() {
        for(const key in this.expenses){
            this.expensesMonth += this.expenses[key];
        }
        
    }

    getBudget() {
        this.budgetMonth = this.budget + this.incomeMonth - this.expensesMonth;
        this.budgetDay = Math.ceil(this.budgetMonth/30);
    }

    getTargetMonth() {
        return tAmount.value/this.budgetMonth;
        
    }

    getStatusIncome() {
        if (this.budgetDay > 1200){
            return ('У вас высокий уровень дохода');
        } else if (this.budgetDay > 600 && this.budgetDay < 1200){
            return ('У вас средний уровень дохода');
        }  else if (this.budgetDay < 600 && this.budgetDay > 0){
            return ('К сожалению у вас уровень дохода ниже среднего');
        }   else if (this.budgetDay < 0){
            return ('Что то пошло не так');
        }
    }

    getInfoDeposit() {
        if(this.deposit){
            do{
            this.percentDeposit = prompt('Какой годовой процент?' , '10');
        } while(!isNumber(this.percentDeposit));
    
            do{
            this.moneyDeposit = prompt('Какая сумма заложена?' , 10000); 
        }while(!isNumber( this.moneyDeposit))
    
        }
    }

    calcSavedMoney() {
        return this.budgetMonth * perSelect.value; 
    }

    range() {

        periodAmount.innerHTML=perSelect.value;
    
    }

    clickSubmit(){
        if(monthAmount.value.length > 2) {
            start.disabled = false; 
        }
    
    }

    disabledInput(){

        for(let i = 0; i<inputFields.length; i++){
            inputFields[i].disabled = true;
        }
    }

    reset() {
        this.deleteFields();
        this.enabledInput();
        this.clearField(); 
        appData.clearData();
        this.rangeClear();
        
    }

    enabledInput() {
        inputFields = document.querySelectorAll('.data  input[type=text]');
        resultFields = document.querySelectorAll('.result  input[type=text]');
        for(let i = 0; i<inputFields.length; i++){
            inputFields[i].disabled = false;
        }
    }

    deleteFields() {

        const elemsExpenses = document.querySelectorAll('.expenses div.expenses-items');
        for(let i = elemsExpenses.length ; i > 1; i--){
    
            elemsExpenses[(i-1)].remove();    
        }
        expens.style.display = 'block';
    
    
        const elemsIncomes = document.querySelectorAll('.income div.income-items');
        for(let i = elemsIncomes.length ; i > 1; i--){
    
            elemsIncomes[(i-1)].remove();    
        }
        inc.style.display = 'block';
    
    }

    clearField() {
        inputFields = document.querySelectorAll('.data  input[type=text]');
        resultFields = document.querySelectorAll('.result  input[type=text]');
        for(let i = 0; i<inputFields.length; i++){
            inputFields[i].value = '';            
        };
        
        for(let i = 0; i<resultFields.length; i++){
            resultFields[i].value = '';
        };
    }

    clearData() {
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

        
    }

    rangeClear() {
        const g = document.querySelector('.period input[type=range]');
        g.value = 1;
        periodAmount.innerHTML= g.value;
    }

    events() {
        perSelect.addEventListener('input', appData.range);
    
        monthAmount.addEventListener('input', appData.clickSubmit);
    
        start.addEventListener('click', () => {
            appData.start();
            start.style.display = 'none';
            cancel.style.display = 'block';
        });
    
        reset.addEventListener('click', () => {
            appData.reset();
            reset.style.display = 'none';
            start.style.display = 'block';
        });
    
        expens.addEventListener('click', appData.addExpensesBlock);
    
        inc.addEventListener('click', appData.addIncomeBlock);
    };
};


const appData = new AppData();

console.log(appData);

AppData.prototype.events();



