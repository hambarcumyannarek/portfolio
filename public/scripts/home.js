const bigSearchBtns = document.querySelectorAll('.bigSearch .btn');

bigSearchBtns.forEach(btn => {
    btn.addEventListener('click', () => {
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

const likeBtns = document.querySelectorAll('#popular .likeBtn');

likeBtns.forEach(val => val.addEventListener('click', () => val.classList.toggle('active')));
