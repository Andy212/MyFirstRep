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

export default setCommandImg;