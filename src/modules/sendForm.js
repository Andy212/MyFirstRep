const sendForm = () => {

    const postData = (body) => fetch('./server.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    });

    const clearInput = (idForm) => {
        const form = document.getElementById(idForm);
        [...form.elements]
            .filter(item =>
                item.tagName.toLowerCase() !== 'button' &&
                item.type !== 'button')
            .forEach(item =>
                item.value = '');
    };

    const validFields = (event) => {
        const target = event.target;
        if (target.matches('.form-phone')) {
            target.value = target.value.replace(/[^+\d]/g, '');
        }
        if (target.name === 'user_name') {
            target.value = target.value.replace(/[^а-яё ]/gi, '');
        }
        if (target.matches('.mess')) {
            target.value = target.value.replace(/[^а-яё0-9 ,.]/gi, '');
        }
    };

    const mainProcess = (idForm) => {
        const form = document.getElementById(idForm);
        const statusMessage = document.createElement('div');

        const showStatus = (status) => {
            const statusList = {
                load: {
                    message: ' Загрузка...'
                },
                error: {
                    message: ' Что-то пошло не так...'
                },
                success: {
                    message: ' Спасибо! Мы скоро с вами свяжемся!'
                }
            };
            statusMessage.textContent = statusList[status].message;
        };

        statusMessage.style.cssText = 'font-size: 2rem; color: #fff';

        form.addEventListener('submit', event => {

            event.preventDefault();

            showStatus('load');

            form.appendChild(statusMessage);

            postData(Object.fromEntries(new FormData(form)))
                .then(response => {
                    if (response.status !== 200) throw new Error(`Status network ${request.status}`);
                    showStatus('success');
                    clearInput(idForm);
                })
                .catch(error => {
                    showStatus('error');
                    console.error(error);
                });
        });

        form.addEventListener('input', validFields);
    };

    mainProcess('form1');
    mainProcess('form2');
    mainProcess('form3');
};

export default sendForm;