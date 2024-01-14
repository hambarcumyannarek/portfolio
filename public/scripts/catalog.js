const categoryBtns = document.querySelectorAll('.catalogAside .category button');

function removeAllActive(elements) {
    elements.forEach(val => val.classList.remove('active'));
}

categoryBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        removeAllActive(categoryBtns);
        btn.classList.add('active');
    })
})

const chooses = document.querySelectorAll('.catalogAside .rooms .choose');

chooses.forEach(choose => {
    const chooseBtns = choose.querySelectorAll('button');
    chooseBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            removeAllActive(chooseBtns);
            btn.classList.add('active');
        })
    })
})


// responive filters


const responsiveFilters = document.querySelector('.responsiveFilters');
const respFilterBtn = document.querySelector('.respFilterBtn');
const closeBtnF = responsiveFilters.querySelector('.closeBtn');

closeBtnF.addEventListener('click', () => {
    responsiveFilters.classList.remove('active');
    document.body.style.overflowY = 'auto';
    document.body.style.marginRight = '0';
    navbar.style.paddingRight = '20px';
});

responsiveFilters.addEventListener('click', (e) => {
    if (e.target.className.search('responsiveFilters') !== -1) {
        responsiveFilters.classList.remove('active');
        document.body.style.overflowY = 'auto';
        document.body.style.marginRight = '0';
        navbar.style.paddingRight = '20px';
    }
})
respFilterBtn.addEventListener('click', () => {
    responsiveFilters.classList.add('active');
    document.body.style.overflowY = 'hidden';
    document.body.style.marginRight = '17px';
    navbar.style.paddingRight = '37px';
})



// filteration


const filterButton = document.querySelectorAll('.catalogAside .filterButton');

const choosedCategoryName = document.querySelector('.category').getAttribute('data-choose-category')
const chooseCategoryWithName = document.querySelector(`.category [data-category="${choosedCategoryName}"]`);

if (chooseCategoryWithName) {
    chooseCategoryWithName.classList.add('active');
}
function sendDate(catalogAside) {
    const categoryType = catalogAside.querySelector('.category .active') ? catalogAside.querySelector('.category .active').getAttribute('data-category') : '';
    const selectValue = catalogAside.querySelector('.locationSelect').value;
    const checkBox = catalogAside.querySelectorAll('.property .checkBox');
    const property = [];
    const minPrice = catalogAside.querySelector('.price .minPrice').value;
    const maxPrice = catalogAside.querySelector('.price .maxPrice').value;
    const chooseBed = catalogAside.querySelector('.rooms .chooseBed .active') ? catalogAside.querySelector('.rooms .chooseBed .active').getAttribute('data-count') : '';
    const chooseBath = catalogAside.querySelector('.rooms .chooseBath .active') ? catalogAside.querySelector('.rooms .chooseBath .active').getAttribute('data-count') : '';
    console.log(chooseBed)
    console.log(chooseBath)
    checkBox.forEach(box => {
        if (box.querySelector('input').checked === true) {
            property.push(box.querySelector('input').getAttribute('data-property'));
        }
    })

    fetch(`/catalog/?categoryType=${categoryType}&selectValue=${selectValue}&property=${property}&minPrice=${minPrice}&maxPrice=${maxPrice}&chooseBed=${chooseBed}&chooseBath=${chooseBath}`);
}

filterButton.forEach(btn => {
    btn.addEventListener('click', () => {
        sendDate(btn.parentElement)
    })
})
