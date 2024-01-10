const categoryBtns = document.querySelectorAll('.aside .category button');

function removeAllActive(elements) {
    elements.forEach(val => val.classList.remove('active'));
}

categoryBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        removeAllActive(categoryBtns);
        btn.classList.add('active');
    })
})

const chooses = document.querySelectorAll('.aside .rooms .choose');

chooses.forEach(choose => {
    const chooseBtns = choose.querySelectorAll('button');
    chooseBtns.forEach(btn => {
        console.log(btn)
        btn.addEventListener('click', () => {
            removeAllActive(chooseBtns);
            console.log(btn)
            btn.classList.add('active');
        })
    })
})