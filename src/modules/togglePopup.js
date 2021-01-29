const togglePopup = () =>{
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

export default togglePopup;