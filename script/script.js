'use strict';
const spam = document.querySelector('.adv');
const collections = document.querySelectorAll ('.books'),
    elems = document.querySelectorAll('.book');

const elemsSecond = document.querySelectorAll('.book a');

const elemsInner = document.querySelectorAll('.book li');

const newElem = document.createElement('li');
newElem.textContent = 'Глава 8: За пределами ES6';

    collections[0].prepend(elems[1]);
    collections[0].append(elems[2]);
    elems[4].after(elems[3]);

document.body.style.backgroundImage = 'url(./image/you-dont-know-js.jpg)';

elemsSecond[4].innerText = 'Книга 3. this и Прототипы Объектов'

spam.remove();

elemsInner[3].after(elemsInner[6]);
elemsInner[6].after(elemsInner[8]);
elemsInner[9].after(elemsInner[2]);

elemsInner[47].after(elemsInner[55]);
elemsInner[49].after(elemsInner[48]);
elemsInner[50].after(elemsInner[48]);
elemsInner[52].after(elemsInner[51]);
elemsInner[52].after(elemsInner[53]);

elemsInner[25].after(newElem);