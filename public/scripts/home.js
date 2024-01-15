const bigSearchBtns = document.querySelectorAll('.bigSearch .btn');
const searchBtn = document.getElementById('searchBtn');

bigSearchBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        searchObj.category = btn.getAttribute('data-category');
        const { category, location, price, property } = searchObj;
        searchBtn.href = `/catalog?categoryType=${category}&location=${location}&price=${price}&property=${property}`
        bigSearchBtns.forEach(btn => {
            btn.classList.remove('active')
        })
        btn.classList.add('active');
    })
})

const lists = document.querySelectorAll('.lists .list');

lists.forEach((list, i1) => {
    list.addEventListener('click', () => {
        lists.forEach((list2, i2) => {
            if(i1 !== i2) {
                list2.classList.remove('active')
            }
        })
        console.log(list.className)
        list.className.search('active') !== -1 ? list.classList.remove('active') : list.classList.add('active');
    })
})


const linkSelects = document.querySelectorAll('.linkSelect');

const searchObj = {
    category: document.querySelector('.bigSearch .btn.active').getAttribute('data-category'),
    location: '',
    price: '',
    property: ''
}

linkSelects.forEach(select => {
    select.addEventListener('change', (evn) => {
        searchObj[evn.target.name] = evn.target.value;
        const { category, location, price, property } = searchObj;
        searchBtn.href = `/catalog?categoryType=${category}&location=${location}&price=${price}&property=${property}`
    })
})
