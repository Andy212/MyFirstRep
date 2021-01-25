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
                
        };

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


    //menu
    const toggleMenu = () => {
        const btnMenu = document.querySelector('.menu'),
			menu = document.querySelector('menu');

		const handlerMenu = () => {
			const target = event.target;
			if (target.closest('.menu')) {
				menu.classList.toggle('active-menu');
			} else if (target !== menu && target.closest('[href^="#"]')) {
				menu.classList.toggle('active-menu');
			}

		};
        
        btnMenu.addEventListener('click', handlerMenu);
		menu.addEventListener('click', handlerMenu);
    };

    toggleMenu();
    //popup
    const togglePpup = () =>{
        const popup = document.querySelector('.popup'),
            popupBtn = document.querySelectorAll('.popup-btn');

            let screenWidth = document.documentElement.clientWidth;
            
            window.addEventListener('resize', ()=>{
                screenWidth = document.documentElement.clientWidth;});

            const popupContent = document.querySelector('.popup-content');
            const popleft = function(){
                popup.style.display = 'block';
                const start = Date.now(),
                    timer = setInterval(function() {
                    let timePassed = Date.now() - start;
                    popupContent.style.top = timePassed / 25 + '%';
                    if (timePassed > 1000){
                    clearInterval(timer);}
            
                }, 10);

            };

        popupBtn.forEach((elem) =>{
            elem.addEventListener('click', ()=>{
                popup.style.display = 'block';
                if(screenWidth > 768) {popleft();}
            });

        });


        popup.addEventListener('click', (event)=>{
            let target = event.target;

            if(target.classList.contains('popup-close')){
                popup.style.display = 'none';
            } else{
                target = target.closest('.popup-content');

                if(!target){
                    popup.style.display = 'none';
                }
            }

                
        });
    
    };
    togglePpup();


    //Tabs
    const tabs = ()=>{

        const tabHeader = document.querySelector('.service-header'),
            tab = tabHeader.querySelectorAll('.service-header-tab'),
            tabContent = document.querySelectorAll('.service-tab');



        const toogleTabContent = (index) => {
            for(let i = 0; i< tabContent.length; i++){
                if(index === i){
                    tab[i].classList.add('active');
                    tabContent[i].classList.remove('d-none');
                }else{
                    tab[i].classList.remove('active');
                    tabContent[i].classList.add('d-none');
                }
            }
        }

        tabHeader.addEventListener('click', (event) =>{
            let target = event.target;
                target = target.closest('.service-header-tab');

                if(target){
                    tab.forEach((item, i)=>{
                        if(item === target){
                            toogleTabContent(i);
                        }
                    });
                }
        });
    };  


    tabs();
    
    //slider
    const slider = () =>{
        const slide = document.querySelectorAll('.portfolio-item'),
            btn = document.querySelectorAll('.portfolio-btn'),
            slider = document.querySelector('.portfolio-content'),
            dot = document.querySelectorAll('.dot');
        
        
        let currentSlide = 0,
            interval;

        const prevSlide = (elem, index, strClass) =>{
            elem[index].classList.remove(strClass);
        };

        const nextSlide = (elem, index, strClass) =>{
            elem[index].classList.add(strClass);
        };


        const autoPlaySlide = () => {

            prevSlide(slide, currentSlide,'portfolio-item-active');
            prevSlide(dot, currentSlide, 'dot-active');
                currentSlide++;
                if(currentSlide >= slide.length){
                    currentSlide = 0;
                }
            nextSlide(slide, currentSlide,'portfolio-item-active');
            nextSlide(dot, currentSlide, 'dot-active');
        };

        const startSlide = (time = 3000) => {
            interval = setInterval(autoPlaySlide, time);
        };

        const stopSlide = () => {
            clearInterval(interval);
        };
        slider.addEventListener('click', (event) =>{
            event.preventDefault();

            let target = event.target;
            
            if(!target.matches('.portfolio-btn, .dot')){
                return;
            }

            prevSlide(slide, currentSlide,'portfolio-item-active');
            prevSlide(dot, currentSlide, 'dot-active');


            if(target.matches('#arrow-right')){
                currentSlide++;
            } else if(target.matches('#arrow-left')){
                currentSlide--;
            }else if(target.matches('.dot')){
                dot.forEach((elem, index) =>{
                    if(elem === target){
                        currentSlide = index;
                    }
                });
            }
            if(currentSlide >= slide.length){ currentSlide = 0;}

            if(currentSlide < 0){currentSlide = slide.length - 1;}
            
            nextSlide(slide, currentSlide,'portfolio-item-active');
            nextSlide(dot, currentSlide, 'dot-active');

        });

        slider.addEventListener('mouseover', (event) =>{
            if(event.target.matches('.portfolio-btn') || event.target.matches('.dot')){
                stopSlide();
            }
        });

        slider.addEventListener('mouseout', (event) =>{
            if(event.target.matches('.portfolio-btn') || event.target.matches('.dot')){
                startSlide();
            }
        });

        startSlide(1500);

    };
    //add dots
    const dotsAdd = () =>{
        const portfolioDots = document.querySelector('.portfolio-dots'),
        portfolioItem = document.querySelectorAll('.portfolio-item');

        portfolioItem.forEach(() => {
            const dot = document.createElement('li');
            dot.classList.add('dot');
            portfolioDots.appendChild(dot);
        });

        portfolioDots.children[0].classList.add('dot-active');
    };

    const setCommandImg = () => {
		const newCommand = document.querySelector('#command .row');

		const hidenPhotos = (event) => {
			const target = event.target;

			if (target.classList.contains('command__photo')) {
                const secondSrc = target.src;
				target.src = target.dataset.img;
				target.dataset.img = secondSrc;
			}
		};

		newCommand.addEventListener('mouseover', hidenPhotos);
		newCommand.addEventListener('mouseout', hidenPhotos);
	};

//calc

    const calc = (price = 100) => {

        const calcBlock = document.querySelector('.calc-block'),
            calcType = document.querySelector('.calc-type'),
            calcSquare = document.querySelector('.calc-square'),
            calcDay = document.querySelector('.calc-day'),
            calcCount = document.querySelector('.calc-count'),
            totalValue = document.getElementById('total');

    const countSum = () =>{
        let total = 0,
        countValue = 1,
        dayValue = 10;
        const typeValue = calcType.options[calcType.selectedIndex].value,       
            squareValue = +calcSquare.value;

        if(calcCount.value > 1){
            countValue += (calcCount.value - 1) / 10;
        }
    
        if(calcDay.value && calcDay.value < 5){
            dayValue *= 2;
        } else if (calcDay.value && calcDay.value < 10){
            dayValue *= 1.5;
        }

        if(typeValue && squareValue){
            total = price * typeValue * squareValue * countValue * dayValue;
        }

        totalValue.textContent = total;



    }
        

        calcBlock.addEventListener('change', (event) => {
            const target = event.target;
            if(target.matches('select') || target.matches('input')){

                
                countSum();
            }
            
        })

        const calcFields = () => {
            
            calcBlock.addEventListener('input', (event) =>{
                event.target.value = event.target.value.replace(/\D/g, '');
            })
        }
        calcFields();




    }

    
    dotsAdd();
    calc(100);
    slider();
    setCommandImg();
});