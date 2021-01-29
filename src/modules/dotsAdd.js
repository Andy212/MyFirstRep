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

export default dotsAdd;