'use strict';

import countTimer from './modules/countTimer';
import toggleMenu from './modules/toggleMenu';
import togglePopup from './modules/togglePopup';
import tabs from './modules/tabs';
import slider from './modules/slider';
import dotsAdd from './modules/dotsAdd';
import calc from './modules/calc';
import setCommandImg from './modules/setCommandImg';
import sendForm from './modules/sendForm';
import maskPhone from './modules/maskPhone';

// Timer
countTimer('30 january 2021');
//menu
maskPhone('.form-phone')
toggleMenu();
//popup
togglePopup();
//Tabs
//sendForm
sendForm();
tabs();
//add dots
dotsAdd();
//slider
slider(); 
//calc
calc(100);
//setCommandImg
setCommandImg();
