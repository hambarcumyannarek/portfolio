const selects = document.querySelectorAll('select');

selects.forEach(select => {
    const options = select.querySelectorAll('option');

    options.forEach(option => {
        if(option.value === select.getAttribute('data-choose')) {
            option.setAttribute('selected', '')
        }
    })
})

function removeAllActive(elements) {
    elements.forEach(val => val.classList.remove('active'));
}

const choosesPut = document.querySelectorAll('.choose');

choosesPut.forEach(choose => {
    const chooseInput = choose.querySelector('.chooseInput');
    const buttons = choose.querySelectorAll('button');
    removeAllActive(buttons);
    choose.querySelector(`[data-count="${chooseInput.value}"]`).classList.add('active');
})


console.log(document.querySelector('#file').getAttribute('data-images'))