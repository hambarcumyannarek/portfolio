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


JSON.parse(document.querySelector('.boxes').getAttribute('data-like-active')).forEach(obj => {
    document.getElementById(`${obj.productId}`) ? document.getElementById(`${obj.productId}`).querySelector('.wishlistBtn').classList.toggle('active') : null;
})
// filteration


const filterButton = document.querySelectorAll('.catalogAside .filterButton');
const titleCategory = document.querySelector('.TitleCategory');
const choosedCategoryName = document.querySelector('.category').getAttribute('data-choose-category')
const chooseCategoryWithName = document.querySelector(`.category [data-category="${choosedCategoryName}"]`);
titleCategory.innerText = choosedCategoryName ? choosedCategoryName : 'all';

if (chooseCategoryWithName) {
    chooseCategoryWithName.classList.add('active');
}
const boxes = document.querySelector('#catalog .boxes');
function sendDate(catalogAside) {
    const categoryType = catalogAside.querySelector('.category .active') ? catalogAside.querySelector('.category .active').getAttribute('data-category') : '';
    const selectValue = catalogAside.querySelector('.locationSelect').value;
    const checkBox = catalogAside.querySelectorAll('.property .checkBox');
    const property = [];
    const minPrice = catalogAside.querySelector('.price .minPrice').value;
    const maxPrice = catalogAside.querySelector('.price .maxPrice').value;
    const chooseBed = catalogAside.querySelector('.rooms .chooseBed .active') ? catalogAside.querySelector('.rooms .chooseBed .active').getAttribute('data-count') : '';
    const chooseBath = catalogAside.querySelector('.rooms .chooseBath .active') ? catalogAside.querySelector('.rooms .chooseBath .active').getAttribute('data-count') : '';
   
    checkBox.forEach(box => {
        if (box.querySelector('input').checked === true) {
            property.push(box.querySelector('input').getAttribute('data-property'));
        }
    })
    const postedDate = {
        categoryType,
        selectValue,
        property: property.toString(),
        minPrice,
        maxPrice,
        chooseBed,
        chooseBath,
    }

    fetch('/catalog', {
        method: 'post',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify(postedDate)
    }).then(getInfo => getInfo.json()).then(arr => {
        titleCategory.innerText = arr.categoryType ? arr.categoryType : 'all';
        boxes.innerHTML = '';
        arr.products.forEach(product => {
            boxes.innerHTML += `
                <div class="box" id="${product.id}">
                    <div class="img">
                        <img src="/images/upload/${product.images}" alt="...">
                        <div class="imgTop">
                            <p class="type">For ${product.category}</p>
                            <button class="likeBtn wishlistBtn" data-id="${product.id}">
                                <i class="fa-solid fa-heart"></i>
                            </button>
                        </div>
                    </div>
                    <div class="content">
                        <div class="top">
                            <h3>${product.productName}</h3>
                            <div class="location">
                                <i class="fa-solid fa-location-dot"></i>
                                <span>In ${product.location} city and home address ${product.homeAddress}</span>
                            </div>
                            <div class="info">
                                <div class="card"><i class="fa-solid fa-bed"></i> <span>${product.bedRooms}</span></div>
                                <div class="card"><i class="fa-solid fa-bath"></i> <span>${product.bathRooms}</span></div>
                            </div>
                        </div>
                        <div class="down">
                            <span class="price"><b>$${product.price}/</b> Night</span>
                            <a href="/single/${product.id}"><button class="btn">View More</button></a>
                        </div>
                    </div>
                </div>
            `;
        })
        update();
        console.log(arr.likeBtns)
        arr.likeBtns.forEach(obj => {
            document.getElementById(`${obj.productId}`) ? document.getElementById(`${obj.productId}`).querySelector('.wishlistBtn').classList.toggle('active') : null;
        })
    }).catch(err => console.log(err))
}

import { update } from "./addWishlist.js";

filterButton.forEach(btn => {
    btn.addEventListener('click', () => {
        if(btn.parentElement.className.search('responsiveFilters') !== -1) responsiveFilters.classList.remove('active') 
        sendDate(btn.parentElement)
    })
})
