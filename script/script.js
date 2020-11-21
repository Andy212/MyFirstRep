

let money = 1000;
let income = 'разработка приложений';
let addExpenses = 'КОММУНАЛКА, ВОДА, ГАЗ';
let deposit = true;
let mission = 50000;
let period = 6;
let budgetDay = money / 30;

console.log(typeof money);
console.log(typeof income);
console.log(typeof deposit);

console.log(addExpenses.length);
console.log('Период равен ' + period +' месяцев' );
console.log('Цель заработать '+ mission + ' Долларов');
console.log(addExpenses.toLowerCase().split(','));

console.log(budgetDay);