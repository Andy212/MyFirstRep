window.addEventListener('DOMContentLoaded', function(){
    'use strict';



    // Timer
   const countTimer = (deadline) =>{
        const timerHours = document.querySelector('#timer-hours'),
            timerMinutes = document.querySelector('#timer-minutes'),
            timerSeconds = document.querySelector('#timer-seconds');
        let idInterval,
            seconds,
            minutes,
            hours;

   const getTimeRemaining = () =>{
            const dateStop = new Date(deadline).getTime(),
                dateNow = new Date().getTime(),
                timeRemaining = (dateStop - dateNow) / 1000;
                seconds = Math.floor(timeRemaining % 60),
                minutes = Math.floor((timeRemaining / 60) % 60),
                hours = Math.floor(timeRemaining / 60 / 60);

                if(seconds < 10){seconds = '0' + seconds;}
                if(minutes < 10){minutes = '0' + minutes;}
                if(hours < 10){hours = '0' + hours;}
                
                return {timeRemaining, hours, minutes, seconds};
                
        }

    const updateClock = () =>{
            const timer = getTimeRemaining();

            timerHours.textContent = timer.hours;
            timerMinutes.textContent = timer.minutes;
            timerSeconds.textContent = timer.seconds;
        
            
            if(timer.timeRemaining < 0){
                clearInterval(idInterval);
                timerHours.textContent = '00';
                timerMinutes.textContent = '00';
                timerSeconds.textContent = '00';
            
            }
            
        };
        
        idInterval = setInterval(updateClock, 1000);
    };

    countTimer('23 january 2021');

});
