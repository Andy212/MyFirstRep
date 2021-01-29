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

// Timer
countTimer('30 january 2021');
//menu
toggleMenu();
//popup
togglePopup();
//Tabs
tabs();
//add dots
dotsAdd();
//slider
slider(); 
//calc
calc(100);
//setCommandImg
setCommandImg();
//sendForm
sendForm();