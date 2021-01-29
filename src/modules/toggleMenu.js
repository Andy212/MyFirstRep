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

export default toggleMenu;