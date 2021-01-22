let date = new Date();
let welcome;
let hour = date.getHours();
let days = ["Воскресенье", "Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота"];

if (hour < 12) {
    welcome = "Доброе утро";
} else if (hour < 17) {
    welcome = "Добрый день";
} else {
    welcome = "Добрый вечер";
}

today = new Date()

let nextDate = new Date("January 1, 2022")
let msPerDay = 24*60*60*1000;
let daysLeft = Math.round((nextDate.getTime() - today.getTime())/msPerDay);


console.log(welcome);
console.log('Сегодня: ' + days[date.getDay()]);
console.log('Текущее время: ' + date.toLocaleTimeString('en'));
console.log('До нового года осталось ' + daysLeft + ' дней');